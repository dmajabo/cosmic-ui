import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { isEmpty, noop, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import FilterIcon from '../../icons/performance dashboard/filter';
import { MetricsStyles } from '../../MetricsStyles';
import Select from 'react-select';
import { LookbackLabel, LookbackSelectOption, LookbackValue } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { DeviceHealth } from './DeviceHealth';
import { INetworkDevice, INetworkRegion, ITopologyMapData, VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { NetworkUsageHealth } from './NetworkUsageHealth';

interface SitesProps {
  readonly orgMap: ITopologyMapData;
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

export const Sites: React.FC<SitesProps> = ({ orgMap }) => {
  const classes = MetricsStyles();
  const [devices, setDevices] = useState<INetworkDevice[]>([]);
  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);

  const handleTimeRangeChange = (value: LookbackSelectOption) => setTimeRange(value);

  const getDeviceIds = () => uniq(devices.map(device => device.extId));

  const getNetworkIds = () => uniq(devices.map(device => device.networkId));

  useEffect(() => {
    if (!isEmpty(orgMap.organizations)) {
      const merakiOrgs = orgMap.organizations.filter(organization => organization.vendorType === VendorTypes.MERAKI);
      const regions: INetworkRegion[] = merakiOrgs.reduce((acc, nextValue) => acc.concat(nextValue.regions), []);
      const merakiDevices: INetworkDevice[] = regions.reduce((acc, nextValue) => acc.concat(nextValue.devices), []);
      setDevices(merakiDevices);
    }
  }, [orgMap]);

  return isEmpty(orgMap.organizations) ? (
    <AbsLoaderWrapper width="100%" height="100%">
      <LoadingIndicator margin="auto" />
    </AbsLoaderWrapper>
  ) : (
    <>
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
      <NetworkUsageHealth networks={getNetworkIds()} timeRange={timeRange} />
      <DeviceHealth devices={getDeviceIds()} timeRange={timeRange} />
    </>
  );
};
