import { INetworkVNetwork, INetworkVNetworkPeeringConnection, INetworkWebAcl } from 'lib/api/ApiModels/Topology/apiModels';
import { VPCS_IN_ROW, PEER_CONNECTION_IN_ROW, WEB_ACL_IN_ROW } from '../models';

export const getBeautifulRowsCount = (_count: number, maxInRow: number): number => {
  if (_count <= 6) return _count;
  if (_count <= maxInRow) return Math.max(4, Math.ceil(_count / 1.75));
  if (_count <= maxInRow * 3) return Math.ceil(_count / 1.75);
  return maxInRow;
};

export const getRegionChildrenCounts = (chs: INetworkVNetwork[], prs: INetworkVNetworkPeeringConnection[], webAcls: INetworkWebAcl[]): number => {
  const maxCHInRow = chs && chs.length ? getBeautifulRowsCount(chs.length, VPCS_IN_ROW) : 0;
  const maxPRInRow = prs && prs.length ? getBeautifulRowsCount(prs.length, PEER_CONNECTION_IN_ROW) : 0;
  const maxWebInRow = webAcls && webAcls.length ? getBeautifulRowsCount(webAcls.length, WEB_ACL_IN_ROW) : 0;
  return Math.max(maxCHInRow, maxPRInRow, maxWebInRow);
};
