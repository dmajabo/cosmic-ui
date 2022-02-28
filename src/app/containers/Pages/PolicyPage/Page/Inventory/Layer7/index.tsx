import React from 'react';
import H2 from 'app/components/Basic/H2';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { INetworkL7Rule, IToposvcGetL7RulesResponse, ToposvcRuleType } from 'lib/api/ApiModels/Topology/apiModels';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import * as gridHelper from 'lib/helpers/gridHelper';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { ComponentTableStyles, LayerWrapper } from '../styles';
import InventoryTableHeader from '../../../Components/InventoryTableHeader';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import Paging from 'app/components/Basic/Paging';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { Column } from 'primereact/column';
import { Layer7Columns } from '../model';
import ApplicationCell from './ApplicationCell';
import { useHistory } from 'react-router-dom';

interface Props {}

const Layer7 = (props: Props) => {
  const history = useHistory();
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IToposvcGetL7RulesResponse>();
  const [data, setData] = React.useState<INetworkL7Rule[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [columns, setColumns] = React.useState<IGridColumnField[]>([
    { ...Layer7Columns.networkName },
    { ...Layer7Columns.policy, body: d => policyBodyTemplate(d) },
    { ...Layer7Columns.application, body: d => applicationBodyTemplate(d) },
  ]);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const columnsRef = React.useRef(columns);
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (history && history.location && history.location.state) {
      const _param: any = history.location.state as any;
      if (_param.tableId && _param.tableId === ToposvcRuleType.L7_Outbound) {
        containerRef.current.scrollIntoView();
      }
    }
    getDataAsync(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.rules) {
      setData(response.rules);
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

  const policyBodyTemplate = (rowData: INetworkL7Rule) => <span className="cellToCapitalize">{rowData.policy}</span>;
  const applicationBodyTemplate = (rowData: INetworkL7Rule) => <ApplicationCell valueType={rowData.valueType} values={rowData.values} />;

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
    await onGet(TopoApi.getL7Rules(), userContext.accessToken!, _param);
  };
  return (
    <LayerWrapper style={{ border: 'none' }}>
      <H2>Layer 7</H2>
      <ComponentTableStyles style={{ margin: '0' }}>
        <InventoryTableHeader label="Firewall Rules" total={totalCount} columns={columnsRef.current} onColumnClick={onChangeColumn} onColumnOrderChange={onChangeOrder} />
        <TableWrapper style={{ minHeight: !data || !data.length ? '300px' : 'auto' }} ref={containerRef}>
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
              return <Column key={`inbound${col.field}`} style={{ width: col.width }} field={col.field} header={col.label} sortable={col.sortable} body={col.body || null} />;
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

export default React.memo(Layer7);
