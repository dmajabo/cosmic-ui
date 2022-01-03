import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
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
}

const AggregateTable: React.FC<Props> = (props: Props) => {
  const [data, setData] = React.useState<IAggregateRow[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
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

  const onChangeCurrentPage = (_page: number) => {
    setPage(_page - 1);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setPage(page);
      setRowsPerPage(size);
      return;
    }
    setRowsPerPage(size);
  };

  return (
    <>
      <TableHeader count={data.length} columns={aggregatedColumns} onChangeColumn={onChangeColumn} />
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
            {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row, index) => (
              <AggregateRow key={`rowIndex${row.id}${index}`} row={row} columns={aggregatedColumns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paging
        count={data.length}
        disabled={!data.length}
        pageSize={rowsPerPage}
        currentPage={page + 1}
        onChangePage={onChangeCurrentPage}
        onChangePageSize={onChangePageSize}
        boundaryCount={0}
        siblingCount={0}
        pageSizeValues={[10, 20, 50]}
        hideLabelAfter
        showFirstButton={false}
        showLastButton={false}
      />
    </>
  );
};

export default React.memo(AggregateTable);
