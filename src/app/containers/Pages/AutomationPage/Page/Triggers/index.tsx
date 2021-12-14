import React from 'react';
// import { useAutomationDataContext } from 'lib/hooks/Automation/useAutomationDataContext';
import { IAlertMeta, IAlertMetaDataRes } from 'lib/api/ApiModels/Workflow/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { WorkflowApi } from 'lib/api/ApiModels/Workflow/endpoints';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';
import { AutomationSelectValuesTypes, AUTOMATION_SELECT_VALUES } from 'lib/hooks/Automation/models';
import { workflowParamBuilder } from 'lib/api/ApiModels/Workflow/paramBuilder';
import { ISelectedListItem } from 'lib/models/general';
import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import { getSessionStoragePreferences, StoragePreferenceKeys, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { DataGrid } from '@mui/x-data-grid';
import { IColumn } from 'lib/models/grid';
import { GridStyles } from 'app/components/Grid/GridStyles';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import Paging from 'app/components/Basic/Paging';
import { getSearchedListData, TriggerGridColumns } from './model';
import Header from './Header';
interface Props {
  onCreateNew: () => void;
}

const Triggers: React.FC<Props> = (props: Props) => {
  // const { automation } = useAutomationDataContext();
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IAlertMetaDataRes>();
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [dataRows, setDataRows] = React.useState<IAlertMeta[]>([]);
  const [filteredData, setFilteredData] = React.useState<IAlertMeta[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const [selectedPeriod, setSelectedPeriod] = React.useState<AutomationSelectValuesTypes>(AUTOMATION_SELECT_VALUES[0].value);
  const gridStyles = GridStyles();
  const [gridColumns, setGridColumns] = React.useState<IColumn[]>([
    {
      id: `triggers${TriggerGridColumns.name.resField}`,
      field: TriggerGridColumns.name.resField,
      headerName: TriggerGridColumns.name.label,
      label: TriggerGridColumns.name.label,
      minWidth: 220,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      id: `loggins${TriggerGridColumns.type.resField}`,
      field: TriggerGridColumns.type.resField,
      headerName: TriggerGridColumns.type.label,
      label: TriggerGridColumns.type.label,
      width: 160,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      id: `loggins${TriggerGridColumns.category.resField}`,
      field: TriggerGridColumns.category.resField,
      headerName: TriggerGridColumns.category.label,
      label: TriggerGridColumns.category.label,
      minWidth: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      //   renderCell: (param: GridRenderCellParams) => (
      //     <GridCellWrapper title={param.value as string}>
      //       <GridCellLabel cursor="default">{param.value}</GridCellLabel>
      //     </GridCellWrapper>
      //   ),
    },
    {
      id: `loggins${TriggerGridColumns.severity.resField}`,
      field: TriggerGridColumns.severity.resField,
      headerName: TriggerGridColumns.severity.label,
      label: TriggerGridColumns.severity.label,
      width: 180,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      id: `loggins${TriggerGridColumns.triggerCount.resField}`,
      field: TriggerGridColumns.triggerCount.resField,
      headerName: TriggerGridColumns.triggerCount.label,
      label: TriggerGridColumns.triggerCount.label,
      minWidth: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      // renderCell: (param: GridRenderCellParams) => (
      //   <GridCellWrapper title={param.value as string}>
      //     <GridCellLabel cursor="default">{param.value}</GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    {
      id: `loggins${TriggerGridColumns.configState.resField}`,
      field: TriggerGridColumns.configState.resField,
      headerName: '',
      label: TriggerGridColumns.configState.label,
      width: 80,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      // renderCell: (param: GridRenderCellParams) => (
      //   <GridCellWrapper title={param.value as string}>
      //     <GridCellLabel cursor="default">{param.value}</GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    {
      id: `loggins${TriggerGridColumns.metaDescString.resField}`,
      field: TriggerGridColumns.metaDescString.resField,
      headerName: TriggerGridColumns.metaDescString.label,
      label: TriggerGridColumns.metaDescString.label,
      width: 200,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      // renderCell: (param: GridRenderCellParams) => (
      //   <GridCellWrapper title={param.value as string}>
      //     <GridCellLabel cursor="default">{param.value}</GridCellLabel>
      //   </GridCellWrapper>
      // ),
    },
    // {
    //   id: `loggins${LoggingGridColumns.respStatusCode.resField}`,
    //   field: LoggingGridColumns.respStatusCode.resField,
    //   headerName: LoggingGridColumns.respStatusCode.label,
    //   label: LoggingGridColumns.respStatusCode.label,
    //   width: 120,
    //   disableColumnMenu: true,
    //   resizable: false,
    //   editable: false,
    //   filterable: false,
    //   disableReorder: true,
    //   disableExport: true,
    //   renderCell: (param: GridRenderCellParams) => {
    //     if (param.value === '200' || param.value === 200 || (param.value >= 200 && param.value < 300)) {
    //       return (
    //         <GridCellWrapper>
    //           <GridCellStatusCircle color="var(--_successColor)" />
    //           <GridCellLabel cursor="default">{param.value}</GridCellLabel>
    //         </GridCellWrapper>
    //       );
    //     }
    //     if (param.value === '500' || param.value === 500 || param.value >= 500) {
    //       return (
    //         <GridCellWrapper>
    //           <GridCellStatusCircle color="var(--_errorColor)" />
    //           <GridCellLabel cursor="default">{param.value}</GridCellLabel>
    //         </GridCellWrapper>
    //       );
    //     }
    //     if (param.value === '400' || param.value === 400 || (param.value >= 400 && param.value < 500)) {
    //       return (
    //         <GridCellWrapper>
    //           <GridCellStatusCircle color="var(--_errorColor)" />
    //           <GridCellLabel cursor="default">{param.value}</GridCellLabel>
    //         </GridCellWrapper>
    //       );
    //     }
    //     return (
    //       <GridCellWrapper>
    //         <GridCellStatusCircle />
    //         <GridCellLabel cursor="default">{param.value}</GridCellLabel>
    //       </GridCellWrapper>
    //     );
    //   },
    // },
    // {
    //   id: `logginsDeteilCol`,
    //   field: '',
    //   headerName: '',
    //   label: '',
    //   width: 150,
    //   resizable: false,
    //   filterable: false,
    //   sortable: false,
    //   editable: false,
    //   hideSortIcons: true,
    //   disableColumnMenu: true,
    //   disableReorder: true,
    //   disableExport: true,
    //   renderCell: (param: GridRenderCellParams) => (
    //     <GridCellWrapper>
    //       <DetailsButton dataItem={param.row} onClick={onOpenDetails} />
    //     </GridCellWrapper>
    //   ),
    // },
  ]);
  React.useEffect(() => {
    const _preference = getSessionStoragePreferences(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, [StoragePreferenceKeys.WORKFLOW_TRIGGERS_TIME_PERIOD]);
    let _period = AUTOMATION_SELECT_VALUES[0].value;
    if (_preference) {
      if (_preference[StoragePreferenceKeys.WORKFLOW_TRIGGERS_TIME_PERIOD]) {
        _period = _preference[StoragePreferenceKeys.WORKFLOW_TRIGGERS_TIME_PERIOD];
        setSelectedPeriod(_period);
      }
    }
    if (!_preference || !_preference[StoragePreferenceKeys.WORKFLOW_TRIGGERS_TIME_PERIOD]) {
      setSelectedPeriod(_period);
    }
    onTryLoadAlertMetaData(pageSize, currentPage, _period);
  }, []);

  React.useEffect(() => {
    if (response && response.alertMetadata && response.alertMetadata.length) {
      const _arr: IAlertMeta[] = getSearchedListData(response.alertMetadata, searchValue);
      setDataRows(response.alertMetadata);
      setFilteredData(_arr);
      setTotalCount(response.totalCount);
    } else {
      setDataRows([]);
      setFilteredData([]);
      setTotalCount(0);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      setDataRows([]);
      setFilteredData([]);
      setTotalCount(0);
    }
  }, [error]);

  const onSearhChange = (value: string) => {
    if (value !== searchValue) {
      const _arr: IAlertMeta[] = getSearchedListData(response.alertMetadata, searchValue);
      setFilteredData(_arr);
      setSearchValue(value);
    }
  };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    onTryLoadAlertMetaData(pageSize, _page, selectedPeriod);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      onTryLoadAlertMetaData(size, page, selectedPeriod);
      return;
    }
    setPageSize(size);
    onTryLoadAlertMetaData(size, currentPage, selectedPeriod);
  };

  const onChangePeriod = (_item: ISelectedListItem<AutomationSelectValuesTypes>) => {
    setSelectedPeriod(_item.value);
    updateSessionStoragePreference(_item.value, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.WORKFLOW_TRIGGERS_TIME_PERIOD);
    onTryLoadAlertMetaData(pageSize, currentPage, _item.value);
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

  const onTryLoadAlertMetaData = async (_pageSize: number, _currentPage: number, _period: AutomationSelectValuesTypes) => {
    const _param = workflowParamBuilder(_pageSize, _currentPage, _period);
    await onGet(WorkflowApi.getAllMetadata(), userContext.accessToken!, _param);
  };

  return (
    <>
      <Header
        onChangePeriod={onChangePeriod}
        timeRangeValues={AUTOMATION_SELECT_VALUES}
        selectedTimeRangePeriod={selectedPeriod}
        searchValue={searchValue}
        columns={gridColumns}
        onChangeColumn={onChangeColumn}
        onChangeOrder={onChangeOrder}
        onSearchChange={onSearhChange}
      />
      <DataGrid
        className={gridStyles.borderedRow}
        disableColumnMenu
        hideFooter
        headerHeight={50}
        rowHeight={70}
        rowCount={filteredData && filteredData.length ? filteredData.length : 0}
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
    </>
  );
};

export default React.memo(Triggers);
