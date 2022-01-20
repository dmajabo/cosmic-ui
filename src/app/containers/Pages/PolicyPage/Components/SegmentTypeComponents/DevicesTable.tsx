import React from 'react';
import { GridWrapper, ModalLabel, ModalRow } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
// import SecondaryButtonWithPopup from 'app/components/Buttons/SecondaryButton/SecondaryButtonWithPopup';
// import PopupContainer from 'app/components/PopupContainer';
// import { PopupTitle, OverflowContainer, FilteredColumnItem, FilteredColumnLabel } from 'app/components/PopupContainer/styles';
// import { filterIcon } from 'app/components/SVGIcons/filter';
import { INetworkDevice } from 'lib/api/ApiModels/Topology/apiModels';
import { IUiPagingData } from 'lib/api/ApiModels/generalApiModel';
import { SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import { GridCellWrapper } from 'app/components/Grid/styles';

interface Props {
  data: INetworkDevice[];
  pageData: IUiPagingData;
  selectedIds: string[];
  onSelectChange: (type: SegmentSegmentType, item: INetworkDevice) => void;
  onSelectAll: (type: SegmentSegmentType, item: INetworkDevice[]) => void;
  onChangeCurrentPage: (type: SegmentSegmentType, _page: number) => void;
  onChangePageSize: (type: SegmentSegmentType, size: number, page?: number) => void;
  loading: boolean;
  error: string;
}

const DevicesTable: React.FC<Props> = (props: Props) => {
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
  }, [props.selectedIds, props.data]);

  // const onChangeColumn = (col: GridColDef) => {
  //   const _items: GridColDef[] = columns.slice();
  //   const _index = _items.findIndex(it => it.field === col.field);
  //   _items[_index].hide = !col.hide;
  //   setGridColumns(_items);
  // };

  const onRowClick = (params: GridRowParams) => {
    props.onSelectChange(SegmentSegmentType.SITE, params.row as INetworkDevice);
  };

  const onColumnHeaderClick = (params: GridColumnHeaderParams) => {
    if (params.field === '__check__') {
      props.onSelectAll(SegmentSegmentType.SITE, props.data);
    }
  };

  const onChangePage = (page: number) => {
    props.onChangeCurrentPage(SegmentSegmentType.SITE, page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(SegmentSegmentType.SITE, size, page);
  };
  return (
    <>
      <ModalRow margin="0 0 10px 0" align="center">
        <ModalLabel>Sites</ModalLabel>
        {/* <SecondaryButtonWithPopup styles={{ padding: '0', width: '50px' }} wrapStyles={{ margin: '0 0 0 auto' }} icon={filterIcon} direction="rtl">
          <PopupContainer
            styles={{
              overflow: 'hidden',
              position: 'absolute',
              top: 'calc(100% + 2px)',
              right: '0',
              width: '80vw',
              height: 'auto',
              minWidth: '180px',
              maxWidth: '340px',
              minHeight: '120px',
              maxHeight: '420px',
              direction: 'rtl',
              padding: '20px',
              boxShadow: '0px 10px 30px rgba(5, 20, 58, 0.1)',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--_primaryBg)',
            }}
          >
            <PopupTitle>Columns</PopupTitle>
            <OverflowContainer>
              {columns.map(col => {
                if (col.field === 'rowIndex' || !col.field) return null;
                return (
                  <FilteredColumnItem key={`filteredColumnMEnuItem${col.field}`} onClick={() => onChangeColumn(col)}>
                    <SimpleCheckbox wrapStyles={{ marginRight: '12px' }} isChecked={!col.hide} />
                    <FilteredColumnLabel>{col.headerName}</FilteredColumnLabel>
                  </FilteredColumnItem>
                );
              })}
            </OverflowContainer>
          </PopupContainer>
        </SecondaryButtonWithPopup> */}
      </ModalRow>
      <GridWrapper>
        <DataGrid
          disableColumnFilter
          className={gridStyles.borderedRow}
          headerHeight={50}
          rowHeight={50}
          hideFooter
          rowCount={props.pageData.totalCount}
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
            BaseCheckbox: React.forwardRef(({ checked, onChange, indeterminate }, ref) => (
              <SimpleCheckbox ref={ref} isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />
            )),
          }}
        />
      </GridWrapper>
      <Paging
        count={props.pageData.totalCount}
        disabled={!props.data.length || props.pageData.totalCount === 0}
        pageSize={props.pageData.pageSize}
        currentPage={props.pageData.pageOffset}
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

export default React.memo(DevicesTable);
