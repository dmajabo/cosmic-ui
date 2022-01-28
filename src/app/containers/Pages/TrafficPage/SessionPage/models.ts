import { ISelectedListItem } from 'lib/models/general';
import { IElasticField } from 'lib/api/ApiModels/paramBuilders';

export enum IQuryFieldtype {
  STRING = 'string',
  NUMBER = 'number',
}
export interface ISessionsGridField {
  id?: string;
  resField: string;
  searchField: string;
  queryType?: IQuryFieldtype;
  label: string;
  isStaticField?: boolean;
  isCustomField?: boolean;
}

export interface ISessionsGridFieldColumn extends ISessionsGridField {
  hide: boolean;
}

export interface ISessionGridColumns {
  [key: string]: ISessionsGridField;
}

export const SessionGridColumns: ISessionGridColumns = {
  collapseColumn: {
    id: 'aggregatedId',
    resField: 'id',
    searchField: '',
    queryType: null,
    label: '',
    isStaticField: true,
    isCustomField: true,
  },
  vendorsColumn: {
    id: 'aggregatedVendors',
    resField: 'vendors',
    searchField: '',
    queryType: null,
    label: 'Vendor',
    isStaticField: true,
    isCustomField: true,
  },
  timestamp: {
    id: 'aggregatedTimestamp',
    resField: 'timestamp',
    searchField: '@timestamp',
    queryType: IQuryFieldtype.STRING,
    label: 'Time',
    isStaticField: true,
    isCustomField: false,
  },
  sessionId: {
    id: 'aggregatedSessionId',
    resField: 'sessionId',
    searchField: 'sessionid',
    queryType: IQuryFieldtype.STRING,
    label: 'Session ID',
    isStaticField: true,
    isCustomField: false,
  },
  flowId: {
    id: 'aggregatedFlowId',
    resField: 'flowId',
    searchField: 'flowid',
    queryType: IQuryFieldtype.STRING,
    label: 'Flow ID',
    isStaticField: true,
    isCustomField: false,
  },
  sourceIp: {
    id: 'aggregatedSourceIp',
    resField: 'sourceIp',
    searchField: 'source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Source IP',
    isStaticField: true,
    isCustomField: false,
  },
  sourcePort: {
    id: 'aggregatedSourcePort',
    resField: 'sourcePort',
    searchField: 'source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Source Port',
    isStaticField: true,
    isCustomField: false,
  },
  destIp: {
    id: 'aggregatedDestIp',
    resField: 'destIp',
    searchField: 'dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Destination IP',
    isStaticField: true,
    isCustomField: false,
  },
  destPort: {
    id: 'aggregatedDestPort',
    resField: 'destPort',
    searchField: 'dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Destination Port',
    isStaticField: true,
    isCustomField: false,
  },
  natSourceIp: {
    id: 'aggregatedNatSourceIp',
    resField: 'natSourceIp',
    searchField: 'nat_source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Source IP',
    isStaticField: true,
    isCustomField: false,
  },
  natSourcePort: {
    id: 'aggregatedNatSourcePort',
    resField: 'natSourcePort',
    searchField: 'nat_source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Source Port',
    isStaticField: true,
    isCustomField: false,
  },
  natDestIp: {
    id: 'aggregatedNatDestIp',
    resField: 'natDestIp',
    searchField: 'nat_dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Destination IP',
    isStaticField: true,
    isCustomField: false,
  },
  natDestPort: {
    id: 'aggregatedNatDestPort',
    resField: 'natDestPort',
    searchField: 'nat_dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Destination Port',
    isStaticField: true,
    isCustomField: false,
  },
  deviceName: {
    id: 'aggregatedDeviceName',
    resField: 'deviceName',
    searchField: 'device_name',
    queryType: IQuryFieldtype.STRING,
    label: 'Device Name',
    isStaticField: true,
    isCustomField: false,
  },
  deviceExtId: {
    id: 'aggregatedDeviceExtId',
    resField: 'deviceExtId',
    searchField: 'device_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'Device ID',
    isStaticField: true,
    isCustomField: false,
  },
  deviceVendor: {
    id: 'aggregatedDeviceVendor',
    resField: 'deviceVendor',
    searchField: 'device_vendor',
    queryType: IQuryFieldtype.STRING,
    label: 'Vendor',
    isStaticField: true,
    isCustomField: false,
  },
  bytes: {
    id: 'aggregatedDeviceBytes',
    resField: 'bytes',
    searchField: 'bytes',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Bytes',
    isStaticField: true,
    isCustomField: false,
  },
  packets: {
    id: 'aggregatedDevicePackets',
    resField: 'packets',
    searchField: 'packets',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Packets',
    isStaticField: true,
    isCustomField: false,
  },
  action: {
    id: 'aggregatedDeviceAction',
    resField: 'action',
    searchField: 'action',
    queryType: IQuryFieldtype.STRING,
    label: 'Action',
    isStaticField: true,
    isCustomField: false,
  },
  tcpFlags: {
    id: 'aggregatedDeviceTcpFlags',
    resField: 'tcpFlags',
    searchField: 'tcp_flags',
    queryType: IQuryFieldtype.STRING,
    label: 'TCP Flags',
    isStaticField: true,
    isCustomField: false,
  },
  trafficType: {
    id: 'aggregatedDeviceTrafficType',
    resField: 'trafficType',
    searchField: 'traffic_type',
    queryType: IQuryFieldtype.STRING,
    label: 'Traffic Type',
    isStaticField: true,
    isCustomField: false,
  },
  vnetworkExtId: {
    id: 'aggregatedDeviceVnetworkExtId',
    resField: 'vnetworkExtId',
    searchField: 'vnetwork_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'VPC Id',
    isStaticField: true,
    isCustomField: false,
  },
  vnetworkName: {
    id: 'aggregatedDeviceVnetworkName',
    resField: 'vnetworkName',
    searchField: 'vnetwork_name',
    queryType: IQuryFieldtype.STRING,
    label: 'VPC Name',
    isStaticField: true,
    isCustomField: false,
  },
  subnetExtId: {
    id: 'aggregatedDeviceSubnetExtId',
    resField: 'subnetExtId',
    searchField: 'subnet_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'Subnet Id',
    isStaticField: true,
    isCustomField: false,
  },
  subnetName: {
    id: 'aggregatedDeviceSubnetName',
    resField: 'subnetName',
    searchField: 'subnet_name',
    queryType: IQuryFieldtype.STRING,
    label: 'Subnet Name',
    isStaticField: true,
    isCustomField: false,
  },
  vmExtId: {
    id: 'aggregatedDeviceVmExtId',
    resField: 'VmExtId',
    searchField: 'vm_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'VM Id',
    isStaticField: true,
    isCustomField: false,
  },
  vmName: {
    id: 'aggregatedDeviceVmName',
    resField: 'vmName',
    searchField: 'vm_name',
    queryType: IQuryFieldtype.STRING,
    label: 'VM Name',
    isStaticField: true,
    isCustomField: false,
  },
  region: {
    id: 'aggregatedDeviceRegion',
    resField: 'region',
    searchField: 'region',
    queryType: IQuryFieldtype.STRING,
    label: 'Region',
    isStaticField: true,
    isCustomField: false,
  },
  azId: {
    id: 'aggregatedDeviceAzId',
    resField: 'azId',
    searchField: 'az_id',
    queryType: IQuryFieldtype.STRING,
    label: 'AZ Id',
    isStaticField: true,
    isCustomField: false,
  },
};

