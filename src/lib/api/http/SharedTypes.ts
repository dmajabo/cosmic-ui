import { SeverityLevel } from './utils';

interface Device {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly type: string;
  readonly serial: string;
  readonly model: string;
  readonly networkId: string;
  readonly privateIp: string;
  readonly publicIp: string;
  readonly vpnLinks: Vpn;
}

interface NetworkLink {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly peerType: string;
  readonly peerExtId: string;
}

interface LinkState {
  readonly name: string;
  readonly sourceIp: string;
  readonly peerIp: string;
  readonly peerId: string;
  readonly status: string;
  readonly statusMessage: string;
  readonly connectedTo: null | LinkState;
}

interface Vpn {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly connectionId: string;
  readonly linkStates: LinkState[];
  readonly privateSubnets: [];
}

interface Wedge {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly vnetkey: string;
  readonly phys: [];
  readonly vpns: Vpn[];
  readonly networkLinks: NetworkLink[];
  readonly ips: [];
}

interface Nic {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly exttype: string;
  readonly virtual: boolean;
  readonly vmkey: string;
  readonly privateIp: string;
  readonly publicIp: string;
}

interface Vm {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly vmkey: string;
  readonly nic: Nic[];
}

interface Vnet {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly endpoints: [];
  readonly vms: Vm[];
  readonly cidr: null;
}

export interface Organization {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly extType: string;
  readonly extUrl: string;
  readonly vnets: Vnet[];
  readonly wedges: Wedge[];
  readonly oedges?: [];
  readonly devices: Device[];
  readonly vendorType: string;
}

export interface GetOrganizationResponse {
  readonly count?: string;
  readonly organizations?: Organization[];
}

interface Data {
  readonly time: string;
  readonly value: string;
}

interface AvgSlaTestMetrics {
  readonly avgLatency: Data;
  readonly avgPacketLoss: Data;
}

export interface SLATest {
  readonly testId: string;
  readonly name: string;
  readonly sourceOrgId: string;
  readonly sourceNwExtId: string;
  readonly destination: string;
  readonly interface: string;
  readonly description: string;
  readonly metrics?: AvgSlaTestMetrics;
}

export interface GetSLATestResponse {
  readonly slaTests?: SLATest[];
}

export interface CreateSLATestRequest {
  readonly sla_test: SLATest;
}

export interface CreateSLATestResponse {
  readonly id?: string;
}

export interface UpdateSLATestRequest {
  readonly sla_test: SLATest;
}

export interface UpdateSLATestResponse {
  readonly id?: string;
}

export interface KeyedMap {
  readonly key: string;
  readonly ts: Data[];
}

interface SLATestMetrics {
  readonly resourceId?: string;
  readonly keyedmap: KeyedMap[];
}

export interface SLATestMetricsResponse {
  readonly metrics: SLATestMetrics;
  readonly testId: string;
}

export interface DeleteSLATestResponse {}

export interface AverageQoe {
  readonly packetLoss: string;
  readonly latency: string;
}

export interface FinalTableData {
  readonly hits?: number;
  readonly id: string;
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly description: string;
  readonly averageQoe: AverageQoe;
}

export enum ColumnAccessor {
  name = 'name',
  sourceOrg = 'sourceOrg',
  sourceNetwork = 'sourceNetwork',
  sourceDevice = 'sourceDevice',
  destination = 'destination',
  averageQoe = 'averageQoe',
  description = 'description',
  legendLine = 'legendLine',
  average = 'average',
  ninetyFifthPercentile = 'ninetyFifthPercentile',
  max = 'max',
  lastDatapoint = 'lastDatapoint',
  severity = 'severity',
  hits = 'hits',
  details = 'details',
  time = 'time',
  sessionId = 'sessionId',
  edgeName = 'edgeName',
  edgeType = 'edgeType',
  source = 'source',
  tgwName = 'tgwName',
  tgwRegion = 'tgwRegion',
  tgwBytesin = 'tgwBytesin',
  awsAccountId = 'awsAccountId',
  awsAction = 'awsAction',
  awsRegion = 'awsRegion',
  wpcId = 'wpcId',
  instanceId = 'instanceId',
  sdwanRuleId = 'sdwanRuleId',
  firewallPolicyId = 'firewallPolicyId',
  destApp = 'destApp',
  edge = 'edge',
  user = 'user',
  operation = 'operation',
  changes = 'changes',
  cost = 'cost',
  date = 'date',
  vpcAttachments = 'vpcAttachments',
  vpnAttachments = 'vpnAttachments',
  peeringAttachments = 'peeringAttachments',
  dataProcessed = 'dataProcessed',
  totalCost = 'totalCost',
  //TODO: change below enum params when api is integrated
  interfaceSource = 'interfaceSource',
  interfaceDestination = 'interfaceDestination',
  connectivityTypeSource = 'connectivityTypeSource',
  connectivityTypeDestination = 'connectivityTypeDestination',
  networkBoundarySource = 'networkBoundarySource',
  networkBoundaryDestination = 'networkBoundaryDestination',
  providerSource = 'providerSource',
  providerDestination = 'providerDestination',
  trafficOriginationSource = 'trafficOriginationSource',
  trafficOriginationDestination = 'trafficOriginationDestination',
  interfaceCapacitySource = 'interfaceCapacitySource',
  interfaceCapacityDestination = 'interfaceCapacityDestination',
  vlanSource = 'vlanSource',
  vlanDestination = 'vlanDestination',
  macAddressSource = 'macAddressSource',
  macAddressDestination = 'macAddressDestination',
}

