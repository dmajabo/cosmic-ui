import React, { useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { Tabs, Tab, Typography, Button } from '@mui/material';
import FilterIcon from '../../icons/performance dashboard/filter.svg';
import { LookbackLabel, LookbackSelectOption, LookbackValue } from '../Metrics Explorer/LookbackTimeTab';
import Select from 'react-select';
import { ExperienceTab } from './ExperienceTab';
import { PolicyTab } from './PolicyTab';
import { CostTab } from './CostTab';

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

const INITIAL_ANOMALY_TIME_RANGE_VALUE: LookbackSelectOption = {
  label: LookbackLabel.oneWeek,
  value: LookbackValue.oneWeek,
};

const TIME_RANGE_OPTIONS: LookbackSelectOption[] = [
  {
    label: LookbackLabel.fiveMinutes,
    value: LookbackValue.fiveMinutes,
  },
  {
    label: LookbackLabel.fifteenMinutes,
    value: LookbackValue.fifteenMinutes,
  },
  {
    label: LookbackLabel.thirtyMinutes,
    value: LookbackValue.thirtyMinutes,
  },
  {
    label: LookbackLabel.oneHour,
    value: LookbackValue.oneHour,
  },
  {
    label: LookbackLabel.sixHours,
    value: LookbackValue.sixHours,
  },
  {
    label: LookbackLabel.twelveHours,
    value: LookbackValue.twelveHours,
  },
  {
    label: LookbackLabel.twentyFourHours,
    value: LookbackValue.twentyFourHours,
  },
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

export const Anomalies: React.FC = () => {
  const classes = AnalyticsStyles();

  const [tab, setTab] = useState<AnomalyTabValue>(AnomalyTabValue.Experience);
  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);

  const handleTabChange = (event, newValue: AnomalyTabValue) => setTab(newValue);

  const handleTimeRangeChange = (value: LookbackSelectOption) => setTimeRange(value);

  return (
    <div className={classes.anomalyContainer}>
      <div className={classes.tabTitleContainer}>
        <div>
          <Tabs classes={{ root: classes.anomalyTabContainer, indicator: classes.indicator }} value={tab} onChange={handleTabChange} indicatorColor="primary">
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
          <Button className={classes.otherButton} variant="contained" disableElevation>
            <Typography className={classes.otherButtonText} noWrap>
              FILTER
            </Typography>
            <img src={FilterIcon} alt="columns" />
          </Button>
          <span className={classes.anomalyTimeRangeText}>Show:</span>
          <Select className={classes.inlineSelect} label="Single select" value={timeRange} options={TIME_RANGE_OPTIONS} onChange={handleTimeRangeChange} />
        </div>
      </div>
      <TabPanel value={tab} name={AnomalyTabValue.Experience}>
        <ExperienceTab />
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
