import { INetworkOrg, INetworkRegion, ITopologyGroup, SelectorEvalType } from 'lib/api/ApiModels/Topology/apiModels';

import {
  ITopoRegionNode,
  ITopologyPreparedMapDataV2,
  ITGWNode,
  ITopoLink,
  FilterEntityOptions,
  VPCS_IN_ROW,
  PEER_CONNECTION_IN_ROW,
  WEB_ACL_IN_ROW,
  ITopoSitesNode,
  DEV_IN_ROW,
  IFilteredNetworkDevice,
  ITopoAccountNode,
} from './models';
import { createDeviceNode, createPeerConnectionNode, createSitesNode, createAccountNode, createTopoRegionNode, createVPCNode, createWebAclNode, createWedgeNode } from './helpers/buildNodeHelpers';
import { DEFAULT_GROUP_ID, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { buildLinks } from './helpers/buildlinkHelper';
import { capitalizeFirstLetter } from 'lib/helpers/stringHelper';
import { updateTopLevelItems } from './helpers/coordinateHelper';
import { getDevicesBeautifulRowsCount, getRegionChildrenCounts } from './helpers/rowsHelper';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';

export const createTopology = (filter: FilterEntityOptions, _data: INetworkOrg[], _groups: ITopologyGroup[]): ITopologyPreparedMapDataV2 => {
  const regions: ITopoRegionNode[] = [];
  const accounts: ITopoAccountNode[] = [];
  // const dataCenters: ITopoNode<any>[] = [];
  const groups: ITopoSitesNode[] = [];
  const devicesInGroup: IFilteredNetworkDevice[] = [];
  const devicesInDefaultGroup: IFilteredNetworkDevice[] = [];
  console.log(_data);
  const sitesGroups = _groups.filter(group => group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS || group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS);
  for (let i = 0; i < sitesGroups.length; i++) {
    // const _orgId = _data && _data.length ? _data[0].id : 'unknown';
    const _objS: ITopoSitesNode = createSitesNode(sitesGroups[i]);
    groups.push(_objS);
  }
  if (_data && _data.length) {
    _data.forEach((org, orgI) => {
      if (!org.regions || !org.regions.length) return;
      org.regions.forEach((region, i) => {
        const _name = buildRegionName(org, region);
        const _objR: ITopoRegionNode = createTopoRegionNode(region, org.id);
        if (region.wedges && region.wedges.length) {
          region.wedges.forEach((w, index) => {
            let _aIndex: number = accounts.findIndex(it => it.dataItem.id === `${w.regionCode}${w.ownerId}`);
            if (_aIndex !== -1) {
              const _wNode: ITGWNode = createWedgeNode(org, orgI, 0, index, w);
              accounts[_aIndex].children.push(_wNode);
              return;
            }
            const _a: ITopoAccountNode = createAccountNode(`${region.name}${org.extId}`, _name, org.id);
            const _wNode: ITGWNode = createWedgeNode(org, orgI, 0, index, w);
            _a.children.push(_wNode);
            accounts.push(_a);
          });
        }
        // // for test
        let customPeerData = region.vNetworkPeeringConnections && region.vNetworkPeeringConnections.length ? [...region.vNetworkPeeringConnections] : [];
        let customWebData = region.webAcls && region.webAcls.length ? [...region.webAcls] : [];
        let customVnetData = region.vnets && region.vnets.length ? [...region.vnets] : [];
        if (customPeerData.length) {
          for (let j = 0; j < 32; j++) {
            customPeerData.push({ ...region.vNetworkPeeringConnections[0], id: region.vNetworkPeeringConnections[0].id + j + 100 });
          }
        }
        if (customWebData.length) {
          for (let j = 0; j < 24; j++) {
            customWebData.push({ ...region.webAcls[0], id: region.webAcls[0].id + j + 100 });
          }
        }
        if (customVnetData.length) {
          for (let j = 0; j < 40; j++) {
            customVnetData.push({ ...region.vnets[0], id: region.vnets[0].id + j + 100 });
            customVnetData.reverse();
          }
        }
        // const max = getRegionChildrenCounts(customVnetData, customPeerData, customWebData);
        //----------------------------
        const max = getRegionChildrenCounts(region.vnets, region.vNetworkPeeringConnections, region.webAcls);
        if (region.vnets && region.vnets.length && org.vendorType !== 'MERAKI') {
          // const _arr = getChunksFromArray(customVnetData, Math.min(VPCS_IN_ROW, max));
          const _arr = getChunksFromArray(region.vnets, Math.min(VPCS_IN_ROW, max));
          _objR.children = _arr.map((row, ri) => row.map((v, i) => createVPCNode(org, row.length, orgI, ri, i, v)));
        }
        if (region.vNetworkPeeringConnections && region.vNetworkPeeringConnections.length) {
          // const _arr = getChunksFromArray(customPeerData, Math.min(PEER_CONNECTION_IN_ROW, max));
          const _arr = getChunksFromArray(region.vNetworkPeeringConnections, Math.min(PEER_CONNECTION_IN_ROW, max));
          _objR.peerConnections = _arr.map((row, ri) => row.map((v, i) => createPeerConnectionNode(org, row.length, orgI, ri, i, v)));
        }
        if (region.webAcls && region.webAcls.length) {
          // const _arr = getChunksFromArray(customWebData, Math.min(WEB_ACL_IN_ROW, max));
          const _arr = getChunksFromArray(region.webAcls, Math.min(WEB_ACL_IN_ROW, max));
          _objR.webAcls = _arr.map((row, ri) => row.map((v, i) => createWebAclNode(org, row.length, orgI, ri, i, v)));
        }
        if (region.devices && region.devices.length) {
          // for test
          for (let j = 0; j < 55; j++) {
            // const objE: IDeviceNode = createDeviceNode(org, orgI, region.devices[1], 100 + j);
            devicesInDefaultGroup.push({ ...region.devices[0], selectorGroup: DEFAULT_GROUP_ID, orgIndex: orgI, orgId: org.id, vendorType: org.vendorType });
            // devicesInGroup.push(objE);
          }
          region.devices.forEach((d, i) => {
            if (d.selectorGroup) {
              if (d.selectorGroup === DEFAULT_GROUP_ID) {
                devicesInDefaultGroup.push({ ...d, orgIndex: orgI, orgId: org.id, vendorType: org.vendorType });
                return;
              }
              devicesInGroup.push({ ...d, orgIndex: orgI, orgId: org.id, vendorType: org.vendorType });
              return;
            }
            devicesInDefaultGroup.push({ ...d, orgIndex: orgI, orgId: org.id, vendorType: org.vendorType });
          });
        }
        regions.push(_objR);
      });
    });
  }

  if (devicesInDefaultGroup && devicesInDefaultGroup.length) {
    const _objS: ITopoSitesNode = createSitesNode({
      id: DEFAULT_GROUP_ID,
      name: 'Default',
      type: TopologyGroupTypesAsString.BRANCH_NETWORKS,
      expr: null,
      evalType: SelectorEvalType.EXPR,
      extIds: [],
    });
    const max = getDevicesBeautifulRowsCount(devicesInDefaultGroup.length, DEV_IN_ROW);
    const _arr = getChunksFromArray(devicesInDefaultGroup, max);
    _objS.children = _arr.map((row, ri) => row.map((v, i) => createDeviceNode(ri, row.length, i, v)));
    groups.unshift(_objS);
  }

  if (sitesGroups && sitesGroups.length && devicesInGroup && devicesInGroup.length) {
    sitesGroups.forEach((gr, index) => {
      const _siteIndex = groups.findIndex(it => it.dataItem.id === gr.id || it.dataItem.name === gr.name);
      if (_siteIndex !== -1) {
        const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
        const max = getDevicesBeautifulRowsCount(_devs.length, DEV_IN_ROW);
        const _arr = getChunksFromArray(_devs, max);
        groups[_siteIndex].children = _arr.map((row, ri) => row.map((v, i) => createDeviceNode(ri, row.length, i, v)));
      }
    });
  }
  if (devicesInGroup && devicesInGroup.length) {
    const _siteIndex = groups.findIndex(it => it.dataItem.id === DEFAULT_GROUP_ID);
    if (_siteIndex !== -1) {
      const max = getDevicesBeautifulRowsCount(devicesInGroup.length, DEV_IN_ROW);
      const _arr = getChunksFromArray(devicesInGroup, max);
      const _nodes = _arr.map((row, ri) => row.map((v, i) => createDeviceNode(ri, row.length, i, v)));
      groups[_siteIndex].children.concat(_nodes);
    }
  }
  updateTopLevelItems(filter, regions, accounts, groups);
  const links: ITopoLink<any, any, any, any, any>[] = buildLinks(regions, accounts, groups, filter);
  const _nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] = [...regions, ...accounts, ...groups];
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
