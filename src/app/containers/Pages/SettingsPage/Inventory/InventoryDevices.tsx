import React from 'react';
import { GridColDef, DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ISitesRes } from 'lib/api/ApiModels/Edges/apiModel';
import { IDevice } from 'lib/models/topology';
import { useSettingsDataContext } from 'lib/hooks/Settings/useSettingsDataContenxt';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';
import { buildPagingParam, EdgesApi } from 'lib/api/ApiModels/Edges/edpoints';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { InventoryOptions } from './model';
// import SettingsButton from 'app/components/Buttons/SettingsButton';
// import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
// import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
// import { GridCellWrapper } from 'app/components/Grid/styles';
// import { deleteIcon } from 'app/components/SVGIcons/delete';

interface Props {
  columns: GridColDef[];
  selectedItems: GridSelectionModel;
  onSelectionModelChange: (selectionModel: GridSelectionModel, option: InventoryOptions) => void;
}

const InventoryDevices: React.FC<Props> = (props: Props) => {
  const { settings } = useSettingsDataContext();
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<ISitesRes>();
  const [dataRows, setDataRows] = React.useState<IDevice[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const gridStyles = GridStyles();

  React.useEffect(() => {
    onTryLoadDevices(settings.loggingPageSize, settings.loggingCurrentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.devices) {
      const startIndex = (settings.loggingCurrentPage - 1) * settings.loggingPageSize;
      const _items = response.devices.map((it, i) => ({ ...it, rowIndex: i + startIndex }));
      setDataRows(_items);
      setTotalCount(response.totalCount);
    }
  }, [response]);

  const onSelectionModelChange = (e: GridSelectionModel) => {
    props.onSelectionModelChange(e, InventoryOptions.DEVICE);
  };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    onTryLoadDevices(pageSize, _page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      onTryLoadDevices(size, page);
      return;
    }
    setPageSize(size);
    onTryLoadDevices(size, currentPage);
  };

  // const onDelete = (param: GridRenderCellParams) => {
  //   console.log(param);
  // };

  const onTryLoadDevices = async (pageSize: number, currentPage: number) => {
    const _param = buildPagingParam(pageSize, currentPage);
    await onGet(EdgesApi.getSites(), userContext.accessToken!, _param);
  };

  return (
    <>
      <DataGrid
        className={gridStyles.borderedRow}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={70}
        rowCount={dataRows.length}
        disableColumnFilter
        autoHeight
        rows={dataRows}
        columns={props.columns}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={props.selectedItems}
        loading={loading}
        error={error ? error.message : null}
        components={{
          NoRowsOverlay: () => (
            <AbsLoaderWrapper width="100%" height="100%">
              <ErrorMessage color="var(--_primaryColor)" margin="auto">
                No data
              </ErrorMessage>
            </AbsLoaderWrapper>
          ),
          ErrorOverlay: (err: any) => <ErrorMessage margin="auto">{err}</ErrorMessage>,
          LoadingOverlay: () => (
            <AbsLoaderWrapper width="100%" height="100%">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          ),
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
          Checkbox: ({ checked, onChange, indeterminate }) => <SimpleCheckbox isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />,
        }}
        pageSize={dataRows ? dataRows.length : 0}
      />
      <Paging count={totalCount} disabled={!dataRows.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
    </>
  );
};

export default React.memo(InventoryDevices);
