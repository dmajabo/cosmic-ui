import React from 'react';
import { GroupName, NodeHeader, NodeName, NodeWrapper, Office } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { ISvgEdgeGroup } from '../../EdgesMap/helpers';

interface Props {
  data: ISvgEdgeGroup;
}

const AppsNode: React.FC<Props> = (props: Props) => {
  return (
    <NodeWrapper>
      <NodeHeader bg="var(--_appsBg)">
        <IconWrapper styles={{ margin: '0 4px 0 0' }} width="14px" height="14px" icon={awsIcon(14, 'var(--_primaryTextColor)', 'var(--_primaryTextColor)')} />
        <NodeName>AWS-Account</NodeName>
      </NodeHeader>
      <GroupName>{props.data.name}</GroupName>
      {/* {props.data.items.map((it, index) => (
        <Office key={`office${index}`}>{it}</Office>
      ))} */}
    </NodeWrapper>
  );
};

export default React.memo(AppsNode);
