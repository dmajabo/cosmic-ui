import React from 'react';
import { ITopologyGroup, IVm } from 'lib/models/topology';
import VmItem from './VmItem';

interface Props {
  group: ITopologyGroup;
  dataItems: IVm[];
  onSelectVm: (item: IVm) => void;
}

const VmList: React.FC<Props> = (props: Props) => {
  const onSelectVm = (item: IVm) => {
    props.onSelectVm(item);
  };

  return (
    <>
      {props.dataItems.map(it => (
        <VmItem key={`panelVm${it.id}`} dataItem={it} onClick={onSelectVm} />
      ))}
    </>
  );
};

export default React.memo(VmList);
