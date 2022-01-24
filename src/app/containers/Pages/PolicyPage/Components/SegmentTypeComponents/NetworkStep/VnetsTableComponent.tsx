import React from 'react';
import { GridWrapper, ModalLabel, ModalRow } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ISegmentNetworkSegMatchRuleP, SegmentNetworkSegMatchKey } from 'lib/api/ApiModels/Policy/Segment';
import { INetworkVNetwork } from 'lib/api/ApiModels/Topology/apiModels';
import { IUiPagingData } from 'lib/api/ApiModels/generalApiModel';
import { GridCellWrapper } from 'app/components/Grid/styles';
interface Props {
  data: INetworkVNetwork[];
  matchRules: ISegmentNetworkSegMatchRuleP[];
  pagingData: IUiPagingData;
  onSelectChange: (type: SegmentNetworkSegMatchKey, item: INetworkVNetwork) => void;
  onSelectAll: (type: SegmentNetworkSegMatchKey, items: INetworkVNetwork[]) => void;
  onChangePage: (type: SegmentNetworkSegMatchKey, _page: number) => void;
  onChangePageSize: (type: SegmentNetworkSegMatchKey, size: number, _page?: number) => void;
  error: string;
  loading: boolean;
}

const VnetsTableComponent: React.FC<Props> = (props: Props) => {
  const [columns] = React.useState<GridColDef[]>([
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
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
      field: 'extId',
      headerName: 'Ext ID',
      width: 220,
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
      width: 160,
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
      field: 'tags',
      headerName: 'Tags',
      minWidth: 300,
      flex: 1,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => {
        if (!param.value || !param.value.length) return null;
        return <GridCellWrapper>{param.value.map(it => it.value).join(', ')}</GridCellWrapper>;
      },
    },
  ]);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const gridStyles = GridStyles();

  React.useEffect(() => {
    const _ids = [];
    if (props.data && props.data.length && props.matchRules && props.matchRules.length) {
      props.matchRules.forEach(it => {
        const _el = props.data.find(item => it.matchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID && item.extId === it.matchValuePrimary);
        if (_el) {
          _ids.push(_el.id);
        }
      });
    }
    setSelectionModel(_ids);
  }, [props.matchRules, props.data]);

  const onRowClick = (params: GridRowParams) => {
    const _item = params.row as INetworkVNetwork;
    props.onSelectChange(SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID, _item);
  };

  const onColumnHeaderClick = (params: GridColumnHeaderParams) => {
    if (params.field === '__check__') {
      props.onSelectAll(SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID, props.data);
    }
  };

  const onChangePage = (page: number) => {
    props.onChangePage(SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID, page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID, size, page);
  };
  return (
    <>
      <ModalRow margin="0 0 10px 0" align="center">
        <ModalLabel>VPCs</ModalLabel>
      </ModalRow>
      <GridWrapper>
        <DataGrid
          disableColumnFilter
          className={gridStyles.borderedRow}
          headerHeight={50}
          rowHeight={50}
          hideFooter
          rowCount={props.pagingData.totalCount}
          rows={props.data}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          onRowClick={onRowClick}
          onColumnHeaderClick={onColumnHeaderClick}
          selectionModel={selectionModel}
          loading={props.loading}
          error={props.error}
          components={{
            NoRowsOverlay: () => (
              <AbsLoaderWrapper width="100%" height="100%">
                <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
                  No data
                </ErrorMessage>
              </AbsLoaderWrapper>
            ),
            ErrorOverlay: () => <ErrorMessage margin="auto">{props.error}</ErrorMessage>,
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
        count={props.pagingData.totalCount}
        disabled={!props.data.length || props.pagingData.totalCount === 0}
        pageSize={props.pagingData.pageSize}
        currentPage={props.pagingData.pageOffset}
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
export default React.memo(VnetsTableComponent);
