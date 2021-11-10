import React from 'react';
import { IEdgeGroup } from '../../../model';
import { GroupName, NodeHeader, NodeName, NodeWrapper, Office } from './styles';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface Props {
  data: IEdgeGroup;
}

const SitesNode: React.FC<Props> = (props: Props) => {
  return (
    <NodeWrapper>
      <NodeHeader bg="var(--_sitesBg)">
        <IconWrapper styles={{ margin: '0 4px 0 0' }} width="14px" height="14px" icon={ciscoMerakiLogoIcon(14, 'var(--_primaryTextColor)')} />
        <NodeName>Cisco Meraki</NodeName>
      </NodeHeader>
      <GroupName>{props.data.name}</GroupName>
      {props.data.items.map((it, index) => (
        <Office key={`office${index}`}>{it}</Office>
      ))}
    </NodeWrapper>
  );
};

export default React.memo(SitesNode);
