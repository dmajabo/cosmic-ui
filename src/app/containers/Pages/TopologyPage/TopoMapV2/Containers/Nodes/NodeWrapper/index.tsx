import React from 'react';
import { ITopoAccountNode, ITopoRegionNode, ITopoSitesNode, TopoNodeTypes } from 'lib/hooks/Topology/models';
import DataCenter from './DataCenter';
import AccountNodeTopContainer from './AccountNode/AccountNodeTopContainer';
import RegionNodeTopContainer from './RegionNode/RegionNodeTopContainer';
import SitesNodeTopContainer from './SitesNode/SitesNodeTopContainer';

interface Props {
  isTopLayer?: boolean;
  nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[];
}

const NodesWrapper: React.FC<Props> = (props: Props) => {
  if (!props.nodes || !props.nodes.length) return null;
  return (
    <>
      {props.nodes.map(it => {
        if (it.type === TopoNodeTypes.ACCOUNT) {
          if (props.isTopLayer) return null;
          return <AccountNodeTopContainer key={`nodeWrapperTopLayer${it.uiId}`} account={it as ITopoAccountNode} />;
        }

        if (it.type === TopoNodeTypes.REGION) {
          if (props.isTopLayer) return null;
          return <RegionNodeTopContainer key={`nodeWrapperTopLayer${it.uiId}`} region={it as ITopoRegionNode} />;
        }

        if (it.type === TopoNodeTypes.DATA_CENTER) {
          return <DataCenter key={`nodeWrapper${it.uiId}`} dataItem={it as any} />;
        }

        if (it.type === TopoNodeTypes.SITES) {
          if (props.isTopLayer) return null;
          return <SitesNodeTopContainer key={`nodeWrapperTopLayer${it.uiId}`} site={it as ITopoSitesNode} />;
        }
        return null;
      })}
    </>
  );
};

export default React.memo(NodesWrapper);
