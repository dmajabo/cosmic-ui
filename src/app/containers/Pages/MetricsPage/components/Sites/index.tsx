import { uniq } from 'lodash';
import React, { useMemo, useState } from 'react';
import { MetricsStyles } from '../../MetricsStyles';
import { LookbackLabel, LookbackSelectOption, LookbackValue } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { DeviceHealth } from './DeviceHealth';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { NetworkUsageHealth } from './NetworkUsageHealth';
import { AxiosError } from 'axios';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ConnectivityHealth } from './ConnectivityHealth';
import { TabName } from '../..';
import { Device, Vnet } from 'lib/api/http/SharedTypes';
import { ContentPanelWrapper } from 'app/components/Basic/PanelBar/styles';
import { PageWithPanelWrapperStyles } from 'app/containers/Pages/Shared/styles';
import PanelBar from 'app/components/Basic/PanelBar';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import { ConnectivityHealthSidePanel } from './ConnectivityHealthSidePanel';
import MatSelect from 'app/components/Inputs/MatSelect';
import { InputLabel } from '@mui/material';
import Select from 'react-select';
import { SelectOption } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/MetricsExplorer';

interface SitesProps {
  readonly networks: Vnet[];
  readonly devices: Device[];
  readonly orgLoading: boolean;
  readonly orgError: AxiosError;
  readonly selectedTabName: TabName;
}

export interface NetworkObject {
  readonly id: string;
  readonly name: string;
}

export interface DeviceToNetworkMap {
  [extId: string]: string;
}

const TIME_RANGE_OPTIONS: LookbackSelectOption[] = [
  {
    label: LookbackLabel.oneDay,
    value: LookbackValue.oneDay,
  },
  {
    label: LookbackLabel.oneWeek,
    value: LookbackValue.oneWeek,
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

export const Sites: React.FC<SitesProps> = ({ networks, devices, orgError, orgLoading, selectedTabName }) => {
  const classes = MetricsStyles();
  const [showSettingsPanel, setShowSettingsPanel] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(TIME_RANGE_OPTIONS[0]);
  const [selectedNetworks, setSelectedNetworks] = useState<SelectOption[]>(JSON.parse(localStorage.getItem(SELECTED_NETWORKS_LOCAL_KEY)));
  const [expandedItem, setExpandedItem] = useState<string>('Connectivity Health');

  const onExpandedItemChange = (value: string) => setExpandedItem(value);

  const handleTimeRangeChange = (value: LookbackSelectOption) => setTimeRange(value);

  const getDeviceIds = () =>
    uniq(
      devices
        .filter(device => {
          const networkIds = selectedNetworks.map(network => network.value);
          return networkIds.includes(device.networkId);
        })
        .map(device => device.extId),
    );

  const getDeviceToNetworkMap = (): DeviceToNetworkMap =>
    devices.reduce((acc, nextValue) => {
      acc[nextValue.extId] = getNetworks().find(network => network.id === nextValue.networkId)?.name;
      return acc;
    }, {});

  const getNetworks = () => {
    const networkIds = uniq(devices.map(device => device.networkId));
    const networkObjects: NetworkObject[] = networkIds.map(networkId => ({ id: networkId, name: networks.find(network => network.extId === networkId)?.name || 'Unknown' }));
    return networkObjects;
  };

  const onOpenPanel = () => {
    setShowSettingsPanel(true);
  };
  const onHideSettingsPanel = () => {
    setShowSettingsPanel(false);
  };

  const onNetworkSelect = (value: SelectOption[]) => {
    if (value.length <= 2) {
      setSelectedNetworks(value);
      localStorage.setItem(SELECTED_NETWORKS_LOCAL_KEY, JSON.stringify(value));
    }
  };

  const networkOptions: SelectOption[] = useMemo(() => networks.map(network => ({ label: network.name, value: network.extId })), [networks]);

  return orgLoading ? (
    <AbsLoaderWrapper width="100%" height="100%">
      <LoadingIndicator margin="auto" />
    </AbsLoaderWrapper>
  ) : orgError ? (
    <AbsLoaderWrapper width="100%" height="100%">
      <ErrorMessage fontSize={28} margin="auto">
        {orgError.message}
      </ErrorMessage>
    </AbsLoaderWrapper>
  ) : (
    <ContentPanelWrapper>
      <PageWithPanelWrapperStyles padding="0" width={showSettingsPanel ? 'calc(100% - 520px)' : '100%'}>
        <div className={classes.pageComponentBackground}>
          <div className={classes.pageComponentTitleContainer}>
            <div className={classes.pageComponentTitle}>Health Metrics</div>
            <div>
              <MatSelect
                id="SitesTimePeriod"
                label="Show"
                labelStyles={{ margin: 'auto 10px auto 0' }}
                value={timeRange}
                options={TIME_RANGE_OPTIONS}
                onChange={handleTimeRangeChange}
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

          <ConnectivityHealth
            selectedTabName={selectedTabName}
            timeRange={timeRange}
            onOpenPanel={onOpenPanel}
            baseMetricName="Connectivity Health"
            expandedItem={expandedItem}
            onExpandedItemChange={onExpandedItemChange}
          />
          <NetworkUsageHealth
            selectedTabName={selectedTabName}
            networks={selectedNetworks.map(network => ({ id: network.value, name: network.label }))}
            timeRange={timeRange}
            baseMetricName="Network Usage Health"
            expandedItem={expandedItem}
            onExpandedItemChange={onExpandedItemChange}
          />
          <DeviceHealth
            selectedTabName={selectedTabName}
            deviceToNetworkMap={getDeviceToNetworkMap()}
            devices={getDeviceIds()}
            timeRange={timeRange}
            baseMetricName="Device Health"
            expandedItem={expandedItem}
            onExpandedItemChange={onExpandedItemChange}
          />
        </div>
      </PageWithPanelWrapperStyles>
      <PanelBar
        styles={{ position: 'fixed', top: APP_HEADER_HEIGHT, right: '0', maxHeight: `calc(100% - ${APP_HEADER_HEIGHT})`, zIndex: 11 }}
        maxWidth="520px"
        show={showSettingsPanel}
        onHidePanel={onHideSettingsPanel}
        type={IPanelBarLayoutTypes.VERTICAL}
      >
        {showSettingsPanel && <ConnectivityHealthSidePanel />}
      </PanelBar>
    </ContentPanelWrapper>
  );
};
