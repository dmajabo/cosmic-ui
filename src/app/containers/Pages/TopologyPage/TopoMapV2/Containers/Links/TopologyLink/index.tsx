import React from 'react';
import { ITopoLink, TopoLinkTypes } from 'lib/hooks/Topology/models';
import NetworkNetworkLink from '../NetworkNetworkLink';
import VPNLink from '../VPNLink';

interface IProps {
  links: ITopoLink<any, any, any, any, any>[];
}
const TopologyLink: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      {props.links.map(link => {
        if (link.type === TopoLinkTypes.NetworkNetworkLink) {
          return <NetworkNetworkLink dataItem={link} key={`${TopoLinkTypes.NetworkNetworkLink}${link.id}`} />;
        }
        if (link.type === TopoLinkTypes.VPNLink) {
          return <VPNLink dataItem={link} key={`${TopoLinkTypes.VPNLink}${link.id}`} />;
        }
        return null;
      })}
    </>
  );
};

export default React.memo(TopologyLink);
