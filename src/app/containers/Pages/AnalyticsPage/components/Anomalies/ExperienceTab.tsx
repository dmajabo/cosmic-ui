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

interface ExperienceTabProps {}

export interface BarChartData {
  readonly date: string;
  readonly value: number;
}

const DUMMY_BAR_CHART_DATA: BarChartData[] = [
  {
    date: 'Nov 10',
    value: 40,
  },
  {
    date: 'Nov 11',
    value: 5,
  },
  {
    date: 'Nov 12',
    value: 38,
  },
  {
    date: 'Nov 13',
    value: 30,
  },
  {
    date: 'Nov 14',
    value: 21,
  },
  {
    date: 'Nov 15',
    value: 7,
  },
  {
    date: 'Nov 16',
    value: 15,
  },
];

const DUMMY_ANOMALY_TABLE_DATA: AnomalyExperienceTableData[] = [
  {
    name: 'WAN Link Status Change',
    severity: 'Low',
    hits: 10,
  },
  {
    name: 'WAN Link UL Traffic Anomaly',
    severity: 'Medium',
    hits: 49,
  },
];

const DUMMY_SLA_TEST_DATA: FinalTableData[] = [
  {
    hits: 20,
    id: 'tempvp1 id',
    name: 'VPC 1',
    sourceOrg: 'Okulis',
    sourceNetwork: 'N2358730528KG8',
    sourceDevice: 'ASFG328965293',
    description: 'vpc 1',
    destination: '8.8.8.8',
    averageQoe: {
      packetLoss: '5',
      latency: '16',
    },
  },
];

const DUMMY_SESSION_LOGS_DATA: AnomalySessionLogsData[] = [
  {
    hits: 20,
    time: 'Tue,Nov 14 2021,10:25pm',
    sessionId: 2937,
    edgeName: 'Cisco Meraki Office 5',
    edgeType: 'Device',
    source: '192.168.1.1',
    destination: '8.8.8.8',
    tgwName: 'US-West',
    tgwRegion: 'US-West',
    tgwBytesin: 10000,
    awsAccountId: 100131,
    awsAction: 'Anny',
    awsRegion: 'us-west-1',
    wpcId: 201042,
    instanceId: 3264,
    sdwanRuleId: 246,
    firewallPolicyId: 364,
    destApp: 'APP-POS 1',
  },
  {
    hits: 20,
    time: 'Tue,Nov 14 2021,10:25pm',
    sessionId: 2937,
    edgeName: 'Cisco Meraki Office 5',
    edgeType: 'Device',
    source: '192.168.1.1',
    destination: '8.8.8.8',
    tgwName: 'US-West',
    tgwRegion: 'US-West',
    tgwBytesin: 10000,
    awsAccountId: 100131,
    awsAction: 'Anny',
    awsRegion: 'us-west-1',
    wpcId: 201042,
    instanceId: 3264,
    sdwanRuleId: 246,
    firewallPolicyId: 364,
    destApp: 'APP-POS 1',
  },
];

const getSeverityColour = (severity: string | JSX.Element) => {
  if (severity === 'Normal') {
    return '#52984E';
  }
  if (severity === 'Low') {
    return '#F9BA55';
  }
  if (severity === 'Medium') {
    return '#F69442';
  }
  return '#DC4545';
};

const slaTestColumns: Column[] = [
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

const sessionLogsColumns: Column[] = [
  {
    Header: 'HITS',
    accessor: ColumnAccessor.hits,
  },
  {
    Header: 'TIME',
    accessor: ColumnAccessor.time,
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
  },
  {
    Header: 'FIREWALL POLICY ID',
    accessor: ColumnAccessor.firewallPolicyId,
  },
  {
    Header: 'DESTINATION APPLICATION',
    accessor: ColumnAccessor.destApp,
  },
];

const RED_COLOUR = '#DC4545';

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

  const experienceSubComponent = React.useCallback(({ row }) => {
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
        <AnomalySLATestTable columns={slaTestColumns} data={slaTestTableData} />
        <div className={`${classes.sessionLogs} ${classes.anomalySubcomponentTitle}`}>Session Logs</div>
        <AnomalyBlockTable columns={sessionLogsColumns} data={sessionLogsTableData} />
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
        <AnomalyTable data={tableData} subComponent={experienceSubComponent} />
      </div>
    </div>
  );
};
