import React, { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { LocationState, TabName } from '../..';
import MatSelect from 'app/components/Inputs/MatSelect';
import Select from 'react-select';
import { SelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/MetricsExplorer';
import { Device, Vnet } from 'lib/api/http/SharedTypes';
import { InputLabel } from 'app/components/Inputs/styles/Label';
import { PacketLoss } from './PacketLoss';
import { Latency } from './Latency';
import { Jitter } from './Jitter';
import { useHistory } from 'react-router-dom';
import { MetricsStyles } from '../../MetricsStyles';
import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';

interface PerformanceDashboardProps {
  readonly networks: Vnet[];
  readonly devices: Device[];
  readonly orgLoading: boolean;
  readonly orgError: AxiosError;
  readonly selectedTabName: TabName;
}

export interface SelectedNetworkMetricsData extends SelectOption {
  readonly deviceString: string;
  readonly destination: string;
}

export interface LegendData {
  readonly low: number;
  readonly high: number;
  readonly color: string;
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

const SELECTED_NETWORKS_LOCAL_KEY = 'selectedNetworks';

const getSelectedNetworksFromLocalStorage = (history: any, devices: Device[], networks: Vnet[]): SelectOption[] => {
  if (history && history.location && history.location.state) {
    const state = history.location.state as LocationState;
    if (state?.networkId) {
      return networks.map(network => ({ label: network.name, value: network.extId })).filter(network => network.value === state?.networkId || '');
    } else {
      const networkId = devices.find(device => device.extId === state?.deviceId || '')?.networkId || '';
      return networks.map(network => ({ label: network.name, value: network.extId })).filter(network => network.value === networkId);
    }
  }
  return JSON.parse(localStorage.getItem(SELECTED_NETWORKS_LOCAL_KEY)) || [];
};

const getExpandedItemFromHistory = (history: any, expandedItem: string) => {
  if (history && history.location && history.location.state) {
    const state = history.location.state as LocationState;
    return state.anomalyType === ModelalertType.ANOMALY_PACKETLOSS
      ? 'Packet Loss'
      : state.anomalyType === ModelalertType.ANOMALY_LATENCY
      ? 'Latency'
      : state.anomalyType === ModelalertType.ANOMALY_JITTER
      ? 'Jitter'
      : expandedItem;
  }
  return expandedItem;
};

const getTimeRangefromHistory = (history: any, timeRange: string) => {
  if (history && history.location && history.location.state) {
    const state = history.location.state as LocationState;
    return state.timeRange;
  }
  return timeRange;
};

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ networks, devices, orgLoading }) => {
  const classes = MetricsStyles();
  const history = useHistory();

  const [timeRange, setTimeRange] = useState<string>('-1d');
  const [expandedItem, setExpandedItem] = useState<string>('Packet Loss');
  const [selectedNetworks, setSelectedNetworks] = useState<SelectOption[]>([]);

  const onExpandedItemChange = (value: string) => setExpandedItem(value);

  const networkOptions: SelectOption[] = useMemo(() => networks.map(network => ({ label: network.name, value: network.extId })), [networks]);

  const selectedNetworksMetricsData: SelectedNetworkMetricsData[] = useMemo(
    () =>
      selectedNetworks.map(network => {
        const deviceIdString = devices
          .filter(device => device.networkId === network.value)
          .map(device => device.extId)
          .join();
        const destination = '8.8.8.8';
        return { ...network, deviceString: deviceIdString, destination: destination };
      }),
    [selectedNetworks, devices],
  );

  const onNetworkSelect = (value: SelectOption[]) => {
    if (value.length <= 2) {
      setSelectedNetworks(value);
      localStorage.setItem(SELECTED_NETWORKS_LOCAL_KEY, JSON.stringify(value));
    }
  };

  useEffect(() => {
    if (networks.length && devices.length) {
      setSelectedNetworks(getSelectedNetworksFromLocalStorage(history, devices, networks));
    }
  }, [history, networks, devices]);

  useEffect(() => {
    onExpandedItemChange(getExpandedItemFromHistory(history, expandedItem));
    setTimeRange(getTimeRangefromHistory(history, timeRange));
  }, [history]);

  return (
    <div className={classes.pageComponentBackground}>
      <div className={classes.pageComponentTitleContainer}>
        <div className={classes.pageComponentTitle}>SLA Tests</div>
        <div>
          <MatSelect
            id="SLATestTimePeriod"
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
        <InputLabel style={{ marginTop: 20 }}>Select Network</InputLabel>
        <Select
          isMulti
          name="networks"
          placeholder="Select Network"
          styles={networkSelectStyles}
          value={selectedNetworks}
          options={networkOptions}
          isLoading={orgLoading}
          onChange={onNetworkSelect}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>
      <PacketLoss
        timeRange={timeRange}
        selectedNetworksMetricsData={selectedNetworksMetricsData}
        expandedItem={expandedItem}
        onExpandedItemChange={onExpandedItemChange}
        baseMetricName="Packet Loss"
      />
      <Latency timeRange={timeRange} selectedNetworksMetricsData={selectedNetworksMetricsData} expandedItem={expandedItem} onExpandedItemChange={onExpandedItemChange} baseMetricName="Latency" />
      <Jitter timeRange={timeRange} selectedNetworksMetricsData={selectedNetworksMetricsData} expandedItem={expandedItem} onExpandedItemChange={onExpandedItemChange} baseMetricName="Jitter" />
    </div>
  );
};
