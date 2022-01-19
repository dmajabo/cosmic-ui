import { getRowsHeight } from 'lib/hooks/Topology/helpers/sizeHelpers';
import { FilterEntityOptions } from 'lib/hooks/Topology/models';

export interface IRefionContainersOffsets {
  totalWidth: number;
  topOffset: number;
  webAcl_TotalHeight: number;
  peerConnection_TotalHeight: number;
  vnetOffsetY: number;
  vnet_TotalHeight: number;
}
export const getRegionChildrenContainersOffsets = (
  filter: FilterEntityOptions,
  webAclRows: number,
  peerConnectionsRows: number,
  vnetRows: number,
  headerHeight: number,
  padding: number,
  webAclNodeStyles,
  peerConnectionNodeStyles,
  vnetStyles,
  regionWidth: number,
  skipFilterOption?: boolean,
): IRefionContainersOffsets => {
  const totalWidth = regionWidth - padding * 2;
  const topOffset = headerHeight + padding;
  let webAglHeight = 0;
  let peerHeight = 0;
  let vpsHeight = 0;
  if (filter && filter.web_acls && filter.web_acls.selected && webAclRows !== 0) {
    webAglHeight = getRowsHeight(webAclRows, webAclNodeStyles.height, webAclNodeStyles.spaceY) + padding;
  } else if (skipFilterOption) {
    webAglHeight = getRowsHeight(webAclRows, webAclNodeStyles.height, webAclNodeStyles.spaceY) + padding;
  }
  if (filter && filter.peer_connections && filter.peer_connections.selected && peerConnectionsRows !== 0) {
    peerHeight = getRowsHeight(peerConnectionsRows, peerConnectionNodeStyles.height, peerConnectionNodeStyles.spaceY) + padding;
  } else if (skipFilterOption) {
    peerHeight = getRowsHeight(peerConnectionsRows, peerConnectionNodeStyles.height, peerConnectionNodeStyles.spaceY) + padding;
  }
  if (vnetRows !== 0) {
    const _h = vnetStyles.height || vnetStyles.minHeight;
    vpsHeight = getRowsHeight(vnetRows, _h, vnetStyles.spaceY);
  }
  return {
    topOffset: topOffset,
    webAcl_TotalHeight: webAglHeight,
    peerConnection_TotalHeight: peerHeight,
    vnet_TotalHeight: vpsHeight,
    vnetOffsetY: topOffset + webAglHeight + peerHeight,
    totalWidth: totalWidth,
  };
};
