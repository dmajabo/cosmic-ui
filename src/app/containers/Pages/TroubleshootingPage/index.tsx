import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { TroubleshootingStyles } from './TroubleshootingStyles';

interface TabPanelProps {
  readonly title: string;
  readonly value: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, title, ...other }) => {
  const classes = TroubleshootingStyles();

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
  Connectivity = 'Connectivity',
  configChanges = 'Config Changes',
}

const TroubleshootingPage: React.FC = () => {
  const classes = TroubleshootingStyles();
  const [selectedTabName, setSelectedTabName] = useState<TabName>(TabName.Connectivity);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName) => setSelectedTabName(newValue);

  return (
    <div className={classes.troubleshootingPageContainer}>
      <div className={classes.fixedTabBar}>
        <Tabs value={selectedTabName} onChange={handleTabChange} indicatorColor="primary">
          <Tab
            value={TabName.Connectivity}
            label={<span className={selectedTabName === TabName.Connectivity ? classes.activeTabLabel : classes.tabLabel}>{TabName.Connectivity}</span>}
            wrapped
            disableRipple
            {...a11yProps(TabName.Connectivity)}
          />
          <Tab
            value={TabName.configChanges}
            label={<span className={selectedTabName === TabName.configChanges ? classes.activeTabLabel : classes.tabLabel}>{TabName.configChanges}</span>}
            wrapped
            disableRipple
            {...a11yProps(TabName.configChanges)}
          />
        </Tabs>
      </div>
      <TabPanel value={selectedTabName} title={TabName.Connectivity}>
        {selectedTabName === TabName.Connectivity && <>{TabName.Connectivity}</>}
      </TabPanel>
      <TabPanel value={selectedTabName} title={TabName.configChanges}>
        {selectedTabName === TabName.configChanges && <>{TabName.configChanges}</>}
      </TabPanel>
    </div>
  );
};
export default TroubleshootingPage;
