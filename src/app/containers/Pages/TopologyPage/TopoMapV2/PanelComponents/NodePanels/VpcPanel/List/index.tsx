import React from 'react';
import { IApplication_Group } from 'lib/models/topology';
import VmItem from './VmItem';
import { isObjectHasField } from 'lib/helpers/general';
import ExpandedItem from './ExpandedItem';
import { INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';
import { EmptyMessage } from 'app/containers/Pages/Edges/Editor/Components/styles';

interface Props {
  dataItems: (INetworkVM | IApplication_Group)[];
  onSelectVm: (item: INetworkVM) => void;
}

const List: React.FC<Props> = (props: Props) => {
  const onSelectVm = (item: INetworkVM) => {
    props.onSelectVm(item);
  };

  return (
    <>
      {props.dataItems && props.dataItems.length ? (
        props.dataItems.map(it => {
          if (isObjectHasField(it, 'expanded')) {
            return <ExpandedItem key={`panelListItem${it.id}`} dataItem={it as IApplication_Group} onClickVm={onSelectVm} />;
          }
          return <VmItem key={`panelListItem${it.id}`} dataItem={it as INetworkVM} onClick={onSelectVm} />;
        })
      ) : (
        <EmptyMessage>No data items</EmptyMessage>
      )}
    </>
  );
};

export default React.memo(List);
