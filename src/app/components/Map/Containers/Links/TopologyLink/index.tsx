import React from 'react';
import { IConnectionToLink, ILink, TOPOLOGY_LINKS_TYPES } from 'lib/models/topology';
import ConnectedToLink from '../ConnectedToLink';
import DeviceLink from '../DeviceLink';

interface IProps {
  dataItem: ILink | IConnectionToLink;
}
const TopologyLink: React.FC<IProps> = (props: IProps) => {
  if (props.dataItem.type === TOPOLOGY_LINKS_TYPES.CONNECTED_TO_LINK) {
    return <ConnectedToLink dataItem={props.dataItem as IConnectionToLink} />;
  }
  return <DeviceLink dataItem={props.dataItem} />;
};

export default React.memo(TopologyLink);
