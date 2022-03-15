import { ALERT_TIME_RANGE_QUERY_TYPES, GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React, { useContext, useEffect, useState } from 'react';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import SummaryTable, { SummaryTableData } from './SummaryTable';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { AggregatedTrafficResponse } from './NetworkTable';
import { Vnet } from 'lib/api/http/SharedTypes';

interface ApplicationTableProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
  readonly networks: Vnet[];
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ timeRange, networks }) => {
  const [tableData, setTableData] = useState<SummaryTableData[]>([]);
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<AggregatedTrafficResponse>();

  useEffect(() => {
    const params = {
      resourceType: 'NODE_TYPE_APPLICATION',
      time_range: timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY ? GENERAL_TIME_RANGE_QUERY_TYPES.LAST_DAY : GENERAL_TIME_RANGE_QUERY_TYPES.LAST_WEEK,
      sort_key: 'total_recv',
      topNum: 10,
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
      <ChartTitle>Application</ChartTitle>
      <SummaryTable data={tableData} showLoader={loading} error={error?.message} />
    </>
  );
};
