import React from 'react';
import { useSettingsDataContext } from 'lib/hooks/Settings/useSettingsDataContenxt';
import { DataGrid, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Drawer from '@mui/material/Drawer';
import { GridCellWrapper } from 'app/components/Grid/styles';
import { IModal } from 'lib/models/general';
import Paging from 'app/components/Basic/Paging';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import Header from '../Components/Header';
import { LoggingGridColumns } from './models';
import { format } from 'date-fns';
import DetailsButton from '../Components/DetailsButton';
import Details from './Details';
import { SettingsTabTypes } from 'lib/hooks/Settings/model';
import { IColumn } from 'lib/models/grid';
interface IProps {}

const Logging: React.FC<IProps> = (props: IProps) => {
  const { settings } = useSettingsDataContext();
  const [dataRows] = React.useState<any[]>([
    {
      id: '0',
      rowIndex: 0,
      time: 1635841178000,
      edge: 'Merai',
      user: 'Jassy',
      operation: 'Topology change',
      changes: 'Not avaible',
    },
    {
      id: '1',
      rowIndex: 1,
      time: 1635841278000,
      edge: 'AWS',
      user: 'Teddy',
      operation: 'Topology change',
      changes: 'Not avaible',
    },
  ]);
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const [gridColumns, setGridColumns] = React.useState<IColumn[]>([
    {
      id: 'logginsRowIndex',
      field: 'rowIndex',
      headerName: '#',
      label: '',
      minWidth: 70,
      flex: 0,
      resizable: false,
      filterable: false,
      sortable: false,
      editable: false,
      hideSortIcons: true,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      valueFormatter: (params: GridValueFormatterParams) => +params.value + 1,
    },
    {
      id: `loggins${LoggingGridColumns.time.resField}`,
      field: LoggingGridColumns.time.resField,
      headerName: LoggingGridColumns.time.label,
      label: LoggingGridColumns.time.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      valueFormatter: (params: GridValueFormatterParams) => format(Number(params.value), `EEE',' LLL d',' yyyy HH:mm aa`),
      // renderCell: (param: GridRenderCellParams) => (
      //   <GridCellWrapper>
      //     <GridCellLabel color="var(--_sHoverButtonColor)" onClick={() => onEditUser(param)}>
      //       {param.value}
      //     </GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    {
      id: `loggins${LoggingGridColumns.edge.resField}`,
      field: LoggingGridColumns.edge.resField,
      headerName: LoggingGridColumns.edge.label,
      label: LoggingGridColumns.edge.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `loggins${LoggingGridColumns.user.resField}`,
      field: LoggingGridColumns.user.resField,
      headerName: LoggingGridColumns.user.label,
      label: LoggingGridColumns.user.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
      // renderCell: (param: any) => (
      //   <GridCellWrapper>
      //     <GridCellLabel color="var(--_sHoverButtonColor)" onClick={() => onEditProfile(param)}>
      //       {param.value ? param.value : null}
      //     </GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    {
      id: `loggins${LoggingGridColumns.operation.resField}`,
      field: LoggingGridColumns.operation.resField,
      headerName: LoggingGridColumns.operation.label,
      label: LoggingGridColumns.operation.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `loggins${LoggingGridColumns.changes.resField}`,
      field: LoggingGridColumns.changes.resField,
      headerName: LoggingGridColumns.changes.label,
      label: LoggingGridColumns.changes.label,
      minWidth: 200,
      flex: 0.5,
      resizable: false,
    },
    {
      id: `logginsDeteilCol`,
      field: '',
      headerName: '',
      label: '',
      width: 150,
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
          <DetailsButton dataItem={param.row} onClick={onOpenDetails} />
        </GridCellWrapper>
      ),
    },
  ]);

  const [showDetails, setDetailsForm] = React.useState<IModal<any>>(null);
  const gridStyles = GridStyles();

  const onSearhChange = (value: string) => {
    setSearchValue(value);
  };

  const onChangeColumn = (col: IColumn) => {
    const _items: IColumn[] = gridColumns.slice();
    const _index = _items.findIndex(it => it.field === col.field);
    _items[_index].hide = !col.hide;
    setGridColumns(_items);
  };

  const onChangeOrder = (_items: IColumn[]) => {
    setGridColumns(_items);
  };

  const onOpenDetails = (item: any) => {
    setDetailsForm({ show: true, dataItem: item });
  };

  const onCloseDetails = () => {
    setDetailsForm(null);
  };

  const onChangePage = (page: number) => {
    settings.onChangeCurrentPage(SettingsTabTypes.Logging, page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    settings.onChangePageSize(SettingsTabTypes.Logging, size, page);
  };

  return (
    <>
      <Header searchValue={searchValue} columns={gridColumns} onChangeColumn={onChangeColumn} onChangeOrder={onChangeOrder} onSearchChange={onSearhChange} hideEditButton hideDelete />

      <DataGrid
        className={gridStyles.borderedRow}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={50}
        rowCount={dataRows.length}
        disableColumnFilter
        autoHeight
        // error={props.isError}
        rows={dataRows}
        columns={gridColumns}
        components={{
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
        }}
        pageSize={dataRows ? dataRows.length : 0}
      />
      <Paging
        count={dataRows.length}
        disabled={!dataRows.length}
        pageSize={settings.loggingPageSize}
        currentPage={settings.loggingCurrentPage}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
      />
      <Drawer transitionDuration={300} anchor="right" open={showDetails && showDetails.show ? true : false} onClose={onCloseDetails}>
        <Details dataItem={showDetails && showDetails.dataItem} onClose={onCloseDetails} />
      </Drawer>
    </>
  );
};

export default React.memo(Logging);
