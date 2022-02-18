import PanelBar from 'app/components/Basic/PanelBar';
import { ContentPanelWrapper } from 'app/components/Basic/PanelBar/styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import { LookbackLabel, LookbackSelectOption, LookbackValue } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { PageWithPanelWrapperStyles } from 'app/containers/Pages/Shared/styles';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import { noop } from 'lodash';
import React, { useState } from 'react';
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
  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(TIME_RANGE_OPTIONS[1]);
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
