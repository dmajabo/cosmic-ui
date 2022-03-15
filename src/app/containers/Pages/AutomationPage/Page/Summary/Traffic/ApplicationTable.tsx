import { ALERT_TIME_RANGE_QUERY_TYPES, GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React, { useContext, useEffect, useState } from 'react';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import SummaryTable, { SummaryTableData } from './SummaryTable';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { AggregatedTrafficResponse, getBytesString } from './NetworkTable';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { convertSecondsToString } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/utils';

interface ApplicationTableProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
  readonly segments: ISegmentSegmentP[];
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ timeRange, segments }) => {
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
    if (response && response.trafficStat.traffic && response.trafficStat.traffic.length) {
      const summaryTableData: SummaryTableData[] = response.trafficStat.traffic.map(item => ({
        name: segments.find(segment => segment.id === item.resource)?.name || 'UNKNOWN',
        sent: getBytesString(item.totalBytesSent),
        received: getBytesString(item.totalBytesRcvd),
        activeTime: convertSecondsToString(item.totalActiveTime),
        flows: Number(item.totalFlows),
        clients: Number(item.totalClients),
      }));
      setTableData(summaryTableData);
    }
  }, [response, segments]);
  return (
    <>
      <ChartTitle>Application</ChartTitle>
      <SummaryTable data={tableData} showLoader={loading} error={error?.message} />
    </>
  );
};
