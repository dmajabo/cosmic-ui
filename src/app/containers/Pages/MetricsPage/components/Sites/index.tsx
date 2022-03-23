import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { noop, uniq } from 'lodash';
import React, { useState } from 'react';
import FilterIcon from '../../icons/performance dashboard/filter';
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

export const Sites: React.FC<SitesProps> = ({ networks, devices, orgError, orgLoading, selectedTabName }) => {
  const classes = MetricsStyles();
  const [showSettingsPanel, setShowSettingsPanel] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(TIME_RANGE_OPTIONS[0]);

  const handleTimeRangeChange = (value: LookbackSelectOption) => setTimeRange(value);

  const getDeviceIds = () => uniq(devices.map(device => device.extId));

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
        <div className={classes.endFlexContainer}>
          <div>
            <MatSelect
              id="cloudTimePeriod"
              label="Show"
              labelStyles={{ margin: 'auto 10px auto 0' }}
              value={timeRange}
              options={TIME_RANGE_OPTIONS}
              onChange={handleTimeRangeChange}
              renderValue={(v: LookbackSelectOption) => v.label}
              renderOption={(v: LookbackSelectOption) => v.label}
              styles={{ height: '50px', minHeight: '50px', margin: '0 0 0 10px', width: 'auto', display: 'inline-flex', alignItems: 'center' }}
              selectStyles={{ height: '50px', width: 'auto', minWidth: '240px', border: '1px solid transparent' }}
            />
          </div>
        </div>
        <NetworkUsageHealth selectedTabName={selectedTabName} networks={getNetworks()} timeRange={timeRange} />
        <ConnectivityHealth selectedTabName={selectedTabName} timeRange={timeRange} onOpenPanel={onOpenPanel} />
        <DeviceHealth selectedTabName={selectedTabName} deviceToNetworkMap={getDeviceToNetworkMap()} devices={getDeviceIds()} timeRange={timeRange} />
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
