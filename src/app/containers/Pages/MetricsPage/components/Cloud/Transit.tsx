import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import { TabName } from '../..';
import MatSelect from 'app/components/Inputs/MatSelect';
import Select from 'react-select';
import { InputLabel } from 'app/components/Inputs/styles/Label';
import { IWEdgesRes } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { TransitMetricChart } from './TransitMetricChart';
import { isEmpty } from 'lodash';

export interface TransitSelectOption {
  readonly label: string;
  readonly value: string;
  readonly type: string;
}

interface TransitProps {
  readonly selectedTabName: TabName;
}

const timeRangeOptions = [
  {
    value: '-1d',
    label: 'Last day',
  },
  {
    value: '-7d',
    label: 'Last week',
  },
];

const networkSelectStyles = {
  control: provided => ({
    ...provided,
    height: 50,
    color: 'blue',
  }),
  multiValue: provided => ({
    ...provided,
    background: 'rgba(67,127,236,0.1)',
    borderRadius: 6,
    padding: 5,
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: '#437FEC',
  }),
  multiValueRemove: provided => ({
    ...provided,
    color: '#437FEC',
  }),
};

const SELECTED_TGW_LOCAL_KEY = 'selectedTGW';

const getInitialSelectedTGW = () => {
  const localSelectedTGW = localStorage.getItem(SELECTED_TGW_LOCAL_KEY);
  return localSelectedTGW ? JSON.parse(localSelectedTGW) : [];
};

export const Transit: React.FC<TransitProps> = ({ selectedTabName }) => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);

  const { response, loading, onGet } = useGet<IWEdgesRes>();

  const [timeRange, setTimeRange] = useState<string>('-7d');
  const [selectedTGW, setSelectedTGW] = useState<TransitSelectOption[]>(getInitialSelectedTGW());

  const onTGWSelect = (value: TransitSelectOption[]) => {
    if (value.length <= 2) {
      setSelectedTGW(value);
      localStorage.setItem(SELECTED_TGW_LOCAL_KEY, JSON.stringify(value));
    }
  };

  useEffect(() => {
    onGet(TopoApi.getWedges(), userContext.accessToken!);
  }, []);

  const transitSelectOptions: TransitSelectOption[] = useMemo((): TransitSelectOption[] => {
    if (response && response.wEdges && response.wEdges.length) {
      return response.wEdges.map(wedge => ({ label: wedge.name, value: wedge.extId, type: 'wEdge' }));
    }
    return [];
  }, [response]);

  useEffect(() => {
    if (!isEmpty(transitSelectOptions)) {
      if (isEmpty(selectedTGW)) {
        const defaultTGWIndex = Math.round(Math.random() * transitSelectOptions.length);
        const defaultSelectedTGW = [transitSelectOptions[defaultTGWIndex]];
        setSelectedTGW(defaultSelectedTGW);
        localStorage.setItem(SELECTED_TGW_LOCAL_KEY, JSON.stringify(defaultSelectedTGW));
      }
    }
  }, [transitSelectOptions]);

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>TGW Metrics</div>
        <div>
          <MatSelect
            id="TGWMetricsTimePeriod"
            label="Show"
            labelStyles={{ margin: 'auto 10px auto 0' }}
            value={timeRangeOptions.find(time => time.value === timeRange)}
            options={timeRangeOptions}
            onChange={e => setTimeRange(e.value)}
            renderValue={(v: any) => v.label}
            renderOption={(v: any) => v.label}
            styles={{ height: '50px', minHeight: '50px', margin: '0 0 0 10px', width: 'auto', display: 'inline-flex', alignItems: 'center' }}
            selectStyles={{ height: '50px', width: 'auto', minWidth: '240px', border: '1px solid #cbd2bc' }}
          />
        </div>
      </div>
      <div>
        <InputLabel style={{ marginTop: 20 }}>Select TGW</InputLabel>
        <Select
          isMulti
          name="tgws"
          placeholder="Select TGW"
          styles={networkSelectStyles}
          value={selectedTGW}
          options={transitSelectOptions}
          isLoading={loading}
          onChange={onTGWSelect}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
        <TransitMetricChart
          chartDataSuffix="bytes"
          chartTitle="Transit Gateway Bytes In"
          metricNames={['BytesIn', 'BytesIn_anomaly', 'BytesIn_upperbound', 'BytesIn_lowerbound', 'BytesIn_threshold']}
          baseMetricName="BytesIn"
          selectedTGW={selectedTGW}
          timeRange={timeRange}
        />
        <TransitMetricChart
          chartDataSuffix="bytes"
          chartTitle="Transit Gateway Bytes Out"
          metricNames={['BytesOut', 'BytesOut_anomaly', 'BytesOut_upperbound', 'BytesOut_lowerbound', 'BytesOut_threshold']}
          baseMetricName="BytesOut"
          selectedTGW={selectedTGW}
          timeRange={timeRange}
        />
        <TransitMetricChart
          chartDataSuffix="packets"
          chartTitle="Transit Gateway Packets In"
          metricNames={['PacketsIn', 'PacketsIn_anomaly', 'PacketsIn_upperbound', 'PacketsIn_lowerbound', 'PacketsIn_threshold']}
          baseMetricName="PacketsIn"
          selectedTGW={selectedTGW}
          timeRange={timeRange}
        />
        <TransitMetricChart
          chartDataSuffix="packets"
          chartTitle="Transit Gateway Packets Out"
          metricNames={['PacketsOut', 'PacketsOut_anomaly', 'PacketsOut_upperbound', 'PacketsOut_lowerbound', 'PacketsOut_threshold']}
          baseMetricName="PacketsOut"
          selectedTGW={selectedTGW}
          timeRange={timeRange}
        />
      </div>
    </div>
  );
};
