import React from 'react';
import { IEdgeP } from 'lib/api/ApiModels/Edges/apiModel';
import Header from './Header';
import { getFilteredList, getFilteredListByBoolean, getSearchedList, getUniqueItems } from 'lib/helpers/listHelper';
import EdgeItem from './EdgeItem';
import { EdgeListItemsWrapper } from './styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import PanelBar from 'app/components/Basic/PanelBar';
import { IObject, IPanelBarLayoutTypes } from 'lib/models/general';
import { ContentPanelWrapper, PanelLabel } from 'app/components/Basic/PanelBar/styles';
import { PageWithPanelWrapperStyles } from '../../Shared/styles';
import { FilterGroupsWrapper } from 'app/components/Basic/FilterComponents/styles';
import FilterGroup from 'app/components/Basic/FilterComponents/FilterGroup';
import EdgeFilterGroup from './EdgeFilterGroup';
import EdgeStatusFilterGroup from './EdgeStatusFilterGroup';

interface Props {
  data: IEdgeP[];
  onCreate: () => void;
  onEdit: (_item: IEdgeP) => void;
  onDelete: (_item: IEdgeP) => void;
}

const EdgeList: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [showFilterPanel, setShowFilterPanel] = React.useState<boolean>(false);
  const [filteredList, setFilteredList] = React.useState<IEdgeP[]>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<IObject<string>>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<IObject<string>>(null);

  React.useEffect(() => {
    if (props.data && props.data.length) {
      const _tags = getUniqueItems(props.data.map(it => [...it.tags]).flat());
      setTags(_tags);
    } else {
      setTags([]);
    }
  }, [props.data]);

  React.useEffect(() => {
    let _arr: IEdgeP[] = getSearchedList(props.data, edges.searchQuery, ['name']);
    if (selectedTags) {
      _arr = getFilteredList(_arr, {
        tags: Object.keys(selectedTags)
          .map(it => selectedTags[it])
          .flat(),
      });
    }
    if (selectedStatus) {
      _arr = getFilteredListByBoolean(
        _arr,
        '',
        Object.keys(selectedStatus).map(it => selectedStatus[it]),
      );
    }
    setFilteredList(_arr);
  }, [props.data, edges.searchQuery, selectedTags, selectedStatus]);

  const onSearchChange = (v: string | null) => {
    edges.onSearchChange(v);
  };
  const onEdit = (_item: IEdgeP) => {
    props.onEdit(_item);
  };
  const onDelete = (_item: IEdgeP) => {
    props.onDelete(_item);
  };

  const onSelectFilteredTag = (v: string) => {
    if (!selectedTags) {
      const _obj: IObject<string> = {};
      _obj[v] = v;
      setSelectedTags(_obj);
      return;
    }
    const _obj: IObject<string> = { ...selectedTags };
    if (_obj[v]) {
      delete _obj[v];
      if (!Object.keys(_obj).length) {
        setSelectedTags(null);
        return;
      }
    } else {
      _obj[v] = v;
    }
    setSelectedTags(_obj);
  };

  const onSelectFilteredStatus = (v: string) => {
    if (!selectedStatus) {
      const _obj: IObject<string> = {};
      _obj[v] = v;
      setSelectedStatus(_obj);
      return;
    }
    const _obj: IObject<string> = { ...selectedStatus };
    if (_obj[v]) {
      delete _obj[v];
      if (!Object.keys(_obj).length) {
        setSelectedStatus(null);
        return;
      }
    } else {
      _obj[v] = v;
    }
    setSelectedStatus(_obj);
  };

  const onOpenFilterPanel = () => {
    setShowFilterPanel(true);
  };
  const onHideFilterPanel = () => {
    setShowFilterPanel(false);
  };
  return (
    <ContentPanelWrapper>
      <PageWithPanelWrapperStyles width={showFilterPanel ? 'calc(100% - 520px)' : '100%'}>
        <Header searchQuery={edges.searchQuery} onCreateEdge={() => props.onCreate()} handleSearchChange={onSearchChange} onOpenFilterPanel={onOpenFilterPanel} />
        <EdgeListItemsWrapper>
          {filteredList && filteredList.length ? filteredList.map(it => <EdgeItem key={`${it.id}edge`} dataItem={it} onEdit={onEdit} onDelete={onDelete} />) : null}
        </EdgeListItemsWrapper>
      </PageWithPanelWrapperStyles>
      <PanelBar
        styles={{ position: 'fixed', top: '81px', right: '0', maxHeight: 'calc(100% - 81px)', zIndex: 11 }}
        maxWidth="520px"
        show={showFilterPanel}
        onHidePanel={onHideFilterPanel}
        type={IPanelBarLayoutTypes.VERTICAL}
      >
        <FilterGroupsWrapper>
          <PanelLabel>Filter</PanelLabel>
          <FilterGroup maxGroupHeight="260px" defaultOpen label="Tag" styles={{ margin: '0 0 5px 0' }}>
            <EdgeFilterGroup dataKey="tags" data={tags} selectedItems={selectedTags} onClick={onSelectFilteredTag} />
          </FilterGroup>
          <FilterGroup label="Status">
            <EdgeStatusFilterGroup selectedItems={selectedStatus} onClick={onSelectFilteredStatus} />
          </FilterGroup>
        </FilterGroupsWrapper>
      </PanelBar>
    </ContentPanelWrapper>
  );
};

export default React.memo(EdgeList);
