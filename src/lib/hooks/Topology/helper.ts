import { INetworkVNetNode, INetworkVNetworkPeeringConnectionNode, INetworkWebAclNode, ITopoLink, TopoNodeTypes } from 'lib/hooks/Topology/models';
import { INetworkOrg, INetworkRegion, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';

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
import { updateTopLevelItems } from './helpers/coordinateHelper';
import { getBeautifulRowsCount, getRegionChildrenCounts } from './helpers/rowsHelper';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import { IObject } from 'lib/models/general';
// import { jsonClone } from 'lib/helpers/cloneHelper';

export const createAccounts = (accounts: IObject<ITopoAccountNode>, _data: INetworkOrg[]) => {
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
          accounts[`${region.name}${org.extId}`].children.push(_wNode);
          accounts[`${region.name}${org.extId}`].totalChildrenCount = accounts[`${region.name}${org.extId}`].children.length;
          return;
        }
        const _a: ITopoAccountNode = createAccountNode(`${region.name}${org.extId}`, _name, org.extId);
        const _wNode: ITGWNode = createWedgeNode(`${region.name}${org.extId}`, org, orgI, 0, index, w);
        _a.children.push(_wNode);
        _a.totalChildrenCount = _a.children.length;
        accounts[_a.dataItem.extId] = _a;
      });
    });
  });
};

