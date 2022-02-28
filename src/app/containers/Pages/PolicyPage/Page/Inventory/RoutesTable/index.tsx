import React from 'react';
import InventoryTableHeader from 'app/containers/Pages/PolicyPage/Components/InventoryTableHeader';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { RoutesColumns } from '../model';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { INetworkRouteTable, IToposvcListRouteTableResponse } from 'lib/api/ApiModels/Topology/apiModels';
import * as gridHelper from 'lib/helpers/gridHelper';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { ComponentTableStyles, LayerWrapper } from '../styles';
import { IObject } from 'lib/models/general';
import { usePolicyDataContext } from 'lib/hooks/Policy/usePolicyDataContext';
import Paging from 'app/components/Basic/Paging';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import * as cellTemplates from 'app/components/Basic/Table/CellTemplates';
import { InventoryPanelTypes } from 'lib/hooks/Policy/models';

interface Props {}

const RoutesTable: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { policy } = usePolicyDataContext();
  const [columns, setColumns] = React.useState<IGridColumnField[]>([
    { ...RoutesColumns.name },
    { ...RoutesColumns.parentId },
    { ...RoutesColumns.parentType },
    { ...RoutesColumns.numberOfRoutes },
    { ...RoutesColumns.extId },
  ]);
  const { response, loading, error, onGet } = useGet<IToposvcListRouteTableResponse>();
  const [data, setData] = React.useState<INetworkRouteTable[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [selectedRows, setSelectedRows] = React.useState<IObject<string>>(null);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const columnsRef = React.useRef(columns);

  React.useEffect(() => {
    getDataAsync(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (selectedRows && !policy.panel.show) {
      setSelectedRows(null);
    }
  }, [policy.panel]);

  React.useEffect(() => {
    if (response && response.routeTables) {
      setData(response.routeTables);
      setTotalCount(response.totalCount);
    } else {
      setData([]);
      setTotalCount(0);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      setData([]);
      setTotalCount(0);
    }
  }, [error]);

  const onChangeColumn = (col: IGridColumnField, hide: boolean) => {
    const _items: IGridColumnField[] = columnsRef.current.slice();
    const _index = _items.findIndex(it => it.field === col.field);
    _items[_index].hide = hide;
    columnsRef.current = _items;
    setColumns(_items);
  };
  const onChangeOrder = (_items: IGridColumnField[]) => {
    columnsRef.current = _items;
    setColumns(_items);
  };

  const onSort = (e: DataTablePFSEvent) => {
    const _sortObject = gridHelper.singelSortHelper(sortObject, e);
    setSortObject(_sortObject);
  };

  const onSelectRow = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const _dataItem: INetworkRouteTable = data.find(it => it.extId === id);
    if (!_dataItem) return;
    const _obj: IObject<string> = gridHelper.multySelectionRowHelper(selectedRows, id);
    if (_obj && _obj[id]) {
      policy.onTooglePanel({ type: InventoryPanelTypes.Routes, dataItem: _dataItem });
    } else {
      policy.onRemoveTablePanel({ type: InventoryPanelTypes.Routes, dataItem: _dataItem });
    }
    setSelectedRows(_obj);
  };

  // const onRowClick = (e: DataTableRowClickEventParams) => {
  //   onSelectRow(e.data.extId);
  // };

  const checkboxTemplate = (rowData: INetworkRouteTable) => cellTemplates.cellCheckboxTemplate(!!(selectedRows && selectedRows[rowData.extId]), e => onSelectRow(e, rowData.extId));

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    getDataAsync(pageSize, _page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      getDataAsync(size, page);
      return;
    }
    setPageSize(size);
    getDataAsync(size, currentPage);
  };

  const getDataAsync = async (_pageSize: number, _currentPage: number) => {
    const _param = paramBuilder(_pageSize, _currentPage);
    await onGet(TopoApi.getRouteTables(), userContext.accessToken!, _param);
  };

  return (
    <LayerWrapper style={{ margin: '0 0 40px 0' }}>
      <ComponentTableStyles>
        <InventoryTableHeader label="Routes" total={totalCount} columns={columns} onColumnClick={onChangeColumn} onColumnOrderChange={onChangeOrder} />
        <TableWrapper style={{ minHeight: !data || !data.length ? '300px' : 'auto' }}>
          <DataTable
            className="table"
            emptyMessage={!error ? 'No data' : ' '}
            value={data}
            responsiveLayout="scroll"
            onSort={onSort}
            sortField={sortObject ? sortObject.field : null}
            sortOrder={sortObject ? sortObject.order : null}
            sortMode="single"
            dataKey="extId"
            // onRowClick={onRowClick}
          >
            <Column header={null} body={checkboxTemplate} align="center" style={{ textAlign: 'center', width: '60px', minWidth: '60px', maxWidth: '60px' }} exportable={false}></Column>
            {columns.map(it => {
              if (it.hide) return null;
              return (
                <Column
                  key={`routesColumn${it.field}`}
                  style={{ width: it.width || null, minWidth: it.minWidth || null, maxWidth: it.maxWidth || null }}
                  sortable={it.sortable}
                  field={it.field}
                  header={it.label}
                ></Column>
              );
            })}
          </DataTable>
          {loading && (
            <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          )}

          {error && (
            <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
              <ErrorMessage margin="auto" fontSize={20}>
                {error ? error.message : 'Something went wrong'}
              </ErrorMessage>
            </AbsLoaderWrapper>
          )}
        </TableWrapper>
        <Paging
          pageSizeValues={[5, 10, 20]}
          count={totalCount}
          disabled={!data.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onChangePage={onChangeCurrentPage}
          onChangePageSize={onChangePageSize}
        />
      </ComponentTableStyles>
    </LayerWrapper>
  );
};

export default React.memo(RoutesTable);
