import React from 'react';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { ISankeyAppDetail, ISankeyDetailItem } from 'lib/api/ApiModels/Sessions/apiModel';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import { parseFieldAsDate } from 'lib/helpers/general';

interface IProps {
  data: ISankeyAppDetail;
  loading: boolean;
  errorMessage: string;
}

const GridComponent: React.FC<IProps> = (props: IProps) => {
  const [columns] = React.useState<GridColDef[]>([
    {
      field: 'time',
      headerName: 'Time',
      minWidth: 240,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
    },
    { field: 'activetime', headerName: 'Active Time', minWidth: 120, resizable: false },
    { field: 'application', headerName: 'Application', minWidth: 240, flex: 0.5, resizable: false },
    { field: 'flows', headerName: 'Flows', minWidth: 100, resizable: false },
    { field: 'numclients', headerName: 'Clients', minWidth: 100, resizable: false },
    { field: 'port', headerName: 'Port', minWidth: 160, resizable: false },
    { field: 'protocol', headerName: 'Protocol', minWidth: 160, resizable: false },
    { field: 'recv', headerName: 'RECV', minWidth: 200, resizable: false },
    { field: 'sent', headerName: 'Sent', minWidth: 200, resizable: false },
  ]);
  const [dataRows, setDataRows] = React.useState<ISankeyDetailItem[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const gridStyles = GridStyles();

  React.useEffect(() => {
    if (props.data && props.data.appdetail) {
      if (props.data.appdetail && props.data.appdetail.length) {
        setDataRows(props.data.appdetail.map((it, index) => ({ ...it, id: `rowIndex${index}` })));
      } else {
        setDataRows([]);
      }
    } else {
      setDataRows([]);
      setPage(0);
    }
  }, [props.data]);

  const onChangeCurrentPage = (_page: number) => {
    setPage(_page - 1);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setPage(page - 1);
      setRowsPerPage(size);
      return;
    }
    setRowsPerPage(size);
  };

  return (
    <>
      <DataGrid
        className={gridStyles.container}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={70}
        rowCount={dataRows.length}
        disableColumnFilter
        autoHeight
        loading={props.loading}
        error={props.errorMessage}
        rows={dataRows}
        columns={columns}
        page={page}
        pageSize={rowsPerPage}
        components={{
          NoRowsOverlay: () => (
            <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
              <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
                No data
              </ErrorMessage>
            </AbsLoaderWrapper>
          ),
          LoadingOverlay: () => (
            <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          ),
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
        }}
      />
      <Paging count={dataRows.length} disabled={!dataRows.length} pageSize={rowsPerPage} currentPage={page + 1} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
    </>
  );
};

export default React.memo(GridComponent);
