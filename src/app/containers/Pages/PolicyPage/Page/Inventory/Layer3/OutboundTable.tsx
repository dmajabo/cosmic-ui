import React from 'react';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { Layer3Columns } from '../model';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import Header from './Header';
import { ComponentTableStyles } from '../styles';

interface Props {
  totalCount: number;
  data: INetworkRule[];
  loading: boolean;
  error: string;
}

const OutboundTable = (props: Props) => {
  const [columns, setColumns] = React.useState<IGridColumnField[]>([
    { ...Layer3Columns.policy, body: d => policyBodyTemplate(d) },
    { ...Layer3Columns.protocol, body: d => protocolBodyTemplate(d) },
    { ...Layer3Columns.destination, body: d => destinationBodyTemplate(d) },
    { ...Layer3Columns.portRange, body: d => rangeBodyTemplate(d) },
  ]);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
  const columnsRef = React.useRef(columns);

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
    if (!sortObject) {
      setSortObject({ field: e.sortField, order: e.sortOrder });
      return;
    }
    if (sortObject && e.sortField !== sortObject.field) {
      setSortObject({ field: e.sortField, order: e.sortOrder });
      return;
    }
    if (sortObject && e.sortField === sortObject.field) {
      if (sortObject.order === -1 && e.sortOrder === 1) {
        setSortObject(null);
        return;
      }
      setSortObject({ ...sortObject, order: e.sortOrder });
    }
  };

  const policyBodyTemplate = (rowData: INetworkRule) => rowData.policy || 'Allow';
  const protocolBodyTemplate = (rowData: INetworkRule) => <span className="cellToUpperCase">{rowData.ipProtocol}</span>;
  const rangeBodyTemplate = (rowData: INetworkRule) => (rowData.fromPort === '0' && rowData.toPort === '0' ? 'All' : `${rowData.fromPort} - ${rowData.toPort}`);
  const destinationBodyTemplate = (rowData: INetworkRule) => (rowData.cidrs && rowData.cidrs.length ? rowData.cidrs[0].name : null);

  return (
    <ComponentTableStyles>
      <Header label="Outbound Rules" total={props.totalCount} columns={columnsRef.current} onColumnClick={onChangeColumn} onColumnOrderChange={onChangeOrder} />
      <TableWrapper style={{ minHeight: '300px' }}>
        <DataTable
          className="table"
          emptyMessage="No data"
          value={props.data}
          responsiveLayout="scroll"
          onSort={onSort}
          sortField={sortObject ? sortObject.field : null}
          sortOrder={sortObject ? sortObject.order : null}
          sortMode="single"
        >
          {columnsRef.current.map(col => {
            if (col.hide) return null;
            return <Column key={`inbound${col.field}`} style={{ minWidth: col.width }} field={col.field} header={col.label} sortable={col.sortable} body={col.body || null} />;
          })}
        </DataTable>
        {props.loading && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {props.error && <ErrorMessage margin="auto">{props.error ? props.error : 'Something went wrong'}</ErrorMessage>}
      </TableWrapper>
    </ComponentTableStyles>
  );
};

export default React.memo(OutboundTable);
