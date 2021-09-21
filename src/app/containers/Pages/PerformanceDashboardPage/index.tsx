import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CreateSLATest } from './components/CreateSLATest';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { SLATestList } from './components/SLATestList';
import { FinalTableData, Organization } from './SharedTypes';
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

  const [addedTestCount, setAddedTestCount] = useState<number>(0);
  const [finalTableData, setFinalTableData] = useState<FinalTableData[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const responseData = await apiClient.getOrganizations();
      const MerakiOrganizations = responseData.organizations.filter(organization => {
        return organization.vendorType === 'MERAKI';
      });
      setOrganizations(MerakiOrganizations);
    };
    getOrganizations();
  }, []);

  useEffect(() => {
    if (organizations.length > 0) {
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
                  packetLoss: 0,
                  latency: 0,
                },
              };
            });
            setFinalTableData(testData);
          }
        } else {
          console.log('Error: No data Available');
        }
      };
      getSLATests();
    }
  }, [organizations, addedTestCount]);

  const addSlaTest = (value: number) => {
    setTimeout(() => {
      setAddedTestCount(addedTestCount + value);
    }, 500);
  };

  const tab = 'sla_tests';

  return (
    <div className={classes.performanceDashboardContainer}>
      <Tabs value={tab} indicatorColor="primary">
        <Tab value="sla_tests" label={<span className={classes.tabLabel}>SLA Tests</span>} wrapped {...a11yProps('sla_tests')} />
      </Tabs>
      <TabPanel value={tab} index={'sla_tests'}>
        {finalTableData.length > 0 ? (
          <SLATestList organizations={organizations} finalTableData={finalTableData} addSlaTest={addSlaTest} />
        ) : (
          <CreateSLATest organizations={organizations} addSlaTest={addSlaTest} />
        )}
      </TabPanel>
    </div>
  );
};

export default PerformanceDashboardPage;
