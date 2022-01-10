import React from 'react';
import { IWedge } from 'lib/models/topology';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import ChartContainer from 'app/components/ChartContainer';
import { getTimeQueryMetricsParamFromRange } from 'lib/api/ApiModels/Metrics/queryTimeRangeHelper';
import { IMetrickQueryParam, MetricsKeyTypes } from 'lib/api/ApiModels/Metrics/apiModel';
import { isEqual } from 'lodash';
interface IProps {
  dataItem: IWedge;
}

const MetricsTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [param, setParam] = React.useState<IMetrickQueryParam>(null);
  const [dataItem, setDataItem] = React.useState<IWedge>(null);
  React.useEffect(() => {
    const _param: IMetrickQueryParam = getTimeQueryMetricsParamFromRange(topology.timeRange, topology.selectedPeriod);
    if (!isEqual(param, _param)) {
      setParam(_param);
    }
    setDataItem(props.dataItem);
  }, []);

  React.useEffect(() => {
    if (props.dataItem && dataItem && props.dataItem.extId !== dataItem.extId) {
      const _param: IMetrickQueryParam = getTimeQueryMetricsParamFromRange(topology.timeRange, topology.selectedPeriod);
      if (!isEqual(param, _param)) {
        setParam(_param);
      }
      setDataItem(props.dataItem);
    }
  }, [props.dataItem]);

  React.useEffect(() => {
    const _param: IMetrickQueryParam = getTimeQueryMetricsParamFromRange(topology.timeRange, topology.selectedPeriod);
    if (!isEqual(param, _param)) {
      setParam(_param);
    }
  }, [topology.timeRange]);

  if (!dataItem) {
    return null;
  }
  return (
    <>
      <ChartContainer
        title="Bytes Drop Count Blackhole"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.BytesDropCountBlackhole}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Bytes Drop No Route"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.BytesDropCountNoRoute}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Bytes In"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.BytesIn}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Bytes Out"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.BytesOut}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Packets In"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.PacketsIn}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Packets Out"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.PacketsOut}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Packets Drop Count Blackhole"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.PacketDropCountBlackhole}
        dataValueSuffix="bytes"
      />
      <ChartContainer
        title="Packets Drop Count No Route"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.PacketDropCountNoRoute}
        dataValueSuffix="bytes"
      />
    </>
  );
};

export default React.memo(MetricsTab);
