import React from 'react';
import { GroupName, NodeText, NodeWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ISvgTransitNode } from '../../EdgesMap/helpers';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { DeploymentTypes } from 'lib/api/ApiModels/Edges/apiModel';
import { wedgeIcon } from 'app/components/SVGIcons/topologyIcons/wedge';

interface Props {
  data: ISvgTransitNode;
}

const TransitNode: React.FC<Props> = (props: Props) => {
  return (
    <NodeWrapper style={{ padding: '12px 10px' }}>
      {props.data.type === DeploymentTypes.NEW_REGIONS && <IconWrapper styles={{ margin: '8px auto 8px auto' }} width="34px" height="34px" icon={logoIcon()} />}
      {props.data.type === DeploymentTypes.EXISTING_GWS && <IconWrapper styles={{ margin: '8px auto 8px auto' }} width="34px" height="34px" icon={wedgeIcon()} />}
      <GroupName style={{ margin: '8px auto 4px auto' }}>Okulis Edge</GroupName>
      <NodeText>{props.data.name}</NodeText>
    </NodeWrapper>
  );
};

export default React.memo(TransitNode);
