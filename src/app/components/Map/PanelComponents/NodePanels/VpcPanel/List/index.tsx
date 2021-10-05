import React from 'react';
import { IApplication_Group, IVm } from 'lib/models/topology';
import VmItem from './VmItem';
import { isObjectHasField } from 'lib/helpers/general';
import ExpandedItem from './ExpandedItem';

interface Props {
  dataItems: (IVm | IApplication_Group)[];
  onSelectVm: (item: IVm) => void;
}

const List: React.FC<Props> = (props: Props) => {
  const onSelectVm = (item: IVm) => {
    props.onSelectVm(item);
  };

  return (
    <>
      {props.dataItems.map(it => {
        if (isObjectHasField(it, 'expanded')) {
          return <ExpandedItem key={`panelListItem${it.id}`} dataItem={it as IApplication_Group} onClickVm={onSelectVm} />;
        }
        return <VmItem key={`panelListItem${it.id}`} dataItem={it as IVm} onClick={onSelectVm} />;
      })}
    </>
  );
};

export default React.memo(List);
