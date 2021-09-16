import React from 'react';
import { IDeviceNode } from 'lib/models/topology';
import { MetricsKeyTypes, IMetrickQueryParam } from 'lib/api/ApiModels/Metrics/apiModel';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import ChartContainer from 'app/components/ChartContainer';
import { getTimeQueryParam } from 'lib/api/ApiModels/Metrics/queryTimeRangeHelper';

interface IProps {
  dataItem: IDeviceNode;
}

const MetricsTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [param, setParam] = React.useState<IMetrickQueryParam>(null);

  React.useEffect(() => {
    const _param: IMetrickQueryParam = getTimeQueryParam(topology.selectedRange, topology.selectedPeriod);
    setParam(_param);
  }, [props.dataItem, topology, topology.selectedRange]);

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
