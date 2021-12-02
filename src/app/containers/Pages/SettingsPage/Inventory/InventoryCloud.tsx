import React from 'react';
import { GridColDef, DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
// import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import { InventoryOptions } from './model';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';
import { useSettingsDataContext } from 'lib/hooks/Settings/useSettingsDataContenxt';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { IWEdgesRes } from 'lib/api/ApiModels/Edges/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { buildPagingParam, EdgesApi } from 'lib/api/ApiModels/Edges/edpoints';
import { getSearchedList } from 'lib/helpers/listHelper';
import { INetworkwEdge } from 'lib/models/topology';

interface Props {
  searchValue: string;
  columns: GridColDef[];
  selectedItems?: GridSelectionModel;
  onSelectionModelChange?: (selectionModel: GridSelectionModel, option: InventoryOptions) => void;
}

const InventoryCloud: React.FC<Props> = (props: Props) => {
  const { settings } = useSettingsDataContext();
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IWEdgesRes>();
  const [dataRows, setDataRows] = React.useState<INetworkwEdge[]>([]);
  const [filteredData, setFilteredData] = React.useState<INetworkwEdge[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [searchValue, setSearchValue] = React.useState<string>(props.searchValue || null);
  const gridStyles = GridStyles();

  React.useEffect(() => {
    onTryLoadWedges(settings.loggingPageSize, settings.loggingCurrentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.wEdges) {
      const startIndex = (settings.loggingCurrentPage - 1) * settings.loggingPageSize;
      const _items = response.wEdges.map((it, i) => ({ ...it, rowIndex: i + startIndex }));
      const _arr: INetworkwEdge[] = getSearchedList(_items, searchValue, ['name', 'extId', 'vnetkey', 'description']);
      setDataRows(_items);
      setFilteredData(_arr);
      setTotalCount(response.totalCount);
    }
  }, [response]);

  React.useEffect(() => {
    if (props.searchValue !== searchValue) {
      const _items: INetworkwEdge[] = getSearchedList(dataRows, props.searchValue, ['name', 'extId', 'vnetkey', 'description']);
      setFilteredData(_items);
      setSearchValue(props.searchValue);
    }
  }, [props.searchValue]);

  // const onSelectionModelChange = (e: GridSelectionModel) => {
  //   props.onSelectionModelChange(e, InventoryOptions.CLOUD);
  // };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    onTryLoadWedges(pageSize, _page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      onTryLoadWedges(size, page);
      return;
    }
    setPageSize(size);
    onTryLoadWedges(size, currentPage);
  };

  const onTryLoadWedges = async (pageSize: number, currentPage: number) => {
    const _param = buildPagingParam(pageSize, currentPage);
    await onGet(EdgesApi.getWedges(), userContext.accessToken!, _param);
  };

  return (
    <>
      <DataGrid
        className={gridStyles.borderedRow}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={70}
        rowCount={filteredData.length}
        disableColumnFilter
        autoHeight
        rows={filteredData}
        columns={props.columns}
        // checkboxSelection
        // disableSelectionOnClick
        // onSelectionModelChange={onSelectionModelChange}
        // selectionModel={props.selectedItems}
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
          // Checkbox: ({ checked, onChange, indeterminate }) => <SimpleCheckbox isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />,
        }}
        pageSize={filteredData ? filteredData.length : 0}
      />
      <Paging count={totalCount} disabled={!dataRows.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
    </>
  );
};

export default React.memo(InventoryCloud);
