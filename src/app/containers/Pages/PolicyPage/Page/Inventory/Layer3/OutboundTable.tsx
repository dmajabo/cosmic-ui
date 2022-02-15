import React from 'react';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { INetworkRule, IToposvcGetRulesResponse, ToposvcRuleType } from 'lib/api/ApiModels/Topology/apiModels';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { Layer3Columns } from '../model';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { ComponentTableStyles } from '../styles';
import * as gridHelper from 'lib/helpers/gridHelper';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';
import { convertStringToNumber } from 'lib/helpers/general';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import InventoryTableHeader from '../../../Components/InventoryTableHeader';
import Paging from 'app/components/Basic/Paging';

interface Props {}

const OutboundTable = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IToposvcGetRulesResponse>();
  const [data, setData] = React.useState<INetworkRule[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [columns, setColumns] = React.useState<IGridColumnField[]>([
    { ...Layer3Columns.policy, body: d => policyBodyTemplate(d) },
    { ...Layer3Columns.protocol, body: d => protocolBodyTemplate(d) },
    { ...Layer3Columns.destination, body: d => destinationBodyTemplate(d) },
    { ...Layer3Columns.portRange, body: d => rangeBodyTemplate(d) },
  ]);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const columnsRef = React.useRef(columns);

  React.useEffect(() => {
    getDataAsync(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.rules) {
      const _total = convertStringToNumber(response.count);
      setData(response.rules);
      setTotalCount(_total);
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

  const policyBodyTemplate = (rowData: INetworkRule) => <span className="cellToCapitalize">{rowData.policy || 'Allow'}</span>;
  const protocolBodyTemplate = (rowData: INetworkRule) => <span className="cellToUpperCase">{rowData.ipProtocol}</span>;
  const rangeBodyTemplate = (rowData: INetworkRule) => (rowData.fromPort === '0' && rowData.toPort === '0' ? 'All' : `${rowData.fromPort} - ${rowData.toPort}`);
  const destinationBodyTemplate = (rowData: INetworkRule) => (rowData.cidrs && rowData.cidrs.length ? rowData.cidrs[0].name : null);

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
    await onGet(TopoApi.getRules(ToposvcRuleType.L3_Outbound), userContext.accessToken!, _param);
  };

  return (
    <ComponentTableStyles>
      <InventoryTableHeader label="Outbound Rules" total={totalCount} columns={columnsRef.current} onColumnClick={onChangeColumn} onColumnOrderChange={onChangeOrder} />
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
        >
          {columnsRef.current.map(col => {
            if (col.hide) return null;
            return (
              <Column
                key={`outbound${col.field}`}
                style={{ width: col.width || null, minWidth: col.minWidth || null, maxWidth: col.maxWidth || null }}
                field={col.field}
                header={col.label}
                sortable={col.sortable}
                body={col.body || null}
              />
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
      <Paging count={totalCount} disabled={!data.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
    </ComponentTableStyles>
  );
};

export default React.memo(OutboundTable);
