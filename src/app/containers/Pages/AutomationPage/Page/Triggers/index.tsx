import React from 'react';
import { AlertConfigState, AlertSeverity, IAlertMeta, IAlertMetaDataRes } from 'lib/api/ApiModels/Workflow/apiModel';
import { useGet, usePost } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';
import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import { getSessionStoragePreferences, StoragePreferenceKeys, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import Paging from 'app/components/Basic/Paging';
import { getMappedData, getSearchedListData, IAlertMetaTableItem, TriggerGridColumns } from './model';
import Header from './Header';
import { toast, ToastContainer } from 'react-toastify';
import { ALERT_TIME_RANGE_QUERY_TYPES, paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import MatSelect from 'app/components/Inputs/MatSelect';
import SeverityOption from '../../Components/SeverityOption/SeverityOption';
import SwitchInput from 'app/components/Inputs/SwitchInput';
import { GridCellTotalTag } from 'app/components/Grid/styles';
import TriggerChannel from './TriggerChannel';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
import HitsComponent from './HitsComponent';
import { ChannelsWrapper } from './styles';
import { ISortObject } from 'lib/models/grid';

interface Props {}

const Triggers: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IAlertMetaDataRes>();
  const { loading: putLoading, error: putError, response: updateRes, onPost } = usePost<IAlertMeta, IAlertMeta>();
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [dataRows, setDataRows] = React.useState<IAlertMetaTableItem[]>([]);
  const [filteredData, setFilteredData] = React.useState<IAlertMetaTableItem[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const [selectedPeriod, setSelectedPeriod] = React.useState<ALERT_TIME_RANGE_QUERY_TYPES>(ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK);
  const [expandedRows, setExpandedRows] = React.useState(null);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);

  React.useEffect(() => {
    const _preference = getSessionStoragePreferences(OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, [StoragePreferenceKeys.WORKFLOW_TRIGGERS_TIME_PERIOD]);
    let _period = ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK;
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
      const _mappedData: IAlertMetaTableItem[] = getMappedData(response);
      const _arr: IAlertMetaTableItem[] = getSearchedListData(_mappedData, searchValue);
      setDataRows(_mappedData);
      setFilteredData(_arr);
      setTotalCount(response.totalCount);
    } else {
      setDataRows([]);
      setFilteredData([]);
      setTotalCount(0);
    }
  }, [response]);

  React.useEffect(() => {
    if (updateRes && updateRes.id) {
      const _items: IAlertMetaTableItem[] = dataRows.slice();
      const index: number = _items.findIndex(it => it.type === updateRes.type);
      const _newItem: IAlertMetaTableItem = Object.assign(_items[index], updateRes);
      _items.splice(index, 1, _newItem);
      const _arr: IAlertMetaTableItem[] = getSearchedListData(_items, searchValue);
      if (expandedRows && expandedRows[_newItem.id] && (!_newItem.triggerCount || _newItem.triggerCount <= 0)) {
        const _obj = { ...expandedRows };
        delete _obj[_newItem.id];
        if (!Object.keys(_obj).length) {
          setExpandedRows(null);
        } else {
          setExpandedRows(_obj);
        }
      }
      setDataRows(_items);
      setFilteredData(_arr);
      toast.success('Trigger was updated successfully.');
    }
  }, [updateRes]);

  React.useEffect(() => {
    if (putError) {
      toast.error('Something went wrong. Please try again later.');
    }
  }, [putError]);

  React.useEffect(() => {
    if (error) {
      setDataRows([]);
      setFilteredData([]);
      setTotalCount(0);
    }
  }, [error]);

  const onSearhChange = (_value: string) => {
    if (_value !== searchValue) {
      const _arr: IAlertMetaTableItem[] = getSearchedListData(dataRows, _value);
      setFilteredData(_arr);
      setSearchValue(_value);
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

  const onChangePeriod = (_item: ALERT_TIME_RANGE_QUERY_TYPES) => {
    setSelectedPeriod(_item);
    updateSessionStoragePreference(_item, OKULIS_LOCAL_STORAGE_KEYS.OKULIS_PREFERENCE, StoragePreferenceKeys.WORKFLOW_TRIGGERS_TIME_PERIOD);
    onTryLoadAlertMetaData(pageSize, currentPage, _item);
  };

  const onToogleChange = (e: React.ChangeEvent<HTMLInputElement>, rowData: IAlertMetaTableItem) => {
    const { checked } = e.target;
    const _configState = checked ? AlertConfigState.ON : AlertConfigState.OFF;
    const _obj: IAlertMetaTableItem = { ...rowData } as IAlertMetaTableItem;
    _obj.configState = _configState;
    onTryUpdateMetaData(_obj);
  };

  const onSeverityChange = (v: any, rowData: IAlertMetaTableItem) => {
    const _obj: IAlertMetaTableItem = { ...rowData } as IAlertMetaTableItem;
    _obj.severity = v;
    onTryUpdateMetaData(_obj);
  };

  const onRefresh = () => {
    onTryLoadAlertMetaData(pageSize, currentPage, selectedPeriod);
  };

  const onTryLoadAlertMetaData = async (_pageSize: number, _currentPage: number, _period: ALERT_TIME_RANGE_QUERY_TYPES) => {
    const _param = paramBuilder(_pageSize, _currentPage, _period);
    await onGet(AlertApi.getAllMetadata(), userContext.accessToken!, _param);
  };

  const onTryUpdateMetaData = async (data: IAlertMetaTableItem) => {
    const _obj: IAlertMetaTableItem = { ...data };
    if (_obj.id.includes('CUSTOM_')) {
      _obj.id = '';
    }
    if (_obj.channels) {
      delete _obj.channels;
    }
    await onPost(AlertApi.postMetadata(), _obj, userContext.accessToken!);
  };

  const onRowToggle = (id: string) => {
    if (!expandedRows) {
      const _obj = {};
      _obj[id] = true;
      setExpandedRows(_obj);
      return;
    }
    const _obj = { ...expandedRows };
    if (!_obj[id]) {
      _obj[id] = true;
      setExpandedRows(_obj);
      return;
    }
    delete _obj[id];
    if (!Object.keys(_obj).length) {
      setExpandedRows(null);
      return;
    }
    setExpandedRows(_obj);
  };

  const onSort = (e: DataTablePFSEvent) => {
    if (!sortObject) {
      setSortObject({ field: e.sortField, order: e.sortOrder });
      return;
    }
    if (sortObject && e.sortField !== sortObject.field) {
      setSortObject({ field: e.sortField, order: e.sortOrder });
      return;
    }
    if (sortObject && e.sortField === sortObject.field) {
      if (sortObject.order === -1 && e.sortOrder === 1) {
        setSortObject(null);
        return;
      }
      setSortObject({ ...sortObject, order: e.sortOrder });
    }
  };

  const severityBodyTemplate = (rowData: IAlertMetaTableItem) => {
    return (
      <MatSelect
        id={`sevirity${rowData.id}`}
        value={rowData.severity}
        options={[AlertSeverity.LOW, AlertSeverity.MEDIUM, AlertSeverity.HIGH, AlertSeverity.INFO]}
        onChange={v => onSeverityChange(v, rowData)}
        styles={{ maxWidth: '160px', minHeight: '40px', margin: 'auto 0' }}
        selectStyles={{ height: '40px', width: '100%' }}
        renderValue={(v: string) => <SeverityOption value={v as AlertSeverity} />}
      />
    );
  };

  const configStateBodyTemplate = (rowData: IAlertMetaTableItem) => {
    return <SwitchInput showLabels checked={rowData.configState === AlertConfigState.ON} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onToogleChange(e, rowData)} />;
  };

  const hitsBodyTemplate = (rowData: IAlertMetaTableItem) => {
    return <GridCellTotalTag>{rowData.triggerCount}</GridCellTotalTag>;
  };

  const channelsBodyTemplate = (rowData: IAlertMetaTableItem) => {
    if (!rowData || !rowData.channels || !rowData.channels.length) return null;
    return (
      <ChannelsWrapper>
        {rowData.channels.map((it, index) => (
          <TriggerChannel key={`channel${rowData.id}${it.id}${index}`} channel={it} id={rowData.id} />
        ))}
      </ChannelsWrapper>
    );
  };

  const expanderBodyTemplate = (rowData: IAlertMetaTableItem) => {
    if (!rowData || !rowData.triggerCount || rowData.triggerCount <= 0) return null;
    return (
      <IconWrapper
        width="12px"
        height="12px"
        styles={{ verticalAlign: 'middle', transform: expandedRows && expandedRows[rowData.id] ? 'rotate(0)' : 'rotate(-90deg)', transition: `transform ${DEFAULT_TRANSITION}` }}
        icon={arrowBottomIcon}
        onClick={() => onRowToggle(rowData.id)}
      />
    );
  };

  const rowExpansionTemplate = (rowData: IAlertMetaTableItem) => {
    return <HitsComponent trigger={rowData} period={selectedPeriod} />;
  };

  const rowClass = (rowData: IAlertMetaTableItem) => {
    return {
      'row-expanded': expandedRows && expandedRows[rowData.id],
    };
  };

  return (
    <>
      <Header onRefreshData={onRefresh} onChangePeriod={onChangePeriod} selectedTimeRangePeriod={selectedPeriod} searchValue={searchValue} onSearchChange={onSearhChange} />
      <TableWrapper>
        {!error && (
          <DataTable
            className="table"
            emptyMessage="No data"
            dataKey="id"
            rowClassName={rowClass}
            rowExpansionTemplate={rowExpansionTemplate}
            expandedRows={expandedRows}
            value={filteredData}
            responsiveLayout="scroll"
            onSort={onSort}
            sortField={sortObject ? sortObject.field : null}
            sortOrder={sortObject ? sortObject.order : null}
            sortMode="single"
          >
            <Column
              className="expandCollapseCell"
              style={{ width: TriggerGridColumns.id.width }}
              field={TriggerGridColumns.id.field}
              header={TriggerGridColumns.id.label}
              expander
              body={expanderBodyTemplate}
            ></Column>
            <Column
              style={{ width: TriggerGridColumns.name.width, verticalAlign: 'top', lineHeight: '40px' }}
              sortable
              field={TriggerGridColumns.name.field}
              header={TriggerGridColumns.name.label}
            ></Column>
            <Column
              style={{ width: TriggerGridColumns.category.width, verticalAlign: 'top', lineHeight: '40px' }}
              sortable
              field={TriggerGridColumns.category.field}
              header={TriggerGridColumns.category.label}
            ></Column>
            <Column
              style={{ width: TriggerGridColumns.severity.width, verticalAlign: 'top' }}
              sortable
              field={TriggerGridColumns.severity.field}
              header={TriggerGridColumns.severity.label}
              body={severityBodyTemplate}
            ></Column>
            <Column style={{ maxWidth: '600px', verticalAlign: 'top' }} field={TriggerGridColumns.channels.field} header={TriggerGridColumns.channels.label} body={channelsBodyTemplate}></Column>
            <Column
              style={{ width: TriggerGridColumns.triggerCount.width, verticalAlign: 'top', lineHeight: '40px' }}
              field={TriggerGridColumns.triggerCount.field}
              header={TriggerGridColumns.triggerCount.label}
              body={hitsBodyTemplate}
              sortable
            ></Column>
            <Column
              style={{ width: TriggerGridColumns.configState.width, verticalAlign: 'top', lineHeight: '40px' }}
              field={TriggerGridColumns.configState.field}
              header={TriggerGridColumns.configState.label}
              body={configStateBodyTemplate}
            ></Column>
          </DataTable>
        )}
        {(loading || putLoading) && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {error && <ErrorMessage margin="auto">{error && error.message ? error.message : 'Something went wrong'}</ErrorMessage>}
      </TableWrapper>
      <Paging count={totalCount} disabled={!dataRows.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />
      <ToastContainer />
    </>
  );
};

export default React.memo(Triggers);
