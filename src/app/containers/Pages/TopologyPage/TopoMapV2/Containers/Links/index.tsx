import React from 'react';
import { ITopoLink, TopoLinkTypes } from 'lib/hooks/Topology/models';
import { IObject } from 'lib/models/general';
import NetworkNetworkLink from './NetworkNetworkLink';
import VPNLink from './VPNLink';
import PeerConnectionLink from './PeerConnectionLink';

interface Props {
  links: IObject<ITopoLink<any, any, any>>;
}

const LinksWrapper: React.FC<Props> = (props: Props) => {
  return (
    <g>
      {Object.keys(props.links).map((key, i) => {
        if (props.links[key].type === TopoLinkTypes.NetworkNetworkLink) {
          return <NetworkNetworkLink key={props.links[key].id} dataItem={props.links[key]} visible={props.links[key].visible} />;
        }
        if (props.links[key].type === TopoLinkTypes.VPNLink) {
          return <VPNLink key={props.links[key].id} dataItem={props.links[key]} visible={props.links[key].visible} />;
        }
        if (props.links[key].type === TopoLinkTypes.PeerConnectionLink) {
          return <PeerConnectionLink key={props.links[key].id} dataItem={{ ...props.links[key] }} visible={props.links[key].visible} />;
        }
        return null;
      })}
    </g>
  );
};

export default React.memo(LinksWrapper);
