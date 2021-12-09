import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { Mark } from '@material-ui/core/Slider';
import { ISelectedListItem } from 'lib/models/general';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';
import { ConnectionPKeysMap, DeploymentTypes, IEdgeP, NwServicesVendor } from 'lib/api/ApiModels/Edges/apiModel';
import { TopologyGroupTypesAsString } from 'lib/models/topology';

export enum EdgesStepperTypes {
  GENERAL = 'general',
  SITES = 'sites',
  APPS = 'apps',
  EDGES = 'edges',
  POLICY = 'policy',
}

export const EdgesStepperItems: IStepperItem<EdgesStepperTypes>[] = [
  { id: EdgesStepperTypes.GENERAL, index: 0, icon: null, label: 'General', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: EdgesStepperTypes.SITES, index: 1, icon: null, label: 'Sites', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: EdgesStepperTypes.APPS, index: 2, icon: null, label: 'Apps', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: EdgesStepperTypes.EDGES, index: 3, icon: null, label: 'Edges', disabled: false, state: StepperItemStateType.EMPTY, showEdge: true },
  { id: EdgesStepperTypes.POLICY, index: 4, icon: null, label: 'Policy', disabled: false, state: StepperItemStateType.EMPTY, showEdge: false },
];

export const createNewEdge = (): IEdgeP => ({
  id: '',
  name: '',
  description: '',
  connectionPolicy: {
    enableNetworkLink: false,
    enableVpnLink: false,
  },
  tags: [],
  siteGroupIds: [],
  appGroupIds: [],
  deploymentPolicy: [
    {
      controllerName: '',
      regionCode: [],
      deploymentType: DeploymentTypes.EXISTING_GWS,
      wanGwExtIds: [],
      nwServicesPolicy: [
        {
          serviceType: null, // NwServiceT.FIREWALL,
          serviceVendor: NwServicesVendor.PALO_ALTO_NW,
        },
      ],
    },
  ],
  segmentPolicy: [],
});

export const EdgePriceValues: Mark[] = [
  { value: 100, label: '100$' },
  { value: 200, label: '200$' },
  { value: 300, label: '300$' },
  { value: 400, label: '400$' },
  { value: 500, label: '500$' },
];

export const ConnectionValues: string[] = [ConnectionPKeysMap.enableNetworkLink, ConnectionPKeysMap.enableVpnLink];

export const FirewallRegionsValues: ISelectedListItem<string>[] = [{ id: 'polo', value: 'polo', label: 'Palo Alto', icon: poloAltoIcon }];

export interface IDeleteDataModel {
  id: string;
  type: TopologyGroupTypesAsString;
  name: string;
  message: string;
}
