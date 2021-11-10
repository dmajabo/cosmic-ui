import React from 'react';
import { GroupName, NodeText, NodeWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISvgTransitNode } from '../../EdgesMap/helpers';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';

interface Props {
  data: ISvgTransitNode;
}

const TransitNode: React.FC<Props> = (props: Props) => {
  return (
    <NodeWrapper style={{ padding: '12px 10px' }}>
      <IconWrapper styles={{ margin: '0 auto 8px auto' }} width="26px" height="26px" icon={logoIcon()} />
      <GroupName style={{ margin: '0 auto 2px auto', height: '13px', fontSize: '10px', lineHeight: '13px' }}>Okulis Edge</GroupName>
      <NodeText>{props.data.name}</NodeText>
    </NodeWrapper>
  );
};

export default React.memo(TransitNode);
