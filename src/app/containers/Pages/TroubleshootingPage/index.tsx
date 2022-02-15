import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { TroubleshootingStyles } from './TroubleshootingStyles';
import { PolicyLogs } from './PolicyLogs';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { GetControllerVendorResponse } from 'lib/api/http/SharedTypes';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';

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
  const [selectedTabName, setSelectedTabName] = useState<TabName>(TabName.configChanges);
  const userContext = useContext<UserContextState>(UserContext);
  const [isAwsConfigured, setIsAwsConfigured] = useState<boolean>(false);

  useEffect(() => {
    if (userContext.vendors) {
      setIsAwsConfigured(userContext.vendors.hasOwnProperty(AccountVendorTypes.AMAZON_AWS));
    }
  }, [userContext]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName) => setSelectedTabName(newValue);

  return (
    <div className={classes.troubleshootingPageContainer}>
      <div className={classes.fixedTabBar}>
        <Tabs value={selectedTabName} onChange={handleTabChange} indicatorColor="primary">
          {isAwsConfigured && (
            <Tab
              value={TabName.Connectivity}
              label={<span className={selectedTabName === TabName.Connectivity ? classes.activeTabLabel : classes.tabLabel}>{TabName.Connectivity}</span>}
              wrapped
              disableRipple
              {...a11yProps(TabName.Connectivity)}
            />
          )}
          <Tab
            value={TabName.configChanges}
            label={<span className={selectedTabName === TabName.configChanges ? classes.activeTabLabel : classes.tabLabel}>{TabName.configChanges}</span>}
            wrapped
            disableRipple
            {...a11yProps(TabName.configChanges)}
          />
        </Tabs>
      </div>
      {isAwsConfigured && (
        <TabPanel value={selectedTabName} title={TabName.Connectivity}>
          {selectedTabName === TabName.Connectivity && <>{TabName.Connectivity}</>}
        </TabPanel>
      )}
      <TabPanel value={selectedTabName} title={TabName.configChanges}>
        {selectedTabName === TabName.configChanges && <PolicyLogs />}
      </TabPanel>
    </div>
  );
};
export default TroubleshootingPage;
