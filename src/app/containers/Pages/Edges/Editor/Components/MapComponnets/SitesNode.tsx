import React from 'react';
import { GroupName, GroupWrapper, NodeHeader, NodeName, NodeWrapper, Office } from './styles';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISvgEdgeGroup } from '../../EdgesMap/helpers';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { DEFAULT_TRANSITION } from 'lib/constants/general';

interface Props {
  data: ISvgEdgeGroup;
  onExpandCollapse: (data: ISvgEdgeGroup) => void;
}

const SitesNode: React.FC<Props> = (props: Props) => {
  const onClickExpandCollapse = () => {
    props.onExpandCollapse(props.data);
  };

  return (
    <NodeWrapper>
      <NodeHeader bg="var(--_organizationInsideBg)">
        <IconWrapper styles={{ margin: '0 4px 0 0' }} width="14px" height="14px" icon={ciscoMerakiLogoIcon(14, 'var(--_primaryTextColor)')} />
        <NodeName>Cisco Meraki</NodeName>
      </NodeHeader>
      <GroupWrapper>
        <GroupName>{props.data.name}</GroupName>
        <IconWrapper
          styles={{ margin: 'auto 0 auto 8px', transform: `${props.data.collapsed ? 'rotate(0)' : 'rotate(-180deg)'}`, transition: `transform ${DEFAULT_TRANSITION}` }}
          width="12px"
          height="12px"
          icon={arrowBottomIcon}
          onClick={onClickExpandCollapse}
        />
      </GroupWrapper>

      {props.data.extIds && props.data.extIds.length ? props.data.extIds.map(it => <Office key={`office${it}`}>{it}</Office>) : null}
    </NodeWrapper>
  );
};

export default React.memo(SitesNode);
