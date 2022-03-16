import { ALERT_TIME_RANGE_QUERY_TYPES, GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React, { useContext, useEffect, useState } from 'react';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import SummaryTable, { SummaryTableData } from './SummaryTable';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { Vnet } from 'lib/api/http/SharedTypes';
import { convertSecondsToString } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/utils';

interface NetworkTableProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
  readonly networks: Vnet[];
}

interface AggregatedTraffic {
  readonly resource: string;
  readonly nodeType: string;
  readonly totalBytesSent: string;
  readonly totalBytesRcvd: string;
  readonly totalFlows: string;
  readonly totalClients: string;
  readonly totalActiveTime: string;
}

export interface AggregatedTrafficResponse {
  readonly totalCount: number;
  readonly trafficStat: {
    readonly traffic: AggregatedTraffic[];
  };
}
const BILLION = 1000000000;
const MILLION = 1000000;
const THOUSAND = 1000;

export const getBytesString = (bytes: string) => {
  const bytesValue = Number(bytes);
  if (bytesValue > BILLION) {
    return `${(bytesValue / BILLION).toFixed(2)} GB`;
  } else if (bytesValue > MILLION) {
    return `${(bytesValue / MILLION).toFixed(2)} MB`;
  }
  return `${(bytesValue / THOUSAND).toFixed(2)} KB`;
};

export const NetworkTable: React.FC<NetworkTableProps> = ({ timeRange, networks }) => {
  const [tableData, setTableData] = useState<SummaryTableData[]>([]);
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<AggregatedTrafficResponse>();

  useEffect(() => {
    const params = {
      resourceType: 'NODE_TYPE_SITE',
      time_range: timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY ? GENERAL_TIME_RANGE_QUERY_TYPES.LAST_DAY : GENERAL_TIME_RANGE_QUERY_TYPES.LAST_WEEK,
      sort_key: 'total_sent',
      topNum: 10,
      sortType: 'DESC',
    };
    onGet(TelemetryApi.getAggregatedTraffic(), userContext.accessToken!, params);
  }, [timeRange]);

  useEffect(() => {
    if (response && response.trafficStat.traffic && response.trafficStat.traffic.length) {
      const summaryTableData: SummaryTableData[] = response.trafficStat.traffic.map(item => ({
        name: networks.find(network => network.extId === item.resource)?.name || 'UNKNOWN',
        sent: getBytesString(item.totalBytesSent),
        received: getBytesString(item.totalBytesRcvd),
        activeTime: convertSecondsToString(item.totalActiveTime),
        flows: Number(item.totalFlows),
        clients: Number(item.totalClients),
      }));
      setTableData(summaryTableData);
    }
  }, [response, networks]);

  return (
    <>
      <ChartTitle>Top 10 Networks by usage</ChartTitle>
      <SummaryTable data={tableData} showLoader={loading} error={error?.message} />
    </>
  );
};
