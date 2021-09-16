import React from 'react';
import { NODES_CONSTANTS } from 'app/components/Map/model';
import { HeaderWrapper, Title } from './styles';
import { IVpcSize } from 'lib/helpers/tree';

interface IProps {
  name: string;
  vpcSize: IVpcSize;
}
const VNetHeder: React.FC<IProps> = (props: IProps) => {
  return (
    <g>
      <foreignObject x={NODES_CONSTANTS.VNet.width / 2 + props.vpcSize.r / 2} y={-props.vpcSize.r + NODES_CONSTANTS.VNet.height / 2 + 10} width={props.vpcSize.r} height="24">
        <HeaderWrapper title={`VPC ${props.name}`}>
          <Title>VPC</Title>
          <Title>{props.name}</Title>
        </HeaderWrapper>
      </foreignObject>
    </g>
  );
};

export default React.memo(VNetHeder);
