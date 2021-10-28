import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { AnalyticsStyles } from './AnalyticsStyles';
import { MetricsExplorer } from './components/MetricsExplorer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = AnalyticsStyles();

  return (
    <div className={classes.tabContainer} role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {children}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

enum TabName {
  insights = 'Insights',
  sessions = 'Sessions',
  reporting = 'Reporting',
  inventory = 'Inventory',
  metricsExplorer = 'Metrics Explorer',
}

const AnalyticsPage: React.FC = () => {
  const classes = AnalyticsStyles();
  const [tab, setTab] = useState<string>(TabName.metricsExplorer);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div className={classes.analyticsContainer}>
      <div className={classes.fixedTabBar}>
        <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary">
          <Tab
            value={TabName.insights}
            label={<span className={tab === TabName.insights ? classes.activeTabLabel : classes.tabLabel}>{TabName.insights}</span>}
            wrapped
            {...a11yProps(TabName.insights)}
          />
          <Tab
            value={TabName.sessions}
            label={<span className={tab === TabName.sessions ? classes.activeTabLabel : classes.tabLabel}>{TabName.sessions}</span>}
            wrapped
            {...a11yProps(TabName.sessions)}
          />
          <Tab
            value={TabName.reporting}
            label={<span className={tab === TabName.reporting ? classes.activeTabLabel : classes.tabLabel}>{TabName.reporting}</span>}
            wrapped
            {...a11yProps(TabName.reporting)}
          />
          <Tab
            value={TabName.inventory}
            label={<span className={tab === TabName.inventory ? classes.activeTabLabel : classes.tabLabel}>{TabName.inventory}</span>}
            wrapped
            {...a11yProps(TabName.inventory)}
          />
          <Tab
            value={TabName.metricsExplorer}
            label={<span className={tab === TabName.metricsExplorer ? classes.activeTabLabel : classes.tabLabel}>{TabName.metricsExplorer}</span>}
            wrapped
            {...a11yProps(TabName.metricsExplorer)}
          />
        </Tabs>
      </div>
      <TabPanel value={tab} index={TabName.insights}>
        {TabName.insights}
      </TabPanel>
      <TabPanel value={tab} index={TabName.sessions}>
        {TabName.sessions}
      </TabPanel>
      <TabPanel value={tab} index={TabName.reporting}>
        {TabName.reporting}
      </TabPanel>
      <TabPanel value={tab} index={TabName.inventory}>
        {TabName.inventory}
      </TabPanel>
      <TabPanel value={tab} index={TabName.metricsExplorer}>
        <MetricsExplorer />
      </TabPanel>
    </div>
  );
};

export default React.memo(AnalyticsPage);
