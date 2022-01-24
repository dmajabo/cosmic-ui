import React from 'react';
import { GridWrapper, ModalLabel, ModalRow } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { INetworkTag, INetworkTagsRes } from 'lib/api/ApiModels/Topology/apiModels';
import { IUiPagingData } from 'lib/api/ApiModels/generalApiModel';
import { ISegmentApplicationSegMatchRuleP, SegmentApplicationSegMatchKey, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { paramBuilder, TAGS_RESOURCE_TYPE } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';

interface Props {
  matchRules: ISegmentApplicationSegMatchRuleP[];
  onSelectChange: (type: SegmentSegmentType, item: ISegmentApplicationSegMatchRuleP) => void;
  onSelectAll: (type: SegmentSegmentType, rules: ISegmentApplicationSegMatchRuleP[]) => void;
}

const VmsTable: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading: tagsLoading, response: tagsRes, error: tagsError, onGet: onGetTags } = useGet<INetworkTagsRes>();
  const [columns] = React.useState<GridColDef[]>([
    {
      field: 'key',
      headerName: 'Key',
      width: 220,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 220,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'ownerId',
      headerName: 'Owner ID',
      width: 140,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
  ]);
  const gridStyles = GridStyles();
  const [selectedAppMatchKey, setSelectedAppMatchKey] = React.useState<SegmentApplicationSegMatchKey>(SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [tags, setTags] = React.useState<INetworkTag[]>([]);
  const [tagsPagingData, setTagsPagingData] = React.useState<IUiPagingData>({
    totalCount: 0,
    pageOffset: 1,
    pageSize: 10,
  });

  React.useEffect(() => {
    onTryLoadTags(tagsPagingData);
  }, [selectedAppMatchKey]);

  React.useEffect(() => {
    const _ids = [];
    if (tags && tags.length && props.matchRules && props.matchRules.length) {
      props.matchRules.forEach(it => {
        const _el = tags.find(item => it.matchKey === SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG && item.key === it.matchValuePrimary && item.value === it.matchValueSecondary);
        if (_el) {
          const _id = _el.id || `${_el.key}${_el.value}`;
          _ids.push(_id);
        }
      });
    }
    setSelectionModel(_ids);
  }, [props.matchRules, tags]);

  React.useEffect(() => {
    if (tagsRes) {
      if (tagsRes.tags && tagsRes.tags.length) {
        setTagsPagingData({ ...tagsPagingData, totalCount: tagsRes.totalCount });
        setTags(tagsRes.tags);
      } else {
        setTags([]);
      }
    }
  }, [tagsRes]);

  const onRowClick = (params: GridRowParams) => {
    const _item = params.row as INetworkTag;
    const rule: ISegmentApplicationSegMatchRuleP = {
      matchKey: selectedAppMatchKey,
      matchValuePrimary: _item.key,
      matchValueSecondary: _item.value,
    };
    props.onSelectChange(SegmentSegmentType.APPLICATION, rule);
  };

  const onColumnHeaderClick = (params: GridColumnHeaderParams) => {
    if (params.field === '__check__') {
      const _items: ISegmentApplicationSegMatchRuleP[] = [];
      tags.forEach(it => {
        const rule: ISegmentApplicationSegMatchRuleP = {
          matchKey: selectedAppMatchKey,
          matchValuePrimary: it.key,
          matchValueSecondary: it.value,
        };
        _items.push(rule);
      });
      props.onSelectAll(SegmentSegmentType.APPLICATION, _items);
    }
  };

  const onChangePage = (page: number) => {
    const _obj: IUiPagingData = { ...tagsPagingData, pageOffset: page };
    setTagsPagingData(_obj);
    onTryLoadTags(_obj);
  };
  const onChangePageSize = (size: number, page?: number) => {
    const _obj: IUiPagingData = { ...tagsPagingData, pageSize: size };
    if (page) {
      _obj.pageOffset = page;
    }
    setTagsPagingData(_obj);
    onTryLoadTags(_obj);
  };

  const onTryLoadTags = async (pageData: IUiPagingData) => {
    const _param = paramBuilder(pageData.pageSize, pageData.pageOffset, null, TAGS_RESOURCE_TYPE.Vm);
    await onGetTags(TopoApi.getTags(), userContext.accessToken!, _param);
  };

  return (
    <>
      <ModalRow margin="0 0 20px 0">
        <MatSelect
          id="appMatchKeyType"
          label="Key"
          value={selectedAppMatchKey}
          options={[SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG]}
          styles={{ height: '72px', minHeight: '72px', margin: '0' }}
          selectStyles={{ height: '50px', width: '100%' }}
          selectClaassName="withLabel"
          onChange={v => setSelectedAppMatchKey(v)}
          readOnly
          renderValue={(v: SegmentApplicationSegMatchKey) => {
            if (v === SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG) return <ValueLabel>Tag</ValueLabel>;
            return <ValueLabel>{v}</ValueLabel>;
          }}
          renderOption={(v: SegmentApplicationSegMatchKey) => {
            if (v === SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG) return 'Tag';
            return v;
          }}
        />
      </ModalRow>
      <ModalRow margin="0 0 10px 0" align="center">
        <ModalLabel>VMs</ModalLabel>
      </ModalRow>
      <GridWrapper>
        <DataGrid
          disableColumnFilter
          className={gridStyles.borderedRow}
          headerHeight={50}
          rowHeight={50}
          hideFooter
          rowCount={tagsPagingData.totalCount}
          rows={tags}
          columns={columns}
          checkboxSelection
          onRowClick={onRowClick}
          onColumnHeaderClick={onColumnHeaderClick}
          selectionModel={selectionModel}
          loading={tagsLoading}
          error={tagsError ? tagsError.message : null}
          components={{
            NoRowsOverlay: () => (
              <AbsLoaderWrapper width="100%" height="100%">
                <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
                  No data
                </ErrorMessage>
              </AbsLoaderWrapper>
            ),
            ErrorOverlay: () => <ErrorMessage margin="auto">{tagsError ? tagsError.message : null}</ErrorMessage>,
            LoadingOverlay: () => (
              <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
                <LoadingIndicator margin="auto" />
              </AbsLoaderWrapper>
            ),
            BaseCheckbox: React.forwardRef(({ checked, onChange, indeterminate }, ref) => (
              <SimpleCheckbox ref={ref} isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />
            )),
          }}
        />
      </GridWrapper>
      <Paging
        count={tagsPagingData.totalCount}
        disabled={!tags.length || tagsPagingData.totalCount === 0}
        pageSize={tagsPagingData.pageSize}
        currentPage={tagsPagingData.pageOffset}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
        boundaryCount={0}
        siblingCount={0}
        pageSizeValues={[5, 10, 20, 50]}
        hideLabelAfter
        showFirstButton={false}
        showLastButton={false}
        pagingWrapStyles={{ height: '52px', paddingTop: '12px' }}
        selectWrapStyles={{ maxWidth: '150px' }}
        hideRange={680}
      />
    </>
  );
};

export default React.memo(VmsTable);
