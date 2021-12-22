import React from 'react';
import { WrapperVms } from './styles';
import VmNode from '../Vms/VmNode';
import { INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';

interface IProps {
  name: string;
  items: INetworkVM[];
  isGroupPresent: boolean;
  showMore: boolean;
  onClickVm: (vm: INetworkVM) => void;
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
