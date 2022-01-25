import { INetworkOrg, INetworkRegion, INetworkVNetwork, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';

import {
  ITopoRegionNode,
  ITGWNode,
  FilterEntityOptions,
  VPCS_IN_ROW,
  PEER_CONNECTION_IN_ROW,
  WEB_ACL_IN_ROW,
  ITopoSitesNode,
  DEV_IN_PAGE,
  IDeviceNode,
  ITopoAccountNode,
  DEV_IN_ROW,
  DEFAULT_GROUP_ID,
  ITempSegmentObjData,
  ITopologyPreparedMapDataV2,
} from './models';
import {
  createDeviceNode,
  createPeerConnectionNode,
  createSitesNode,
  createAccountNode,
  createTopoRegionNode,
  createVnetNode,
  createWebAclNode,
  createWedgeNode,
  updateDeviceNode,
} from './helpers/buildNodeHelpers';
import { buildLinks } from './helpers/buildlinkHelper';
import { capitalizeFirstLetter } from 'lib/helpers/stringHelper';
import { updateTopLevelItems } from './helpers/coordinateHelper';
import { getBeautifulRowsCount, getRegionChildrenCounts } from './helpers/rowsHelper';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { IObject } from 'lib/models/general';
import { jsonClone } from 'lib/helpers/cloneHelper';
// import { jsonClone } from 'lib/helpers/cloneHelper';

export const createAccounts = (accounts: IObject<ITopoAccountNode>, tgw: IObject<ITGWNode>, _data: INetworkOrg[]) => {
  if (!_data || !_data.length) return;
  _data.forEach((org, orgI) => {
    if (!org.regions || !org.regions.length) return;
    org.regions.forEach(region => {
      const _name = buildRegionName(org, region);
      if (!region.wedges || !region.wedges.length) return;
      region.wedges.forEach((w, index) => {
        let account: ITopoAccountNode = accounts[`${region.name}${org.extId}`]; // _accounts.findIndex(it => it.dataItem.id === `${w.regionCode}${w.ownerId}`);
        if (account) {
          const _wNode: ITGWNode = createWedgeNode(`${region.name}${org.extId}`, org, orgI, 0, index, w);
          tgw[_wNode.id] = _wNode;
          accounts[`${region.name}${org.extId}`].children.push(_wNode);
          return;
        }
        const _a: ITopoAccountNode = createAccountNode(`${region.name}${org.extId}`, _name, org.id);
        const _wNode: ITGWNode = createWedgeNode(`${region.name}${org.extId}`, org, orgI, 0, index, w);
        tgw[_wNode.id] = _wNode;
        _a.children.push(_wNode);
        accounts[_a.dataItem.id] = _a;
      });
    });
  });
};

export const createTopology = (filter: FilterEntityOptions, _data: INetworkOrg[], _segments: ISegmentSegmentP[]): ITopologyPreparedMapDataV2 => {
  const regions: IObject<ITopoRegionNode> = {};
  const accounts: IObject<ITopoAccountNode> = {};
  const sites: IObject<ITopoSitesNode> = {};
  const tgws: IObject<ITGWNode> = {};
  const devicesInDefaultSegment: IDeviceNode[] = [];
  const segmentTempObject: ITempSegmentObjData = {};

  if (_segments && _segments.length) {
    _segments.forEach((s, i) => {
      const _segment: ITopoSitesNode = createSitesNode(s);
      segmentTempObject[s.id] = { id: s.id, dataItem: s, children: [] };
      sites[s.id] = _segment;
    });
  }

  if (_data && _data.length) {
    createAccounts(accounts, tgws, _data);
    _data.forEach((org, orgI) => {
      if (!org.regions || !org.regions.length) return;
      org.regions.forEach((region, i) => {
        let _objR: ITopoRegionNode = null;
        if (org.vendorType !== VendorTypes.MERAKI) {
          _objR = createTopoRegionNode(region, org.id);
        }
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
          const _arr: INetworkVNetwork[][] = getChunksFromArray(region.vnets, Math.min(VPCS_IN_ROW, max));
          _objR.children = _arr.map((row, ri) => row.map((v, i) => createVnetNode(org, row.length, orgI, ri, i, v, sites[v.segmentId])));
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
          for (let j = 0; j < 72; j++) {
            const _item1 = jsonClone(region.devices[0]);
            _item1.segmentId = '61eaccce820af10f872a9b16';
            const _device1: IDeviceNode = createDeviceNode(org, orgI, _item1, sites[region.devices[0].segmentId]);
            segmentTempObject[_device1.segmentId].children.push(_device1);
          }
          // for (let j = 0; j < 45; j++) {
          //   const _item2 = jsonClone(region.devices[0]);
          //   _item2.segmentId = '61eacc5d820af10f872a9b15';
          //   const _device2: IDeviceNode = createDeviceNode(org, orgI, _item2, _segmentsObj);
          //   segmentTempObject[_device2.segmentId].children.push(_device2);
          // }
          // for (let j = 0; j < 300; j++) {
          //   const _item3 = jsonClone(region.devices[0]);
          //   _item3.segmentId = '61ea2c4f820af10f872a9b14';
          //   const _device3: IDeviceNode = createDeviceNode(org, orgI, _item3, _segmentsObj);
          //   segmentTempObject[_device3.segmentId].children.push(_device3);
          // }
          region.devices.forEach((d, i) => {
            const _device: IDeviceNode = createDeviceNode(org, orgI, d, sites[d.segmentId]);
            if (_device.segmentId && segmentTempObject[_device.segmentId]) {
              segmentTempObject[_device.segmentId].children.push(_device);
            } else {
              devicesInDefaultSegment.push(_device);
            }
          });
        }
        if (_objR) {
          regions[_objR.dataItem.id] = _objR;
        }
      });
    });
  }

  if (devicesInDefaultSegment && devicesInDefaultSegment.length) {
    const _defGroup: ITopoSitesNode = createSitesNode({
      id: DEFAULT_GROUP_ID,
      name: 'Default',
      description: '',
      segType: null,
      networkSegPol: null,
      appSegPol: null,
      extSegPol: null,
      serviceSegPol: null,
      paasSegPol: null,
      siteSegPol: null,
      color: NODES_CONSTANTS.SITES.expanded.marker.bgColor,
    });
    sites[DEFAULT_GROUP_ID] = _defGroup;
    const _arr = getChunksFromArray(devicesInDefaultSegment, DEV_IN_PAGE);
    const max = _arr && _arr.length ? getBeautifulRowsCount(_arr[0].length, DEV_IN_ROW) : 0;
    sites[DEFAULT_GROUP_ID].children = _arr.map((page, pageI) => {
      const _pageRow = getChunksFromArray(page, max);
      return _pageRow.map((row, rowI) => row.map((v, i) => updateDeviceNode(v, pageI, rowI, row.length, i))).flat();
    });
  }
  if (Object.keys(segmentTempObject).length) {
    Object.keys(segmentTempObject).forEach(key => {
      const _s = segmentTempObject[key];
      if (!_s.children || !_s.children.length) {
        delete sites[_s.dataItem.id];
        return;
      }
      const _arr = getChunksFromArray(_s.children, DEV_IN_PAGE);
      const max = _arr && _arr.length ? getBeautifulRowsCount(_arr[0].length, DEV_IN_ROW) : 0;
      sites[_s.dataItem.id].children = _arr.map((page, pageI) => {
        const _pageRow = getChunksFromArray(page, max);
        return _pageRow.map((row, rowI) => row.map((v, i) => updateDeviceNode(v, pageI, rowI, row.length, i))).flat();
      });
    });
  }

  updateTopLevelItems(filter, regions, accounts, sites);
  // buildLinks(regions, accounts, sites);
  return { accounts: accounts, sites: sites, regions: regions, links: [], segments: segmentTempObject, tgws: tgws };
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
