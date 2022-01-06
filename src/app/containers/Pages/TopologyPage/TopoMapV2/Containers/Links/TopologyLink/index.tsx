import React from 'react';
import TransitionContainer from '../../TransitionContainer';
import { ITopoLink, TopoLinkTypes } from 'lib/hooks/Topology/models';
import NetworkNetworkLink from '../NetworkNetworkLink';
import VPNLink from '../VPNLink';

interface IProps {
  dataItem: ITopoLink<any, any, any, any, any>;
}
const TopologyLink: React.FC<IProps> = (props: IProps) => {
  if (props.dataItem.type === TopoLinkTypes.NetworkNetworkLink) {
    return (
      <TransitionContainer stateIn={props.dataItem.visible}>
        <NetworkNetworkLink dataItem={props.dataItem} />
      </TransitionContainer>
    );
  }
  if (props.dataItem.type === TopoLinkTypes.VPNLink) {
    return (
      <TransitionContainer stateIn={props.dataItem.visible}>
        <VPNLink dataItem={props.dataItem} />
      </TransitionContainer>
    );
  }
  return null;
  // if (dataLink.type === TOPOLOGY_LINKS_TYPES.NETWORKLINK) {
  //   return (
  //     <TransitionContainer stateIn={dataLink.visible}>
  //       <NetworkLink
  //         id={dataLink.id}
  //         type={dataLink.type}
  //         targetId={dataLink.targetId}
  //         sourceId={dataLink.sourceId}
  //         targetType={dataLink.targetType}
  //         sourceType={dataLink.sourceType}
  //         x1={dataLink.sourceCoord.x}
  //         y1={dataLink.sourceCoord.y}
  //         x2={dataLink.targetCoord.x}
  //         y2={dataLink.targetCoord.y}
  //       />
  //     </TransitionContainer>
  //   );
  // }
  // if (dataLink.type === TOPOLOGY_LINKS_TYPES.NETWORK_BRENCH_LINK) {
  //   return (
  //     <TransitionContainer stateIn={dataLink.visible}>
  //       <BrenchLink
  //         id={dataLink.id}
  //         type={dataLink.type}
  //         targetId={dataLink.targetId}
  //         sourceId={dataLink.sourceId}
  //         targetType={dataLink.targetType}
  //         sourceType={dataLink.sourceType}
  //         x1={dataLink.sourceCoord.x}
  //         y1={dataLink.sourceCoord.y}
  //         x2={dataLink.targetCoord.x}
  //         y2={dataLink.targetCoord.y}
  //       />
  //     </TransitionContainer>
  //   );
  // }
  // return (
  //   <TransitionContainer stateIn={dataLink.visible}>
  //     <DeviceLink
  //       id={dataLink.id}
  //       type={dataLink.type}
  //       targetId={dataLink.targetId}
  //       sourceId={dataLink.sourceId}
  //       targetType={dataLink.targetType}
  //       sourceType={dataLink.sourceType}
  //       x1={dataLink.sourceCoord.x}
  //       y1={dataLink.sourceCoord.y}
  //       x2={dataLink.targetCoord.x}
  //       y2={dataLink.targetCoord.y}
  //     />
  //   </TransitionContainer>
  // );
};

export default React.memo(TopologyLink);
