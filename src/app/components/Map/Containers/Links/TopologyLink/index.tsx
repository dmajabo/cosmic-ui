import React from 'react';
import { IConnectionToLink, ILink, TOPOLOGY_LINKS_TYPES } from 'lib/models/topology';
import ConnectedToLink from '../ConnectedToLink';
import DeviceLink from '../DeviceLink';
import TransitionContainer from '../../TransitionContainer';

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
  return (
    <TransitionContainer stateIn={dataLink.visible}>
      <DeviceLink dataItem={dataLink} />
    </TransitionContainer>
  );
};

export default React.memo(TopologyLink);
