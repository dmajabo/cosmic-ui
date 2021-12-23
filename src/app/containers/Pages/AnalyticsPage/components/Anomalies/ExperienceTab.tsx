import React from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { AnomalyBarChart } from './AnomalyBarChart';
import { AnomalyExperienceTableData, AnomalySessionLogsData, AnomalySlaTestData, Column, ColumnAccessor, FinalTableData } from 'lib/api/http/SharedTypes';
import { AnomalyTable } from './AnomalyTable';
import { SeverityIcon } from './SeverityIcon';
import { AnomalySLATestTable } from './AnomalySLATestTable';
import { LATENCY_HEATMAP_LEGEND } from '../Performance Dashboard/Latency';
import { PACKET_LOSS_HEATMAP_LEGEND } from '../Performance Dashboard/PacketLoss';
import { LegendData } from '../Performance Dashboard/Heatmap';
import { AnomalyBlockTable } from './AnomalyBlockTable';
import { Row } from 'react-table';
import { DUMMY_ANOMALY_TABLE_DATA, DUMMY_BAR_CHART_DATA, DUMMY_SESSION_LOGS_DATA, DUMMY_SLA_TEST_DATA } from './DummyData';
import { getSeverityColour } from 'lib/api/http/utils';

interface ExperienceTabProps {}

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

export const ExperienceTab: React.FC<ExperienceTabProps> = () => {
  const classes = AnalyticsStyles();

  const tableData: AnomalyExperienceTableData[] = DUMMY_ANOMALY_TABLE_DATA.map(item => ({
    name: item.name,
    severity: (
      <div>
        <SeverityIcon colour={getSeverityColour(item.severity)} />
        <span className={classes.severityText}>{item.severity}</span>
      </div>
    ),
    hits: <div className={classes.hitsCount}>{item.hits}</div>,
  }));

  const experienceSubComponent = React.useCallback((row: Row<object>) => {
    const slaTestTableData: AnomalySlaTestData[] = DUMMY_SLA_TEST_DATA.map(item => {
      const { hits, averageQoe, ...otherItems } = item;
      return {
        hits: <div className={classes.hitsCount}>{hits}</div>,
        averageQoe: (
          <div className={classes.averageQoeText}>
            <span>Packet Loss:</span>
            <span style={{ color: getColor(PACKET_LOSS_HEATMAP_LEGEND, Number(averageQoe.packetLoss)) }} className={classes.qoeValueText}>{`${
              isNaN(Number(item.averageQoe.packetLoss)) ? '-' : Number(averageQoe.packetLoss)
            }%`}</span>
            <span>Latency:</span>
            <span style={{ color: getColor(LATENCY_HEATMAP_LEGEND, Number(averageQoe.latency)) }} className={classes.qoeValueText}>{`${
              isNaN(Number(averageQoe.latency)) ? '-' : Number(averageQoe.latency).toFixed(2)
            }ms`}</span>
          </div>
        ),
        ...otherItems,
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
  }, []);

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
          <span className={classes.anomalyCount}>7</span>
        </div>
        <AnomalyTable inputColumns={anomalyTableColumns} data={tableData} subComponent={experienceSubComponent} />
      </div>
    </div>
  );
};
