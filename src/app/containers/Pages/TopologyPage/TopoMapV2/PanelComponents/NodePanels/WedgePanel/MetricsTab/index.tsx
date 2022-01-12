import React, { useEffect, useState } from 'react';
import ChartContainer from 'app/components/ChartContainer';
import { getTimeQueryMetricsParamFromRange } from 'lib/api/ApiModels/Metrics/queryTimeRangeHelper';
import { IMetrickQueryParam, MetricsKeyTypes } from 'lib/api/ApiModels/Metrics/apiModel';
import isEqual from 'lodash/isEqual';
import { INetworkwEdge } from 'lib/api/ApiModels/Topology/apiModels';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import MultiLineChartContainer from './MultiLineChartContainer';

interface MetricTabProps {
  readonly dataItem: INetworkwEdge;
}

const MetricsTab: React.FC<MetricTabProps> = (props: MetricTabProps) => {
  const { topology } = useTopologyV2DataContext();
  const [metricsQueryParam, setMetricsQueryParam] = useState<IMetrickQueryParam>(null);
  const [wedgeDataItem, setWedgeDataItem] = useState<INetworkwEdge>(null);

  useEffect(() => {
    const _param: IMetrickQueryParam = getTimeQueryMetricsParamFromRange(topology.timeRange, topology.selectedPeriod);
    if (!isEqual(metricsQueryParam, _param)) {
      setMetricsQueryParam(_param);
    }
    setWedgeDataItem(props.dataItem);
  }, []);

  useEffect(() => {
    if (props.dataItem && wedgeDataItem && props.dataItem.extId !== wedgeDataItem.extId) {
      const _param: IMetrickQueryParam = getTimeQueryMetricsParamFromRange(topology.timeRange, topology.selectedPeriod);
      if (!isEqual(metricsQueryParam, _param)) {
        setMetricsQueryParam(_param);
      }
      setWedgeDataItem(props.dataItem);
    }
  }, [props.dataItem]);

  useEffect(() => {
    const _param: IMetrickQueryParam = getTimeQueryMetricsParamFromRange(topology.timeRange, topology.selectedPeriod);
    if (!isEqual(metricsQueryParam, _param)) {
      setMetricsQueryParam(_param);
    }
  }, [topology.timeRange]);

  if (!wedgeDataItem) {
    return null;
  }
  return (
    <>
      {/* <ChartContainer
        title="Bytes Drop Count Blackhole"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKey={MetricsKeyTypes.BytesDropCountBlackhole}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Bytes Drop No Route"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKey={MetricsKeyTypes.BytesDropCountNoRoute}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Bytes In"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKey={MetricsKeyTypes.BytesIn}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Bytes Out"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKey={MetricsKeyTypes.BytesOut}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Packets In"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKey={MetricsKeyTypes.PacketsIn}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Packets Out"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKey={MetricsKeyTypes.PacketsOut}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Packets Drop Count Blackhole"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKey={MetricsKeyTypes.PacketDropCountBlackhole}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Packets Drop Count No Route"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKey={MetricsKeyTypes.PacketDropCountNoRoute}
        dataValueSuffix="bytes"
      /> */}
      <MultiLineChartContainer
        title="Packets Drop Count No Route"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKeys={[MetricsKeyTypes.PacketDropCountBlackhole, MetricsKeyTypes.PacketDropCountNoRoute]}
        dataValueSuffix="packets"
      />
    </>
  );
};

export default React.memo(MetricsTab);
