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
      <MultiLineChartContainer
        title="Bytes Dropped"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKeys={[MetricsKeyTypes.BytesDropCountBlackhole, MetricsKeyTypes.BytesDropCountNoRoute]}
        dataValueSuffix="bytes"
      />
      <MultiLineChartContainer
        title="Bytes In and Out"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKeys={[MetricsKeyTypes.BytesIn, MetricsKeyTypes.BytesOut]}
        dataValueSuffix="bytes"
      />

      <MultiLineChartContainer
        title="Packets In and Out"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={wedgeDataItem.extId}
        queryTimeParam={metricsQueryParam}
        queryKeys={[MetricsKeyTypes.PacketsIn, MetricsKeyTypes.PacketsOut]}
        dataValueSuffix="packets"
      />
      <MultiLineChartContainer
        title="Packets Dropped"
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
