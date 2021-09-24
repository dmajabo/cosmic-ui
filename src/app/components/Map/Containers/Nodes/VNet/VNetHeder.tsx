import React from 'react';
import { HeaderWrapper, Title, Icon } from './styles';
import VPC from './VPC';

interface IProps {
  name: string;
}
const VNetHeder: React.FC<IProps> = (props: IProps) => {
  return (
    <HeaderWrapper title={`VPC ${props.name}`}>
      <Icon>{VPC}</Icon>
      <Title>VPC</Title>
      <Title>{props.name}</Title>
    </HeaderWrapper>
  );
};

export default React.memo(VNetHeder);
