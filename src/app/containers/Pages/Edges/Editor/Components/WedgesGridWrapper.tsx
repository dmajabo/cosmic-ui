import React from 'react';
import { INetworkwEdge } from 'lib/models/topology';
import { GridWrapper } from './styles';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { GridCellLabel, GridCellWrapper } from 'app/components/Grid/styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { wedgeIcon } from 'app/components/SVGIcons/topologyIcons/wedge';

interface Props {
  data: INetworkwEdge[];
  totalCount: number;
  selectedIds: string[];
  pageSize: number;
  currentPage: number;
  onSelectChange: (item: INetworkwEdge) => void;
  onSelectAll: (item: INetworkwEdge[]) => void;
  onChangeCurrentPage: (_page: number) => void;
  onChangePageSize: (size: number, page?: number) => void;
  loading: boolean;
  error: string;
}
const WedgesGridWrapper: React.FC<Props> = (props: Props) => {
  const [columns] = React.useState<GridColDef[]>([
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      width: 200,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => (
        <GridCellWrapper>
          <IconWrapper styles={{ margin: 'auto 12px auto 0', cursor: 'default' }} width="20px" height="20px" icon={wedgeIcon()} />
          <GridCellLabel cursor="default">{param.value}</GridCellLabel>
        </GridCellWrapper>
      ),
    },
    {
      field: 'region',
      headerName: 'Region',
      width: 200,
      minWidth: 200,
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
  ]);
  const gridStyles = GridStyles();
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  React.useEffect(() => {
    const _ids = [];
    if (props.data && props.data.length && props.selectedIds && props.selectedIds.length) {
      props.selectedIds.forEach(it => {
        const _el = props.data.find(item => item.extId === it);
        if (_el) {
          _ids.push(_el.id);
        }
      });
    }
    setSelectionModel(_ids);
  }, [props.data, props.selectedIds]);

  const onRowClick = (params: GridRowParams) => {
    props.onSelectChange(params.row as INetworkwEdge);
  };

  const onColumnHeaderClick = (params: GridColumnHeaderParams) => {
    if (params.field === '__check__') {
      props.onSelectAll(props.data);
    }
  };

  const onChangePage = (page: number) => {
    props.onChangeCurrentPage(page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(size, page);
  };

  return (
    <>
      <GridWrapper>
        <DataGrid
          disableColumnFilter
          className={gridStyles.container}
          headerHeight={50}
          rowHeight={50}
          hideFooter
          rowCount={props.totalCount}
          rows={props.data}
          columns={columns}
          checkboxSelection
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
            Checkbox: React.forwardRef(({ checked, onChange, indeterminate }, ref) => <SimpleCheckbox ref={ref} isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />),
          }}
        />
      </GridWrapper>
      <Paging
        count={props.totalCount}
        disabled={!props.data.length || props.totalCount === 0}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
        boundaryCount={0}
        siblingCount={0}
        pageSizeValues={[10, 20, 50]}
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

export default React.memo(WedgesGridWrapper);
