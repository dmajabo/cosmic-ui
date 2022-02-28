import React from 'react';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import Paging from 'app/components/Basic/Paging';
import { ISortObject } from 'lib/models/grid';
import { SegmentsGridColumns } from './models';
import { ColorValue, GridButton, GridCellWrapper, CellCheckMarkValue } from 'app/components/Grid/styles';
import { editIcon } from 'app/components/SVGIcons/edit';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { ISegmentSegmentP, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import { checkMark } from 'app/components/SVGIcons/checkMark';
import SeparateTableCell from './SeparateTableCell';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import * as sortHelper from 'lib/helpers/gridHelper';
interface Props {
  data: ISegmentSegmentP[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  error: string;
  loading: boolean;
  onEditSegment: (item: ISegmentSegmentP) => void;
  onDeleteSegment: (item: ISegmentSegmentP) => void;
  onChangeCurrentPage: (_page: number) => void;
  onChangePageSize: (size: number, page?: number) => void;
}

const TableComponent: React.FC<Props> = (props: Props) => {
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);

  const colorBodyTemplate = (rowData: ISegmentSegmentP) => {
    if (rowData.segType === SegmentSegmentType.NETWORK) return <ColorValue margin="auto 0 auto 0" color={rowData.color} borderRadius="50%" />;
    if (rowData.segType === SegmentSegmentType.SITE) return <ColorValue margin="auto 0 auto 0" color={rowData.color || '#009688'} borderRadius="50%" />;
    if (rowData.segType === SegmentSegmentType.APPLICATION) return <ColorValue margin="auto 0 auto 0" color={rowData.color} borderRadius="50%" />;
    if (rowData.segType === SegmentSegmentType.EXTERNAL) return <ColorValue margin="auto 0 auto 0" color={rowData.color || '#F9A825'} borderRadius="50%" />;
    return <ColorValue margin="auto 0 auto 0" color={rowData.color} borderRadius="50%" />;
  };

  const typeBodyTemplate = (rowData: ISegmentSegmentP) => {
    if (rowData.segType === SegmentSegmentType.NETWORK) return 'Network';
    if (rowData.segType === SegmentSegmentType.SITE) return 'Site';
    if (rowData.segType === SegmentSegmentType.APPLICATION) return 'Application';
    if (rowData.segType === SegmentSegmentType.EXTERNAL) return 'External';
    return rowData.segType;
  };

  const sourceBodyTemplate = (rowData: ISegmentSegmentP) => {
    return <SeparateTableCell dataItem={rowData} />;
  };

  const systemSegmentBodyTemplate = (rowData: ISegmentSegmentP) => {
    if (rowData.isSystemSegment) return <CellCheckMarkValue>{checkMark}</CellCheckMarkValue>;
    return null;
  };

  const actionBodyTemplate = (rowData: ISegmentSegmentP) => {
    return (
      <GridCellWrapper>
        <GridButton margin="auto 0" onClick={() => props.onEditSegment(rowData)}>
          {editIcon}
        </GridButton>
        <GridButton margin="auto 0 auto 12px" hoverColor="var(--_errorColor)" onClick={() => props.onDeleteSegment(rowData)}>
          {deleteIcon('#3A5277')}
        </GridButton>
      </GridCellWrapper>
    );
  };

  const onSort = (e: DataTablePFSEvent) => {
    const _sortObject = sortHelper.singelSortHelper(sortObject, e);
    setSortObject(_sortObject);
  };
  return (
    <>
      <TableWrapper style={{ minHeight: !props.data || !props.data.length ? '300px' : null }}>
        <DataTable
          className="table autoHeight"
          emptyMessage={!props.error ? 'No data' : ' '}
          value={props.data}
          responsiveLayout="scroll"
          onSort={onSort}
          sortField={sortObject ? sortObject.field : null}
          sortOrder={sortObject ? sortObject.order : null}
          sortMode="single"
        >
          <Column
            headerStyle={{ fontSize: 12, fontWeight: 'bold' }}
            style={{ minWidth: SegmentsGridColumns.name.width, fontSize: 16, fontWeight: 'normal' }}
            sortable={SegmentsGridColumns.name.sortable}
            field={SegmentsGridColumns.name.field}
            header={SegmentsGridColumns.name.label}
          ></Column>
          <Column
            headerStyle={{ fontSize: 12, fontWeight: 'bold' }}
            style={{ minWidth: SegmentsGridColumns.color.width, fontSize: 16, fontWeight: 'normal' }}
            sortable={SegmentsGridColumns.color.sortable}
            field={SegmentsGridColumns.color.field}
            header={SegmentsGridColumns.color.label}
            body={colorBodyTemplate}
          ></Column>
          <Column
            headerStyle={{ fontSize: 12, fontWeight: 'bold' }}
            style={{ minWidth: SegmentsGridColumns.type.width, fontSize: 16, fontWeight: 'normal' }}
            sortable={SegmentsGridColumns.type.sortable}
            field={SegmentsGridColumns.type.field}
            header={SegmentsGridColumns.type.label}
            body={typeBodyTemplate}
          ></Column>
          <Column
            headerStyle={{ fontSize: 12, fontWeight: 'bold' }}
            style={{ maxWidth: '600px', fontSize: 16, fontWeight: 'normal' }}
            sortable={SegmentsGridColumns.id.sortable}
            field={SegmentsGridColumns.id.field}
            header={SegmentsGridColumns.id.label}
            body={sourceBodyTemplate}
          ></Column>
          <Column
            headerStyle={{ fontSize: 12, fontWeight: 'bold' }}
            style={{
              textAlign: 'center',
              width: SegmentsGridColumns.isSystemSegment.width,
              minWidth: SegmentsGridColumns.isSystemSegment.width,
              maxWidth: SegmentsGridColumns.isSystemSegment.width,
              fontSize: 16,
              fontWeight: 'normal',
            }}
            sortable={SegmentsGridColumns.isSystemSegment.sortable}
            field={SegmentsGridColumns.isSystemSegment.field}
            header={SegmentsGridColumns.isSystemSegment.label}
            body={systemSegmentBodyTemplate}
          ></Column>
          <Column body={actionBodyTemplate} sortable={false} exportable={false} style={{ width: '80px', minWidth: '80px', maxWidth: '80px' }}></Column>
        </DataTable>
        {props.loading && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}

        {props.error && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
            <ErrorMessage margin="auto" fontSize={20}>
              {props.error || null}
            </ErrorMessage>
          </AbsLoaderWrapper>
        )}
      </TableWrapper>
      <Paging
        count={props.totalCount}
        disabled={!props.data.length}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={props.onChangeCurrentPage}
        onChangePageSize={props.onChangePageSize}
      />
    </>
  );
};

export default React.memo(TableComponent);
