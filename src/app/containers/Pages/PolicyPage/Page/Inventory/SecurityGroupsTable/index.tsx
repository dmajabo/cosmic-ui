import React from 'react';
import InventoryTableHeader from 'app/containers/Pages/PolicyPage/Components/InventoryTableHeader';
import { LayerWrapper, ComponentTableStyles } from '../styles';
import { IToposvcListSecurityGroupResponse, INetworkSecurityGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { usePolicyDataContext } from 'lib/hooks/Policy/usePolicyDataContext';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { SecurityGroupsColumns } from '../model';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import * as gridHelper from 'lib/helpers/gridHelper';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { IObject, PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';
import { InventoryPanelTypes } from 'lib/hooks/Policy/models';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { Column } from 'primereact/column';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import Paging from 'app/components/Basic/Paging';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';

interface Props {}

const SecurityGroupsTable: React.FC<Props> = (props: Props) => {
  const { policy } = usePolicyDataContext();
  const { vendors, accessToken } = React.useContext<UserContextState>(UserContext);
  const [columns, setColumns] = React.useState<IGridColumnField[]>([{ ...SecurityGroupsColumns.name }, { ...SecurityGroupsColumns.extId }]);
  const { response, loading, error, onGet } = useGet<IToposvcListSecurityGroupResponse>();
  const [data, setData] = React.useState<INetworkSecurityGroup[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [selectedRows, setSelectedRows] = React.useState<IObject<string>>(null);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const columnsRef = React.useRef(columns);

  React.useEffect(() => {
    getDataAsync(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.securityGroups) {
      setData(response.securityGroups);
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

  const onSelectAll = () => {
    const _obj: IObject<string> = gridHelper.selectionRowAllHelper(selectedRows, data, 'extId');
    const _dataItems: INetworkSecurityGroup[] = _obj ? data : null;
    policy.onTooglePanel(InventoryPanelTypes.Routes, _dataItems);
    setSelectedRows(_obj);
  };

  const onSelectRow = (id: string) => {
    const _obj: IObject<string> = gridHelper.multySelectionRowHelper(selectedRows, id);
    const _dataItems: INetworkSecurityGroup[] = _obj ? data.filter(it => (_obj[it.extId] ? it : null)) : null;
    policy.onTooglePanel(InventoryPanelTypes.Routes, _dataItems);
    setSelectedRows(_obj);
  };

  // const onRowClick = (e: DataTableRowClickEventParams) => {
  //   onSelectRow(e.data.extId);
  // };

  const checkboxTemplate = (rowData: INetworkSecurityGroup) => {
    return <SimpleCheckbox wrapStyles={{ width: '20px', margin: '0 auto' }} isChecked={!!(selectedRows && selectedRows[rowData.extId])} toggleCheckboxChange={() => onSelectRow(rowData.extId)} />;
  };

  const headerCbTemplate = () => {
    return (
      <SimpleCheckbox
        isChecked={!!(selectedRows && Object.keys(selectedRows).length)}
        toggleCheckboxChange={onSelectAll}
        wrapStyles={{ width: '20px', margin: '0 auto' }}
        indeterminate={selectedRows && Object.keys(selectedRows).length && data && data.length && Object.keys(selectedRows).length !== data.length}
      />
    );
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
    await onGet(TopoApi.getSecurityGroups(), accessToken!, _param);
  };

  return (
    <LayerWrapper style={{ margin: vendors && vendors[AccountVendorTypes.CISCO_MERAKI] ? '0 0 40px 0' : '0', border: vendors && vendors[AccountVendorTypes.CISCO_MERAKI] ? null : 'none' }}>
      <ComponentTableStyles style={{ margin: vendors && vendors[AccountVendorTypes.CISCO_MERAKI] ? '0 0 40px 0' : '0' }}>
        <InventoryTableHeader label="Security Groups" total={totalCount} columns={columns} onColumnClick={onChangeColumn} onColumnOrderChange={onChangeOrder} />
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
            <Column header={headerCbTemplate} body={checkboxTemplate} align="center" headerStyle={{ width: '60px' }} style={{ textAlign: 'center' }} exportable={false}></Column>
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
        <Paging count={totalCount} disabled={!data.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
      </ComponentTableStyles>
    </LayerWrapper>
  );
};

export default React.memo(SecurityGroupsTable);
