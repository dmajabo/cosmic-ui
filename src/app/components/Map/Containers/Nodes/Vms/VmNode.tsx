import React from 'react';
import { IVm } from 'lib/models/topology';
import { Label, VmNodeStyles } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { vmIcon } from 'app/components/SVGIcons/topologyIcons/vm';
import { NODES_CONSTANTS } from 'app/components/Map/model';

interface IProps {
  dataItem: IVm;
  onClick: (vm: IVm) => void;
}
const VmNode: React.FC<IProps> = (props: IProps) => {
  const onClick = () => {
    props.onClick(props.dataItem);
  };
  return (
    <VmNodeStyles data-type={NODES_CONSTANTS.VM.type} title={props.dataItem.name} onClick={onClick}>
      <IconWrapper icon={vmIcon} width={`${NODES_CONSTANTS.VM.iconSize}px`} height={`${NODES_CONSTANTS.VM.iconSize}px`} />
      <Label>{props.dataItem.name}</Label>
    </VmNodeStyles>
  );
};

export default React.memo(VmNode);
