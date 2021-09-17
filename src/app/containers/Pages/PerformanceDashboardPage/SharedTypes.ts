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

interface Oedge {}

interface Ip {}

interface NetworkLink {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly peerType: string;
  readonly peerExtId: string;
}

interface PrivateSubnet {}

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
  readonly privateSubnets: PrivateSubnet[];
}

interface Phy {}

interface Wedge {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly vnetkey: string;
  readonly phys: Phy[];
  readonly vpns: Vpn[];
  readonly networkLinks: NetworkLink[];
  readonly ips: Ip[];
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

interface Endpoint {}

interface Vnet {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly extId: string;
  readonly endpoints: Endpoint[];
  readonly vms: Vm[];
  readonly cidr: null;
}

export interface Organization {
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
  readonly extId?: string;
  readonly extType?: string;
  readonly extUrl?: string;
  readonly vnets?: Vnet[];
  readonly wedges?: Wedge[];
  readonly oedges?: Oedge[];
  readonly devices?: Device[];
  readonly vendorType?: string;
}

export interface GetOrganizationResponse {
  readonly count?: string;
  readonly organizations?: Organization[];
}
