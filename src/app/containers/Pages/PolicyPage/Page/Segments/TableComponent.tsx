import React from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { GridStyles } from 'app/components/Grid/GridStyles';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import Paging from 'app/components/Basic/Paging';
import { IColumn } from 'lib/models/grid';
import { SegmentsGridColumns } from './models';
import { ColorValue, GridButton, CellValue, GridCellWrapper, CellCheckMarkValue } from 'app/components/Grid/styles';
import { editIcon } from 'app/components/SVGIcons/edit';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { ISegmentSegmentP, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import { checkMark } from 'app/components/SVGIcons/checkMark';
import SeparateTableCell from './SeparateTableCell';
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
  const [gridColumns] = React.useState<IColumn[]>([
    {
      id: `segments${SegmentsGridColumns.name.resField}`,
      field: SegmentsGridColumns.name.resField,
      headerName: SegmentsGridColumns.name.label,
      label: SegmentsGridColumns.name.label,
      minWidth: 200,
      flex: 0.25,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => (
        <GridCellWrapper>
          <ColorValue margin="auto 20px auto 0" color={param.row[SegmentsGridColumns.color.resField]} />
          <CellValue>{param.value}</CellValue>
        </GridCellWrapper>
      ),
    },
    {
      id: `segments${SegmentsGridColumns.type.resField}`,
      field: SegmentsGridColumns.type.resField,
      headerName: SegmentsGridColumns.type.label,
      label: SegmentsGridColumns.type.label,
      minWidth: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => {
        if (param.value === SegmentSegmentType.NETWORK) return 'Network';
        if (param.value === SegmentSegmentType.SITE) return 'Site';
        if (param.value === SegmentSegmentType.APPLICATION) return 'Application';
        if (param.value === SegmentSegmentType.EXTERNAL) return 'External';
        return param.value;
      },
    },
    // {
    //   id: `segments${SegmentsGridColumns.description.resField}`,
    //   field: SegmentsGridColumns.description.resField,
    //   headerName: SegmentsGridColumns.description.label,
    //   label: SegmentsGridColumns.description.label,
    //   minWidth: 200,
    //   flex: 0.5,
    //   disableColumnMenu: true,
    //   resizable: false,
    //   editable: false,
    //   filterable: false,
    //   disableReorder: true,
    //   disableExport: true,
    // },
    {
      id: `segments${SegmentsGridColumns.id.resField}`,
      field: SegmentsGridColumns.id.resField,
      headerName: SegmentsGridColumns.id.label,
      label: SegmentsGridColumns.id.label,
      minWidth: 200,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => <SeparateTableCell dataItem={param.row} />,
    },
    {
      id: `segments${SegmentsGridColumns.isSystemSegment.resField}`,
      field: SegmentsGridColumns.isSystemSegment.resField,
      headerName: SegmentsGridColumns.isSystemSegment.label,
      label: SegmentsGridColumns.isSystemSegment.label,
      minWidth: 140,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => {
        if (param.value) return <CellCheckMarkValue>{checkMark}</CellCheckMarkValue>;
        return '';
      },
    },
    {
      id: `segmentsActionCol`,
      field: '',
      headerName: '',
      label: '',
      width: 80,
      resizable: false,
      filterable: false,
      sortable: false,
      editable: false,
      hideSortIcons: true,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => (
        <GridCellWrapper>
          <GridButton margin="auto 0" onClick={() => props.onEditSegment(param.row)}>
            {editIcon}
          </GridButton>
          <GridButton margin="auto 0 auto 12px" hoverColor="var(--_errorColor)" onClick={() => props.onDeleteSegment(param.row)}>
            {deleteIcon('#3A5277')}
          </GridButton>
        </GridCellWrapper>
      ),
    },
  ]);
  const gridStyles = GridStyles();
  return (
    <>
      <DataGrid
        className={gridStyles.borderedRow}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={70}
        rowCount={props.data.length}
        disableColumnFilter
        autoHeight
        rows={props.data}
        loading={props.loading}
        error={props.error || null}
        columns={gridColumns}
        components={{
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
          NoRowsOverlay: () => (
            <AbsLoaderWrapper width="100%" height="100%">
              <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
                No data
              </ErrorMessage>
            </AbsLoaderWrapper>
          ),
          ErrorOverlay: () => <ErrorMessage margin="auto">{props.error || null}</ErrorMessage>,
          LoadingOverlay: () => (
            <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          ),
        }}
        pageSize={props.data ? props.data.length : 0}
      />
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
