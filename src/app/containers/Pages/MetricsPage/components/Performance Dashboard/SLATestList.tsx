import { Backdrop, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext, useMemo, useState } from 'react';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import Table, { Data } from './Table';
import { CreateSLATest } from './CreateSLATest';
import { Column, FinalTableData, SLATest, UpdateSLATestRequest, ColumnAccessor, AverageQoe as MetricAvgQoe, Organization, Vnet } from 'lib/api/http/SharedTypes';
import { PacketLoss } from './PacketLoss';
import { Latency } from './Latency';
import AverageQoe from './AverageQoe';
import { Goodput } from './Goodput';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { createApiClient } from 'lib/api/http/apiClient';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ContainerWithMetrics } from 'app/containers/Pages/TopologyPage/TopoMapV2/styles';
import ResizablePanel from 'app/components/Basic/PanelBar/ResizablePanel';
import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { filterIcon } from 'app/components/SVGIcons/filter';
import CloseIcon from '../../icons/performance dashboard/close';

interface SLATestListProps {
  readonly finalTableData: FinalTableData[];
  readonly addSlaTest: Function;
  readonly merakiOrganizations: Organization[];
  readonly networks: Vnet[];
  readonly deleteSlaTest: Function;
  readonly updateSlaTest: (submitData: UpdateSLATestRequest) => void;
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
    Header: 'AVERAGE QOE',
    accessor: ColumnAccessor.averageQoe,
  },
];

const getDefaultSelectedTestId = (tests: FinalTableData[]) => {
  const testsWithIndex = tests.map((test, index) => ({ ...test, index: index }));
  const validTestIds = testsWithIndex
    .filter(test => {
      if (!isNaN(Number(test.averageQoe.packetLoss)) && !isNaN(Number(test.averageQoe.latency))) {
        if (Number(test.averageQoe.latency) > 0) {
          return true;
        }
      }
      return false;
    })
    .map(test => test.index);
  return validTestIds[0];
};

export const SLATestList: React.FC<SLATestListProps> = ({ updateSlaTest, deleteSlaTest, networks, merakiOrganizations, finalTableData, addSlaTest }) => {
  const classes = PerformanceDashboardStyles();

  const [isSlaTestPanelOpen, setIsSlaTestPanelOpen] = useState<boolean>(false);
  const [createToggle, setCreateToggle] = React.useState<boolean>(false);
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

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);

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

  const isTestDataInvalid = (averageQoe: MetricAvgQoe) => isNaN(Number(averageQoe.packetLoss)) && isNaN(Number(averageQoe.latency));

  const onSlaTestPanelOpen = () => setIsSlaTestPanelOpen(true);
  const onSlaTestPanelClose = () => setIsSlaTestPanelOpen(false);

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
          isTestDataInvalid: isTestDataInvalid(item.averageQoe),
        };
      }),
    [finalTableData],
  );

  const timeRangeOptions = [
    {
      value: '-1d',
      label: 'Last day',
    },
    {
      value: '-7d',
      label: 'Last week',
    },
  ];

  return (
    <>
      <div className={classes.endFlexContainer}>
        <div>
          <PrimaryButton height="50px" label="CREATE SLA TEST" icon={addIcon} onClick={handleToggle} />
          <SecondaryButtonwithEvent styles={{ marginLeft: 10 }} height="50px" label="SELECT TESTS" icon={filterIcon} onClick={onSlaTestPanelOpen} />
          <MatSelect
            id="SLATestTimePeriod"
            label="Show"
            labelStyles={{ margin: 'auto 10px auto 0' }}
            value={timeRangeOptions.find(time => time.value === timeRange)}
            options={timeRangeOptions}
            onChange={e => setTimeRange(e.value)}
            renderValue={(v: any) => v.label}
            renderOption={(v: any) => v.label}
            styles={{ height: '50px', minHeight: '50px', margin: '0 0 0 10px', width: 'auto', display: 'inline-flex', alignItems: 'center' }}
            selectStyles={{ height: '50px', width: 'auto', minWidth: '240px', border: '1px solid transparent' }}
          />
        </div>
      </div>
      <PacketLoss timeRange={timeRange} selectedRows={selectedRows} networks={networks} />
      <Latency timeRange={timeRange} selectedRows={selectedRows} networks={networks} />
      <Goodput timeRange={timeRange} selectedRows={selectedRows} networks={networks} />
      <Backdrop style={{ color: '#fff', zIndex: 5 }} open={createToggle}>
        <CreateSLATest networks={networks} merakiOrganizations={merakiOrganizations} addSlaTest={addTest} popup={true} closeSlaTest={handleClose} />
      </Backdrop>
      <Backdrop style={{ color: '#fff', zIndex: 5 }} open={updateTestToggle}>
        <CreateSLATest
          updateSlaTest={updateSlaTest}
          slaTestDataToUpdate={testDataToUpdate}
          isUpdateTest={true}
          networks={networks}
          merakiOrganizations={merakiOrganizations}
          popup={true}
          closeSlaTest={handleClose}
        />
      </Backdrop>
      <Dialog open={isSlaTestPanelOpen} maxWidth="md" fullWidth>
        <DialogTitle>
          <div className={classes.flexContainer}>
            <div>
              <span className={classes.itemTitle}>SLA Tests</span>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={onSlaTestPanelClose}>
              <CloseIcon />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Table onSelectedRowsUpdate={onSelectedRowsUpdate} columns={columns} data={data} defaultSelectedTestId={getDefaultSelectedTestId(finalTableData)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
