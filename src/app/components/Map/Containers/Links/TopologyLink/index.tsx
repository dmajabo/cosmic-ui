import React from 'react';
import { IConnectionToLink, ILink, TOPOLOGY_LINKS_TYPES } from 'lib/models/topology';
import ConnectedToLink from '../ConnectedToLink';
import DeviceLink from '../DeviceLink';

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
    return <ConnectedToLink dataItem={dataLink as IConnectionToLink} />;
  }
  return <DeviceLink dataItem={dataLink} />;
};

export default React.memo(TopologyLink);
