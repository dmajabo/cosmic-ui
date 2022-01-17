import { INetworkOrg, INetworkRegion, ITopologyGroup, SelectorEvalType } from 'lib/api/ApiModels/Topology/apiModels';

import {
  ITopoRegionNode,
  ITGWNode,
  FilterEntityOptions,
  VPCS_IN_ROW,
  PEER_CONNECTION_IN_ROW,
  WEB_ACL_IN_ROW,
  ITopoSitesNode,
  DEV_IN_PAGE,
  IFilteredNetworkDevice,
  ITopoAccountNode,
  DEV_IN_ROW,
} from './models';
import { createDeviceNode, createPeerConnectionNode, createSitesNode, createAccountNode, createTopoRegionNode, createVPCNode, createWebAclNode, createWedgeNode } from './helpers/buildNodeHelpers';
import { DEFAULT_GROUP_ID, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { buildLinks } from './helpers/buildlinkHelper';
import { capitalizeFirstLetter } from 'lib/helpers/stringHelper';
import { updateTopLevelItems } from './helpers/coordinateHelper';
import { getBeautifulRowsCount, getRegionChildrenCounts } from './helpers/rowsHelper';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';

export const createAccounts = (_data: INetworkOrg[]): ITopoAccountNode[] => {
  if (!_data || !_data.length) return [];
  const _accounts: ITopoAccountNode[] = [];
  _data.forEach((org, orgI) => {
    if (!org.regions || !org.regions.length) return;
    org.regions.forEach(region => {
      const _name = buildRegionName(org, region);
      if (!region.wedges || !region.wedges.length) return;
      region.wedges.forEach((w, index) => {
        let _aIndex: number = _accounts.findIndex(it => it.dataItem.id === `${w.regionCode}${w.ownerId}`);
        if (_aIndex !== -1) {
          const _wNode: ITGWNode = createWedgeNode(org, orgI, 0, index, w);
          _accounts[_aIndex].children.push(_wNode);
          return;
        }
        const _a: ITopoAccountNode = createAccountNode(`${region.name}${org.extId}`, _name, org.id);
        const _wNode: ITGWNode = createWedgeNode(org, orgI, 0, index, w);
        _a.children.push(_wNode);
        _accounts.push(_a);
      });
    });
  });
  return _accounts;
};

export const createTopology = (filter: FilterEntityOptions, _data: INetworkOrg[], _groups: ITopologyGroup[]): (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] => {
  const regions: ITopoRegionNode[] = [];
  let accounts: ITopoAccountNode[] = [];
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
    accounts = createAccounts(_data);
    _data.forEach((org, orgI) => {
      if (!org.regions || !org.regions.length) return;
      org.regions.forEach((region, i) => {
        const _objR: ITopoRegionNode = createTopoRegionNode(region, org.id);
        // // for test
        // let customPeerData = region.vNetworkPeeringConnections && region.vNetworkPeeringConnections.length ? [...region.vNetworkPeeringConnections] : [];
        // let customWebData = region.webAcls && region.webAcls.length ? [...region.webAcls] : [];
        // let customVnetData = region.vnets && region.vnets.length ? [...region.vnets] : [];
        // if (customPeerData.length) {
        //   for (let j = 0; j < 32; j++) {
        //     customPeerData.push({ ...region.vNetworkPeeringConnections[0], id: region.vNetworkPeeringConnections[0].id + j + 100 });
        //   }
        // }
        // if (customWebData.length) {
        //   for (let j = 0; j < 24; j++) {
        //     customWebData.push({ ...region.webAcls[0], id: region.webAcls[0].id + j + 100 });
        //   }
        // }
        // if (customVnetData.length) {
        //   for (let j = 0; j < 40; j++) {
        //     customVnetData.push({ ...region.vnets[0], id: region.vnets[0].id + j + 100 });
        //     customVnetData.reverse();
        //   }
        // }
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
          // // // for test
          // for (let j = 0; j < 121; j++) {
          //   // const objE: IDeviceNode = createDeviceNode(org, orgI, region.devices[1], 100 + j);
          //   devicesInDefaultGroup.push({ ...region.devices[0], name: `${j + 1}`, selectorGroup: DEFAULT_GROUP_ID, orgIndex: orgI, orgId: org.id, vendorType: org.vendorType });
          //   // devicesInGroup.push(objE);
          // }
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

  const _defaultSitesGroup: ITopoSitesNode = createSitesNode({
    id: DEFAULT_GROUP_ID,
    name: 'Default',
    type: TopologyGroupTypesAsString.BRANCH_NETWORKS,
    expr: null,
    evalType: SelectorEvalType.EXPR,
    extIds: [],
  });
  if (devicesInDefaultGroup && devicesInDefaultGroup.length) {
    const _arr = getChunksFromArray(devicesInDefaultGroup, DEV_IN_PAGE);
    const max = _arr && _arr.length ? getBeautifulRowsCount(_arr[0].length, DEV_IN_ROW) : 0;
    _defaultSitesGroup.children = _arr.map((page, pageI) => {
      const _pageRow = getChunksFromArray(page, max);
      return _pageRow.map((row, rowI) => row.map((v, i) => createDeviceNode(pageI, rowI, row.length, i, v))).flat();
    });
    groups.unshift(_defaultSitesGroup);
  }

  if (sitesGroups && sitesGroups.length && devicesInGroup && devicesInGroup.length) {
    sitesGroups.forEach((gr, index) => {
      const _siteIndex = groups.findIndex(it => it.dataItem.id === gr.id || it.dataItem.name === gr.name);
      if (_siteIndex !== -1) {
        const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
        // const max = getDevicesBeautifulRowsCount(_devs.length, DEV_IN_PAGE);

        const _arr = getChunksFromArray(_devs, DEV_IN_PAGE);
        const max = _arr && _arr.length ? getBeautifulRowsCount(_arr[0].length, DEV_IN_ROW) : 0;
        groups[_siteIndex].children = _arr.map((page, pageI) => {
          const _pageRow = getChunksFromArray(page, max);
          return _pageRow.map((row, rowI) => row.map((v, i) => createDeviceNode(pageI, rowI, row.length, i, v))).flat();
        });
      }
    });
  }
  updateTopLevelItems(filter, regions, accounts, groups);
  buildLinks(regions, accounts, groups);
  const _nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[] = [...accounts, ...regions, ...groups];
  return _nodes;
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
