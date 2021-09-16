import React from 'react';
import { IVm } from 'lib/models/topology';
import { IMetrickQueryParam, MetricsKeyTypes } from 'lib/api/ApiModels/Metrics/endpoints';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import ChartContainer from 'app/components/ChartContainer';
import { getQueryParam } from 'lib/api/ApiModels/Metrics/queryTimeRangeHelper';

interface IProps {
  dataItem: IVm;
}

const MetricsTab: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [param, setParam] = React.useState<IMetrickQueryParam>(null);

  React.useEffect(() => {
    const _param: IMetrickQueryParam = getQueryParam(topology.selectedRange, topology.selectedPeriod);
    setParam(_param);
  }, [props.dataItem, topology, topology.selectedRange]);

  return (
    <>
      <ChartContainer
        title="CPU utilization"
        styles={{ margin: '0 0 20px 0' }}
        chartType="Line"
        id={props.dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.CPU_UTILIZATION}
        dataValueSuffix="%"
      />
      <ChartContainer
        title="Memory"
        // styles={{ margin: '0 0 20px 0' }}
        chartType="Line"
        id={props.dataItem.extId}
        queryTimeParam={param}
        queryKey={MetricsKeyTypes.MEMORY}
      />
    </>
  );
};

export default React.memo(MetricsTab);
