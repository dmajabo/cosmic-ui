import React from 'react';
import { IEdgeModel } from 'lib/api/ApiModels/Edges/apiModel';
import Header from './Header';
import { getFilterdList } from 'lib/helpers/listHelper';
import EdgeItem from './EdgeItem';
import { EdgeListItemsWrapper } from './styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';

interface Props {
  data: IEdgeModel[];
  onCreate: () => void;
  onEdit: (_item: IEdgeModel) => void;
  onDelete: (_item: IEdgeModel) => void;
}

const EdgeList: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [filteredList, setFilteredList] = React.useState<IEdgeModel[]>(null);

  React.useEffect(() => {
    const _arr: IEdgeModel[] = getFilterdList(props.data, edges.searchQuery, ['name']);
    setFilteredList(_arr);
  }, [props.data, edges.searchQuery]);

  const onSearchChange = (v: string | null) => {
    edges.onSearchChange(v);
  };
  const onEdit = (_item: IEdgeModel) => {
    props.onEdit(_item);
  };
  const onDelete = (_item: IEdgeModel) => {
    props.onDelete(_item);
  };
  return (
    <>
      <Header searchQuery={edges.searchQuery} onCreateEdge={props.onCreate} handleSearchChange={onSearchChange} />
      <EdgeListItemsWrapper>
        {filteredList && filteredList.length ? filteredList.map(it => <EdgeItem key={`${it.id}edge`} dataItem={it} onEdit={onEdit} onDelete={onDelete} />) : null}
      </EdgeListItemsWrapper>
    </>
  );
};

export default React.memo(EdgeList);
