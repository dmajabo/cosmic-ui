import { Tab, Tabs } from '@mui/material';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { Device, GetControllerVendorResponse, MetricsTopoMap, Organization, Vnet } from 'lib/api/http/SharedTypes';
import { useGet, useGetChainData } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { TabsWrapperStyles } from '../Shared/styles';
import { Cloud } from './components/Cloud';
import { PerformanceDashboard } from './components/Performance Dashboard/PerformanceDashboard';
import { Sites } from './components/Sites';
import { MetricsStyles } from './MetricsStyles';

export enum TabName {
  Performance = 'Performance',
  Sites = 'Sites',
  Cloud = 'Cloud',
}
interface TabPanelProps {
  readonly title: string;
  readonly value: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, title, ...other }) => {
  const classes = MetricsStyles();

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

const MetricsPage: React.FC = () => {
  const classes = MetricsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData<MetricsTopoMap>();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [networks, setNetworks] = useState<Vnet[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedTabName, setSelectedTabName] = useState<TabName>(TabName.Performance);
  const [isAwsConfigured, setIsAwsConfigured] = useState<boolean>(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName) => setSelectedTabName(newValue);

  useEffect(() => {
    onGetChainData([TopoApi.getOnPremOrgList(), TopoApi.getOnPremNetworkList(), TopoApi.getOnPremDeviceList()], ['organizations', 'networks', 'devices'], userContext.accessToken!);
  }, []);

  useEffect(() => {
    if (userContext.vendors) {
      setIsAwsConfigured(userContext.vendors.hasOwnProperty(AccountVendorTypes.AMAZON_AWS));
    }
  }, [userContext]);

  useEffect(() => {
    if (response) {
      setOrganizations(response.organizations.orgs);
      setNetworks(response.networks.networks);
      setDevices(response.devices.devices);
    }
  }, [response]);

  return (
    <div className={classes.metricsPageContainer}>
      <div className={classes.fixedTabBar}>
        <TabsWrapperStyles>
          <Tabs value={selectedTabName} onChange={handleTabChange} indicatorColor="primary">
            <Tab
              value={TabName.Performance}
              label={<span className={selectedTabName === TabName.Performance ? classes.activeTabLabel : classes.tabLabel}>{TabName.Performance}</span>}
              wrapped
              {...a11yProps(TabName.Performance)}
            />
            <Tab
              value={TabName.Sites}
              label={<span className={selectedTabName === TabName.Sites ? classes.activeTabLabel : classes.tabLabel}>{TabName.Sites}</span>}
              wrapped
              {...a11yProps(TabName.Sites)}
            />
            {isAwsConfigured && (
              <Tab
                value={TabName.Cloud}
                label={<span className={selectedTabName === TabName.Cloud ? classes.activeTabLabel : classes.tabLabel}>{TabName.Cloud}</span>}
                wrapped
                {...a11yProps(TabName.Cloud)}
              />
            )}
          </Tabs>
        </TabsWrapperStyles>
      </div>
      <TabPanel value={selectedTabName} title={TabName.Performance}>
        <PerformanceDashboard selectedTabName={selectedTabName} organizations={organizations} networks={networks} devices={devices} orgLoading={loading} orgError={error} />
      </TabPanel>
      <TabPanel value={selectedTabName} title={TabName.Sites}>
        <Sites selectedTabName={selectedTabName} networks={networks} devices={devices} orgLoading={loading} orgError={error} />
      </TabPanel>
      {isAwsConfigured && (
        <TabPanel value={selectedTabName} title={TabName.Cloud}>
          <Cloud selectedTabName={selectedTabName} />
        </TabPanel>
      )}
    </div>
  );
};
export default MetricsPage;
