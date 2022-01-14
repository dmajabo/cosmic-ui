import { INetworkOrg, INetworkRegion, ITopologyGroup, ITopologyMapData, SelectorEvalType } from 'lib/api/ApiModels/Topology/apiModels';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';
import {
  ITopoNode,
  ITopoRegionNode,
  ITopologyPreparedMapDataV2,
  TopoNodeTypes,
  ITGWNode,
  ITopoLink,
  FilterEntityOptions,
  VPCS_IN_ROW,
  PEER_CONNECTION_IN_ROW,
  WEB_ACL_IN_ROW,
  ITopoSitesNode,
  DEV_IN_ROW,
  IFilteredNetworkDevice,
} from './models';
import { createDeviceNode, createPeerConnectionNode, createTopoNode, createTopoRegionNode, createVPCNode, createWebAclNode, createWedgeNode } from './helpers/buildNodeHelpers';
import { DEFAULT_GROUP_ID, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { buildLinks } from './helpers/buildlinkHelper';
import { capitalizeFirstLetter } from 'lib/helpers/stringHelper';
import { updateTopLevelItems } from './helpers/coordinateHelper';
import { getRegionChildrenCounts } from './helpers/rowsHelper';
import { getChunksFromArray } from 'lib/helpers/arrayHelper';

export const createTopology = (filter: FilterEntityOptions, _data: ITopologyMapData, _groups: ITopologyGroup[]): ITopologyPreparedMapDataV2 => {
  const regions: ITopoRegionNode[] = [];
  const accounts: ITopoNode<any, ITGWNode>[] = [];
  // const dataCenters: ITopoNode<any>[] = [];
  const groups: ITopoSitesNode[] = [];
  const devicesInGroup: IFilteredNetworkDevice[] = [];
  const devicesInDefaultGroup: IFilteredNetworkDevice[] = [];
  console.log(_data);
  const sitesGroups = _groups.filter(group => group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS || group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS);
  for (let i = 0; i < sitesGroups.length; i++) {
    const _orgId = _data.organizations && _data.organizations.length ? _data.organizations[0].id : 'unknown';
    const _objS: ITopoSitesNode = createTopoNode(
      sitesGroups[i],
      _orgId,
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
  if (_data.organizations && _data.organizations.length) {
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
              const _wNode: ITGWNode = createWedgeNode(org, orgI, 0, index, w, accounts[_aIndex]);
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
            const _wNode: ITGWNode = createWedgeNode(org, orgI, 0, index, w, _a);
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
        const max = getRegionChildrenCounts(region.vnets, region.vNetworkPeeringConnections, region.webAcls);
        if (region.vnets && region.vnets.length && org.vendorType !== 'MERAKI') {
          // const _arr = getChunksFromArray(customVnetData, Math.min(VPCS_IN_ROW, max));
          const _arr = getChunksFromArray(region.vnets, Math.min(VPCS_IN_ROW, max));
          _objR.children = _arr.map((row, ri) => row.map((v, i) => createVPCNode(org, row.length, orgI, ri, i, v)));
        }
        if (region.vNetworkPeeringConnections && region.vNetworkPeeringConnections.length) {
          // const _arr = getChunksFromArray(customPeerData, Math.min(PEER_CONNECTION_IN_ROW, max));
          const _arr = getChunksFromArray(region.vNetworkPeeringConnections, Math.min(PEER_CONNECTION_IN_ROW, max));
          _objR.peerConnections = _arr.map((row, ri) => row.map((v, i) => createPeerConnectionNode(org, orgI, ri, i, v)));
        }
        if (region.webAcls && region.webAcls.length) {
          // const _arr = getChunksFromArray(customWebData, Math.min(WEB_ACL_IN_ROW, max));
          const _arr = getChunksFromArray(region.webAcls, Math.min(WEB_ACL_IN_ROW, max));
          _objR.webAcls = _arr.map((row, ri) => row.map((v, i) => createWebAclNode(org, orgI, ri, i, v)));
        }
        if (region.devices && region.devices.length) {
          // // for test
          // for (let j = 0; j < 2000; j++) {
          //   const objE: IDeviceNode = createDeviceNode(org, orgI, region.devices[1], 100 + j);
          //   devicesInGroup.push(objE);
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

  if (devicesInDefaultGroup && devicesInDefaultGroup.length) {
    const _objS: ITopoSitesNode = createTopoNode(
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
    const _arr = getChunksFromArray(devicesInDefaultGroup, DEV_IN_ROW);
    _objS.children = _arr.map((row, ri) => row.map((v, i) => createDeviceNode(ri, i, v)));
    groups.unshift(_objS);
  }

  if (sitesGroups && sitesGroups.length && devicesInGroup && devicesInGroup.length) {
    sitesGroups.forEach((gr, index) => {
      const _siteIndex = groups.findIndex(it => it.id === gr.id || it.name === gr.name);
      if (_siteIndex !== -1) {
        const _devs = devicesInGroup.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
        const _arr = getChunksFromArray(_devs, DEV_IN_ROW);
        groups[_siteIndex].children = _arr.map((row, ri) => row.map((v, i) => createDeviceNode(ri, i, v)));
      }
    });
  }
  if (devicesInGroup && devicesInGroup.length) {
    const _siteIndex = groups.findIndex(it => it.id === DEFAULT_GROUP_ID);
    if (_siteIndex !== -1) {
      const _arr = getChunksFromArray(devicesInGroup, DEV_IN_ROW);
      const _nodes = _arr.map((row, ri) => row.map((v, i) => createDeviceNode(ri, i, v)));
      groups[_siteIndex].children.concat(_nodes);
    }
  }
  updateTopLevelItems(filter, regions, accounts, groups);
  const links: ITopoLink<any, any, any, any, any>[] = buildLinks(regions, accounts, groups, filter);
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
