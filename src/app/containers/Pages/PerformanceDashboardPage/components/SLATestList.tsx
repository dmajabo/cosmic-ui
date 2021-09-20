import { Backdrop, Button, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@material-ui/icons';
import React, { useMemo, useState } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import ColumnsIcon from '../icons/columns.svg';
import FilterIcon from '../icons/filter.svg';
import Table from './Table';
import { CreateSLATest } from './CreateSLATest';
import { Organization } from '../SharedTypes';
import { PacketLoss } from './PacketLoss';
import { Latency } from './Latency';

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

interface SLATestListProps {
  readonly rawData: RawData[];
  readonly organizations: Organization[];
  readonly addSlaTest: Function;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
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

export const SLATestList: React.FC<SLATestListProps> = ({ organizations, rawData, addSlaTest }) => {
  const classes = PerformanceDashboardStyles();

  const [createToggle, setCreateToggle] = React.useState(false);
  const [tab, setTab] = useState<string>('packetLoss');
  const [selectedRows, setSelectedRows] = useState<SelectedRow[]>([]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setCreateToggle(false);
  };
  const handleToggle = () => {
    setCreateToggle(!createToggle);
  };

  const addTest = (value: RawData) => {
    addSlaTest(value);
    handleClose();
  };

  const onSelectedRowsUpdate = (value: SelectedRow[]) => {
    setSelectedRows(value);
  };

  const columns = useMemo(
    () => [
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
    ],
    [],
  );
  const data = useMemo(
    () =>
      rawData.map(item => {
        return {
          name: item.name,
          sourceOrg: item.sourceOrg,
          sourceNetwork: item.sourceNetwork,
          sourceDevice: item.sourceDevice,
          destination: item.destination,
          averageQoe: (
            <div className={classes.flexContainer}>
              <div className={classes.averageQoeText}>
                <span>Packet Loss:</span>
                <span className={classes.packetLossValueText}>{`${item.averageQoe.packetLoss}%`}</span>
                <span>Latency:</span>
                <span className={classes.latencyValueText}>{`${item.averageQoe.latency}ms`}</span>
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
    [rawData],
  );

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
        <Tabs classes={{ root: classes.tabContainer, indicator: classes.indicator }} value={tab} onChange={handleTabChange} indicatorColor="primary">
          <Tab classes={{ selected: classes.selectedTab }} value="packetLoss" label={<span className={classes.tableHeaderText}>PACKET LOSS</span>} wrapped {...a11yProps('sla_tests')} />
          <Tab classes={{ selected: classes.selectedTab }} value="latency" label={<span className={classes.tableHeaderText}>LATENCY</span>} wrapped {...a11yProps('latency')} />
        </Tabs>
        <TabPanel value={tab} index={'packetLoss'}>
          <PacketLoss selectedRows={selectedRows} />
        </TabPanel>
        <TabPanel value={tab} index={'latency'}>
          <Latency selectedRows={selectedRows} />
        </TabPanel>
      </div>
      <Backdrop style={{ color: '#fff', zIndex: 5 }} open={createToggle}>
        <CreateSLATest organizations={organizations} addSlaTest={addTest} popup={true} closeSlaTest={handleClose} />
      </Backdrop>
    </div>
  );
};
