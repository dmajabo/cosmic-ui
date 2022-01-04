import React, { useContext, useEffect, useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { AnomalyBarChart } from './AnomalyBarChart';
import {
  AlertMetadata,
  AnomalyExperienceTableData,
  AnomalySlaTestData,
  Column,
  ColumnAccessor,
  GetAlertMetadataResponse,
  GetExperienceAnomaliesResponse,
  ExperienceAnomalies,
  HitsTableData,
  GetOrganizationResponse,
  Organization,
  SLATest,
} from 'lib/api/http/SharedTypes';
import { AnomalyTable } from './AnomalyTable';
import { SeverityIcon } from './SeverityIcon';
import { AnomalySLATestTable } from './AnomalySLATestTable';
import { Row } from 'react-table';
import { getSeverityColour, SeverityLevel } from 'lib/api/http/utils';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { AnomalyTimeRangeValue } from './Anomalies';
import { createApiClient } from 'lib/api/http/apiClient';
import countBy from 'lodash/countBy';
import isEmpty from 'lodash/isEmpty';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { GetDevicesString, GetSelectedOrganization } from '../Performance Dashboard/filterFunctions';
import { DateTime } from 'luxon';
import { VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';

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

enum AnomalySuffix {
  ANOMALY_PACKETLOSS = '%',
  ANOMALY_LATENCY = 'ms',
  ANOMALY_GOODPUT = 'Mbps',
}

enum AnomalyType {
  packetLoss = 'ANOMALY_PACKETLOSS',
  latency = 'ANOMALY_LATENCY',
  goodput = 'ANOMALY_GOODPUT',
}

const HITS_TABLE_COLUMNS: Column[] = [
  {
    Header: 'NAME',
    accessor: ColumnAccessor.name,
  },
  {
    Header: 'TIME',
    accessor: ColumnAccessor.time,
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
    Header: 'VALUE',
    accessor: ColumnAccessor.value,
  },
];

const HITS_TABLE_SORTABLE_HEADERS = ['VALUE', 'DESTINATION', 'NAME'];

const HITS_TABLE_TIME_FORMAT = 'EEE, MMM dd yyyy, hh:mm a';

const INPUT_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss ZZZ z';

const BAR_CHART_TIME_FORMAT = 'MMM dd';

export const ExperienceTab: React.FC<ExperienceTabProps> = ({ timeRange }) => {
  const classes = AnalyticsStyles();

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

  const [alertMetadata, setAlertMetadata] = useState<AlertMetadata[]>([]);
  const [slaTests, setSlaTests] = useState<SLATest[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [tableAlertMetadata, setTableAlertMetadata] = useState<AlertMetadata[]>([]);
  const [allExperienceAnomalies, setAllExperienceAnomalies] = useState<ExperienceAnomalies[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [isBarChartLoading, setIsBarChartLoading] = useState<boolean>(true);
  const [selectedBarChartPoints, setSelectedBarChartPoints] = useState<string[]>([]);

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

  const getTableAlertMetadata = (experienceAnomalyResponses: GetExperienceAnomaliesResponse[]): AlertMetadata[] =>
    alertMetadata.map(item => {
      const selectedAnomalyResponse = experienceAnomalyResponses.find(anomaly => anomaly.name === item.name);

      const { triggerCount, ...otherItems } = item;

      return {
        ...otherItems,
        anomalies: selectedAnomalyResponse.anomalies,
        triggerCount: Number(selectedAnomalyResponse.count),
        packetlossThreshold: selectedAnomalyResponse.packetlossThreshold,
        latencyThreshold: selectedAnomalyResponse.latencyThreshold,
        goodputThreshold: selectedAnomalyResponse.goodputThreshold,
      };
    });

  const getSlaTestTableData = (): AnomalySlaTestData[] => {
    const merakiOrganisations = organizations.filter(organization => organization.vendorType === VendorTypes.MERAKI);
    return slaTests.map(item => {
      const selectedOrganization = GetSelectedOrganization(merakiOrganisations, item.sourceOrgId);
      const allDevices: string = GetDevicesString(selectedOrganization, item.sourceNwExtId);
      return {
        id: item.testId,
        name: item.name,
        sourceOrg: selectedOrganization.name,
        sourceNetwork: item.sourceNwExtId,
        sourceDevice: allDevices,
        destination: item.destination,
        interface: item.interface,
      };
    });
  };

  const handleSelectedBarChartPointsChange = (selectedPoints: string[]) => setSelectedBarChartPoints(selectedPoints);

  useEffect(() => {
    getExperienceTableAlertMetadata(AlertApi.getAllMetadata(), userContext.accessToken!);
    getOrganizations(TopoApi.getAllOrganizations(), userContext.accessToken!);
    getSLATests();
  }, []);

  useEffect(() => setAlertMetadata(experienceTabAlertResponse?.alertMetadata || []), [experienceTabAlertResponse, timeRange]);

  useEffect(() => setOrganizations(organizationResponse?.organizations || []), [organizationResponse]);

  useEffect(() => {
    if (!isEmpty(alertMetadata)) {
      const promises = alertMetadata.map(item => apiClient.getExperienceAnomalies(item.name, timeRange));
      Promise.all(promises)
        .then(async experienceAnomalyResponses => {
          const allAnomalies = experienceAnomalyResponses.reduce((acc, nextValue) => acc.concat(nextValue.anomalies), []);
          setAllExperienceAnomalies(allAnomalies);

          const newAlertMetaData: AlertMetadata[] = await getTableAlertMetadata(experienceAnomalyResponses);
          setTableAlertMetadata(newAlertMetaData);
        })
        .catch(() => setIsBarChartLoading(false));
    }
  }, [alertMetadata, timeRange]);

  useEffect(() => {
    if (isEmpty(allExperienceAnomalies)) {
      setBarChartData([]);
    } else {
      const luxonDateAnomalyData = allExperienceAnomalies.map(anomaly => DateTime.fromFormat(anomaly.time, INPUT_TIME_FORMAT).toUTC().toFormat(BAR_CHART_TIME_FORMAT));
      const dateCount = countBy(luxonDateAnomalyData);
      const barChartData = Object.keys(dateCount).map(item => ({
        date: item,
        value: dateCount[item],
      }));
      setBarChartData(barChartData);
      setIsBarChartLoading(false);
    }
  }, [allExperienceAnomalies, timeRange]);

  useEffect(() => {
    if (alertError) {
      setIsBarChartLoading(false);
    }
  }, [alertError]);

  useEffect(() => {
    const filteredTableAlertMetadata: AlertMetadata[] = alertMetadata.map(item => {
      const triggerSpecificAnomalies = allExperienceAnomalies.filter(anomaly => anomaly.type === item.name);
      const filteredAnomalies = isEmpty(selectedBarChartPoints)
        ? triggerSpecificAnomalies
        : triggerSpecificAnomalies.filter(anomaly => selectedBarChartPoints.includes(DateTime.fromFormat(anomaly.time, INPUT_TIME_FORMAT).toUTC().toFormat(BAR_CHART_TIME_FORMAT)));

      const { triggerCount, ...otherItems } = item;

      return {
        ...otherItems,
        anomalies: filteredAnomalies,
        triggerCount: filteredAnomalies.length,
      };
    });
    setTableAlertMetadata(filteredTableAlertMetadata);
  }, [selectedBarChartPoints]);

  const tableData: AnomalyExperienceTableData[] = tableAlertMetadata.map(item => ({
    name: item.name,
    severity: (
      <div>
        <SeverityIcon colour={getSeverityColour(SeverityLevel[item.severity])} />
        <span className={classes.severityText}>{SeverityLevel[item.severity]}</span>
      </div>
    ),
    hits: <div className={classes.hitsCount}>{item.triggerCount}</div>,
  }));

  const experienceSubComponent = React.useCallback(
    (row: Row<object>) => {
      const slaTestTableData: AnomalySlaTestData[] = getSlaTestTableData();

      const selectedTriggerAnomaly = tableAlertMetadata.find(item => item.name === row.values.name);

      const hitsTableData: HitsTableData[] = selectedTriggerAnomaly.anomalies?.map(anomaly => {
        const slaTest: AnomalySlaTestData = slaTestTableData.find(test => test.destination === anomaly.destination && test.sourceDevice === anomaly.device);

        return {
          name: slaTest?.name,
          time: DateTime.fromFormat(anomaly.time, INPUT_TIME_FORMAT).toUTC().toFormat(HITS_TABLE_TIME_FORMAT),
          sourceOrg: slaTest?.sourceOrg,
          sourceNetwork: slaTest?.sourceNetwork,
          sourceDevice: slaTest?.sourceDevice,
          destination: anomaly.destination,
          value: (
            <div>
              <span className={classes.redText}>{`Anomalous Value: ${anomaly.value}${AnomalySuffix[row.values.name]}`}</span>
              <span>{`Threshold Value: ${
                row.values.name === AnomalyType.packetLoss
                  ? selectedTriggerAnomaly.packetlossThreshold
                  : row.values.name === AnomalyType.latency
                  ? selectedTriggerAnomaly.latencyThreshold
                  : selectedTriggerAnomaly.goodputThreshold
              }${AnomalySuffix[row.values.name]}`}</span>
            </div>
          ),
        };
      });

      return isEmpty(slaTestTableData) ? (
        <div className={classes.barChartPlaceholder}>
          <ErrorMessage fontSize={28} margin="auto">
            Something went wrong. Please refresh page
          </ErrorMessage>
        </div>
      ) : (
        <div>
          <div className={`${classes.sessionLogs} ${classes.anomalySubcomponentTitle}`}>Hits</div>
          <AnomalySLATestTable columns={HITS_TABLE_COLUMNS} data={hitsTableData} sortableHeaders={HITS_TABLE_SORTABLE_HEADERS} />
        </div>
      );
    },
    [tableAlertMetadata, organizations],
  );

  return (
    <div className={classes.anomalyTabPanelContainer}>
      {isBarChartLoading ? (
        <div className={classes.barChartPlaceholder}>
          <LoadingIndicator />
        </div>
      ) : isEmpty(barChartData) ? (
        <div className={classes.barChartPlaceholder}>
          <ErrorMessage fontSize={28} margin="auto">
            Something went wrong. Please refresh page
          </ErrorMessage>
        </div>
      ) : (
        <AnomalyBarChart
          inputData={barChartData}
          xAxisText={`${barChartData[0].date} to ${barChartData[barChartData.length - 1].date} (1 day interval)`}
          yAxisText="hits"
          handleSelectedBarChartPointsChange={handleSelectedBarChartPointsChange}
        />
      )}
      <div className={classes.anomalyTableContainer}>
        <div className={classes.anomalyExperienceTableTitle}>
          <span className={classes.anomalyTableTitle}>Triggers</span>
          <span className={classes.anomalyCount}>{alertMetadata.length}</span>
        </div>
        {alertLoading || isBarChartLoading ? (
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
