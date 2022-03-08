import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ITopologyQueryParam, toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { MemberAppNodeData, NetworkTrafficByAppIdNetworkExtIdApiResponse } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useContext, useEffect, useState } from 'react';
import { convertBytesToHumanReadableString, convertSecondsToString } from '../utils';
import { AppTrafficColumns, AppTrafficNestedColumns } from './DevicePanel/ApplicationTab/columns';
import LoadingIndicator from 'app/components/Loading';

export interface NestedTrafficTableRowData extends Pick<MemberAppNodeData, 'sent' | 'recv' | 'flows' | 'activeTime' | 'port' | 'protocol'> {
  destination: string;
  noOfClients: string;
}

export const NestedTrafficTable: React.FC<{ networkId: string; resourceId: string }> = ({ networkId, resourceId }) => {
  const { topology } = useTopologyV2DataContext();
  const [rows, setRows] = useState<NestedTrafficTableRowData[]>([]);
  const userContext = useContext<UserContextState>(UserContext);
  const { loading, response, error, onGet } = useGet<NetworkTrafficByAppIdNetworkExtIdApiResponse>();

  useEffect(() => {
    const params: ITopologyQueryParam = { timestamp: null };

    if (topology.selectedTime) {
      params.timestamp = toTimestamp(topology.selectedTime);
    }
    getAsyncData(networkId, resourceId, params);
  }, [networkId, resourceId]);

  useEffect(() => {
    if (response && response.appmetrics && response.appmetrics.appmetrics) {
      const subRows: NestedTrafficTableRowData[] = response.appmetrics.appmetrics.map(trafficData => {
        return {
          activeTime: trafficData.activeTime,
          flows: trafficData.flows,
          port: trafficData.port,
          protocol: trafficData.protocol,
          recv: trafficData.recv,
          sent: trafficData.sent,
          destination: trafficData.destination,
          noOfClients: trafficData.numclients,
        };
      });
      setRows(subRows);
    }
  }, [response]);

  const getAsyncData = (networkExtId: string, appId: string, params?: any) => {
    onGet(TelemetryApi.getTrafficDataByNetworkExtIdAppId(networkExtId, appId), userContext.accessToken!, params);
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
            body={(rowData: NestedTrafficTableRowData) => <>{convertBytesToHumanReadableString(rowData.sent)}</>}
          />
          <Column
            field={AppTrafficColumns.received.field}
            header={AppTrafficColumns.received.label}
            style={{ minWidth: AppTrafficColumns.received.minWidth }}
            sortable={AppTrafficColumns.received.sortable}
            body={(rowData: NestedTrafficTableRowData) => <>{convertBytesToHumanReadableString(rowData.recv)}</>}
          />
          <Column field={AppTrafficColumns.flows.field} header={AppTrafficColumns.flows.label} style={{ minWidth: AppTrafficColumns.flows.minWidth }} sortable={AppTrafficColumns.flows.sortable} />
          <Column
            field={AppTrafficColumns.activeTime.field}
            header={AppTrafficColumns.activeTime.label}
            style={{ minWidth: AppTrafficColumns.activeTime.minWidth }}
            sortable={AppTrafficColumns.activeTime.sortable}
            body={(rowData: NestedTrafficTableRowData) => <>{convertSecondsToString(rowData.activeTime)}</>}
          />
          <Column
            field={AppTrafficColumns.noOfClients.field}
            header={AppTrafficColumns.noOfClients.label}
            style={{ minWidth: AppTrafficColumns.noOfClients.minWidth }}
            sortable={AppTrafficColumns.noOfClients.sortable}
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
