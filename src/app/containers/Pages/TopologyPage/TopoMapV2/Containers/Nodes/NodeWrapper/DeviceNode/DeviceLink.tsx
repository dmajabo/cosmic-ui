import { INetworkVpnLinkState } from 'lib/api/ApiModels/Topology/apiModels';
import { ITopoLink, ITopoSitesNode, ITopoAccountNode, ITGWNode, IDeviceNode } from 'lib/hooks/Topology/models';

import React from 'react';

interface Props {
  data: ITopoLink<ITopoSitesNode, IDeviceNode, ITopoAccountNode, ITGWNode, INetworkVpnLinkState>;
}

const DeviceLink: React.FC<Props> = ({ data }) => {
  return <line className="deviceLink" data-fromname={data.fromNode.child.name} data-toname={data.toNode.child.name} stroke="#BBCDE7" x1={data.fromX} y1={data.fromY} x2={data.toX} y2={data.toY} />;
};

export default React.memo(DeviceLink);
