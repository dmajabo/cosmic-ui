import { Tab, Tabs } from '@material-ui/core';
import { SessionsProvider, useSessionsActions } from 'lib/hooks/Sessions/useSessionsDataContext';
import React, { useState } from 'react';
import { AnalyticsStyles } from './AnalyticsStyles';
import { Anomalies } from './components/Anomalies/Anomalies';
import { MetricsExplorer } from './components/Metrics Explorer/MetricsExplorer';
import { PerformanceDashboard } from './components/Performance Dashboard/PerformanceDashboard';
import { PolicyLogs } from './components/PolicyLogs/PolicyLogs';
import SessionPage from './SessionPage';

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
  SessionLogs = 'Session Logs',
  Performance = 'Performance',
  Anomalies = 'Anomalies',
  PolicyLogs = 'Policy Logs',
  MetricsExplorer = 'Metrics Explorer',
}

const AnalyticsPage: React.FC = () => {
  const classes = AnalyticsStyles();
  const sessionsActions = useSessionsActions();
  const [selectedTabName, setSelectedTabName] = useState<TabName>(TabName.PolicyLogs);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName) => setSelectedTabName(newValue);

  return (
    <SessionsProvider actions={sessionsActions}>
      <div className={classes.analyticsContainer}>
        <div className={classes.fixedTabBar}>
          <Tabs value={selectedTabName} onChange={handleTabChange} indicatorColor="primary">
            <Tab
              value={TabName.SessionLogs}
              label={<span className={selectedTabName === TabName.SessionLogs ? classes.activeTabLabel : classes.tabLabel}>{TabName.SessionLogs}</span>}
              wrapped
              {...a11yProps(TabName.SessionLogs)}
            />
            <Tab
              value={TabName.Performance}
              label={<span className={selectedTabName === TabName.Performance ? classes.activeTabLabel : classes.tabLabel}>{TabName.Performance}</span>}
              wrapped
              {...a11yProps(TabName.Performance)}
            />
            <Tab
              value={TabName.Anomalies}
              label={<span className={selectedTabName === TabName.Anomalies ? classes.activeTabLabel : classes.tabLabel}>{TabName.Anomalies}</span>}
              wrapped
              {...a11yProps(TabName.Anomalies)}
            />
            <Tab
              value={TabName.PolicyLogs}
              label={<span className={selectedTabName === TabName.PolicyLogs ? classes.activeTabLabel : classes.tabLabel}>{TabName.PolicyLogs}</span>}
              wrapped
              {...a11yProps(TabName.PolicyLogs)}
            />
            <Tab
              value={TabName.MetricsExplorer}
              label={<span className={selectedTabName === TabName.MetricsExplorer ? classes.activeTabLabel : classes.tabLabel}>{TabName.MetricsExplorer}</span>}
              wrapped
              {...a11yProps(TabName.MetricsExplorer)}
            />
          </Tabs>
        </div>
        <TabPanel value={selectedTabName} title={TabName.SessionLogs}>
          {selectedTabName === TabName.SessionLogs && <SessionPage />}
        </TabPanel>
        <TabPanel value={selectedTabName} title={TabName.Performance}>
          <PerformanceDashboard />
        </TabPanel>
        <TabPanel value={selectedTabName} title={TabName.Anomalies}>
          <Anomalies />
        </TabPanel>
        <TabPanel value={selectedTabName} title={TabName.PolicyLogs}>
          <PolicyLogs />
        </TabPanel>
        <TabPanel value={selectedTabName} title={TabName.MetricsExplorer}>
          <MetricsExplorer />
        </TabPanel>
      </div>
    </SessionsProvider>
  );
};

export default React.memo(AnalyticsPage);
