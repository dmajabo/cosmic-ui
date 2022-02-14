import PanelBar from 'app/components/Basic/PanelBar';
import { ContentPanelWrapper } from 'app/components/Basic/PanelBar/styles';
import { LookbackLabel, LookbackSelectOption, LookbackValue } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { PageWithPanelWrapperStyles } from 'app/containers/Pages/Shared/styles';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import { noop } from 'lodash';
import React, { useState } from 'react';
import Select from 'react-select';
import { TabName } from '../..';
import FilterIcon from '../../icons/performance dashboard/filter';
import { MetricsStyles } from '../../MetricsStyles';
import { ConnectivityHealthSidePanel } from '../Sites/ConnectivityHealthSidePanel';
import { DirectConnectConnectionHealth } from './DirectConnectConnectionHealth';
import { DirectConnectVirtualHealth } from './DirectConnectVirtualHealth';
import { Transit } from './Transit';

interface CloudTabProps {
  readonly selectedTabName: TabName;
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

export const Cloud: React.FC<CloudTabProps> = ({ selectedTabName }) => {
  const classes = MetricsStyles();
  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);
  const [showSettingsPanel, setShowSettingsPanel] = useState<boolean>(false);

  const handleTimeRangeChange = (value: LookbackSelectOption) => setTimeRange(value);

  const onOpenPanel = () => {
    setShowSettingsPanel(true);
  };
  const onHideSettingsPanel = () => {
    setShowSettingsPanel(false);
  };

  return (
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
        <DirectConnectConnectionHealth selectedTabName={selectedTabName} timeRange={timeRange} onOpenPanel={onOpenPanel} />
        <DirectConnectVirtualHealth selectedTabName={selectedTabName} timeRange={timeRange} />
        <Transit selectedTabName={selectedTabName} timeRange={timeRange} />
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
