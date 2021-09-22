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

export interface KeyValue {
  readonly [key: string]: string;
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
  const [deletedTestCount, setDeletedTestCount] = useState<number>(0);
  const [finalTableData, setFinalTableData] = useState<FinalTableData[]>([]);
  const [tempFinalTableData, setTempFinalTableData] = useState<FinalTableData[]>([]);
  const [packetLossData, setPacketLossData] = useState<KeyValue>({});
  const [latencyData, setLatencyData] = useState<KeyValue>({});
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const responseData = await apiClient.getOrganizations();
      const merakiOrganizations = responseData.organizations.filter(organization => {
        return organization.vendorType === 'MERAKI';
      });
      setOrganizations(merakiOrganizations);
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
            setTempFinalTableData(testData);
          }
        }
      };
      getSLATests();
    }
  }, [organizations, addedTestCount, deletedTestCount]);

  //TODO: Refactor below API calls with Promise.all
  const packetLoss = async () => {
    const packetloss = {};
    for (let i = 0; i < tempFinalTableData.length; i++) {
      try {
        const responseData = await apiClient.getAvgPacketLoss(tempFinalTableData[i].sourceNetwork, tempFinalTableData[i].destination);
        if (responseData?.avgMetric?.avgVal) {
          packetloss[tempFinalTableData[i].id] = responseData.avgMetric.avgVal;
        } else {
          packetloss[tempFinalTableData[i].id] = '-';
        }
      } catch {}
    }
    setPacketLossData(packetloss);
  };

  const latency = async () => {
    const latency = {};
    for (let i = 0; i < tempFinalTableData.length; i++) {
      try {
        const responseData = await apiClient.getAvgLatency(tempFinalTableData[i].sourceNetwork, tempFinalTableData[i].destination);
        if (responseData?.avgMetric?.avgVal) {
          latency[tempFinalTableData[i].id] = responseData.avgMetric.avgVal;
        } else {
          latency[tempFinalTableData[i].id] = '-';
        }
      } catch {}
    }
    setLatencyData(latency);
  };
  useEffect(() => {
    packetLoss();
    latency();
    setFinalTableData(tempFinalTableData);
  }, [tempFinalTableData]);

  const addSlaTest = (value: number) => {
    setAddedTestCount(addedTestCount + value);
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
          <SLATestList latencyData={latencyData} packetLossData={packetLossData} organizations={organizations} finalTableData={finalTableData} addSlaTest={addSlaTest} />
        ) : (
          <CreateSLATest organizations={organizations} addSlaTest={addSlaTest} />
        )}
      </TabPanel>
    </div>
  );
};

export default PerformanceDashboardPage;
