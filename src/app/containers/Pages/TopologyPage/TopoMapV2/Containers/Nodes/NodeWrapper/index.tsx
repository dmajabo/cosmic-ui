import React from 'react';
import { ITGWNode, ITopoAccountNode, ITopoRegionNode, ITopoSitesNode } from 'lib/hooks/Topology/models';
// import DataCenter from './DataCenter';
import AccountNodeTopContainer from './AccountNode/AccountNodeTopContainer';
import RegionNodeTopContainer from './RegionNode/RegionNodeTopContainer';
import SitesNodeTopContainer from './SitesNode/SitesNodeTopContainer';
import { IObject } from 'lib/models/general';
import AccountNode from './AccountNode/AccountNode';
import SiteNode from './SitesNode/SiteNode';
import RegionNode from './RegionNode/RegionNode';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import TransitionContainer from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/TransitionContainer';
import NetworkWEdgeNode from './NetworkWEdgeNode';
interface Props {
  nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[];
  accounts: IObject<ITopoAccountNode>;
  sites: IObject<ITopoSitesNode>;
  regions: IObject<ITopoRegionNode>;
  tgws: IObject<ITGWNode>;
}

const NodesWrapper: React.FC<Props> = (props: Props) => {
  // if (!props.nodes || !props.nodes.length) return null;
  return (
    <>
      {/* {props.nodes.map(it => {
        if (it.type === TopoNodeTypes.ACCOUNT) {
          return <AccountNodeTopContainer key={`nodeWrapperTopLayer${it.uiId}`} account={it as ITopoAccountNode} />;
        }

        if (it.type === TopoNodeTypes.REGION) {
          return <RegionNodeTopContainer key={`nodeWrapperTopLayer${it.uiId}`} region={it as ITopoRegionNode} />;
        }

        if (it.type === TopoNodeTypes.DATA_CENTER) {
          return <DataCenter key={`nodeWrapper${it.uiId}`} dataItem={it as any} />;
        }

        if (it.type === TopoNodeTypes.SITES) {
          return <SitesNodeTopContainer key={`nodeWrapperTopLayer${it.uiId}`} site={it as ITopoSitesNode} />;
        }
        return null;
      })} */}

      {props.accounts ? Object.keys(props.accounts).map(key => <AccountNodeTopContainer key={`nodeWrapperTopLayer${props.accounts[key].uiId}`} account={props.accounts[key]} />) : null}
      {props.sites ? Object.keys(props.sites).map(key => <SitesNodeTopContainer key={`nodeWrapperTopLayer${props.sites[key].uiId}`} site={props.sites[key]} />) : null}
      {props.regions ? Object.keys(props.regions).map(key => <RegionNodeTopContainer key={`nodeWrapperTopLayer${props.regions[key].uiId}`} region={props.regions[key]} />) : null}

      {props.tgws ? Object.keys(props.tgws).map(key => <NetworkWEdgeNode key={`tgw${props.tgws[key].uiId}`} item={props.tgws[key]} />) : null}
      {props.sites ? Object.keys(props.sites).map(key => <SiteNode key={`siteChildrenLayer${props.sites[key].uiId}`} dataItem={props.sites[key]} />) : null}
      {props.regions ? Object.keys(props.regions).map(key => <RegionNode key={`regionChildrenLayer${props.regions[key].uiId}`} dataItem={props.regions[key]} />) : null}
    </>
  );
};

export default React.memo(NodesWrapper);
