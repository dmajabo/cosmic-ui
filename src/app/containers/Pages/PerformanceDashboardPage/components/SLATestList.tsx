import { Backdrop, Button, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@material-ui/icons';
import React, { useMemo, useState } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import ColumnsIcon from '../icons/columns.svg';
import FilterIcon from '../icons/filter.svg';
import Table from './Table';
import { CreateSLATest } from './CreateSLATest';
import { Organization, Column, FinalTableData } from '../SharedTypes';
import { PacketLoss } from './PacketLoss';
import { Latency } from './Latency';
import Select from 'react-select';
import { KeyValue } from '..';

interface SLATestListProps {
  readonly finalTableData: FinalTableData[];
  readonly addSlaTest: Function;
  readonly organizations: Organization[];
  readonly packetLossData: KeyValue;
  readonly latencyData: KeyValue;
}

interface TabPanelProps {
  readonly children?: React.ReactNode;
  readonly index: string;
  readonly value: string;
}

interface SelectedRow {
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly averageQoe: JSX.Element;
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

export const SLATestList: React.FC<SLATestListProps> = ({ latencyData, packetLossData, organizations, finalTableData, addSlaTest }) => {
  const classes = PerformanceDashboardStyles();

  const [createToggle, setCreateToggle] = React.useState<boolean>(false);
  const [tab, setTab] = useState<string>('packetLoss');
  const [selectedRows, setSelectedRows] = useState<SelectedRow[]>([]);
  const [timeRange, setTimeRange] = useState<string>('-7d');

  const handleTabChange = (event, newValue: string) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setCreateToggle(false);
  };
  const handleToggle = () => {
    setCreateToggle(!createToggle);
  };

  const addTest = (value: FinalTableData) => {
    addSlaTest(value);
    handleClose();
  };

  const onSelectedRowsUpdate = (value: SelectedRow[]) => {
    setSelectedRows(value);
  };

  console.log(packetLossData);
  console.log(latencyData);

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
          averageQoe: (
            <div className={classes.flexContainer}>
              <div className={classes.averageQoeText}>
                <span>Packet Loss:</span>
                <span className={classes.packetLossValueText}>{`${packetLossData[item.id] || 999}%`}</span>
                <span>Latency:</span>
                <span className={classes.latencyValueText}>{`${Number(latencyData[item.id]).toFixed(2) || 999}ms`}</span>
              </div>
              <div>
                <IconButton aria-controls="widget-menu" aria-haspopup="true">
                  <MoreVertIcon />
                </IconButton>
              </div>
            </div>
          ),
        };
      }),
    [finalTableData, packetLossData, latencyData],
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
          <Select
            label="Single select"
            styles={dropdownStyle}
            options={timeRangeOptions}
            defaultValue={timeRangeOptions[0]}
            onChange={e => {
              setTimeRange(e.value);
            }}
          />
        </div>
        <Tabs classes={{ root: classes.tabContainer, indicator: classes.indicator }} value={tab} onChange={handleTabChange} indicatorColor="primary">
          <Tab classes={{ selected: classes.selectedTab }} value="packetLoss" label={<span className={classes.tableHeaderText}>PACKET LOSS</span>} wrapped {...a11yProps('sla_tests')} />
          <Tab classes={{ selected: classes.selectedTab }} value="latency" label={<span className={classes.tableHeaderText}>LATENCY</span>} wrapped {...a11yProps('latency')} />
        </Tabs>
        <TabPanel value={tab} index={'packetLoss'}>
          <PacketLoss timeRange={timeRange} selectedRows={selectedRows} />
        </TabPanel>
        <TabPanel value={tab} index={'latency'}>
          <Latency timeRange={timeRange} selectedRows={selectedRows} />
        </TabPanel>
      </div>
      <Backdrop style={{ color: '#fff', zIndex: 5 }} open={createToggle}>
        <CreateSLATest organizations={organizations} addSlaTest={addTest} popup={true} closeSlaTest={handleClose} />
      </Backdrop>
    </div>
  );
};
