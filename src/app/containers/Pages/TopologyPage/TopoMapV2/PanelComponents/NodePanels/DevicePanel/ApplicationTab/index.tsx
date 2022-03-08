import { IParam, ITopologyQueryParam, paramBuilder, toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { AgrregatedNetowrkTrafficApiResponse } from 'lib/api/ApiModels/Topology/apiModels';
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
  const [currentPageSize, setCurrentPageSize] = useState<number>(20);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);

  useEffect(() => {
    getAsyncData(TelemetryApi.getAggregatedTrafficByNetworkId(props.dataItem.networkId), currentPageSize, currentPageNo);
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
          noOfClients: trafficInfo.totalClients,
        };
      });
      setRowData(_data);
    }
  }, [response]);

  const getAsyncData = (url: string, pageSize: number, pageNo: number) => {
    const params: ITopologyQueryParam & IParam = { timestamp: null };

    if (topology.selectedTime) {
      params.timestamp = toTimestamp(topology.selectedTime);
    }
    const paginationParams = paramBuilder(pageSize, pageNo);
    params.page_start = paginationParams.start_from;
    delete paginationParams.start_from;
    onGet(url, userContext.accessToken!, { ...params, ...paginationParams });
  };

  const onPageSizeChange = (size: number, page: number) => {
    setCurrentPageNo(page);
    setCurrentPageSize(size);
    getAsyncData(TelemetryApi.getAggregatedTrafficByNetworkId(props.dataItem.networkId), size, page);
  };

  const onPageChange = (page: number) => {
    setCurrentPageNo(page);
    getAsyncData(TelemetryApi.getAggregatedTrafficByNetworkId(props.dataItem.networkId), currentPageSize, page);
  };

  return (
    <>
      <AppTable
        onChangeCurrentPage={onPageChange}
        onChangePageSize={onPageSizeChange}
        currentPage={currentPageNo}
        pageSize={currentPageSize}
        showLoader={loading}
        data={loading ? [] : rowData}
        error={error ? error.message : null}
      />
    </>
  );
};
