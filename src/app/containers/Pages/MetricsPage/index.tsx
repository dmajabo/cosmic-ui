import { Tab, Tabs } from '@mui/material';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { ITopologyMapData } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { TabsWrapperStyles } from '../Shared/styles';
import { PerformanceDashboard } from './components/Performance Dashboard/PerformanceDashboard';
import { Sites } from './components/Sites';
import { MetricsStyles } from './MetricsStyles';

enum TabName {
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
  const { response, onGet } = useGet<ITopologyMapData>();

  const [selectedTabName, setSelectedTabName] = useState<TabName>(TabName.Sites);
  const [orgMap, setOrgMap] = useState<ITopologyMapData>({ count: 0, organizations: [] });

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName) => setSelectedTabName(newValue);

  useEffect(() => {
    onGet(TopoApi.getAllOrganizations(), userContext.accessToken!);
  }, []);

  useEffect(() => {
    if (response) {
      setOrgMap(response);
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
          </Tabs>
        </TabsWrapperStyles>
      </div>
      <TabPanel value={selectedTabName} title={TabName.Performance}>
        <PerformanceDashboard orgMap={orgMap} />
      </TabPanel>
      <TabPanel value={selectedTabName} title={TabName.Sites}>
        <Sites orgMap={orgMap} />
      </TabPanel>
    </div>
  );
};
export default MetricsPage;
