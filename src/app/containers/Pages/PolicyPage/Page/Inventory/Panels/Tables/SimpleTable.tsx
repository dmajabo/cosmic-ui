import React from 'react';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import * as gridHelper from 'lib/helpers/gridHelper';
import { Column } from 'primereact/column';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';

interface Props {
  id: string;
  data: any[];
  columns: IGridColumnField[];
  loading: boolean;
  error: string;
}

const SimpleTable: React.FC<Props> = (props: Props) => {
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
  const onSort = (e: DataTablePFSEvent) => {
    const _sortObject = gridHelper.singelSortHelper(sortObject, e);
    setSortObject(_sortObject);
  };
  return (
    <TableWrapper style={{ minHeight: !props.data || !props.data.length ? '200px' : 'auto', flexGrow: '0', flexShrink: 0 }}>
      <DataTable
        className="tableSM"
        emptyMessage={!props.error ? 'No data' : ' '}
        value={props.data}
        responsiveLayout="scroll"
        onSort={onSort}
        sortField={sortObject ? sortObject.field : null}
        sortOrder={sortObject ? sortObject.order : null}
        sortMode="single"
      >
        {props.columns.map(col => {
          if (col.hide) return null;
          return (
            <Column
              key={`securityGroup${col.field}${props.id}`}
              style={{ width: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth }}
              field={col.field}
              header={col.label}
              sortable={col.sortable}
              body={col.body || null}
            />
          );
        })}
      </DataTable>
      {props.loading && (
        <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}

      {props.error && (
        <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
          <ErrorMessage margin="auto" fontSize={20}>
            {props.error || 'Something went wrong'}
          </ErrorMessage>
        </AbsLoaderWrapper>
      )}
    </TableWrapper>
  );
};

export default React.memo(SimpleTable);
