import React from 'react';
import { GroupName, NodeHeader, NodeName, NodeWrapper, Office } from './styles';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISvgEdgeGroup } from '../../EdgesMap/helpers';

interface Props {
  data: ISvgEdgeGroup;
}

const SitesNode: React.FC<Props> = (props: Props) => {
  return (
    <NodeWrapper>
      <NodeHeader bg="var(--_organizationInsideBg)">
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
