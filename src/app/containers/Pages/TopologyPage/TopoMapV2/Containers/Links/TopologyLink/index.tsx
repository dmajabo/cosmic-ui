import React from 'react';
import { IConnectionToLink, ILink, TOPOLOGY_LINKS_TYPES } from 'lib/models/topology';
import ConnectedToLink from '../ConnectedToLink';
import DeviceLink from '../DeviceLink';
import TransitionContainer from '../../TransitionContainer';
import NetworkLink from '../NetworkLink';
import BrenchLink from '../BrenchLink';

interface IProps {
  dataItem: ILink | IConnectionToLink;
}
const TopologyLink: React.FC<IProps> = (props: IProps) => {
  const [dataLink, setDataLink] = React.useState<ILink | IConnectionToLink>(null);

  React.useEffect(() => {
    setDataLink(props.dataItem);
  }, [props.dataItem]);

  if (!dataLink) {
    return null;
  }
  if (dataLink.type === TOPOLOGY_LINKS_TYPES.CONNECTED_TO_LINK) {
    return (
      <TransitionContainer stateIn={dataLink.visible}>
        <ConnectedToLink dataItem={dataLink as IConnectionToLink} />
      </TransitionContainer>
    );
  }
  if (dataLink.type === TOPOLOGY_LINKS_TYPES.NETWORKLINK) {
    return (
      <TransitionContainer stateIn={dataLink.visible}>
        <NetworkLink
          id={dataLink.id}
          type={dataLink.type}
          targetId={dataLink.targetId}
          sourceId={dataLink.sourceId}
          targetType={dataLink.targetType}
          sourceType={dataLink.sourceType}
          x1={dataLink.sourceCoord.x}
          y1={dataLink.sourceCoord.y}
          x2={dataLink.targetCoord.x}
          y2={dataLink.targetCoord.y}
        />
      </TransitionContainer>
    );
  }
  if (dataLink.type === TOPOLOGY_LINKS_TYPES.NETWORK_BRENCH_LINK) {
    return (
      <TransitionContainer stateIn={dataLink.visible}>
        <BrenchLink
          id={dataLink.id}
          type={dataLink.type}
          targetId={dataLink.targetId}
          sourceId={dataLink.sourceId}
          targetType={dataLink.targetType}
          sourceType={dataLink.sourceType}
          x1={dataLink.sourceCoord.x}
          y1={dataLink.sourceCoord.y}
          x2={dataLink.targetCoord.x}
          y2={dataLink.targetCoord.y}
        />
      </TransitionContainer>
    );
  }
  return (
    <TransitionContainer stateIn={dataLink.visible}>
      <DeviceLink
        id={dataLink.id}
        type={dataLink.type}
        targetId={dataLink.targetId}
        sourceId={dataLink.sourceId}
        targetType={dataLink.targetType}
        sourceType={dataLink.sourceType}
        x1={dataLink.sourceCoord.x}
        y1={dataLink.sourceCoord.y}
        x2={dataLink.targetCoord.x}
        y2={dataLink.targetCoord.y}
      />
    </TransitionContainer>
  );
};

export default React.memo(TopologyLink);
