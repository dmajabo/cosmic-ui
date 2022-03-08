import { IParam, ITopologyQueryParam, paramBuilder, toTimestamp } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { AgrregatedNetowrkTrafficApiResponse, AppNodeType } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ITopoAppNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useContext, useEffect, useState } from 'react';
import MemberTable, { MemberRow } from '../MemberTable';

interface TrafficTabProps {
  dataItem: ITopoAppNode;
}

export const TrafficTab: React.FC<TrafficTabProps> = props => {
  const { topology } = useTopologyV2DataContext();
  const [rowData, setRowData] = useState<MemberRow[]>([]);
  const userContext = useContext<UserContextState>(UserContext);
  const [currentPageSize, setCurrentPageSize] = useState<number>(20);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const { response, loading, error, onGet } = useGet<AgrregatedNetowrkTrafficApiResponse>();

  useEffect(() => {
    console.log(props.dataItem);
    getAsyncData(TelemetryApi.getTrafficDataByAppId(props.dataItem.dataItem.nodeId), currentPageSize, currentPageNo);
  }, [props.dataItem, topology?.selectedTime]);

  useEffect(() => {
    if (response && response.trafficStat && response.trafficStat.traffic) {
      const members: MemberRow[] = response.trafficStat.traffic.map(trafficInfo => {
        let name = '';
        topology.originData.forEach(item => {
          item.regions.forEach(region => {
            region.vnets.forEach(vnet => {
              if (vnet.extId === trafficInfo.resource) {
                name = vnet.name;
              }
            });
          });
        });

        return {
          activeTime: trafficInfo.totalActiveTime,
          noOfClients: trafficInfo.totalClients,
          flows: trafficInfo.totalFlows,
          recv: trafficInfo.totalBytesRcvd,
          sent: trafficInfo.totalBytesSent,
          name: name,
          resourceId: props.dataItem.dataItem.nodeId,
          networkId: trafficInfo.resource,
        };
      });
      setRowData(members);
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
    getAsyncData(TelemetryApi.getTrafficDataByAppId(props.dataItem.dataItem.nodeId), size, page);
  };

  const onPageChange = (page: number) => {
    setCurrentPageNo(page);
    getAsyncData(TelemetryApi.getTrafficDataByAppId(props.dataItem.dataItem.nodeId), currentPageSize, page);
  };

  return (
    <MemberTable
      onChangeCurrentPage={onPageChange}
      onChangePageSize={onPageSizeChange}
      currentPage={currentPageNo}
      pageSize={currentPageSize}
      showLoader={loading}
      error={error ? error.message : null}
      data={loading ? [] : rowData}
    />
  );
};
