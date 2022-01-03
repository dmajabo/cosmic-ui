import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AggregateRow from './AggregateRow';
import { IBuckets, ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { IAggregateRow } from './models';
import { buildAggregatedData } from './helper';
import TableHeader from './TableHeader';
import Paging from 'app/components/Basic/Paging';
import { ISessionsGridFieldColumn, SessionGridColumns } from '../models';
import { TableContainer } from 'app/components/Basic/Table/LargeTableSryles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';

interface Props {
  sessions: ISession[];
  buckets: IBuckets[];
  logCount: number;
  error: string;
  pageSize: number;
  currentPage: number;
  onChangeCurrentPage: (_page: number) => void;
  onChangePageSize: (size: number, page?: number) => void;
}

const AggregateTable: React.FC<Props> = (props: Props) => {
  const [data, setData] = React.useState<IAggregateRow[]>([]);
  const [aggregatedColumns, setColumns] = React.useState<ISessionsGridFieldColumn[]>([
    { ...SessionGridColumns.collapseColumn, hide: false },
    { ...SessionGridColumns.sessionId, hide: false },
    { ...SessionGridColumns.sourceIp, hide: false },
    { ...SessionGridColumns.sourcePort, hide: false },
    { ...SessionGridColumns.destIp, hide: false },
    { ...SessionGridColumns.destPort, hide: false },
    { ...SessionGridColumns.vendorsColumn, hide: false },
    { ...SessionGridColumns.bytes, hide: false },
    { ...SessionGridColumns.packets, hide: false },
    { ...SessionGridColumns.action, hide: false },
  ]);
  React.useEffect(() => {
    const _data: IAggregateRow[] = buildAggregatedData(props.sessions, props.buckets);
    setData(_data);
  }, [props.sessions, props.buckets]);

  const onChangeColumn = (col: ISessionsGridFieldColumn) => {
    const _items: ISessionsGridFieldColumn[] = aggregatedColumns.slice();
    const _i = aggregatedColumns.findIndex(it => it.resField === col.resField);
    const _hide = !col.hide;
    _items.splice(_i, 1, { ...col, hide: _hide });
    setColumns(_items);
  };

  const onChangeOrder = (items: ISessionsGridFieldColumn[]) => {
    setColumns(items);
  };

  const onChangeCurrentPage = (_page: number) => {
    props.onChangeCurrentPage(_page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(size, page);
  };

  return (
    <>
      <TableHeader count={props.logCount} columns={aggregatedColumns} onChangeColumn={onChangeColumn} onChangeOrder={onChangeOrder} />
      <TableContainer minHeight="290px">
        <Table aria-label="collapsible table" className="largeTable">
          <TableHead>
            <TableRow>
              {aggregatedColumns.map((it, index) => {
                if (it.hide) return null;
                if (it.resField === 'id') {
                  return <TableCell key={`thRow${it.resField}${index}`} style={{ width: '20px' }} />;
                }
                return <TableCell key={`thRow${it.resField}${index}`}>{it.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!props.error && data && data.length ? (
              data.map((row, index) => <AggregateRow key={`rowIndex${row.session.id}${index}`} row={row} columns={aggregatedColumns} />)
            ) : (
              <TableRow>
                <TableCell className="errorCell" colSpan={aggregatedColumns.length}>
                  <ErrorMessage color="var(--_primaryTextColor)" margin="48px auto">
                    No data
                  </ErrorMessage>
                </TableCell>
              </TableRow>
            )}
            {props.error && (
              <TableRow>
                <TableCell className="errorCell" colSpan={aggregatedColumns.length}>
                  <ErrorMessage margin="48px 0">{props.error}</ErrorMessage>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Paging
        count={props.logCount}
        disabled={!data.length || props.logCount === 0}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={onChangeCurrentPage}
        onChangePageSize={onChangePageSize}
        pagingWrapStyles={{ marginTop: 'auto' }}
      />
    </>
  );
};

export default React.memo(AggregateTable);
