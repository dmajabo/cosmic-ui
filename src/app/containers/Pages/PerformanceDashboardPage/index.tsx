import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CreateSLATest } from './components/CreateSLATest';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { SLATestList } from './components/SLATestList';
import { CreateSLATestRequest, FinalTableData, Organization } from './SharedTypes';
import { createApiClient } from './apiClient';
import { GetDevicesString, GetSelectedOrganization } from './components/filterFunctions';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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

const PerformanceDashboardPage: React.FC = () => {
  const classes = PerformanceDashboardStyles();

  const apiClient = createApiClient();
  const [finalTableData, setFinalTableData] = useState<FinalTableData[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const responseData = await apiClient.getOrganizations();
      if (Object.keys(responseData).length > 0) {
        const merakiOrganizations = responseData.organizations.filter(organization => organization.vendorType === 'MERAKI');
        setOrganizations(merakiOrganizations);
      }
    };
    getOrganizations();
  }, []);

  const getSLATests = async () => {
    const responseData = await apiClient.getSLATests();
    if (Object.keys(responseData).length > 0) {
      if (Array.isArray(responseData.slaTests) && responseData.slaTests.length) {
        const testData: FinalTableData[] = responseData.slaTests.map(test => {
          const selectedOrganization = GetSelectedOrganization(organizations, test.sourceOrgId);
          const allDevices: string = GetDevicesString(selectedOrganization);
          return {
            id: test.testId,
            name: test.name,
            sourceOrg: selectedOrganization.name,
            sourceNetwork: test.sourceNwExtId,
            sourceDevice: allDevices,
            destination: test.destination,
            interface: test.interface,
            description: test.description,
            averageQoe: {
              packetLoss: test.metrics.avgPacketLoss.value,
              latency: test.metrics.avgLatency.value,
            },
          };
        });
        setFinalTableData(testData);
      }
    }
  };

  useEffect(() => {
    if (organizations.length > 0) {
      getSLATests();
    }
  }, [organizations]);

  const addSlaTest = async (submitData: CreateSLATestRequest) => {
    const responseData = await apiClient.createSLATest(submitData);
    if (Object.keys(responseData).length > 0) {
      getSLATests();
    }
  };

  const deleteSlaTest = async (testId: string) => {
    const responseData = await apiClient.deleteSLATest(testId);
    if (Object.keys(responseData).length === 0) {
      getSLATests();
    }
  };

  const tab = 'sla_tests';

  return (
    <div className={classes.performanceDashboardContainer}>
      <div className={classes.fixedTabBar}>
        <Tabs value={tab} indicatorColor="primary">
          <Tab value="sla_tests" label={<span className={classes.tabLabel}>SLA Tests</span>} wrapped {...a11yProps('sla_tests')} />
        </Tabs>
      </div>
      <TabPanel value={tab} index={'sla_tests'}>
        {finalTableData.length > 0 ? (
          <SLATestList deleteSlaTest={deleteSlaTest} organizations={organizations} finalTableData={finalTableData} addSlaTest={addSlaTest} />
        ) : (
          <CreateSLATest organizations={organizations} addSlaTest={addSlaTest} />
        )}
      </TabPanel>
    </div>
  );
};

export default PerformanceDashboardPage;
