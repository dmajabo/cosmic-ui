import { Backdrop, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import ColumnsIcon from '../icons/columns.svg';
import Table, { Data } from './Table';
import { CreateSLATest } from './CreateSLATest';
import { Organization, Column, FinalTableData, SLATest, UpdateSLATestRequest, ColumnAccessor } from 'lib/api/http/SharedTypes';
import { PacketLoss } from './PacketLoss';
import { Latency } from './Latency';
import Select from 'react-select';
import AverageQoe from './AverageQoe';
import { Goodput } from './Goodput';
import { MetricTabValue } from '../../DashboardPage/enum/MetricTabValue';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { createApiClient } from 'lib/api/http/apiClient';
import { CheckboxData } from '../../AnalyticsPage/components/Dimensions';
import { Checkbox, FormControlLabel, FormGroup, Popover } from '@mui/material';

interface SLATestListProps {
  readonly finalTableData: FinalTableData[];
  readonly addSlaTest: Function;
  readonly merakiOrganizations: Organization[];
  readonly awsOrganizations: Organization[];
  readonly deleteSlaTest: Function;
  readonly updateSlaTest: (submitData: UpdateSLATestRequest) => void;
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
    accessor: ColumnAccessor.name,
  },
  {
    Header: 'SOURCE ORGANIZATION',
    accessor: ColumnAccessor.sourceOrg,
  },
  {
    Header: 'SOURCE NETWORK',
    accessor: ColumnAccessor.sourceNetwork,
  },
  {
    Header: 'SOURCE DEVICE',
    accessor: ColumnAccessor.sourceDevice,
  },
  {
    Header: 'DESTINATION',
    accessor: ColumnAccessor.destination,
  },
  {
    Header: 'DESCRIPTION',
    accessor: ColumnAccessor.description,
  },
  {
    Header: 'AVERAGE QOE',
    accessor: ColumnAccessor.averageQoe,
  },
];

export const SLATestList: React.FC<SLATestListProps> = ({ updateSlaTest, deleteSlaTest, awsOrganizations, merakiOrganizations, finalTableData, addSlaTest }) => {
  const classes = PerformanceDashboardStyles();

  const [createToggle, setCreateToggle] = React.useState<boolean>(false);
  const [tab, setTab] = useState<string>(MetricTabValue.latency);
  const [selectedRows, setSelectedRows] = useState<Data[]>([]);
  const [timeRange, setTimeRange] = useState<string>('-7d');
  const [testDataToUpdate, setTestDataToUpdate] = useState<SLATest>({
    testId: '',
    name: '',
    sourceOrgId: '',
    sourceNwExtId: '',
    destination: '',
    interface: '',
    description: '',
  });
  const [updateTestToggle, setUpdateTestToggle] = useState<boolean>(false);
  const [columnCheckboxData, setColumnCheckboxData] = useState<CheckboxData>({});
  const [selectedColumns, setSelectedColumns] = useState<Column[]>([]);
  const [columnAnchorEl, setColumnAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleColmunsClick = (event: React.MouseEvent<HTMLButtonElement>) => setColumnAnchorEl(event.currentTarget);

  const handleColumnsClose = () => setColumnAnchorEl(null);

  const isColumnsPopoverOpen = Boolean(columnAnchorEl);
  const columnsPopoverId = isColumnsPopoverOpen ? 'columns-popover' : undefined;

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.idToken!);

  const handleTabChange = (event, newValue: string) => setTab(newValue);

  const handleClose = () => {
    setCreateToggle(false);
    setUpdateTestToggle(false);
  };

  const handleToggle = () => setCreateToggle(!createToggle);

  const handleUpdateTestToggle = () => setUpdateTestToggle(!updateTestToggle);

  const addTest = (value: FinalTableData) => {
    addSlaTest(value);
  };

  const onSelectedRowsUpdate = (value: Data[]) => setSelectedRows(value);

  const deleteTest = (testId: string) => deleteSlaTest(testId);

  const getTestDataToUpdate = async (testId: string) => {
    const responseData = await apiClient.getSLATest(testId);
    setTestDataToUpdate(responseData);
    handleUpdateTestToggle();
  };

  useEffect(() => {
    const initialCheckboxData: CheckboxData = columns.reduce((accu, nextValue) => {
      nextValue.accessor === ColumnAccessor.description ? (accu[nextValue.accessor] = false) : (accu[nextValue.accessor] = true);
      return accu;
    }, {});
    setColumnCheckboxData(initialCheckboxData);
  }, []);

  useEffect(() => {
    const newSelectedColumns = columns.filter(item => columnCheckboxData[item.accessor]);
    setSelectedColumns(newSelectedColumns);
  }, [columnCheckboxData]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnCheckboxData({
      ...columnCheckboxData,
      [event.target.name]: event.target.checked,
    });
  };

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
          description: item.description,
          averageQoe: <AverageQoe updateTest={getTestDataToUpdate} deleteTest={deleteTest} packetLoss={item.averageQoe.packetLoss} latency={item.averageQoe.latency} testId={item.id} />,
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
            <Button aria-describedby={columnsPopoverId} className={classes.otherButton} variant="contained" onClick={handleColmunsClick} disableElevation>
              <Typography className={classes.otherButtonText} noWrap>
                COLUMNS
              </Typography>
              <img src={ColumnsIcon} alt="columns" />
            </Button>
            <Popover
              id={columnsPopoverId}
              open={isColumnsPopoverOpen}
              onClose={handleColumnsClose}
              anchorEl={columnAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <FormGroup className={classes.popoverContainer}>
                {columns
                  .filter(column => column.accessor !== ColumnAccessor.name)
                  .map(item => (
                    <FormControlLabel
                      key={item.accessor}
                      className={classes.popoverItem}
                      control={<Checkbox checked={columnCheckboxData[item.accessor]} onChange={handleCheckboxChange} name={item.accessor} />}
                      label={<span className={classes.popoverText}>{item.Header}</span>}
                    />
                  ))}
              </FormGroup>
            </Popover>
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
          <Table onSelectedRowsUpdate={onSelectedRowsUpdate} columns={selectedColumns} data={data} />
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
      <Backdrop style={{ color: '#fff', zIndex: 5 }} open={updateTestToggle}>
        <CreateSLATest
          updateSlaTest={updateSlaTest}
          slaTestDataToUpdate={testDataToUpdate}
          isUpdateTest={true}
          awsOrganizations={awsOrganizations}
          merakiOrganizations={merakiOrganizations}
          popup={true}
          closeSlaTest={handleClose}
        />
      </Backdrop>
    </div>
  );
};