export const createTopology = (filter: FilterEntityOptions, _data: INetworkOrg[], _segments: ISegmentSegmentP[]): ITopologyPreparedMapDataV2 => {
  const regions: IObject<ITopoRegionNode> = {};
  const accounts: IObject<ITopoAccountNode> = {};
  const sites: IObject<ITopoSitesNode> = {};
  const devicesInDefaultSegment: IDeviceNode[] = [];
  const segmentTempObject: ITempSegmentObjData = {};

  if (_segments && _segments.length) {
    _segments.forEach((s, i) => {
      const _segment: ITopoSitesNode = createSitesNode(s);
      segmentTempObject[_segment.dataItem.extId] = { id: s.id, extId: s.id, dataItem: s, children: [], type: null };
      sites[_segment.dataItem.extId] = _segment;
    });
  }

  if (_data && _data.length) {
    createAccounts(accounts, _data);
    _data.forEach((org, orgI) => {
      if (!org.regions || !org.regions.length) return;
      org.regions.forEach((region, i) => {
        let _objR: ITopoRegionNode = null;
        if (org.vendorType !== VendorTypes.MERAKI) {
          _objR = createTopoRegionNode(region, org.extId);
        }
        const max = getRegionChildrenCounts(region.vnets, region.vNetworkPeeringConnections, region.webAcls);
        if (region.vnets && region.vnets.length && org.vendorType !== 'MERAKI') {
          _objR.totalChildrenCount = region.vnets.length;
          const _arr: INetworkVNetNode[][] = getChunksFromArray(region.vnets, Math.min(VPCS_IN_ROW, max));
          _objR.children = _arr.map((row, ri) =>
            row.map((v, i) => {
              const _vnet: INetworkVNetNode = createVnetNode(_objR.dataItem.extId, org, row.length, orgI, ri, i, v, segmentTempObject[v.segmentId]);
              if (segmentTempObject[v.segmentId]) {
                segmentTempObject[v.segmentId].type = TopoNodeTypes.VNET;
                segmentTempObject[v.segmentId].children.push(_vnet);
              }
              return _vnet;
            }),
          );
        }
        if (region.vNetworkPeeringConnections && region.vNetworkPeeringConnections.length) {
          const _arr: INetworkVNetworkPeeringConnectionNode[][] = getChunksFromArray(region.vNetworkPeeringConnections, Math.min(PEER_CONNECTION_IN_ROW, max));
          _objR.peerConnections = _arr.map((row, ri) => row.map((v, i) => createPeerConnectionNode(_objR.dataItem.extId, org, row.length, orgI, ri, i, v)));
        }
        if (region.webAcls && region.webAcls.length) {
          const _arr: INetworkWebAclNode[][] = getChunksFromArray(region.webAcls, Math.min(WEB_ACL_IN_ROW, max));
          _objR.webAcls = _arr.map((row, ri) => row.map((v, i) => createWebAclNode(_objR.dataItem.extId, org, row.length, orgI, ri, i, v)));
        }
        if (region.devices && region.devices.length) {
          // // for test
          // for (let j = 0; j < 72; j++) {
          //   const _item1 = jsonClone(region.devices[0]);
          //   _item1.segmentId = '61eaccce820af10f872a9b16';
          //   const _device1: IDeviceNode = createDeviceNode(org, orgI, _item1, sites[region.devices[0].segmentId]);
          //   segmentTempObject[_device1.segmentId].children.push(_device1);
          // }
          // for (let j = 0; j < 45; j++) {
          //   const _item2 = jsonClone(region.devices[0]);
          //   _item2.segmentId = '61eacc5d820af10f872a9b15';
          //   const _device2: IDeviceNode = createDeviceNode(org, orgI, _item2, sites[region.devices[0].segmentId]);
          //   segmentTempObject[_device2.segmentId].children.push(_device2);
          // }
          // for (let j = 0; j < 300; j++) {
          //   const _item3 = jsonClone(region.devices[0]);
          //   _item3.segmentId = '61ea2c4f820af10f872a9b14';
          //   const _device3: IDeviceNode = createDeviceNode(org, orgI, _item3, sites[region.devices[0].segmentId]);
          //   segmentTempObject[_device3.segmentId].children.push(_device3);
          // }
          region.devices.forEach((d, i) => {
            const _device: IDeviceNode = createDeviceNode(org, orgI, d, sites[d.segmentId]);
            if (_device.segmentId && segmentTempObject[_device.segmentId]) {
              segmentTempObject[_device.segmentId].type = TopoNodeTypes.DEVICE;
              segmentTempObject[_device.segmentId].children.push(_device);
            } else {
              devicesInDefaultSegment.push(_device);
            }
          });
        }
        if (_objR) {
          regions[_objR.dataItem.extId] = _objR;
        }
      });
    });
  }

  if (devicesInDefaultSegment && devicesInDefaultSegment.length) {
    const _defGroup: ITopoSitesNode = createSitesNode({
      id: DEFAULT_GROUP_ID,
      extId: DEFAULT_GROUP_ID,
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
    sites[DEFAULT_GROUP_ID].totalChildrenCount = devicesInDefaultSegment.length;
    const _arr = getChunksFromArray(devicesInDefaultSegment, DEV_IN_PAGE);
    const max = _arr && _arr.length ? getBeautifulRowsCount(_arr[0].length, DEV_IN_ROW) : 0;
    sites[DEFAULT_GROUP_ID].children = _arr.map((page, pageI) => {
      const _pageRow = getChunksFromArray(page, max);
      return _pageRow.map((row, rowI) => row.map((v, i) => updateDeviceNode(DEFAULT_GROUP_ID, v, pageI, rowI, row.length, i))).flat();
    });
  }
  if (Object.keys(segmentTempObject).length) {
    Object.keys(segmentTempObject).forEach(key => {
      const _s = segmentTempObject[key];
      if (!_s.type || _s.type !== TopoNodeTypes.DEVICE) {
        delete sites[_s.extId];
        return;
      }
      sites[_s.extId].totalChildrenCount = _s.children.length;
      const _arr = getChunksFromArray(_s.children, DEV_IN_PAGE);
      const max = _arr && _arr.length ? getBeautifulRowsCount(_arr[0].length, DEV_IN_ROW) : 0;
      sites[_s.extId].children = _arr.map((page, pageI) => {
        const _pageRow = getChunksFromArray(page, max);
        return _pageRow.map((row, rowI) => row.map((v, i) => updateDeviceNode(_s.extId, v, pageI, rowI, row.length, i))).flat();
      });
    });
  }

  updateTopLevelItems(filter, regions, accounts, sites);
  const _links: IObject<ITopoLink<any, any, any>> = buildLinks(filter, regions, accounts, sites);
  return { accounts: accounts, sites: sites, regions: regions, links: _links, segments: segmentTempObject };
};

const buildRegionName = (org: INetworkOrg, region: INetworkRegion): string => {
  const { extId, ctrlrName } = org;
  const { extId: regExtId, name } = region;
  let str = '';
  if (ctrlrName) {
    str = ctrlrName.toUpperCase() + ' ';
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
