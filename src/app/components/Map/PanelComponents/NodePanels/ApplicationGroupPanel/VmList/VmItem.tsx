import React from 'react';
import { IVm } from 'lib/models/topology';
import { Label, VmWrapStyles } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { vmIcon } from 'app/components/SVGIcons/topologyIcons/vm';

interface Props {
  dataItem: IVm;
  onClick: (_item: IVm) => void;
}

const VmItem: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    props.onClick(props.dataItem);
  };
  return (
    <VmWrapStyles onClick={onClick}>
      <IconWrapper icon={vmIcon} width="20px" height="20px" styles={{ margin: '0 12px 0 0' }} />
      <Label>{props.dataItem.extId}</Label>
    </VmWrapStyles>
  );
};

export default React.memo(VmItem);
