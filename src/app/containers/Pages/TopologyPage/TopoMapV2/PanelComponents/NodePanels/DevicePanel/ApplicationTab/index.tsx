import { ITopologyQueryParam, toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { AgrregatedNetowrkTrafficApiResponse, AppAccessApiResponse, AppNodeType } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { IDeviceNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useContext, useEffect, useState } from 'react';
import { AppTable, TrafficTableRowData } from './ApplicationTable';

interface ApplicationTabProps {
  dataItem: IDeviceNode;
}

export const ApplicationTab: React.FC<ApplicationTabProps> = props => {
  const { topology } = useTopologyV2DataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<AgrregatedNetowrkTrafficApiResponse>();
  const [rowData, setRowData] = useState<TrafficTableRowData[]>([]);

  useEffect(() => {
    const params: ITopologyQueryParam = { timestamp: null };

    if (topology.selectedTime) {
      params.timestamp = toTimestamp(topology.selectedTime);
      params.startTime = toTimestamp(topology.selectedTime);
    }
    getAsyncData(TelemetryApi.getAggregatedTrafficByNetworkId(props.dataItem.networkId), params);
  }, [props.dataItem, topology?.selectedTime]);

  useEffect(() => {
    if (response && response.trafficStat) {
      const _data: TrafficTableRowData[] = response.trafficStat.traffic.map(trafficInfo => {
        const maybeSegment = topology.originSegmentsData.find(segmentData => segmentData.id === trafficInfo.resource);
        return {
          activeTime: trafficInfo.totalActiveTime,
          flows: trafficInfo.totalFlows,
          recv: trafficInfo.totalBytesRcvd,
          sent: trafficInfo.totalBytesSent,
          name: trafficInfo.resource === 'unknown' ? 'UNKNOWN' : maybeSegment?.name || '',
          resourceId: trafficInfo.resource || '',
          networkId: props.dataItem.networkId || '',
        };
      });
      console.log(_data);
      setRowData(_data);
    }
  }, [response]);

  const getAsyncData = (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    onGet(url, userContext.accessToken!, params);
  };
  return (
    <>
      {/* {loading ? (
        <ApplicationTable error={error ? error.message : null} showLoader={loading} data={[]} />
      ) : (
        <ApplicationTable error={error ? error.message : null} showLoader={loading} data={rowData} />
      )} */}
      <AppTable showLoader={loading} data={rowData} error={error ? error.message : null} />
    </>
  );
};
