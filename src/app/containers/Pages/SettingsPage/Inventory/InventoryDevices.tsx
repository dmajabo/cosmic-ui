import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { InventoryDeviceGridColumns } from './model';
import { getSearchedList } from 'lib/helpers/listHelper';
import { IColumn } from 'lib/models/grid';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { INetworkDevice, ISitesRes } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  searchValue: string;
  columns: IColumn[];
}

const InventoryDevices: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<ISitesRes>();
  const [dataRows, setDataRows] = React.useState<INetworkDevice[]>([]);
  const [filteredData, setFilteredData] = React.useState<INetworkDevice[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [searchValue, setSearchValue] = React.useState<string>(props.searchValue || null);
  const gridStyles = GridStyles();

  React.useEffect(() => {
    onTryLoadDevices(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.devices && response.devices.length) {
      const _arr: INetworkDevice[] = getSearchedList(response.devices, props.searchValue, [
        InventoryDeviceGridColumns.name.resField,
        InventoryDeviceGridColumns.extId.resField,
        InventoryDeviceGridColumns.serial.resField,
        InventoryDeviceGridColumns.model.resField,
        InventoryDeviceGridColumns.description.resField,
        InventoryDeviceGridColumns.networkId.resField,
        InventoryDeviceGridColumns.publicIp.resField,
        InventoryDeviceGridColumns.privateIp.resField,
        InventoryDeviceGridColumns.hostname.resField,
      ]);
      setDataRows(response.devices);
      setFilteredData(_arr);
      setTotalCount(response.totalCount);
    } else {
      setDataRows([]);
      setFilteredData([]);
      setTotalCount(0);
    }
  }, [response]);

  React.useEffect(() => {
    if (props.searchValue !== searchValue) {
      const _items: INetworkDevice[] = getSearchedList(dataRows, props.searchValue, [
        InventoryDeviceGridColumns.name.resField,
        InventoryDeviceGridColumns.extId.resField,
        InventoryDeviceGridColumns.serial.resField,
        InventoryDeviceGridColumns.model.resField,
        InventoryDeviceGridColumns.description.resField,
        InventoryDeviceGridColumns.networkId.resField,
        InventoryDeviceGridColumns.publicIp.resField,
        InventoryDeviceGridColumns.privateIp.resField,
        InventoryDeviceGridColumns.hostname.resField,
      ]);
      setFilteredData(_items);
      setSearchValue(props.searchValue);
    }
  }, [props.searchValue]);

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

  const onTryLoadDevices = async (pageSize: number, currentPage: number) => {
    const _param = paramBuilder(pageSize, currentPage);
    await onGet(TopoApi.getSites(), userContext.accessToken!, _param);
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
        loading={loading}
        error={error ? error.message : null}
        components={{
          NoRowsOverlay: () => (
            <AbsLoaderWrapper width="100%" height="100%">
              <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
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
        }}
        pageSize={filteredData ? filteredData.length : 0}
      />
      <Paging count={totalCount} disabled={!dataRows.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
    </>
  );
};

export default React.memo(InventoryDevices);
