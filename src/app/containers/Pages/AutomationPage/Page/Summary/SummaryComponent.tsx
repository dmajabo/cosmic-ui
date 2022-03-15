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
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { Vnet } from 'lib/api/http/SharedTypes';

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
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData<AlertSummaryResponse>();

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
          <SummaryItemDivider />
          <DeviceHealth timeRange={timeRange} />
        </SummaryItemContainer>
        <SummaryItemContainer>
          <SummaryItemLabel>Traffic</SummaryItemLabel>
          <NetworkTable timeRange={timeRange} networks={networks} />
          <ApplicationTable timeRange={timeRange} networks={networks} />
        </SummaryItemContainer>
      </GridContainer>
    </div>
  );
});
