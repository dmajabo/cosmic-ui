import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CreateSLATest } from './components/CreateSLATest';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { SLATestList } from './components/SLATestList';
import { createApiClient } from './apiClient';
interface IProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface AverageQOE {
  readonly packetLoss: number;
  readonly latency: number;
}

interface RawData {
  readonly id?: string;
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly interface?: string;
  readonly description: string;
  readonly averageQoe: AverageQOE;
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

const PerformanceDashboardPage: React.FC<IProps> = (props: IProps) => {
  const classes = PerformanceDashboardStyles();

  const apiClient = createApiClient();

  const [rawData, setRawData] = useState<RawData[]>([]);

  const addSlaTest = (value: RawData) => {
    let tempData = rawData.concat();
    tempData.push(value);
    setRawData(tempData);
  };

  useEffect(() => {
    const getSLATests = async () => {
      const responseData = await apiClient.getSLATests();
      if (responseData.sla_tests.length > 0) {
        responseData.sla_tests.map(test => {});
      }
    };
    getSLATests();
  }, []);

  const tab = 'sla_tests';

  return (
    <div className={classes.performanceDashboardContainer}>
      <Tabs value={tab} indicatorColor="primary">
        <Tab value="sla_tests" label={<span className={classes.tabLabel}>SLA Tests</span>} wrapped {...a11yProps('sla_tests')} />
      </Tabs>
      <TabPanel value={tab} index={'sla_tests'}>
        {rawData.length > 0 ? <SLATestList rawData={rawData} addSlaTest={addSlaTest} /> : <CreateSLATest addSlaTest={addSlaTest} />}
      </TabPanel>
    </div>
  );
};

export default React.memo(PerformanceDashboardPage);
