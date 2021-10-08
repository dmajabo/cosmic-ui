import { Backdrop, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import React, { useMemo, useState } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import ColumnsIcon from '../icons/columns.svg';
import FilterIcon from '../icons/filter.svg';
import Table, { Data } from './Table';
import { CreateSLATest } from './CreateSLATest';
import { Organization, Column, FinalTableData } from '../SharedTypes';
import { PacketLoss } from './PacketLoss';
import { Latency } from './Latency';
import Select from 'react-select';
import AverageQoe from './AverageQoe';
import { Goodput } from './Goodput';
import { MetricTabValue } from '../../DashboardPage/enum/MetricTabValue';

interface SLATestListProps {
  readonly finalTableData: FinalTableData[];
  readonly addSlaTest: Function;
  readonly merakiOrganizations: Organization[];
  readonly awsOrganizations: Organization[];
  readonly deleteSlaTest: Function;
}

interface TabPanelProps {
  readonly children?: React.ReactNode;
  readonly index: string;
  readonly value: string;
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

const columns: Column[] = [
  {
    Header: 'NAME',
    accessor: 'name' as const,
  },
  {
    Header: 'SOURCE ORGANIZATION',
    accessor: 'sourceOrg' as const,
  },
  {
    Header: 'SOURCE NETWORK',
    accessor: 'sourceNetwork' as const,
  },
  {
    Header: 'SOURCE DEVICE',
    accessor: 'sourceDevice' as const,
  },
  {
    Header: 'DESTINATION',
    accessor: 'destination' as const,
  },
  {
    Header: 'AVERAGE QOE',
    accessor: 'averageQoe' as const,
  },
];

export const SLATestList: React.FC<SLATestListProps> = ({ deleteSlaTest, awsOrganizations, merakiOrganizations, finalTableData, addSlaTest }) => {
  const classes = PerformanceDashboardStyles();

  const [createToggle, setCreateToggle] = React.useState<boolean>(false);
  const [tab, setTab] = useState<string>(MetricTabValue.latency);
  const [selectedRows, setSelectedRows] = useState<Data[]>([]);
  const [timeRange, setTimeRange] = useState<string>('-7d');

  const handleTabChange = (event, newValue: string) => setTab(newValue);

  const handleClose = () => setCreateToggle(false);

  const handleToggle = () => setCreateToggle(!createToggle);

  const addTest = (value: FinalTableData) => {
    addSlaTest(value);
  };

  const onSelectedRowsUpdate = (value: Data[]) => setSelectedRows(value);

  const deleteTest = async (testId: string) => deleteSlaTest(testId);

  const data = useMemo(
    () =>
      finalTableData.map(item => {
        return {
          id: item.id,
          name: item.name,
          sourceOrg: item.sourceOrg,
          sourceNetwork: item.sourceNetwork,
          sourceDevice: item.sourceDevice,
          destination: item.destination,
          averageQoe: <AverageQoe deleteTest={deleteTest} packetLoss={item.averageQoe.packetLoss} latency={item.averageQoe.latency} testId={item.id} />,
        };
      }),
    [finalTableData],
  );

  const timeRangeOptions = [
    {
      value: '-7d',
      label: '1 Week',
    },
    {
      value: '-30d',
      label: '1 Month',
    },
  ];

  const dropdownStyle = {
    option: provided => ({
      ...provided,
      color: 'black',
    }),
    control: provided => ({
      ...provided,
      width: 120,
    }),
  };

  return (
    <div className={classes.slaTestListContainer}>
      <div className={classes.itemContainer}>
        <div className={classes.flexContainer}>
          <div>
            <Typography className={classes.itemTitle}>SLA Tests</Typography>
          </div>
          <div>
            <Button className={classes.otherButton} variant="contained" disableElevation>
              <Typography className={classes.otherButtonText} noWrap>
                FILTER
              </Typography>
              <img src={FilterIcon} alt="columns" />
            </Button>
            <Button className={classes.otherButton} variant="contained" disableElevation>
              <Typography className={classes.otherButtonText} noWrap>
                COLUMNS
              </Typography>
              <img src={ColumnsIcon} alt="columns" />
            </Button>
            <Button className={classes.slaTestButton} variant="contained" color="primary" disableElevation onClick={handleToggle}>
              <Typography className={classes.slaTestButtonText} noWrap>
                CREATE SLA TEST
              </Typography>
              <AddIcon fontSize="small" />
            </Button>
          </div>
        </div>
        <div>
          <Typography className={classes.subTitleText}>Select sources for wich you want to view data.</Typography>
        </div>
        <div className={classes.tableContainer}>
          <Table onSelectedRowsUpdate={onSelectedRowsUpdate} columns={columns} data={data} />
        </div>
      </div>
      <div className={classes.itemContainer}>
        <div className={classes.timeRangeContainer}>
          <Typography className={classes.timeRangeText}>Time Range:</Typography>
          <Select label="Single select" styles={dropdownStyle} options={timeRangeOptions} defaultValue={timeRangeOptions[0]} onChange={e => setTimeRange(e.value)} />
        </div>
        <Tabs classes={{ root: classes.tabContainer, indicator: classes.indicator }} value={tab} onChange={handleTabChange} indicatorColor="primary">
          <Tab
            classes={{ selected: classes.selectedTab }}
            value={MetricTabValue.latency}
            label={<span className={classes.tableHeaderText}>LATENCY</span>}
            wrapped
            {...a11yProps(MetricTabValue.latency)}
          />
          <Tab
            classes={{ selected: classes.selectedTab }}
            value={MetricTabValue.packetLoss}
            label={<span className={classes.tableHeaderText}>PACKET LOSS</span>}
            wrapped
            {...a11yProps(MetricTabValue.packetLoss)}
          />
          <Tab
            classes={{ selected: classes.selectedTab }}
            value={MetricTabValue.goodput}
            label={<span className={classes.tableHeaderText}>GOODPUT</span>}
            wrapped
            {...a11yProps(MetricTabValue.goodput)}
          />
        </Tabs>
        <TabPanel value={tab} index={'packetLoss'}>
          <PacketLoss timeRange={timeRange} selectedRows={selectedRows} />
        </TabPanel>
        <TabPanel value={tab} index={'latency'}>
          <Latency timeRange={timeRange} selectedRows={selectedRows} />
        </TabPanel>
        <TabPanel value={tab} index={'goodput'}>
          <Goodput timeRange={timeRange} selectedRows={selectedRows} />
        </TabPanel>
      </div>
      <Backdrop style={{ color: '#fff', zIndex: 5 }} open={createToggle}>
        <CreateSLATest awsOrganizations={awsOrganizations} merakiOrganizations={merakiOrganizations} addSlaTest={addTest} popup={true} closeSlaTest={handleClose} />
      </Backdrop>
    </div>
  );
};
