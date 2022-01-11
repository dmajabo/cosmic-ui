import React from 'react';
import { ITopoNode, TopoNodeTypes } from 'lib/hooks/Topology/models';
import RegionNode from './RegionNode';
import AccountNode from './AccountNode';
import DataCenter from './DataCenter';
import SitesNode from './SitesNode';
import TransitionContainer from '../../TransitionContainer';
import AccountNodeTopContainer from './AccountNode/AccountNodeTopContainer';
import RegionNodeTopContainer from './RegionNode/RegionNodeTopContainer';
import SitesNodeTopContainer from './SitesNode/SitesNodeTopContainer';

interface Props {
  isTopLayer?: boolean;
  nodes: ITopoNode<any, any>[];
}

const NodesWrapper: React.FC<Props> = (props: Props) => {
  if (!props.nodes || !props.nodes.length) return null;
  return (
    <>
      {props.nodes.map(it => {
        if (it.type === TopoNodeTypes.ACCOUNT) {
          if (props.isTopLayer) {
            return (
              <TransitionContainer stateIn={it.visible} origin="unset" transform="none" key={`nodeWrapperTopLayer${it.uiId}`}>
                <AccountNodeTopContainer key={`nodeTopLevel${it.uiId}`} dataItem={it} />
              </TransitionContainer>
            );
          }
          return (
            <TransitionContainer stateIn={it.visible} origin="unset" transform="none" key={`nodeWrapper${it.uiId}`}>
              <AccountNode key={`node${it.uiId}`} dataItem={it} />
            </TransitionContainer>
          );
        }

        if (it.type === TopoNodeTypes.REGION && it.visible) {
          if (props.isTopLayer) {
            return (
              <TransitionContainer stateIn={it.visible} origin="unset" transform="none" key={`nodeWrapperTopLayer${it.uiId}`}>
                <RegionNodeTopContainer key={`nodeTopLevel${it.uiId}`} dataItem={it} />
              </TransitionContainer>
            );
          }
          return (
            <TransitionContainer stateIn={it.visible} origin="unset" transform="none" key={`nodeWrapper${it.uiId}`}>
              <RegionNode key={`node${it.uiId}`} dataItem={it} />
            </TransitionContainer>
          );
        }

        if (it.type === TopoNodeTypes.DATA_CENTER && it.visible) {
          return (
            <TransitionContainer stateIn={it.visible} origin="unset" transform="none" key={`nodeWrapper${it.uiId}`}>
              <DataCenter key={`node${it.uiId}`} dataItem={it} />
            </TransitionContainer>
          );
        }

        if (it.type === TopoNodeTypes.SITES && it.visible) {
          if (props.isTopLayer) {
            return (
              <TransitionContainer stateIn={it.visible} origin="unset" transform="none" key={`nodeWrapperTopLayer${it.uiId}`}>
                <SitesNodeTopContainer key={`nodeTopLevel${it.uiId}`} dataItem={it} />
              </TransitionContainer>
            );
          }
          return (
            <TransitionContainer stateIn={it.visible} origin="unset" transform="none" key={`nodeWrapper${it.uiId}`}>
              <SitesNode key={`node${it.uiId}`} dataItem={it} />
            </TransitionContainer>
          );
        }
        return null;
      })}
    </>
  );
};

export default React.memo(NodesWrapper);
