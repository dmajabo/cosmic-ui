import React from 'react';
import { HeaderWrapper, Title, Icon } from './styles';
import VPC from './VPC';

interface IProps {
  name: string;
  extId: string;
  onClick: () => void;
}
const VNetHeder: React.FC<IProps> = (props: IProps) => {
  return (
    <HeaderWrapper title={`VPC ${props.name ? props.name : props.extId}`} onClick={props.onClick}>
      <Icon>{VPC}</Icon>
      <Title>VPC</Title>
      <Title>{props.name ? props.name : props.extId}</Title>
    </HeaderWrapper>
  );
};

export default React.memo(VNetHeder);
