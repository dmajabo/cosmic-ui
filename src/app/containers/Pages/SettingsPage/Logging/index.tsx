import React from 'react';
import { DataGrid, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Drawer from '@mui/material/Drawer';
import { GridCellLabel, GridCellStatusCircle, GridCellWrapper } from 'app/components/Grid/styles';
import { IModal, ISelectedListItem } from 'lib/models/general';
import Paging from 'app/components/Basic/Paging';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import Header from '../Components/Header';
import { LoggingGridColumns } from './models';
import DetailsButton from '../Components/DetailsButton';
import Details from './Details';
import { IColumn } from 'lib/models/grid';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';
import { SettingsApi } from 'lib/api/ApiModels/Settings/endpoints';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { IAuditLogsRes, INetworkAuditLog } from 'lib/api/ApiModels/Settings/apiModels';
import { getSearchedList } from 'lib/helpers/listHelper';
import { convertStringToNumber, parseFieldAsDate } from 'lib/helpers/general';
import { AuditLogsSelectValuesTypes, AUDIT_LOGS_SELECT_VALUES } from 'lib/hooks/Settings/model';
import { settingsParamBuilder } from 'lib/api/ApiModels/Settings/paramBuilder';
import { getSessionStoragePreferences, StoragePreferenceKeys, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';

interface IProps {}

const Logging: React.FC<IProps> = (props: IProps) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, response, error, onGet } = useGet<IAuditLogsRes>();
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [dataRows, setDataRows] = React.useState<INetworkAuditLog[]>([]);
  const [filteredData, setFilteredData] = React.useState<INetworkAuditLog[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const [period, setPeriod] = React.useState<AuditLogsSelectValuesTypes>(AUDIT_LOGS_SELECT_VALUES[0].value);
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
      id: `loggins${LoggingGridColumns.timestamp.resField}`,
      field: LoggingGridColumns.timestamp.resField,
      headerName: LoggingGridColumns.timestamp.label,
      label: LoggingGridColumns.timestamp.label,
      minWidth: 220,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
    },
    {
      id: `loggins${LoggingGridColumns.userName.resField}`,
      field: LoggingGridColumns.userName.resField,
      headerName: LoggingGridColumns.userName.label,
      label: LoggingGridColumns.userName.label,
      minWidth: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      id: `loggins${LoggingGridColumns.userEmail.resField}`,
      field: LoggingGridColumns.userEmail.resField,
      headerName: LoggingGridColumns.userEmail.label,
      label: LoggingGridColumns.userEmail.label,
      minWidth: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      hide: true,
    },
    {
      id: `loggins${LoggingGridColumns.userIP.resField}`,
      field: LoggingGridColumns.userIP.resField,
      headerName: LoggingGridColumns.userIP.label,
      label: LoggingGridColumns.userIP.label,
      width: 140,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      id: `loggins${LoggingGridColumns.serviceName.resField}`,
      field: LoggingGridColumns.serviceName.resField,
      headerName: LoggingGridColumns.serviceName.label,
      label: LoggingGridColumns.serviceName.label,
      width: 140,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      id: `loggins${LoggingGridColumns.reqType.resField}`,
      field: LoggingGridColumns.reqType.resField,
      headerName: LoggingGridColumns.reqType.label,
      label: LoggingGridColumns.reqType.label,
      width: 140,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      id: `loggins${LoggingGridColumns.reqUrl.resField}`,
      field: LoggingGridColumns.reqUrl.resField,
      headerName: LoggingGridColumns.reqUrl.label,
      label: LoggingGridColumns.reqUrl.label,
      minWidth: 200,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      id: `loggins${LoggingGridColumns.respStatusCode.resField}`,
      field: LoggingGridColumns.respStatusCode.resField,
      headerName: LoggingGridColumns.respStatusCode.label,
      label: LoggingGridColumns.respStatusCode.label,
      width: 120,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => {
        if (param.value === '200' || param.value === 200 || (param.value >= 200 && param.value < 300)) {
          return (
            <GridCellWrapper>
              <GridCellStatusCircle color="var(--_successColor)" />
              <GridCellLabel cursor="default">{param.value}</GridCellLabel>
            </GridCellWrapper>
          );
        }
        if (param.value === '500' || param.value === 500 || param.value >= 500) {
          return (
            <GridCellWrapper>
              <GridCellStatusCircle color="var(--_errorColor)" />
              <GridCellLabel cursor="default">{param.value}</GridCellLabel>
            </GridCellWrapper>
          );
        }
        if (param.value === '400' || param.value === 400 || (param.value >= 400 && param.value < 500)) {
          return (
            <GridCellWrapper>
              <GridCellStatusCircle color="var(--_errorColor)" />
              <GridCellLabel cursor="default">{param.value}</GridCellLabel>
            </GridCellWrapper>
          );
        }
        return (
          <GridCellWrapper>
            <GridCellStatusCircle />
            <GridCellLabel cursor="default">{param.value}</GridCellLabel>
          </GridCellWrapper>
        );
      },
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

  React.useEffect(() => {
    const _preference = getSessionStoragePreferences(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, [StoragePreferenceKeys.AUDIT_LOG_TIME_PERIOD]);
    let _period = AUDIT_LOGS_SELECT_VALUES[0].value;
    if (_preference) {
      if (_preference[StoragePreferenceKeys.AUDIT_LOG_TIME_PERIOD]) {
        _period = _preference[StoragePreferenceKeys.AUDIT_LOG_TIME_PERIOD];
        setPeriod(_period);
      }
    }
    if (!_preference || !_preference[StoragePreferenceKeys.AUDIT_LOG_TIME_PERIOD]) {
      setPeriod(_period);
    }
    onTryLoadAuditLogs(pageSize, currentPage, _period);
  }, []);

  React.useEffect(() => {
    if (response && response.auditLogs) {
      const _total = convertStringToNumber(response.count);
      const startIndex = (currentPage - 1) * pageSize;
      const _items = response.auditLogs.map((it, i) => ({ ...it, rowIndex: i + startIndex }));
      const _arr: INetworkAuditLog[] = getSearchedList(_items, searchValue, [
        LoggingGridColumns.userName.resField,
        LoggingGridColumns.userEmail.resField,
        LoggingGridColumns.userIP.resField,
        LoggingGridColumns.serviceName.resField,
        LoggingGridColumns.respStatusCode.resField,
        LoggingGridColumns.reqUrl.resField,
        LoggingGridColumns.reqType.resField,
      ]);
      setDataRows(_items);
      setFilteredData(_arr);
      setTotalCount(_total);
    }
  }, [response]);

  const onSearhChange = (value: string) => {
    if (value !== searchValue) {
      const _items: INetworkAuditLog[] = getSearchedList(dataRows, value, [
        LoggingGridColumns.userName.resField,
        LoggingGridColumns.userEmail.resField,
        LoggingGridColumns.userIP.resField,
        LoggingGridColumns.serviceName.resField,
        LoggingGridColumns.respStatusCode.resField,
        LoggingGridColumns.reqUrl.resField,
        LoggingGridColumns.reqType.resField,
      ]);
      setFilteredData(_items);
      setSearchValue(value);
    }
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

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    onTryLoadAuditLogs(pageSize, _page, period);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      onTryLoadAuditLogs(size, page, period);
      return;
    }
    setPageSize(size);
    onTryLoadAuditLogs(size, currentPage, period);
  };

  const onChangePeriod = (_item: ISelectedListItem<AuditLogsSelectValuesTypes>) => {
    setPeriod(_item.value);
    updateSessionStoragePreference(_item.value, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.AUDIT_LOG_TIME_PERIOD);
    onTryLoadAuditLogs(pageSize, currentPage, _item.value);
  };

  const onTryLoadAuditLogs = async (_pageSize: number, _currentPage: number, _period: AuditLogsSelectValuesTypes) => {
    const _param = settingsParamBuilder(_pageSize, _currentPage, _period);
    await onGet(SettingsApi.getAuditLogs(), userContext.accessToken!, _param);
  };

  return (
    <>
      <Header
        onChangePeriod={onChangePeriod}
        timeRangeValues={AUDIT_LOGS_SELECT_VALUES}
        selectedTimeRangePeriod={period}
        showTimeRange
        searchValue={searchValue}
        columns={gridColumns}
        onChangeColumn={onChangeColumn}
        onChangeOrder={onChangeOrder}
        onSearchChange={onSearhChange}
        hideEditButton
        hideDelete
      />

      <DataGrid
        className={gridStyles.borderedRow}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={70}
        rowCount={filteredData.length}
        disableColumnFilter
        autoHeight
        rows={filteredData}
        loading={loading}
        error={error ? error.message : null}
        columns={gridColumns}
        components={{
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
          NoRowsOverlay: () => (
            <AbsLoaderWrapper width="100%" height="100%">
              <ErrorMessage color="var(--_primaryColor)" margin="auto">
                No data
              </ErrorMessage>
            </AbsLoaderWrapper>
          ),
          ErrorOverlay: () => <ErrorMessage margin="auto">{error ? error.message : null}</ErrorMessage>,
          LoadingOverlay: () => (
            <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          ),
        }}
        pageSize={filteredData ? filteredData.length : 0}
      />
      <Paging count={totalCount} disabled={!dataRows.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
      <Drawer transitionDuration={300} anchor="right" open={showDetails && showDetails.show ? true : false} onClose={onCloseDetails}>
        <Details dataItem={showDetails && showDetails.dataItem} onClose={onCloseDetails} />
      </Drawer>
    </>
  );
};

export default React.memo(Logging);
