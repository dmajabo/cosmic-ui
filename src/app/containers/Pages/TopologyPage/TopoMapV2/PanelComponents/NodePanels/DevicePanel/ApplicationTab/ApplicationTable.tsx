import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { MemberAppNodeData, NetworkTrafficByAppIdNetworkExtIdApiResponse } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { Column } from 'primereact/column';
import { DataTable, DataTableRowExpansionTemplate, DataTableRowToggleParams } from 'primereact/datatable';
import { useContext, useEffect, useState } from 'react';
import { convertBytesToHumanReadableString, convertSecondsToString } from '../../../utils';
import { AppTrafficColumns, AppTrafficNestedColumns } from './columns';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { DEFAULT_TRANSITION } from 'lib/constants/general';

export interface TrafficTableRowData extends Pick<MemberAppNodeData, 'sent' | 'recv' | 'flows' | 'activeTime'> {
  name: string;
  resourceId: string;
  networkId: string;
}

interface SubRowData extends Pick<MemberAppNodeData, 'sent' | 'recv' | 'flows' | 'activeTime' | 'port' | 'protocol'> {
  destination: string;
}

interface ApplicationTableProps {
  data: TrafficTableRowData[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
}

export const AppTable: React.FC<ApplicationTableProps> = props => {
  const [expandedRows, setExpandedRows] = useState<any>(null);

  const onRowToggle = (rowData: TrafficTableRowData) => {
    //TODO: Check for resourceId
    if (!expandedRows) {
      const _obj = {};
      _obj[rowData.resourceId] = true;
      setExpandedRows(_obj);
      return;
    }
    const _obj = { ...expandedRows };
    if (!_obj[rowData.resourceId]) {
      _obj[rowData.resourceId] = true;
      setExpandedRows(_obj);
      return;
    }
    delete _obj[rowData.resourceId];
    if (!Object.keys(_obj).length) {
      setExpandedRows(null);
      return;
    }
    setExpandedRows(_obj);
  };

  const expanderBodyTemplate = (rowData: TrafficTableRowData) => {
    return (
      <IconWrapper
        width="12px"
        height="12px"
        styles={{ verticalAlign: 'middle', transform: expandedRows && expandedRows[rowData.resourceId] ? 'rotate(0)' : 'rotate(-90deg)', transition: `transform ${DEFAULT_TRANSITION}` }}
        icon={arrowBottomIcon}
        onClick={e => onRowToggle(rowData)}
      />
    );
  };

  const renderRowTemplate = (rowData: TrafficTableRowData) => {
    return <RowExpansionTemplate networkId={rowData.networkId} resourceId={rowData.resourceId} />;
  };

  return (
    <>
      <TableWrapper>
        <DataTable value={props.data} rowExpansionTemplate={renderRowTemplate} responsiveLayout="scroll" className="tableSM fixedToParentHeight" expandedRows={expandedRows} dataKey="resourceId">
          <Column expander={true} body={expanderBodyTemplate} style={{ width: '1em' }} />
          <Column
            field={AppTrafficColumns.network.field}
            header={AppTrafficColumns.network.label}
            style={{ minWidth: AppTrafficColumns.network.minWidth }}
            sortable={AppTrafficColumns.network.sortable}
          />
          <Column
            body={(rowData: TrafficTableRowData) => <>{convertBytesToHumanReadableString(rowData.sent)}</>}
            field={AppTrafficColumns.sent.field}
            header={AppTrafficColumns.sent.label}
            style={{ minWidth: AppTrafficColumns.sent.minWidth }}
            sortable={AppTrafficColumns.sent.sortable}
          />
          <Column
            body={(rowData: TrafficTableRowData) => <>{convertBytesToHumanReadableString(rowData.recv)}</>}
            field={AppTrafficColumns.received.field}
            header={AppTrafficColumns.received.label}
            style={{ minWidth: AppTrafficColumns.received.minWidth }}
            sortable={AppTrafficColumns.received.sortable}
          />
          <Column field={AppTrafficColumns.flows.field} header={AppTrafficColumns.flows.label} style={{ minWidth: AppTrafficColumns.flows.minWidth }} sortable={AppTrafficColumns.flows.sortable} />
          <Column
            field={AppTrafficColumns.activeTime.field}
            header={AppTrafficColumns.activeTime.label}
            style={{ minWidth: AppTrafficColumns.activeTime.minWidth }}
            sortable={AppTrafficColumns.activeTime.sortable}
            body={(rowData: TrafficTableRowData) => <>{convertSecondsToString(rowData.activeTime)}</>}
          />
        </DataTable>
        {props.showLoader && (
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
      {/* <Paging count={props.logCount} disabled={!props.data.length} pageSize={props.pageSize} currentPage={props.currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} /> */}
    </>
  );
};

const RowExpansionTemplate: React.FC<{ networkId: string; resourceId: string }> = ({ networkId, resourceId }) => {
  const [rows, setRows] = useState<SubRowData[]>([]);
  const userContext = useContext<UserContextState>(UserContext);
  const { loading, response, error, onGet } = useGet<NetworkTrafficByAppIdNetworkExtIdApiResponse>();

  useEffect(() => {
    console.log('Row expansion template - use effect');
    getAsyncData(networkId, resourceId);
  }, [networkId, resourceId]);

  useEffect(() => {
    if (response && response.appmetrics && response.appmetrics.appmetrics) {
      const subRows: SubRowData[] = response.appmetrics.appmetrics.map(trafficData => {
        return {
          activeTime: trafficData.activeTime,
          flows: trafficData.flows,
          port: trafficData.port,
          protocol: trafficData.protocol,
          recv: trafficData.recv,
          sent: trafficData.sent,
          destination: trafficData.destination,
        };
      });
      setRows(subRows);
    }
  }, [response]);

  const getAsyncData = (networkExtId: string, appId: string, params?: any) => {
    onGet(TelemetryApi.getTrafficDataByNetworkExtIdAppId(networkExtId, appId), userContext.accessToken!);
  };

  return (
    <>
      <TableWrapper>
        <DataTable value={rows} responsiveLayout="scroll" className="tableSM fixedToParentHeight">
          <Column
            field={AppTrafficNestedColumns.destination.field}
            header={AppTrafficNestedColumns.destination.label}
            style={{ minWidth: AppTrafficNestedColumns.destination.minWidth }}
            sortable={AppTrafficNestedColumns.destination.sortable}
          />
          <Column
            field={AppTrafficColumns.sent.field}
            header={AppTrafficColumns.sent.label}
            style={{ minWidth: AppTrafficColumns.sent.minWidth }}
            sortable={AppTrafficColumns.sent.sortable}
            body={(rowData: SubRowData) => <>{convertBytesToHumanReadableString(rowData.recv)}</>}
          />
          <Column
            field={AppTrafficColumns.received.field}
            header={AppTrafficColumns.received.label}
            style={{ minWidth: AppTrafficColumns.received.minWidth }}
            sortable={AppTrafficColumns.received.sortable}
            body={(rowData: SubRowData) => <>{convertBytesToHumanReadableString(rowData.recv)}</>}
          />
          <Column field={AppTrafficColumns.flows.field} header={AppTrafficColumns.flows.label} style={{ minWidth: AppTrafficColumns.flows.minWidth }} sortable={AppTrafficColumns.flows.sortable} />
          <Column
            field={AppTrafficColumns.activeTime.field}
            header={AppTrafficColumns.activeTime.label}
            style={{ minWidth: AppTrafficColumns.activeTime.minWidth }}
            sortable={AppTrafficColumns.activeTime.sortable}
            body={(rowData: SubRowData) => <>{convertSecondsToString(rowData.activeTime)}</>}
          />
        </DataTable>
        {loading && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}

        {error && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
            <ErrorMessage margin="auto" fontSize={20}>
              {error || 'Something went wrong'}
            </ErrorMessage>
          </AbsLoaderWrapper>
        )}
      </TableWrapper>
      {/* <Paging count={props.logCount} disabled={!props.data.length} pageSize={props.pageSize} currentPage={props.currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} /> */}
    </>
  );
};