export interface Column {
  readonly Header: JSX.Element | string;
  readonly accessor: ColumnAccessor;
  readonly order?: number;
  readonly id?: string;
  readonly width?: number;
  readonly Cell?: ({ row }: { row: any }) => JSX.Element;
}

// interface HeatMapMetric {
//   readonly deviceName: string;
//   readonly value: string;
// }

export interface HeatMapData {
  readonly testId: string;
  readonly metrics: ResourceMetric[];
}

export interface ResourceMetric {
  readonly resourceId: string;
  readonly keyedmap: KeyedMap[];
}

interface AvgMetricData {
  readonly resourceMetric: ResourceMetric[];
  readonly avgVal?: string;
}

export interface HeatMapResponse {
  readonly avgMetric: AvgMetricData;
  readonly testId: string;
}

interface AwsRegion {
  readonly name: string;
  readonly code: string;
}

interface AwsFlowLog {
  readonly enable: boolean;
}

interface MerakiFlowLog {
  readonly enable_syslog: boolean;
}

interface AwsPolicy {
  readonly username: string;
  readonly accessKey: string;
  readonly secret: string;
  readonly regions: string[];
  readonly flowlog_pol: AwsFlowLog;
}

interface MerakiPolicy {
  readonly apiKey: string;
  readonly flowlog_pol: MerakiFlowLog;
}

export interface PolicyController {
  readonly id?: string;
  readonly name: string;
  readonly description?: string;
  readonly vendor: string;
  readonly awsPol?: AwsPolicy;
  readonly merakiPol?: MerakiPolicy;
}

export interface PostPolicyControllerRequest {
  readonly controller: PolicyController;
}

export interface GetControllerListResponse {
  readonly controllers: PolicyController[];
}

export interface PostPolicyControllerResponse {}

export interface DeletePolicyControllerResponse {
  readonly id?: string;
}

export interface GetAwsRegionsResponse {
  readonly awsRegions: AwsRegion[];
}

export interface MetricsExplorerTableData {
  readonly legendLine?: JSX.Element;
  readonly average: number;
  readonly ninetyFifthPercentile: number;
  readonly max: number;
  readonly lastDatapoint: number;
  //TODO: change below interface params when api is integrated
  readonly interfaceSource?: string | JSX.Element;
  readonly interfaceDestination?: string | JSX.Element;
  readonly connectivityTypeSource?: string | JSX.Element;
  readonly connectivityTypeDestination?: string | JSX.Element;
  readonly networkBoundarySource?: string | JSX.Element;
  readonly networkBoundaryDestination?: string | JSX.Element;
  readonly providerSource?: string | JSX.Element;
  readonly providerDestination?: string | JSX.Element;
  readonly trafficOriginationSource?: string | JSX.Element;
  readonly trafficOriginationDestination?: string | JSX.Element;
  readonly interfaceCapacitySource?: string | JSX.Element;
  readonly interfaceCapacityDestination?: string | JSX.Element;
  readonly vlanSource?: string | JSX.Element;
  readonly vlanDestination?: string | JSX.Element;
  readonly macAddressSource?: string | JSX.Element;
  readonly macAddressDestination?: string | JSX.Element;
}

export interface AnomalyExperienceTableData {
  readonly name: string;
  readonly severity: SeverityLevel | JSX.Element;
  readonly hits: number | JSX.Element;
}

export interface AnomalySlaTestData {
  readonly hits: number | JSX.Element;
  readonly id: string;
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly description: string;
  readonly averageQoe: JSX.Element;
}

export interface AnomalySessionLogsData {
  readonly hits: number | JSX.Element;
  readonly time: string | number;
  readonly sessionId: number | string;
  readonly edgeName: string;
  readonly edgeType: string;
  readonly source: string;
  readonly destination: string;
  readonly tgwName: string;
  readonly tgwRegion: string;
  readonly tgwBytesin: string | number;
  readonly awsAccountId: number | string;
  readonly awsAction: string;
  readonly awsRegion: string;
  readonly wpcId: string | number;
  readonly instanceId: string | number;
  readonly sdwanRuleId: string | number;
  readonly firewallPolicyId: string | number;
  readonly destApp: string;
}

export interface AnomalyPolicyLogsTableData {
  readonly hits: number | JSX.Element;
  readonly time: string | number;
  readonly edge: string | JSX.Element;
  readonly user: string | JSX.Element;
  readonly operation: string;
  readonly changes: string | JSX.Element;
}

export interface AnomalyCostTableData {
  readonly name: string;
  readonly severity: SeverityLevel | JSX.Element;
  readonly hits: number | JSX.Element;
  readonly cost: string;
}

export interface CostDetailTableData {
  readonly date: string;
  readonly vpcAttachments: string;
  readonly vpnAttachments: string;
  readonly peeringAttachments: string;
  readonly dataProcessed: string;
  readonly totalCost: string;
}

export interface CostDetailHeader {
  readonly label: string;
  readonly value: string;
}
