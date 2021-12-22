import { AnomalyCostTableData, AnomalyExperienceTableData, AnomalyPolicyLogsTableData, AnomalySessionLogsData, FinalTableData } from 'lib/api/http/SharedTypes';
import { BarChartData } from './components/Anomalies/ExperienceTab';

export enum SeverityLevel {
  normal = 'Normal',
  low = 'Low',
  medium = 'Medium',
  high = 'High',
}

//TODO: Delete File when api is integrated
export const DUMMY_BAR_CHART_DATA: BarChartData[] = [
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

export const DUMMY_ANOMALY_TABLE_DATA: AnomalyExperienceTableData[] = [
  {
    name: 'WAN Link Status Change',
    severity: SeverityLevel.low,
    hits: 10,
  },
  {
    name: 'WAN Link UL Traffic Anomaly',
    severity: SeverityLevel.medium,
    hits: 49,
  },
];

export const DUMMY_SLA_TEST_DATA: FinalTableData[] = [
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

export const DUMMY_SESSION_LOGS_DATA: AnomalySessionLogsData[] = [
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

export const DUMMY_LOGS_TABLE_DATA: AnomalyPolicyLogsTableData[] = [
  {
    hits: 17,
    time: 'Tue,Nov 14 2021,10:25pm',
    edge: 'Office 4',
    user: 'Jesse Roy',
    operation: 'Policy Change',
    changes: 'Uplink Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2)',
  },
];

export const DUMMY_ANOMALY_COST_TABLE_DATA: AnomalyCostTableData[] = [
  {
    name: 'WAN Link Status Change',
    severity: SeverityLevel.low,
    hits: 10,
    cost: '$42/week',
  },
  {
    name: 'WAN Link UL Traffic Anomaly',
    severity: SeverityLevel.medium,
    hits: 49,
    cost: '$6/day',
  },
];

export const DUMMY_POLICY_LOGS_TABLE_DATA: AnomalyPolicyLogsTableData[] = [
  {
    hits: 17,
    time: 'Tue,Nov 14 2021,10:25pm',
    edge: 'Office 4',
    user: 'Jesse Roy',
    operation: 'Policy Change',
    changes: 'Uplink Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2)',
  },
];
