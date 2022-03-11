import React from 'react';
import { ALERT_TIME_RANGE_QUERY_TYPES, getAlertLogParam } from 'lib/api/ApiModels/paramBuilders';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { convertAlertState, IAlertAlert, IAlertListAlertLogsResponse, ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
// import { IAlertChannel, IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
import { IAlertMetaTableItem, NestedTriggerGridColumns } from './model';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { parseFieldAsDate } from 'lib/helpers/general';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { KeyValueWrapper, NestedTableWrapper, StateCell } from 'app/components/Basic/Table/PrimeTableStyles';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';
import Paging from 'app/components/Basic/Paging';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
interface Props {
  trigger: IAlertMetaTableItem;
  period: ALERT_TIME_RANGE_QUERY_TYPES;
}

const HitsComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IAlertListAlertLogsResponse>();
  const [rows, setDataRows] = React.useState<IAlertAlert[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  React.useEffect(() => {
    onTryLoadAlertLogsData(props.trigger.type, props.period, pageSize, currentPage);
  }, [props.period]);

  React.useEffect(() => {
    if (response && response.alerts && response.alerts.length) {
      setDataRows(response.alerts);
      setTotalCount(response.totalCount);
    } else {
      setDataRows([]);
      setTotalCount(0);
    }
  }, [response]);

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    onTryLoadAlertLogsData(props.trigger.type, props.period, pageSize, _page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      onTryLoadAlertLogsData(props.trigger.type, props.period, size, page);
      return;
    }
    setPageSize(size);
    onTryLoadAlertLogsData(props.trigger.type, props.period, size, currentPage);
  };

  const onTryLoadAlertLogsData = async (_type: ModelalertType, _period: ALERT_TIME_RANGE_QUERY_TYPES, _pageSize: number, _currentPage: number) => {
    const _param = getAlertLogParam(_type, _period, _pageSize, _currentPage);
    await onGet(AlertApi.getAlertLogs(), userContext.accessToken!, _param);
  };

  const labelsBodyTemplate = (rowData: IAlertAlert) => {
    return Object.keys(rowData.labels).map(key => (
      <KeyValueWrapper key={`labels${rowData.id}${key}`}>
        <div className="keyValueRow">
          <span className="key">{key}:</span>
          <span className="value">{rowData.labels[key]}</span>
        </div>
      </KeyValueWrapper>
    ));
  };
  const timestampBodyTemplate = (rowData: IAlertAlert) => parseFieldAsDate(rowData.timestamp, `EEE',' LLL d',' yyyy HH:mm aa`);
  const descBodyTemplate = (rowData: IAlertAlert) => <div className="nestedDescCell">{rowData.descString}</div>;
  const stateBodyTemplate = (rowData: IAlertAlert) => <StateCell state={rowData.state}>{convertAlertState(rowData.state)}</StateCell>;
  return (
    <NestedTableWrapper style={{ display: error ? 'flex' : null, height: rows && rows.length ? 'auto' : '300px', minHeight: rows && rows.length ? '100px' : '300px' }}>
      {!error && (
        <DataTable className="tableSM" emptyMessage="No data" dataKey="id" value={rows} responsiveLayout="scroll">
          <Column
            style={{ minWidth: NestedTriggerGridColumns.timestamp.width }}
            field={NestedTriggerGridColumns.timestamp.field}
            header={NestedTriggerGridColumns.timestamp.label}
            body={timestampBodyTemplate}
          ></Column>
          {/* <Column style={{ minWidth: NestedTriggerGridColumns.alertType.width }} field={NestedTriggerGridColumns.alertType.field} header={NestedTriggerGridColumns.alertType.label}></Column> */}
          {/* <Column
            style={{ minWidth: NestedTriggerGridColumns.state.width }}
            field={NestedTriggerGridColumns.state.field}
            header={NestedTriggerGridColumns.state.label}
            body={stateBodyTemplate}
          ></Column> */}
          {/* <Column style={{ minWidth: NestedTriggerGridColumns.objectName.width }} field={NestedTriggerGridColumns.objectName.field} header={NestedTriggerGridColumns.objectName.label}></Column> */}
          {/* <Column
            style={{ minWidth: NestedTriggerGridColumns.objectType.width }}
            field={NestedTriggerGridColumns.objectType.field}
            header={NestedTriggerGridColumns.objectType.label}
            sortable
          ></Column> */}
          <Column
            style={{ minWidth: NestedTriggerGridColumns.descString.width, maxWidth: '600px' }}
            field={NestedTriggerGridColumns.descString.field}
            header={NestedTriggerGridColumns.descString.label}
            body={descBodyTemplate}
          ></Column>
          <Column
            style={{ minWidth: NestedTriggerGridColumns.labels.width, maxWidth: '600px' }}
            field={NestedTriggerGridColumns.labels.field}
            header={NestedTriggerGridColumns.labels.label}
            body={labelsBodyTemplate}
          ></Column>
        </DataTable>
      )}
      {!error && <Paging count={totalCount} disabled={!rows.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />}
      {error && <ErrorMessage margin="auto">{error && error.message ? error.message : 'Something went wrong'}</ErrorMessage>}
      {loading && (
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </NestedTableWrapper>
  );
};

export default React.memo(HitsComponent);
