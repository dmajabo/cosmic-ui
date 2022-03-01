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
import Paging from 'app/components/Basic/Paging';
import InventoryTableHeader from '../../../Components/InventoryTableHeader';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import * as cellTemplates from 'app/components/Basic/Table/CellTemplates';
interface Props {}

const InboundTable = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IToposvcGetRulesResponse>();
  const [data, setData] = React.useState<INetworkRule[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [columns, setColumns] = React.useState<IGridColumnField[]>([
    { ...Layer3Columns.networkName, minWidth: '200px' },
    { ...Layer3Columns.policy, body: (d: INetworkRule) => cellTemplates.cellClassNameTemplate(d.policy || 'Allow', 'cellToCapitalize') },
    { ...Layer3Columns.protocol, body: (d: INetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
    { ...Layer3Columns.source, body: (d: INetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.srcCidrs, 'name') },
    { ...Layer3Columns.sourcePort },
    { ...Layer3Columns.destination, body: (d: INetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.destCidrs, 'name'), maxWidth: '500px' },
    { ...Layer3Columns.destinationPort },
    { ...Layer3Columns.comment },
    { ...Layer3Columns.description },
    { ...Layer3Columns.logging, body: (d: INetworkRule) => cellTemplates.cellCheckMarkTemplate(d.syslogEnabled) },
    // { ...Layer3Columns.portRange, body: d => rangeBodyTemplate(d) },
  ]);

  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const columnsRef = React.useRef(columns);

  React.useEffect(() => {
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
    await onGet(TopoApi.getRules(ToposvcRuleType.L3_Inbound), userContext.accessToken!, _param);
  };

  return (
    <ComponentTableStyles style={{ display: data.length ? '' : 'none' }}>
      <InventoryTableHeader label="Inbound Rules" total={totalCount} columns={columnsRef.current} onColumnClick={onChangeColumn} onColumnOrderChange={onChangeOrder} />
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
                key={`inbound${col.field}`}
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
  );
};

export default React.memo(InboundTable);
