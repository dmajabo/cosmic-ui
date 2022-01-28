import { Tab, Tabs } from '@mui/material';
import { SessionsProvider, useSessionsActions } from 'lib/hooks/Sessions/useSessionsDataContext';
import React, { useState } from 'react';
import SessionPage from '../AnalyticsPage/SessionPage';
import { TrafficStyles } from './TrafficStyles';

interface TabPanelProps {
  readonly title: string;
  readonly value: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, title, ...other }) => {
  const classes = TrafficStyles();

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
  Trends = 'Trends',
  Logs = 'Logs',
}

const TrafficPage: React.FC = () => {
  const classes = TrafficStyles();
  const sessionsActions = useSessionsActions();
  const [selectedTabName, setSelectedTabName] = useState<TabName>(TabName.Logs);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName) => setSelectedTabName(newValue);

  return (
    <SessionsProvider actions={sessionsActions}>
      <div className={classes.trafficPageContainer}>
        <div className={classes.fixedTabBar}>
          <Tabs value={selectedTabName} onChange={handleTabChange} indicatorColor="primary">
            <Tab
              value={TabName.Trends}
              label={<span className={selectedTabName === TabName.Trends ? classes.activeTabLabel : classes.tabLabel}>{TabName.Trends}</span>}
              wrapped
              disableRipple
              {...a11yProps(TabName.Trends)}
            />
            <Tab
              value={TabName.Logs}
              label={<span className={selectedTabName === TabName.Logs ? classes.activeTabLabel : classes.tabLabel}>{TabName.Logs}</span>}
              wrapped
              disableRipple
              {...a11yProps(TabName.Logs)}
            />
          </Tabs>
        </div>
        <TabPanel value={selectedTabName} title={TabName.Logs}>
          {selectedTabName === TabName.Logs && <SessionPage />}
        </TabPanel>
        <TabPanel value={selectedTabName} title={TabName.Trends}>
          {selectedTabName === TabName.Trends && <>{TabName.Trends}</>}
        </TabPanel>
      </div>
    </SessionsProvider>
  );
};

export default TrafficPage;
