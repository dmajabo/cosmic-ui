import React from 'react';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import ChartContainer from 'app/components/ChartContainer';
import { getTimeQueryMetricsParamFromRange } from 'lib/api/ApiModels/Metrics/queryTimeRangeHelper';
import { IMetrickQueryParam, MetricsKeyTypes } from 'lib/api/ApiModels/Metrics/apiModel';
import { isEqual } from 'lodash';
import { IDeviceNode } from 'lib/hooks/Topology/models';
interface IProps {
  dataItem: IDeviceNode;
}

const MetricsTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const [param, setParam] = React.useState<IMetrickQueryParam>(null);
  const [dataItem, setDataItem] = React.useState<IDeviceNode>(null);
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
        title="CPU utilization"
        styles={{ margin: '0 0 20px 0', minHeight: '390px' }}
        chartType="Line"
        id={props.dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.CPU_UTILIZATION}
        dataValueSuffix="%"
      />
      <ChartContainer title="Memory" styles={{ minHeight: '390px' }} chartType="Line" id={props.dataItem.extId} queryTimeParam={param} queryKey={MetricsKeyTypes.MEMORY} />
    </>
  );
};

export default React.memo(MetricsTab);
