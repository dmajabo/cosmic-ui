import React, { useContext, useEffect, useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { AnomalyBarChart } from './AnomalyBarChart';
import {
  AlertMetadata,
  AnomalyExperienceTableData,
  AnomalySessionLogsData,
  AnomalySlaTestData,
  Column,
  ColumnAccessor,
  FinalTableData,
  GetAlertMetadataResponse,
  GetExperienceAnomaliesResponse,
  GetOrganizationResponse,
  GetSLATestResponse,
  Organization,
  SLATest,
} from 'lib/api/http/SharedTypes';
import { AnomalyTable } from './AnomalyTable';
import { SeverityIcon } from './SeverityIcon';
import { AnomalySLATestTable } from './AnomalySLATestTable';
import { LATENCY_HEATMAP_LEGEND } from '../Performance Dashboard/Latency';
import { PACKET_LOSS_HEATMAP_LEGEND } from '../Performance Dashboard/PacketLoss';
import { LegendData } from '../Performance Dashboard/Heatmap';
import { AnomalyBlockTable } from './AnomalyBlockTable';
import { Row } from 'react-table';
import { DUMMY_BAR_CHART_DATA, DUMMY_SESSION_LOGS_DATA, DUMMY_SLA_TEST_DATA } from '../../DummyData';
import { getAPIEndpoint, getSeverityColour, SeverityLevel } from 'lib/api/http/utils';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { AnomalyTimeRangeValue } from './Anomalies';
import { createApiClient } from 'lib/api/http/apiClient';
import produce from 'immer';
import uniqBy from 'lodash/uniqBy';
import { isEmpty } from 'lodash';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { GetDevicesString, GetSelectedOrganization } from '../Performance Dashboard/filterFunctions';

interface ExperienceTabProps {
  readonly timeRange: AnomalyTimeRangeValue;
}

const anomalyTableColumns: Column[] = [
  {
    Header: 'NAME',
    accessor: ColumnAccessor.name,
  },
  {
    Header: 'SEVERITY',
    accessor: ColumnAccessor.severity,
  },
  {
    Header: 'HITS',
    accessor: ColumnAccessor.hits,
  },
];

export interface BarChartData {
  readonly date: string;
  readonly value: number;
}

const SLA_TEST_COLUMNS: Column[] = [
  {
    Header: 'HITS',
    accessor: ColumnAccessor.hits,
  },
  {
    Header: 'NAME',
    accessor: ColumnAccessor.name,
  },
  {
    Header: 'SOURCE ORGANIZATION',
    accessor: ColumnAccessor.sourceOrg,
  },
  {
    Header: 'SOURCE NETWORK',
    accessor: ColumnAccessor.sourceNetwork,
  },
  {
    Header: 'SOURCE DEVICE',
    accessor: ColumnAccessor.sourceDevice,
  },
  {
    Header: 'DESTINATION',
    accessor: ColumnAccessor.destination,
  },
  {
    Header: 'AVERAGE QOE',
    accessor: ColumnAccessor.averageQoe,
  },
];

const SESSION_LOGS_COLUMNS: Column[] = [
  {
    Header: 'HITS',
    accessor: ColumnAccessor.hits,
  },
  {
    Header: 'TIME',
    accessor: ColumnAccessor.time,
    width: 250,
  },
  {
    Header: 'SESSION ID',
    accessor: ColumnAccessor.sessionId,
  },
  {
    Header: 'EDGE NAME',
    accessor: ColumnAccessor.edgeName,
  },
  {
    Header: 'EDGE TYPE',
    accessor: ColumnAccessor.edgeType,
  },
  {
    Header: 'SOURCE IP',
    accessor: ColumnAccessor.source,
  },
  {
    Header: 'DESTINATION IP',
    accessor: ColumnAccessor.destination,
    width: 200,
  },
  {
    Header: 'TGW NAME',
    accessor: ColumnAccessor.tgwName,
  },
  {
    Header: 'TGW REGION',
    accessor: ColumnAccessor.tgwRegion,
  },
  {
    Header: 'TGW-BYTESIN',
    accessor: ColumnAccessor.tgwBytesin,
  },
  {
    Header: 'AWS-ACCOUNT-ID',
    accessor: ColumnAccessor.awsAccountId,
  },
  {
    Header: 'AWS-ACTION',
    accessor: ColumnAccessor.awsAction,
  },
  {
    Header: 'AWS-REGION',
    accessor: ColumnAccessor.awsRegion,
  },
  {
    Header: 'WPC-ID',
    accessor: ColumnAccessor.wpcId,
  },
  {
    Header: 'INSTANCE-ID',
    accessor: ColumnAccessor.instanceId,
  },
  {
    Header: 'SDWAN RULE ID',
    accessor: ColumnAccessor.sdwanRuleId,
    width: 200,
  },
  {
    Header: 'FIREWALL POLICY ID',
    accessor: ColumnAccessor.firewallPolicyId,
    width: 200,
  },
  {
    Header: 'DESTINATION APPLICATION',
    accessor: ColumnAccessor.destApp,
  },
];

const RED_COLOUR = '#DC4545';

const SLA_TEST_TABLE_SORTABLE_HEADERS = ['NAME'];

const SESSION_LOGS_TABLE_SORTABLE_HEADERS = ['SESSION ID', 'SOURCE IP', 'DESTINATION IP', 'SDWAN RULE ID', 'FIREWALL POLICY ID'];

const getColor = (legendData: LegendData[], data: number) => legendData.find(item => data >= item.low && data <= item.high)?.color || RED_COLOUR;

export const ExperienceTab: React.FC<ExperienceTabProps> = ({ timeRange }) => {
  const classes = AnalyticsStyles();

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  const [alertMetadata, setAlertMetadata] = useState<AlertMetadata[]>([]);
  const [slaTests, setSlaTests] = useState<SLATest[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [tableAlertMetadata, setTableAlertMetadata] = useState<AlertMetadata[]>([]);

  const { response: experienceTabAlertResponse, loading: alertLoading, error: alertError, onGet: getExperienceTableAlertMetadata } = useGet<GetAlertMetadataResponse>();
  const { response: organizationResponse, onGet: getOrganizations } = useGet<GetOrganizationResponse>();

  const getSLATests = async () => {
    const response = await apiClient.getSLATests();
    if (isEmpty(response)) {
      setSlaTests([]);
    } else {
      setSlaTests(response.slaTests);
    }
  };

  useEffect(() => {
    getExperienceTableAlertMetadata(getAPIEndpoint(AlertApi.getAllMetadata()), userContext.accessToken!);
    getOrganizations(getAPIEndpoint(TopoApi.getAllOrganizations()), userContext.accessToken!);
    getSLATests();
  }, []);

  useEffect(() => {
    if (experienceTabAlertResponse && experienceTabAlertResponse.alertMetadata && experienceTabAlertResponse.alertMetadata.length) {
      setAlertMetadata(experienceTabAlertResponse.alertMetadata);
    } else {
      setAlertMetadata([]);
    }
  }, [experienceTabAlertResponse, timeRange]);

  useEffect(() => {
    if (organizationResponse && organizationResponse.organizations && organizationResponse.organizations.length) {
      setOrganizations(organizationResponse.organizations);
    } else {
      setOrganizations([]);
    }
  }, [organizationResponse]);

  useEffect(() => {
    if (!isEmpty(alertMetadata) && !isEmpty(slaTests)) {
      const promises = alertMetadata.map(item => apiClient.getExperienceAnomalies(item.name, timeRange));
      Promise.all(promises).then(experienceAnomalyResponses => {
        const newAlertMetaData: AlertMetadata[] = alertMetadata.map(item => {
          const selectedAnomalyResponse = experienceAnomalyResponses.find(anomaly => anomaly.name === item.name);
          const uniqueDestinations = uniqBy(selectedAnomalyResponse.anomalies, 'destination').map(anomaly => anomaly.destination);
          const filteredSlaTests = slaTests.filter(test => uniqueDestinations.includes(test.destination));
          const filteredSlaTestswithCount = filteredSlaTests.map(test => {
            const testAnomalyCount = selectedAnomalyResponse.anomalies.filter(anomaly => anomaly.destination === test.destination);
            return {
              ...test,
              hits: testAnomalyCount.length,
            };
          });

          const { triggerCount, ...otherItems } = item;

          return {
            ...otherItems,
            slaTests: filteredSlaTestswithCount,
            triggerCount: Number(selectedAnomalyResponse.count),
          };
        });
        setTableAlertMetadata(newAlertMetaData);
      });
    }
  }, [alertMetadata, timeRange, slaTests]);

  const tableData: AnomalyExperienceTableData[] = tableAlertMetadata.map(item => ({
    name: item.name,
    severity: (
      <div>
        <SeverityIcon colour={getSeverityColour(SeverityLevel[item.severity])} />
        <span className={classes.severityText}>{SeverityLevel[item.severity]}</span>
      </div>
    ),
    hits: <div className={classes.hitsCount}>{item.triggerCount}</div>,
    slaTests: item.slaTests,
  }));

  const experienceSubComponent = React.useCallback(
    (row: Row<object>) => {
      const selectedAnomalyMetadata = tableAlertMetadata.find(item => item.name === row.values.name);
      const slaTestTableData: AnomalySlaTestData[] = selectedAnomalyMetadata.slaTests.map(item => {
        const merakiOrganisations = organizations.filter(organization => organization.vendorType === 'MERAKI');
        const selectedOrganization = GetSelectedOrganization(merakiOrganisations, item.sourceOrgId);
        const allDevices: string = GetDevicesString(selectedOrganization, item.sourceNwExtId);
        return {
          hits: <div className={classes.hitsCount}>{item.hits}</div>,
          averageQoe: (
            <div className={classes.averageQoeText}>
              <span>Packet Loss:</span>
              <span style={{ color: getColor(PACKET_LOSS_HEATMAP_LEGEND, Number(item.metrics.avgPacketLoss)) }} className={classes.qoeValueText}>{`${
                isNaN(Number(item.metrics.avgPacketLoss)) ? '-' : Number(item.metrics.avgPacketLoss)
              }%`}</span>
              <span>Latency:</span>
              <span style={{ color: getColor(LATENCY_HEATMAP_LEGEND, Number(item.metrics.avgLatency)) }} className={classes.qoeValueText}>{`${
                isNaN(Number(item.metrics.avgLatency)) ? '-' : Number(item.metrics.avgLatency).toFixed(2)
              }ms`}</span>
            </div>
          ),
          id: item.testId,
          name: item.name,
          sourceOrg: selectedOrganization.name,
          sourceNetwork: item.sourceNwExtId,
          sourceDevice: allDevices,
          destination: item.destination,
          interface: item.interface,
          description: item.description,
        };
      });

      const sessionLogsTableData: AnomalySessionLogsData[] = DUMMY_SESSION_LOGS_DATA.map(item => {
        const { hits, ...otherItems } = item;
        return {
          hits: <div className={classes.hitsCount}>{hits}</div>,
          ...otherItems,
        };
      });

      return (
        <div>
          <div className={classes.anomalySubcomponentTitle}>SLA Tests</div>
          <AnomalySLATestTable columns={SLA_TEST_COLUMNS} data={slaTestTableData} sortableHeaders={SLA_TEST_TABLE_SORTABLE_HEADERS} />
          <div className={`${classes.sessionLogs} ${classes.anomalySubcomponentTitle}`}>Session Logs</div>
          <AnomalyBlockTable columns={SESSION_LOGS_COLUMNS} data={sessionLogsTableData} sortableHeaders={SESSION_LOGS_TABLE_SORTABLE_HEADERS} />
        </div>
      );
    },
    [tableAlertMetadata, organizations],
  );

  return (
    <div className={classes.anomalyTabPanelContainer}>
      <AnomalyBarChart
        inputData={DUMMY_BAR_CHART_DATA}
        xAxisText={`${DUMMY_BAR_CHART_DATA[0].date} to ${DUMMY_BAR_CHART_DATA[DUMMY_BAR_CHART_DATA.length - 1].date} (1 day interval)`}
        yAxisText="hits"
      />
      <div className={classes.anomalyTableContainer}>
        <div className={classes.anomalyExperienceTableTitle}>
          <span className={classes.anomalyTableTitle}>Triggers</span>
          <span className={classes.anomalyCount}>{alertMetadata.length}</span>
        </div>
        {alertLoading && isEmpty(tableAlertMetadata) ? (
          <LoadingIndicator />
        ) : alertError ? (
          <ErrorMessage fontSize={28} margin="auto">
            Something went wrong. Please refresh page
          </ErrorMessage>
        ) : (
          <AnomalyTable inputColumns={anomalyTableColumns} data={tableData} subComponent={experienceSubComponent} />
        )}
      </div>
    </div>
  );
};
