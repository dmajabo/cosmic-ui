import React from 'react';
import { IVm } from 'lib/models/topology';
import { NODES_CONSTANTS } from 'app/components/Map/model';
import VmNode from 'app/components/Map/Containers/Nodes/Vms/VmNode';
import { IVpcSize } from 'lib/helpers/tree';
import { ContainerWrapper, WrapperVms } from './styles';
import VNetHeder from './VNetHeder';

interface IProps {
  name: string;
  items: IVm[];
  className: string;
  vpcSize: IVpcSize;
  onClickVm: (vm: IVm) => void;
}

const VmsContainer: React.FC<IProps> = (props: IProps) => {
  return (
    <ContainerWrapper className={props.className}>
      <circle cx={NODES_CONSTANTS.VNet.width / 2 + props.vpcSize.r} cy={NODES_CONSTANTS.VNet.height / 2} r={props.vpcSize.r} fill={NODES_CONSTANTS.VNet.VmsContainerFill} pointerEvents="none" />
      <VNetHeder name={props.name} vpcSize={props.vpcSize} />
      <foreignObject x={NODES_CONSTANTS.VNet.width + 8} y={NODES_CONSTANTS.VNet.height / 2 - props.vpcSize.height / 2} width={props.vpcSize.width} height={props.vpcSize.height}>
        <WrapperVms>
          {props.items.map(it => (
            <VmNode key={`${it.id}`} dataItem={it} cols={props.vpcSize.cols} onClick={props.onClickVm} />
          ))}
        </WrapperVms>
      </foreignObject>
    </ContainerWrapper>
  );
};

export default React.memo(VmsContainer);
