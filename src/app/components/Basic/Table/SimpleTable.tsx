import React from 'react';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import * as gridHelper from 'lib/helpers/gridHelper';
import { Column } from 'primereact/column';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { TableHeaderStyles } from 'app/components/Basic/Table/styles';

interface Props {
  id: string;
  data: any[];
  columns: IGridColumnField[];
  loading?: boolean;
  error?: string;
  styles?: Object;
  tableStyles?: Object;
  tableClass?: string;
  tableTitle?: string;
  scrollable?: boolean;
  scrollHeight?: any;
}

const SimpleTable: React.FC<Props> = (props: Props) => {
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
  const onSort = (e: DataTablePFSEvent) => {
    const _sortObject = gridHelper.singelSortHelper(sortObject, e);
    setSortObject(_sortObject);
  };
  return (
    <>
      {props.tableTitle && <TableHeaderStyles>{props.tableTitle}</TableHeaderStyles>}
      <TableWrapper style={{ minHeight: !props.data || !props.data.length ? '200px' : null, ...props.styles }}>
        <DataTable
          className={props.tableClass ? props.tableClass : 'tableSM'}
          emptyMessage={!props.error ? 'No data' : ' '}
          value={props.data}
          responsiveLayout="scroll"
          onSort={onSort}
          sortField={sortObject ? sortObject.field : null}
          sortOrder={sortObject ? sortObject.order : null}
          sortMode="single"
          style={{ ...props.tableStyles }}
          scrollable={props.scrollable !== undefined || props.scrollable !== null ? props.scrollable : true}
          scrollDirection="both"
          scrollHeight={props.scrollHeight || 'flex'}
        >
          {props.columns.map(col => {
            if (col.hide) return null;
            return (
              <Column
                key={`securityGroup${col.field}${props.id}`}
                style={{ width: col.width || null, minWidth: col.minWidth || null, maxWidth: col.maxWidth || null, flex: col.flex || null, ...col.styles }}
                field={col.field}
                header={col.label}
                sortable={col.sortable}
                body={col.body || null}
              />
            );
          })}
        </DataTable>
        {props.loading && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}

        {props.error && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px" opacity="1">
            <ErrorMessage margin="auto" fontSize={20}>
              {props.error || 'Something went wrong'}
            </ErrorMessage>
          </AbsLoaderWrapper>
        )}
      </TableWrapper>
    </>
  );
};

export default React.memo(SimpleTable);
