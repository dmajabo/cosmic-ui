import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { isEmpty, noop, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import FilterIcon from '../../icons/performance dashboard/filter';
import { MetricsStyles } from '../../MetricsStyles';
import Select from 'react-select';
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

const dropdownStyle = {
  option: provided => ({
    ...provided,
    padding: 10,
    color: 'black',
  }),
  control: provided => ({
    ...provided,
    height: 50,
    border: 'none',
  }),
};

const INITIAL_ANOMALY_TIME_RANGE_VALUE: LookbackSelectOption = {
  label: LookbackLabel.oneWeek,
  value: LookbackValue.oneWeek,
};

const TIME_RANGE_OPTIONS: LookbackSelectOption[] = [
  {
    label: LookbackLabel.oneDay,
    value: LookbackValue.oneDay,
  },
  {
    label: LookbackLabel.oneWeek,
    value: LookbackValue.oneWeek,
  },
  {
    label: LookbackLabel.oneMonth,
    value: LookbackValue.oneMonth,
  },
];

export const Sites: React.FC<SitesProps> = ({ networks, devices, orgError, orgLoading, selectedTabName }) => {
  const classes = MetricsStyles();
  const [showSettingsPanel, setShowSettingsPanel] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);

  const handleTimeRangeChange = (value: LookbackSelectOption) => setTimeRange(value);

  const getDeviceIds = () => uniq(devices.map(device => device.extId));

  const getNetworks = () => {
    const networkIds = uniq(devices.map(device => device.networkId));
    const networkObjects: NetworkObject[] = networkIds.map(networkId => ({ id: networkId, name: networks.find(network => network.extId == networkId)?.name || 'Unknown' }));
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
            <SecondaryButtonwithEvent
              label={
                <>
                  <span className={classes.otherButtonText}>FILTER</span>
                  <FilterIcon />
                </>
              }
              onClick={noop}
            />
            <span className={classes.anomalyTimeRangeText}>Show:</span>
            <Select styles={dropdownStyle} className={classes.inlineSelect} label="Single select" value={timeRange} options={TIME_RANGE_OPTIONS} onChange={handleTimeRangeChange} />
          </div>
        </div>
        <NetworkUsageHealth selectedTabName={selectedTabName} networks={getNetworks()} timeRange={timeRange} />
        <ConnectivityHealth selectedTabName={selectedTabName} timeRange={timeRange} onOpenPanel={onOpenPanel} />
        <DeviceHealth selectedTabName={selectedTabName} devices={getDeviceIds()} timeRange={timeRange} />
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
