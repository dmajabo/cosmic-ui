import React, { useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import Select from 'react-select';
import { ExperienceTab } from './ExperienceTab';
import { PolicyTab } from './PolicyTab';
import { CostTab } from './CostTab';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

export enum AnomalyTabValue {
  Experience = 'Experience',
  Policy = 'Policy',
  Cost = 'Cost',
}

export enum AnomalyTimeRangeLabel {
  lastHour = 'Last 1 hour',
  lastDay = 'Last 1 day',
  lastWeek = 'Last 7 days',
  // lastMonth = 'Last 30 days',
}

export enum AnomalyTimeRangeValue {
  lastHour = 'ANOMALY_QUERY_LAST_HOUR',
  lastDay = 'ANOMALY_QUERY_LAST_DAY',
  lastWeek = 'ANOMALY_QUERY_LAST_WEEK',
  // lastMonth = 'ANOMALY_QUERY_LAST_MONTH',
}

export interface AnomalySelectOption {
  readonly label: AnomalyTimeRangeLabel;
  readonly value: AnomalyTimeRangeValue;
}

const INITIAL_ANOMALY_TIME_RANGE_VALUE: AnomalySelectOption = {
  label: AnomalyTimeRangeLabel.lastWeek,
  value: AnomalyTimeRangeValue.lastWeek,
};

const TIME_RANGE_OPTIONS: AnomalySelectOption[] = [
  {
    label: AnomalyTimeRangeLabel.lastHour,
    value: AnomalyTimeRangeValue.lastHour,
  },
  {
    label: AnomalyTimeRangeLabel.lastDay,
    value: AnomalyTimeRangeValue.lastDay,
  },
  {
    label: AnomalyTimeRangeLabel.lastWeek,
    value: AnomalyTimeRangeValue.lastWeek,
  },
  // {
  //   label: AnomalyTimeRangeLabel.lastMonth,
  //   value: AnomalyTimeRangeValue.lastMonth,
  // },
];

const Tab = styled(TabUnstyled)`
  color: #848da3;
  cursor: pointer;
  font-size: 12px;
  background: #f3f6fc;
  padding: 15px 40px 15px 40px;
  border: none;
  border-radius: 6px;
  display: flex;

  &.Mui-selected {
    color: #437fec;
    font-weight: bold;
  }

  &:hover {
    color: #437fec;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    color: #437fec;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
`;

const TabsList = styled(TabsListUnstyled)`
  border-radius: 6px;
  display: flex;
  align-content: space-between;
`;

export const Anomalies: React.FC = () => {
  const classes = AnalyticsStyles();

  const [tab, setTab] = useState<AnomalyTabValue>(AnomalyTabValue.Experience);
  const [timeRange, setTimeRange] = useState<AnomalySelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);

  const handleTabChange = (event, newValue: AnomalyTabValue) => setTab(newValue);

  const handleTimeRangeChange = (value: AnomalySelectOption) => setTimeRange(value);

  return (
    <div className={classes.anomalyContainer}>
      <TabsUnstyled value={tab} onChange={handleTabChange}>
        <div className={classes.tabTitleContainer}>
          <div className={classes.anomalyTabContainer}>
            <TabsList>
              <Tab value={AnomalyTabValue.Experience}>{AnomalyTabValue.Experience.toUpperCase()}</Tab>
            </TabsList>
          </div>
          <div>
            <span className={classes.anomalyTimeRangeText}>Show:</span>
            <Select className={classes.inlineSelect} label="Single select" value={timeRange} options={TIME_RANGE_OPTIONS} onChange={handleTimeRangeChange} />
          </div>
        </div>
        <TabPanel value={AnomalyTabValue.Experience}>
          <ExperienceTab timeRange={timeRange.value} />
        </TabPanel>
        <TabPanel value={AnomalyTabValue.Policy}>
          <PolicyTab />
        </TabPanel>
        <TabPanel value={AnomalyTabValue.Cost}>
          <CostTab />
        </TabPanel>
      </TabsUnstyled>
    </div>
  );
};