export const SessionElasticFieldItems: IElasticField[] = [
  {
    resField: 'timestamp',
    searchField: '@timestamp',
    queryType: IQuryFieldtype.STRING,
    label: 'Time',
    isField: true,
  },
  {
    resField: 'sessionId',
    searchField: 'sessionid',
    queryType: IQuryFieldtype.STRING,
    label: 'Session ID',
    isField: true,
  },
  {
    resField: 'flowId',
    searchField: 'flowid',
    queryType: IQuryFieldtype.STRING,
    label: 'Flow ID',
    isField: true,
  },
  {
    resField: 'sourceIp',
    searchField: 'source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Source IP',
    isField: true,
  },
  {
    resField: 'sourcePort',
    searchField: 'source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Source Port',
    isField: true,
  },
  {
    resField: 'destIp',
    searchField: 'dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Destination IP',
    isField: true,
  },
  {
    resField: 'destPort',
    searchField: 'dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Destination Port',
    isField: true,
  },
  {
    resField: 'natSourceIp',
    searchField: 'nat_source_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Source IP',
    isField: true,
  },
  {
    resField: 'natSourcePort',
    searchField: 'nat_source_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Source Port',
    isField: true,
  },
  {
    resField: 'natDestIp',
    searchField: 'nat_dest_ip',
    queryType: IQuryFieldtype.STRING,
    label: 'Nat Destination IP',
    isField: true,
  },
  {
    resField: 'natDestPort',
    searchField: 'nat_dest_port',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Nat Destination Port',
    isField: true,
  },
  {
    resField: 'deviceName',
    searchField: 'device_name',
    queryType: IQuryFieldtype.STRING,
    label: 'Device Name',
    isField: true,
  },
  {
    resField: 'deviceExtId',
    searchField: 'device_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'Device ID',
    isField: true,
  },
  {
    resField: 'device',
    searchField: 'device',
    queryType: IQuryFieldtype.STRING,
    label: 'Device',
    isField: true,
  },
  {
    resField: 'deviceVendor',
    searchField: 'device_vendor',
    queryType: IQuryFieldtype.STRING,
    label: 'Vendor',
    isField: true,
  },
  {
    resField: 'bytes',
    searchField: 'bytes',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Bytes',
    isField: true,
  },
  {
    resField: 'packets',
    searchField: 'packets',
    queryType: IQuryFieldtype.NUMBER,
    label: 'Packets',
    isField: true,
  },
  {
    resField: 'action',
    searchField: 'action',
    queryType: IQuryFieldtype.STRING,
    label: 'Action',
    isField: true,
    valueTransform: v => v.toUpperCase(),
  },
  {
    resField: 'tcpFlags',
    searchField: 'tcp_flags',
    queryType: IQuryFieldtype.STRING,
    label: 'TCP Flags',
    isField: true,
  },
  {
    resField: 'trafficType',
    searchField: 'traffic_type',
    queryType: IQuryFieldtype.STRING,
    label: 'Traffic Type',
    isField: true,
  },
  {
    resField: 'vnetworkExtId',
    searchField: 'vnetwork_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'VPC Id',
    isField: true,
  },
  {
    resField: 'vnetworkName',
    searchField: 'vnetwork_name',
    queryType: IQuryFieldtype.STRING,
    label: 'VPC Name',
    isField: true,
  },
  {
    resField: 'subnetExtId',
    searchField: 'subnet_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'Subnet Id',
    isField: true,
  },

  {
    resField: 'VmExtId',
    searchField: 'vm_extid',
    queryType: IQuryFieldtype.STRING,
    label: 'VM Id',
    isField: true,
  },
  {
    resField: 'vmName',
    searchField: 'vm_name',
    queryType: IQuryFieldtype.STRING,
    label: 'VM Name',
    isField: true,
  },
  {
    resField: 'region',
    searchField: 'region',
    queryType: IQuryFieldtype.STRING,
    label: 'Region',
    isField: true,
  },
  {
    resField: 'azId',
    searchField: 'az_id',
    queryType: IQuryFieldtype.STRING,
    label: 'AZ Id',
    isField: true,
  },
];

export enum FilterOpperatorTypes {
  AND = 'AND',
  OR = 'OR',
}

export const FilterOpperatorsList: ISelectedListItem<FilterOpperatorTypes>[] = [
  {
    id: FilterOpperatorTypes.AND,
    label: 'And',
    value: FilterOpperatorTypes.AND,
  },
  {
    id: FilterOpperatorTypes.OR,
    label: 'Or',
    value: FilterOpperatorTypes.OR,
  },
];
