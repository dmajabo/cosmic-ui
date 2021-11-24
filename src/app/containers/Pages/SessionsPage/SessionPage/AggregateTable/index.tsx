import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import AggregateRow from './AggregateRow';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { IAggregateRow } from './models';
import { buildAggregatedData } from './helper';
import TableHeader from './TableHeader';
import Paging from 'app/components/Basic/Paging';
import { ISessionsGridField, SessionGridColumns } from '../models';
import { TableContainer } from 'app/components/Basic/Table/LargeTableSryles';

interface Props {
  data: ISession[];
}

const AggregateTable: React.FC<Props> = (props: Props) => {
  const [data, setData] = React.useState<IAggregateRow[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [aggregatedColumns] = React.useState<ISessionsGridField[]>([
    SessionGridColumns.collapseColumn,
    SessionGridColumns.sessionId,
    SessionGridColumns.sourceIp,
    SessionGridColumns.sourcePort,
    SessionGridColumns.destIp,
    SessionGridColumns.destPort,
  ]);
  React.useEffect(() => {
    const _data: IAggregateRow[] = buildAggregatedData(props.data);
    console.log(_data);
    setData(_data);
  }, [props.data]);

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
      <TableHeader count={data.length} />
      <TableContainer>
        <Table aria-label="collapsible table" className="largeTable">
          <TableHead>
            <TableRow>
              {aggregatedColumns.map(it => {
                if (it.resField === 'id') {
                  return <TableCell key={`thRow${it.resField}`} style={{ width: '20px' }} />;
                }
                return <TableCell key={`thRow${it.resField}`}>{it.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map(row => (
              <AggregateRow key={row.id} row={row} columns={aggregatedColumns} />
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
