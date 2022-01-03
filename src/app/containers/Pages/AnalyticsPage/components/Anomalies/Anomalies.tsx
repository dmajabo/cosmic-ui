import React, { useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { Tabs, Tab, Typography, Button } from '@mui/material';
import FilterIcon from '../../icons/performance dashboard/filter.svg';
import Select from 'react-select';
import { ExperienceTab } from './ExperienceTab';
import { PolicyTab } from './PolicyTab';
import { CostTab } from './CostTab';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import noop from 'lodash/noop';

interface TabPanelProps {
  readonly name: string;
  readonly value: string;
}

export enum AnomalyTabValue {
  Experience = 'Experience',
  Policy = 'Policy',
  Cost = 'Cost',
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, name }) => {
  return (
    <div role="tabpanel" hidden={value !== name} id={`simple-tabpanel-${name}`} aria-labelledby={`simple-tab-${name}`}>
      {children}
    </div>
  );
};

function a11yProps(name: AnomalyTabValue) {
  return {
    id: `simple-tab-${name}`,
    'aria-controls': `simple-tabpanel-${name}`,
  };
}

export enum AnomalyTimeRangeLabel {
  lastHour = 'Last 1 hour',
  lastDay = 'Last 1 day',
  lastWeek = 'Last 7 days',
  lastMonth = 'Last 30 days',
}

export enum AnomalyTimeRangeValue {
  lastHour = 'ANOMALY_QUERY_LAST_HOUR',
  lastDay = 'ANOMALY_QUERY_LAST_DAY',
  lastWeek = 'ANOMALY_QUERY_LAST_WEEK',
  lastMonth = 'ANOMALY_QUERY_LAST_MONTH',
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
  {
    label: AnomalyTimeRangeLabel.lastMonth,
    value: AnomalyTimeRangeValue.lastMonth,
  },
];

export const Anomalies: React.FC = () => {
  const classes = AnalyticsStyles();

  const [tab, setTab] = useState<AnomalyTabValue>(AnomalyTabValue.Experience);
  const [timeRange, setTimeRange] = useState<AnomalySelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);

  const handleTabChange = (event, newValue: AnomalyTabValue) => setTab(newValue);

  const handleTimeRangeChange = (value: AnomalySelectOption) => setTimeRange(value);

  return (
    <div className={classes.anomalyContainer}>
      <div className={classes.tabTitleContainer}>
        <div>
          <Tabs classes={{ root: classes.anomalyTabContainer, indicator: classes.indicator }} value={tab} onChange={handleTabChange}>
            <Tab
              classes={{ selected: classes.selectedTab }}
              value={AnomalyTabValue.Experience}
              label={<span className={classes.tableHeaderText}>{AnomalyTabValue.Experience.toUpperCase()}</span>}
              wrapped
              {...a11yProps(AnomalyTabValue.Experience)}
            />
            <Tab
              classes={{ selected: classes.selectedTab }}
              value={AnomalyTabValue.Policy}
              label={<span className={classes.tableHeaderText}>{AnomalyTabValue.Policy.toUpperCase()}</span>}
              wrapped
              {...a11yProps(AnomalyTabValue.Policy)}
            />
            <Tab
              classes={{ selected: classes.selectedTab }}
              value={AnomalyTabValue.Cost}
              label={<span className={classes.tableHeaderText}>{AnomalyTabValue.Cost.toUpperCase()}</span>}
              wrapped
              {...a11yProps(AnomalyTabValue.Cost)}
            />
          </Tabs>
        </div>
        <div>
          <SecondaryButton
            label={
              <>
                <span className={classes.otherButtonText}>FILTER</span>
                <img src={FilterIcon} alt="columns" />
              </>
            }
            onClick={noop}
          />
          <span className={classes.anomalyTimeRangeText}>Show:</span>
          <Select className={classes.inlineSelect} label="Single select" value={timeRange} options={TIME_RANGE_OPTIONS} onChange={handleTimeRangeChange} />
        </div>
      </div>
      <TabPanel value={tab} name={AnomalyTabValue.Experience}>
        <ExperienceTab timeRange={timeRange.value} />
      </TabPanel>
      <TabPanel value={tab} name={AnomalyTabValue.Policy}>
        <PolicyTab />
      </TabPanel>
      <TabPanel value={tab} name={AnomalyTabValue.Cost}>
        <CostTab />
      </TabPanel>
    </div>
  );
};
