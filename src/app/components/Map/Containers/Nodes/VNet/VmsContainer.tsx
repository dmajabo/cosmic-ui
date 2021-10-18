import React from 'react';
import { IVm } from 'lib/models/topology';
import { WrapperVms } from './styles';
import VmNode from '../Vms/VmNode';

interface IProps {
  name: string;
  items: IVm[];
  isGroupPresent: boolean;
  showMore: boolean;
  onClickVm: (vm: IVm) => void;
}

const VmsContainer: React.FC<IProps> = (props: IProps) => {
  return (
    <WrapperVms showMore={props.showMore}>
      {props.items.map(it => {
        if (it.selectorGroup && props.isGroupPresent) return null;
        return <VmNode key={`vm${it.uiId}`} dataItem={it} onClick={props.onClickVm} />;
      })}
    </WrapperVms>
  );
};

export default React.memo(VmsContainer);
