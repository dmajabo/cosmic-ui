import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { CreateSLATest } from './components/CreateSLATest';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { SLATestList } from './components/SLATestList';
import { FinalTableData } from './SharedTypes';

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

  const [finalTableData, setFinalTableData] = useState<FinalTableData[]>([]);

  const addSlaTest = (value: FinalTableData) => {
    let tempData = finalTableData.concat(value);
    setFinalTableData(tempData);
  };

  const tab = 'sla_tests';

  return (
    <div className={classes.performanceDashboardContainer}>
      <Tabs value={tab} indicatorColor="primary">
        <Tab value="sla_tests" label={<span className={classes.tabLabel}>SLA Tests</span>} wrapped {...a11yProps('sla_tests')} />
      </Tabs>
      <TabPanel value={tab} index={'sla_tests'}>
        {finalTableData.length > 0 ? <SLATestList finalTableData={finalTableData} addSlaTest={addSlaTest} /> : <CreateSLATest addSlaTest={addSlaTest} />}
      </TabPanel>
    </div>
  );
};

export default PerformanceDashboardPage;
