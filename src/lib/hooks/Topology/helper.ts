import { INetworkOrg, INetworkRegion, ITopologyGroup, ITopologyMapData, SelectorEvalType } from 'lib/api/ApiModels/Topology/apiModels';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { ITopoNode, ITopoRegionNode, ITopologyPreparedMapDataV2, TopoNodeTypes, ITGWNode, INetworkVNetNode, IDeviceNode, INetworkVNetworkPeeringConnectionNode, ITopoLink } from './models';
import { createDeviceNode, createPeerConnectionNode, createTopoNode, createTopoRegionNode, createVPCNode, createWedgeNode } from './helpers/buildNodeHelpers';
import { DEFAULT_GROUP_ID, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { buildLinks } from './helpers/buildlinkHelper';
import { capitalizeFirstLetter } from 'lib/helpers/stringHelper';
import { updateTopLevelItems } from './helpers/coordinateHelper';

export const createTopology = (showPeerConnection: boolean, _data: ITopologyMapData, _groups: ITopologyGroup[]): ITopologyPreparedMapDataV2 => {
  const regions: ITopoRegionNode[] = [];
  const accounts: ITopoNode<any, ITGWNode>[] = [];
  // const dataCenters: ITopoNode<any>[] = [];
  const groups: ITopoNode<ITopologyGroup, IDeviceNode>[] = [];
  const devicesInGroup: IDeviceNode[] = [];
  const devicesInDefaultGroup: IDeviceNode[] = [];
  console.log(_data);
  // for (let i = 0; i < 1; i++) {
  //   const _objA: ITopoNode<any, ITGWNode> = createTopoNode(
  //     null,
  //     _data.organizations[0].id,
  //     TopoNodeTypes.ACCOUNT,
  //     `${TopoNodeTypes.ACCOUNT}${i}`,
  //     `${TopoNodeTypes.ACCOUNT}${i}`,
  //     false,
  //     0,
  //     0,
  //     NODES_CONSTANTS.ACCOUNT.collapse.width,
  //     NODES_CONSTANTS.ACCOUNT.collapse.height,
  //   );
  //   accounts.push(_objA);
  // }
  const sitesGroups = _groups.filter(group => group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS || group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS);
  for (let i = 0; i < sitesGroups.length; i++) {
    const _objS: ITopoNode<ITopologyGroup, IDeviceNode> = createTopoNode(
      sitesGroups[i],
      _data.organizations[0].id,
      TopoNodeTypes.SITES,
      sitesGroups[i].id,
      sitesGroups[i].name,
      false,
      0,
      0,
      NODES_CONSTANTS.SITES.collapse.width,
      NODES_CONSTANTS.SITES.collapse.height,
    );
    groups.push(_objS);
  }
  _data.organizations.forEach((org, orgI) => {
    if (!org.regions || !org.regions.length) return;
    org.regions.forEach((region, i) => {
      const _name = buildRegionName(org, region);
      const _objR: ITopoRegionNode = createTopoRegionNode(
        region,
        org.id,
        TopoNodeTypes.REGION,
        region.id,
        _name,
        false,
        0,
        0,
        NODES_CONSTANTS.REGION.collapse.width,
        NODES_CONSTANTS.REGION.collapse.height,
      );
      if (region.wedges && region.wedges.length) {
        region.wedges.forEach((w, index) => {
          let _aIndex: number = accounts.findIndex(it => it.id === `${w.regionCode}${w.ownerId}`);
          if (_aIndex !== -1) {
            const _wNode: ITGWNode = createWedgeNode(org, orgI, w, accounts[_aIndex]);
            accounts[_aIndex].children.push(_wNode);
            return;
          }
          const _a: ITopoNode<any, ITGWNode> = createTopoNode(
            null,
            org.id,
            TopoNodeTypes.ACCOUNT,
            `${region.name}${org.extId}`,
            _name,
            false,
            0,
            0,
            NODES_CONSTANTS.ACCOUNT.collapse.width,
            NODES_CONSTANTS.ACCOUNT.collapse.height,
          );
          const _wNode: ITGWNode = createWedgeNode(org, orgI, w, _a);
          _a.children.push(_wNode);
          accounts.push(_a);
        });
      }
      if (region.vnets && region.vnets.length && org.vendorType !== 'MERAKI') {
        region.vnets.forEach((v, index) => {
          const obj: INetworkVNetNode = createVPCNode(org, orgI, v, index);
          _objR.children.push(obj);

          // const objT: INetworkVNetNode = createVPCNode(org, orgI, v, index + 100);
          // _objR.children.push(objT);
        });
      }
      if (region.vNetworkPeeringConnections && region.vNetworkPeeringConnections.length && org.vendorType !== 'MERAKI') {
        region.vNetworkPeeringConnections.forEach((v, index) => {
          const obj: INetworkVNetworkPeeringConnectionNode = createPeerConnectionNode(org, orgI, v, index);
          _objR.peerConnections.push(obj);

          // for (let j = 0; j < 40; j++) {
          //   const objT: INetworkVNetworkPeeringConnectionNode = createPeerConnectionNode(org, orgI, v, index + 100 + j);
          //   _objR.peerConnections.push(objT);
          // }
        });
      }
      if (region.devices && region.devices.length) {
        region.devices.forEach((d, index) => {
          const obj: IDeviceNode = createDeviceNode(org, orgI, d, index);
          if (d.selectorGroup) {
            if (d.selectorGroup === DEFAULT_GROUP_ID) {
              devicesInDefaultGroup.push(obj);
              return;
            }
            devicesInGroup.push(obj);
            return;
          }
          devicesInDefaultGroup.push(obj);
        });
      }
      regions.push(_objR);
    });
  });

  if (devicesInDefaultGroup && devicesInDefaultGroup.length) {
    const _objS: ITopoNode<ITopologyGroup, IDeviceNode> = createTopoNode(
      {
        id: DEFAULT_GROUP_ID,
        name: 'Default',
        type: TopologyGroupTypesAsString.BRANCH_NETWORKS,
        expr: null,
        evalType: SelectorEvalType.EXPR,
        extIds: [],
      },
      null,
      TopoNodeTypes.SITES,
      DEFAULT_GROUP_ID,
      'Default',
      false,
      0,
      0,
      NODES_CONSTANTS.SITES.collapse.width,
      NODES_CONSTANTS.SITES.collapse.height,
    );
    _objS.children = devicesInDefaultGroup;
    groups.unshift(_objS);
  }

  if (sitesGroups && sitesGroups.length && devicesInGroup && devicesInGroup.length) {
    sitesGroups.forEach((gr, index) => {
      const _siteIndex = groups.findIndex(it => it.id === gr.id || it.name === gr.name);
      if (_siteIndex !== -1) {
        const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
        groups[_siteIndex].children = _devs;
      }
    });
  }
  if (devicesInGroup && devicesInGroup.length) {
    const _siteIndex = groups.findIndex(it => it.id === DEFAULT_GROUP_ID);
    if (_siteIndex !== -1) {
      groups[_siteIndex].children.concat(devicesInGroup);
    }
  }
  updateTopLevelItems(showPeerConnection, regions, accounts, groups);
  const links: ITopoLink<any, any, any, any, any>[] = buildLinks(regions, accounts, groups, showPeerConnection);
  const _nodes: ITopoNode<any, any>[] = [...regions, ...accounts, ...groups];
  return { nodes: _nodes, links: links };
};

const buildRegionName = (org: INetworkOrg, region: INetworkRegion): string => {
  const { extId, ctrlrName } = org;
  const { extId: regExtId, name } = region;
  let str = '';
  if (ctrlrName) {
    str = capitalizeFirstLetter(ctrlrName) + ' ';
  }
  if (extId) {
    str += `(${extId})`;
  }
  if (name) {
    if (str.length) {
      str += ` - ${name.toUpperCase()}`;
    } else {
      str += name.toUpperCase();
    }
  }
  if (str.length) return str;
  if (regExtId) return regExtId;
  return 'Unknown region';
};
