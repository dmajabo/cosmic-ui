import React from 'react';
import { Label, VmNodeStyles } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { vmIcon } from 'app/components/SVGIcons/topologyIcons/vm';
import { NODES_CONSTANTS } from 'app/components/Map/model';
import { INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';

interface IProps {
  dataItem: INetworkVM;
  onClick: (vm: INetworkVM) => void;
}
const VmNode: React.FC<IProps> = (props: IProps) => {
  const onClick = () => {
    props.onClick(props.dataItem);
  };
  return (
    <VmNodeStyles data-type={NODES_CONSTANTS.VM.type} title={props.dataItem.name ? props.dataItem.name : props.dataItem.extId} onClick={onClick}>
      <IconWrapper icon={vmIcon} width={`${NODES_CONSTANTS.VM.iconSize}px`} height={`${NODES_CONSTANTS.VM.iconSize}px`} />
      <Label>{props.dataItem.name ? props.dataItem.name : props.dataItem.extId}</Label>
    </VmNodeStyles>
  );
};

export default React.memo(VmNode);
