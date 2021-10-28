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
  readonly id: string;
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly description: string;
  readonly averageQoe: AverageQoe;
}

export interface Column {
  readonly Header: string;
  readonly accessor: 'name' | 'sourceOrg' | 'sourceNetwork' | 'sourceDevice' | 'destination' | 'averageQoe';
}

interface HeatMapMetric {
  readonly deviceName: string;
  readonly value: string;
}

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
