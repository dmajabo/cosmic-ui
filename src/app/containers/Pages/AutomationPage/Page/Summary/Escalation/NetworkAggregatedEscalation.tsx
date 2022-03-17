import { PieDataItem } from 'app/components/Charts/DonutChart';
import { LegendRangeItemStyle, LegendRangeColorStyle, LegendRangeValueStyle } from 'app/containers/Pages/TrafficPage/Trends/Components/FlowsOverviewComponent/RangeItem/style';
import { AxiosError } from 'axios';
import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
import { Vnet } from 'lib/api/http/SharedTypes';
import { uniqBy, uniqueId } from 'lodash';
import React, { useMemo } from 'react';
import { LegendContainer, SummaryItemContent } from '../styles';
import { AlertData, AlertType } from '../SummaryComponent';
import { EscalationDonutChart } from './EscalationDonutChart';

interface NetworkAggregatedEscalationProps {
  readonly loading: boolean;
  readonly error: AxiosError;
  readonly data: AlertData[];
  readonly networks: Vnet[];
}

interface ColouredNetwork extends Vnet {
  readonly color: string;
}

const getRandomColours = (colorNum: number, colors: number) => {
  if (colors < 1) colors = 1;
  return 'hsl(' + ((colorNum * (360 / colors)) % 360) + ',40%,50%)';
};

export const NetworkAggregatedEscalation: React.FC<NetworkAggregatedEscalationProps> = ({ loading, error, data, networks }) => {
  const colouredNetworks: ColouredNetwork[] = useMemo(() => networks.map((network, index) => ({ ...network, color: getRandomColours(index, networks.length) })), [networks]);
  const packetLossPieChartData: PieDataItem[] = useMemo(() => {
    const packetLossAlertData = data.find(item => item.alertType === AlertType.ANOMALY_PACKETLOSS)?.details || [];
    return packetLossAlertData.map(item => {
      const selectedNetwork = colouredNetworks.find(network => network.extId === item.key);
      return { id: item.key, name: selectedNetwork.name || '', value: item.totalCount, color: selectedNetwork.color, hide: false };
    });
  }, [data]);
  const latencyPieChartData: PieDataItem[] = useMemo(() => {
    const packetLossAlertData = data.find(item => item.alertType === AlertType.ANOMALY_LATENCY)?.details || [];
    return packetLossAlertData.map(item => {
      const selectedNetwork = colouredNetworks.find(network => network.extId === item.key);
      return { id: item.key, name: selectedNetwork.name || '', value: item.totalCount, color: selectedNetwork.color, hide: false };
    });
  }, [data]);
  const jitterPieChartData: PieDataItem[] = useMemo(() => {
    const packetLossAlertData = data.find(item => item.alertType === AlertType.ANOMALY_JITTER)?.details || [];
    return packetLossAlertData.map(item => {
      const selectedNetwork = colouredNetworks.find(network => network.extId === item.key);
      return { id: item.key, name: selectedNetwork.name || '', value: item.totalCount, color: selectedNetwork.color, hide: false };
    });
  }, [data]);

  const allNetworks = uniqBy(packetLossPieChartData.concat(latencyPieChartData).concat(jitterPieChartData), 'id');

  return (
    <>
      <SummaryItemContent>
        <EscalationDonutChart loading={loading} error={error} data={latencyPieChartData} chartTitle="Latency" alertType={ModelalertType.ANOMALY_LATENCY} />
        <EscalationDonutChart loading={loading} error={error} data={packetLossPieChartData} chartTitle="Packet Loss" alertType={ModelalertType.ANOMALY_PACKETLOSS} />
        <EscalationDonutChart loading={loading} error={error} data={jitterPieChartData} chartTitle="Jitter" alertType={ModelalertType.ANOMALY_JITTER} />
      </SummaryItemContent>
      <LegendContainer>
        {allNetworks.map(item => (
          <LegendRangeItemStyle key={item.id}>
            <LegendRangeColorStyle color={item.color} />
            <LegendRangeValueStyle>{item.name}</LegendRangeValueStyle>
          </LegendRangeItemStyle>
        ))}
      </LegendContainer>
    </>
  );
};