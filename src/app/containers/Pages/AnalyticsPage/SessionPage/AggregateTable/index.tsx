import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import AggregateRow from './AggregateRow';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { IAggregateRow } from './models';
import { buildAggregatedData } from './helper';
import TableHeader from './TableHeader';
import Paging from 'app/components/Basic/Paging';
import { ISessionsGridFieldColumn, SessionGridColumns } from '../models';
import { TableContainer } from 'app/components/Basic/Table/LargeTableSryles';

interface Props {
  data: ISession[];
  logCount: number;
  isError: any;
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
  ]);
  React.useEffect(() => {
    const _data: IAggregateRow[] = buildAggregatedData(props.data);
    setData(_data);
  }, [props.data]);

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
      <TableContainer minHeight="200px">
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
            {data.map((row, index) => (
              <AggregateRow key={`rowIndex${row.id}${index}`} row={row} columns={aggregatedColumns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paging
        count={data.length}
        disabled={!data.length || props.logCount === 0}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={onChangeCurrentPage}
        onChangePageSize={onChangePageSize}
        // boundaryCount={0}
        // siblingCount={0}
        // pageSizeValues={[20, 50, 100]}
        // hideLabelAfter
        // showFirstButton={false}
        // showLastButton={false}
        pagingWrapStyles={{ marginTop: 'auto' }}
      />
    </>
  );
};

export default React.memo(AggregateTable);
