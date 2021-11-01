import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { AnalyticsStyles } from './AnalyticsStyles';
import { MetricsExplorer } from './components/MetricsExplorer';

interface TabPanelProps {
  readonly title: string;
  readonly value: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, title, ...other }) => {
  const classes = AnalyticsStyles();

  return (
    <div className={classes.tabContainer} role="tabpanel" hidden={value !== title} id={`simple-tabpanel-${title}`} aria-labelledby={`simple-tab-${title}`} {...other}>
      {children}
    </div>
  );
};

function a11yProps(title: string) {
  return {
    id: `simple-tab-${title}`,
    'aria-controls': `simple-tabpanel-${title}`,
  };
}

enum TabName {
  Insights = 'Insights',
  Sessions = 'Sessions',
  Reporting = 'Reporting',
  Inventory = 'Inventory',
  MetricsExplorer = 'Metrics Explorer',
}

const AnalyticsPage: React.FC = () => {
  const classes = AnalyticsStyles();
  const [selectedTabName, setSelectedTabName] = useState<TabName>(TabName.MetricsExplorer);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName) => setSelectedTabName(newValue);

  return (
    <div className={classes.analyticsContainer}>
      <div className={classes.fixedTabBar}>
        <Tabs value={selectedTabName} onChange={handleTabChange} indicatorColor="primary">
          <Tab
            value={TabName.Insights}
            label={<span className={selectedTabName === TabName.Insights ? classes.activeTabLabel : classes.tabLabel}>{TabName.Insights}</span>}
            wrapped
            {...a11yProps(TabName.Insights)}
          />
          <Tab
            value={TabName.Sessions}
            label={<span className={selectedTabName === TabName.Sessions ? classes.activeTabLabel : classes.tabLabel}>{TabName.Sessions}</span>}
            wrapped
            {...a11yProps(TabName.Sessions)}
          />
          <Tab
            value={TabName.Reporting}
            label={<span className={selectedTabName === TabName.Reporting ? classes.activeTabLabel : classes.tabLabel}>{TabName.Reporting}</span>}
            wrapped
            {...a11yProps(TabName.Reporting)}
          />
          <Tab
            value={TabName.Inventory}
            label={<span className={selectedTabName === TabName.Inventory ? classes.activeTabLabel : classes.tabLabel}>{TabName.Inventory}</span>}
            wrapped
            {...a11yProps(TabName.Inventory)}
          />
          <Tab
            value={TabName.MetricsExplorer}
            label={<span className={selectedTabName === TabName.MetricsExplorer ? classes.activeTabLabel : classes.tabLabel}>{TabName.MetricsExplorer}</span>}
            wrapped
            {...a11yProps(TabName.MetricsExplorer)}
          />
        </Tabs>
      </div>
      <TabPanel value={selectedTabName} title={TabName.Insights}>
        {TabName.Insights}
      </TabPanel>
      <TabPanel value={selectedTabName} title={TabName.Sessions}>
        {TabName.Sessions}
      </TabPanel>
      <TabPanel value={selectedTabName} title={TabName.Reporting}>
        {TabName.Reporting}
      </TabPanel>
      <TabPanel value={selectedTabName} title={TabName.Inventory}>
        {TabName.Inventory}
      </TabPanel>
      <TabPanel value={selectedTabName} title={TabName.MetricsExplorer}>
        <MetricsExplorer />
      </TabPanel>
    </div>
  );
};

export default React.memo(AnalyticsPage);
