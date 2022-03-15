import { ALERT_TIME_RANGE_QUERY_TYPES, GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React, { useContext, useEffect, useState } from 'react';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import SummaryTable, { SummaryTableData } from './SummaryTable';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { Vnet } from 'lib/api/http/SharedTypes';

interface NetworkTableProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
  readonly networks: Vnet[];
}

interface AggregatedTraffic {
  readonly resource: string;
  readonly node_type: string;
  readonly total_bytes_sent: string;
  readonly total_bytes_rcvd: string;
  readonly total_flows: string;
  readonly total_clients: string;
  readonly total_active_time: string;
}

export interface AggregatedTrafficResponse {
  readonly total_count: number;
  readonly traffic_stat: {
    readonly traffic: AggregatedTraffic[];
  };
}

export const NetworkTable: React.FC<NetworkTableProps> = ({ timeRange, networks }) => {
  const [tableData, setTableData] = useState<SummaryTableData[]>([]);
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<AggregatedTrafficResponse>();

  useEffect(() => {
    const params = {
      resourceType: 'NODE_TYPE_SITE',
      time_range: timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY ? GENERAL_TIME_RANGE_QUERY_TYPES.LAST_DAY : GENERAL_TIME_RANGE_QUERY_TYPES.LAST_WEEK,
      sort_key: 'total_sent',
      topNum: 5,
      sortType: 'DESC',
    };
    onGet(TelemetryApi.getAggregatedTraffic(), userContext.accessToken!, params);
  }, []);

  useEffect(() => {
    if (response && response.traffic_stat.traffic && response.traffic_stat.traffic.length) {
      const summaryTableData: SummaryTableData[] = response.traffic_stat.traffic.map(item => ({
        name: networks.find(network => network.extId === item.resource)?.name || 'UNKNOWN',
        sent: item.total_bytes_sent,
        received: item.total_bytes_rcvd,
        activeTime: item.total_active_time,
        flows: Number(item.total_flows),
        clients: Number(item.total_clients),
      }));
      setTableData(summaryTableData);
    }
  }, [response]);

  return (
    <>
      <ChartTitle>Network</ChartTitle>
      <SummaryTable data={tableData} showLoader={loading} error={error?.message} />
    </>
  );
};
