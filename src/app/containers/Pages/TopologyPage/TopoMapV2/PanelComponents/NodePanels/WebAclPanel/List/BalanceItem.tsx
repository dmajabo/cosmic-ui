import React from 'react';
import { Label, BalanceWrapStyles } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { INetworkLoadBalancer } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  dataItem: INetworkLoadBalancer;
  icon: any;
  onClick: (_item: INetworkLoadBalancer) => void;
}

const BalanceItem: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    props.onClick(props.dataItem);
  };
  return (
    <BalanceWrapStyles onClick={onClick} title={props.dataItem.extId}>
      <IconWrapper icon={props.icon} width="20px" height="20px" styles={{ margin: '0 12px 0 0' }} />
      <Label>{props.dataItem.name ? props.dataItem.name : props.dataItem.extId}</Label>
    </BalanceWrapStyles>
  );
};

export default React.memo(BalanceItem);
