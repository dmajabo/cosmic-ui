import React from 'react';
import { ITopoNode, TopoNodeTypes } from 'lib/hooks/Topology/models';
import RegionNode from './RegionNode';
import AccountNode from './AccountNode';
import DataCenter from './DataCenter';
import SitesNode from './SitesNode';
import TransitionContainer from '../../TransitionContainer';

interface Props {
  nodes: ITopoNode<any, any>[];
}

const NodesWrapper: React.FC<Props> = (props: Props) => {
  if (!props.nodes || !props.nodes.length) return null;
  return (
    <>
      {props.nodes.map(it => {
        if (it.type === TopoNodeTypes.ACCOUNT) {
          return (
            <TransitionContainer stateIn={it.visible} origin="unset" transform="none">
              <AccountNode key={`node${it.uiId}`} dataItem={it} />
            </TransitionContainer>
          );
        }

        if (it.type === TopoNodeTypes.REGION) {
          return (
            <TransitionContainer stateIn={it.visible} origin="unset" transform="none">
              <RegionNode key={`node${it.uiId}`} dataItem={it} />
            </TransitionContainer>
          );
        }

        if (it.type === TopoNodeTypes.DATA_CENTER) {
          return (
            <TransitionContainer stateIn={it.visible} origin="unset" transform="none">
              <DataCenter key={`node${it.uiId}`} dataItem={it} />
            </TransitionContainer>
          );
        }

        if (it.type === TopoNodeTypes.SITES) {
          return (
            <TransitionContainer stateIn={it.visible} origin="unset" transform="none">
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
