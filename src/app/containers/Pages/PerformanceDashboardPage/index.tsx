import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CreateSLATest } from './components/CreateSLATest';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { SLATestList } from './components/SLATestList';
import { CreateSLATestRequest, FinalTableData, Organization } from './SharedTypes';
import { createApiClient } from './apiClient';
import { GetDevicesString, GetSelectedOrganization } from './components/filterFunctions';
import LoadingIndicator from '../../../components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [merakiOrganizations, setMerakiOrganizations] = useState<Organization[]>([]);
  const [awsOrganizations, setAwsOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getOrganizations = async () => {
      const responseData = await apiClient.getOrganizations();
      if (Object.keys(responseData).length > 0) {
        const merakiOrganizations = responseData.organizations.filter(organization => organization.vendorType === 'MERAKI');
        const awsOrganizations = responseData.organizations.filter(organization => organization.vendorType === 'AWS');
        setMerakiOrganizations(merakiOrganizations);
        setAwsOrganizations(awsOrganizations);
      }
    };
    getOrganizations();
  }, []);

  const getSLATests = async () => {
    const responseData = await apiClient.getSLATests();
    if (Object.keys(responseData).length > 0) {
      if (Array.isArray(responseData.slaTests) && responseData.slaTests.length) {
        const testData: FinalTableData[] = responseData.slaTests.map(test => {
          const selectedOrganization = GetSelectedOrganization(merakiOrganizations, test.sourceOrgId);
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
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (merakiOrganizations.length > 0) {
      getSLATests();
    }
  }, [merakiOrganizations]);

  const addSlaTest = async (submitData: CreateSLATestRequest) => {
    const responseData = await apiClient.createSLATest(submitData);
    if (Object.keys(responseData).length > 0) {
      toast.success('Test Added Successfully!');
      getSLATests();
    } else {
      toast.error('Test Not Added! Please try Again!');
    }
  };

  const deleteSlaTest = async (testId: string) => {
    const responseData = await apiClient.deleteSLATest(testId);
    if (Object.keys(responseData).length === 0) {
      toast.success('Test Deleted Successfully!');
      getSLATests();
    } else {
      toast.error('Test Not Deleted! Please Try Again!');
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
        {isLoading ? (
          <div className={classes.pageCenter}>
            <LoadingIndicator />
          </div>
        ) : finalTableData.length > 0 ? (
          <SLATestList deleteSlaTest={deleteSlaTest} awsOrganizations={awsOrganizations} merakiOrganizations={merakiOrganizations} finalTableData={finalTableData} addSlaTest={addSlaTest} />
        ) : (
          <CreateSLATest awsOrganizations={awsOrganizations} merakiOrganizations={merakiOrganizations} addSlaTest={addSlaTest} />
        )}
        <ToastContainer />
      </TabPanel>
    </div>
  );
};

export default PerformanceDashboardPage;
