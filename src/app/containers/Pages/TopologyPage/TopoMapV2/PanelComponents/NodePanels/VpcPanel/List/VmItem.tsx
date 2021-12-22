import React from 'react';
import { Label, VmWrapStyles } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { vmIcon } from 'app/components/SVGIcons/topologyIcons/vm';
import { INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  dataItem: INetworkVM;
  onClick: (_item: INetworkVM) => void;
}

const VmItem: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    props.onClick(props.dataItem);
  };
  return (
    <VmWrapStyles onClick={onClick} title={props.dataItem.extId}>
      <IconWrapper icon={vmIcon} width="20px" height="20px" styles={{ margin: '0 12px 0 0' }} />
      <Label>{props.dataItem.name ? props.dataItem.name : props.dataItem.extId}</Label>
    </VmWrapStyles>
  );
};

export default React.memo(VmItem);
