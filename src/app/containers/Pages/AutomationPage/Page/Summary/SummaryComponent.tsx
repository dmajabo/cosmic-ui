import { ALERT_TIME_RANGE_QUERY_TYPES, GENERAL_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React, { useContext, useEffect, useState } from 'react';
import { DeviceHealth } from './Escalation/DeviceHealth';
import { EscalationCounts } from './Escalation/EscalationCounts';
import { Failover } from './Escalation/Failover';
import { NetworkAggregatedEscalation } from './Escalation/NetworkAggregatedEscalation';
import { GridContainer, SummaryItemContainer, SummaryItemContent, SummaryItemDivider, SummaryItemLabel } from './styles';
import { ApplicationTable } from './Traffic/ApplicationTable';
import { NetworkTable } from './Traffic/NetworkTable';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { useGetChainData, useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { Vnet } from 'lib/api/http/SharedTypes';
import { IPolicysvcListSegmentPsResponse, ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';

interface SummaryComponentProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

export enum AlertType {
  ANOMALY_LATENCY = 'Latency',
  ANOMALY_PACKETLOSS = 'Packet Loss',
  ANOMALY_JITTER = 'Jitter',
  CELLULAR_FAILOVER = 'Cellular Failover',
  DEVICE_CONNECTIVITY_HEALTH = 'Connectivity Health',
}

interface AlertDetails {
  readonly key: string;
  readonly totalCount: number;
}

export interface AlertData {
  readonly alertType: AlertType;
  readonly details: AlertDetails[];
  readonly totalCount: number;
}

export interface AlertResponse {
  readonly data: AlertData[];
}

interface NetworkResponse {
  readonly networks: Vnet[];
}

interface AlertSummaryResponse {
  readonly alerts: AlertResponse;
  readonly networkList: NetworkResponse;
}

export const SummaryComponent = React.forwardRef(({ timeRange }: SummaryComponentProps, ref: React.Ref<HTMLDivElement>) => {
  const [alertData, setAlertData] = useState<AlertData[]>([]);
  const [networks, setNetworks] = useState<Vnet[]>([]);
  const [segments, setSegments] = useState<ISegmentSegmentP[]>([]);
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData<AlertSummaryResponse>();
  const { response: segmentResponse, onGet } = useGet<IPolicysvcListSegmentPsResponse>();

  useEffect(() => {
    const segmentParams = {
      start_from: 0,
      page_size: 50,
    };
    onGet(PolicyApi.getSegments(), userContext.accessToken!, segmentParams);
  }, []);

  useEffect(() => {
    const params = {
      detailedView: true,
      aggKey: 'Network',
      timeRange: timeRange === ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY ? GENERAL_TIME_RANGE_QUERY_TYPES.LAST_DAY : GENERAL_TIME_RANGE_QUERY_TYPES.LAST_WEEK,
    };
    onGetChainData([AlertApi.getAlertCounts(), TopoApi.getOnPremNetworkList()], ['alerts', 'networkList'], userContext.accessToken!, params);
  }, [timeRange]);

  useEffect(() => {
    if (response && response.alerts && response.alerts.data && response.networkList && response.networkList.networks) {
      setNetworks(response.networkList.networks);
      setAlertData(response.alerts.data);
    }
  }, [response]);

  useEffect(() => {
    if (segmentResponse && segmentResponse.segments && segmentResponse.segments.length) {
      setSegments(segmentResponse.segments);
    }
  }, [segmentResponse]);

  return (
    <div ref={ref}>
      <GridContainer>
        <SummaryItemContainer>
          <SummaryItemLabel>Escalations</SummaryItemLabel>
          <SummaryItemContent>
            <EscalationCounts loading={loading} error={error} data={alertData} />
          </SummaryItemContent>
          <SummaryItemDivider />
          <NetworkAggregatedEscalation loading={loading} error={error} data={alertData} networks={networks} />
          <SummaryItemDivider style={{ marginTop: 30, marginBottom: 20 }} />
          <Failover timeRange={timeRange} />
          {/* <SummaryItemDivider />
          <DeviceHealth timeRange={timeRange} /> */}
        </SummaryItemContainer>
        <SummaryItemContainer>
          <SummaryItemLabel>Traffic</SummaryItemLabel>
          <ApplicationTable timeRange={timeRange} segments={segments} />
          <NetworkTable timeRange={timeRange} networks={networks} />
        </SummaryItemContainer>
      </GridContainer>
    </div>
  );
});
