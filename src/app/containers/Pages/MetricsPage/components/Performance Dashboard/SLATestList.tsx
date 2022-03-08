import { Dialog } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import Table from './Table';
import { CreateSLATest } from './CreateSLATest';
import { Column, FinalTableData, SLATest, UpdateSLATestRequest, ColumnAccessor, AverageQoe as MetricAvgQoe, Organization, Vnet, Device, Tag } from 'lib/api/http/SharedTypes';
import { PacketLoss } from './PacketLoss';
import { Latency } from './Latency';
import AverageQoe from './AverageQoe';
import { Goodput } from './Goodput';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { createApiClient } from 'lib/api/http/apiClient';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import MatSelect from 'app/components/Inputs/MatSelect';
import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { filterIcon } from 'app/components/SVGIcons/filter';
import { isEmpty, uniqBy } from 'lodash';
import { useHistory } from 'react-router-dom';
import { LocationState } from '../..';
import ResizablePanel from 'app/components/Basic/PanelBar/ResizablePanel';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import { PanelHeader, PanelTitle } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/styles';
import produce from 'immer';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { IMapped_Segment } from 'lib/hooks/Topology/models';
import { FilterHeader, FilterTagsOption } from './FilterHeader';

interface SLATestListProps {
  readonly finalTableData: FinalTableData[];
  readonly addSlaTest: Function;
  readonly merakiOrganizations: Organization[];
  readonly networks: Vnet[];
  readonly devices: Device[];
  readonly deleteSlaTest: Function;
  readonly updateSlaTest: (submitData: UpdateSLATestRequest) => void;
  readonly siteSegments: ISegmentSegmentP[];
}

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

const LOCAL_STORAGE_SELECTED_TESTS_KEY = 'selectedSLATests';
const LOCAL_STORAGE_SELECTED_TAGS = 'selectedDeviceTags';
const LOCAL_STORAGE_SELECTED_SITE_SEGMENTS = 'selectedSites';

const isTestDataInvalid = (averageQoe: MetricAvgQoe) => isNaN(Number(averageQoe.packetLoss)) && isNaN(Number(averageQoe.latency));

const getDefaultSelectedTestId = (tests: FinalTableData[], selectedRows: FinalTableData[]): Record<string, boolean> => {
  const testsWithIndex: FinalTableData[] = tests.map((test, index) => ({ ...test, index: index }));
  if (isEmpty(testsWithIndex)) {
    return {};
  }
  if (isEmpty(selectedRows)) {
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
    const selectedRowsObject: Record<string, boolean> = {};
    selectedRowsObject[validTestIds[0].toString()] = true;
    return selectedRowsObject;
  } else {
    const selectedTests = selectedRows.map(test => test.id);
    const selectedRowsObject: Record<string, boolean> = testsWithIndex.reduce((acc, test) => {
      if (selectedTests.includes(test.id)) {
        acc[test.index.toString()] = true;
      } else {
        acc[test.index.toString()] = false;
      }
      return acc;
    }, {});
    return selectedRowsObject;
  }
};

const getSelectedTests = (tableData: FinalTableData[], history: any, devices: Device[]) => {
  if (!history || !history.location || !history.location.state) {
    const tests: FinalTableData[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_TESTS_KEY));
    if (isEmpty(tests)) {
      const validTests: FinalTableData[] = tableData
        .filter(test => {
          if (!isNaN(Number(test.averageQoe.packetLoss)) && !isNaN(Number(test.averageQoe.latency))) {
            if (Number(test.averageQoe.latency) > 0) {
              return true;
            }
          }
          return false;
        })
        .map(test => {
          return { ...test, isTestDataInvalid: isTestDataInvalid(test.averageQoe) };
        })
        .slice(0, 1);
      return validTests;
    } else {
      return tests;
    }
  } else {
    const state = history.location.state as LocationState;
    const networkId = devices.find(device => device.extId === state?.deviceId || '')?.networkId;
    const selectedTests: FinalTableData[] = tableData
      .filter(test => (test.sourceNetworkId === networkId && test.destination === state?.destination) || '')
      .map(test => {
        return { ...test, isTestDataInvalid: isTestDataInvalid(test.averageQoe) };
      });
    return selectedTests;
  }
};

const getTagOptions = (tableData: FinalTableData[]): FilterTagsOption[] => {
  const localTags: FilterTagsOption[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_TAGS));
  const networkTags: FilterTagsOption[] = uniqBy(
    tableData.reduce((acc, test) => {
      const newAcc = acc.concat(test.tags);
      return newAcc;
    }, []),
    'value',
  ).map(tag => ({ ...tag, selected: true }));
  if (isEmpty(localTags)) {
    return networkTags;
  }
  return networkTags.map(tag => {
    const localTag = localTags.find(localTag => localTag.value === tag.value);
    return localTag ? localTag : tag;
  });
};

const getSitesSegmentsOptions = (tableData: FinalTableData[]) => {
  const localSiteSegments: IMapped_Segment[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_SITE_SEGMENTS));
  const siteSegmentOptions: IMapped_Segment[] = uniqBy(
    tableData.reduce((acc, test) => {
      const newAcc = acc.concat(test.segments);
      return newAcc;
    }, []),
    'id',
  ).map((segment, index) => ({
    id: segment.id,
    extId: segment.extId,
    children: [],
    dataItem: segment,
    type: segment.segType,
    uiId: index.toString(),
    selected: true,
  }));
  if (isEmpty(localSiteSegments)) {
    return siteSegmentOptions;
  }
  return siteSegmentOptions.map(segment => {
    const localSiteSegment = localSiteSegments.find(localSiteSegment => localSiteSegment.id === segment.id);
    return localSiteSegment ? localSiteSegment : segment;
  });
};

const getFilteredTableData = (tableData: FinalTableData[], tagsOptions: FilterTagsOption[], siteSegmentsOptions: IMapped_Segment[]) => {
  const selectedTags = tagsOptions.filter(tag => tag.selected).map(tag => tag.value);
  const selectedSites = siteSegmentsOptions.filter(site => site.selected).map(site => site.id);
  return tableData.filter(test => test.tags.some(tag => selectedTags.includes(tag.value))).filter(test => test.segments.some(segment => selectedSites.includes(segment.id)));
};

export const SLATestList: React.FC<SLATestListProps> = ({ updateSlaTest, deleteSlaTest, networks, merakiOrganizations, finalTableData, addSlaTest, devices, siteSegments }) => {
  const classes = PerformanceDashboardStyles();
  const history = useHistory();
  const deleteTest = (testId: string) => deleteSlaTest(testId);

  const getTestDataToUpdate = async (testId: string) => {
    const responseData = await apiClient.getSLATest(testId);
    setTestDataToUpdate(responseData);
    handleUpdateTestToggle();
  };

  const [isSlaTestPanelOpen, setIsSlaTestPanelOpen] = useState<boolean>(false);
  const [tagsOptions, setTagsOptions] = useState<FilterTagsOption[]>(getTagOptions(finalTableData));
  const [sitesSegmentsOptions, setSitesSegmentsOptions] = useState<IMapped_Segment[]>(getSitesSegmentsOptions(finalTableData));
  const [filteredTableData, setFilteredTableData] = useState<FinalTableData[]>([]);
  const [panelWidth, setPanelWidth] = useState<number>(600);
  const [createToggle, setCreateToggle] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<FinalTableData[]>(getSelectedTests(finalTableData, history, devices));
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

  const onSelectedRowsUpdate = (value: FinalTableData[]) => {
    setSelectedRows(value);
    localStorage.setItem(
      LOCAL_STORAGE_SELECTED_TESTS_KEY,
      JSON.stringify(
        value.map(item => {
          const { averageQoe, ...rest } = item;
          return rest;
        }),
      ),
    );
  };

  const onSlaTestPanelOpen = () => setIsSlaTestPanelOpen(true);
  const onSlaTestPanelClose = () => setIsSlaTestPanelOpen(false);
  const onPanelWidthChange = (width: number) => setPanelWidth(width);

  const onTagClick = (index: number, selected: boolean) => {
    const newTagOptions = produce(tagsOptions, draft => {
      draft[index].selected = selected;
    });
    setTagsOptions(newTagOptions);
    localStorage.setItem(LOCAL_STORAGE_SELECTED_TAGS, JSON.stringify(newTagOptions));
  };

  const onSegmentClick = (index: number, selected: boolean) => {
    const newSiteSegmentsOptions = produce(sitesSegmentsOptions, draft => {
      draft[index].selected = selected;
    });
    setSitesSegmentsOptions(newSiteSegmentsOptions);
    localStorage.setItem(LOCAL_STORAGE_SELECTED_SITE_SEGMENTS, JSON.stringify(newSiteSegmentsOptions));
  };

  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: ColumnAccessor.name,
      },
      {
        Header: <FilterHeader title="TAGS" onItemClick={onTagClick} tagOptions={tagsOptions} />,
        accessor: ColumnAccessor.tags,
        Cell: props => {
          const tagNames = props.row.original.tags.map((tag: Tag) => tag.value);
          return tagNames.join(', ');
        },
      },
      {
        Header: <FilterHeader title="SITES" onItemClick={onSegmentClick} segmentOptions={sitesSegmentsOptions} />,
        accessor: ColumnAccessor.segments,
        Cell: props => {
          const siteNames = props.row.original.segments.map((segment: ISegmentSegmentP) => segment.name);
          return siteNames.join(', ');
        },
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
        Cell: props => (
          <AverageQoe
            updateTest={getTestDataToUpdate}
            deleteTest={deleteTest}
            packetLoss={props.row.original.averageQoe.packetLoss}
            latency={props.row.original.averageQoe.latency}
            testId={props.row.original.id}
          />
        ),
      },
    ],
    [finalTableData, tagsOptions, sitesSegmentsOptions],
  );

  useEffect(() => {
    if (!isEmpty(tagsOptions)) {
      setFilteredTableData(getFilteredTableData(finalTableData, tagsOptions, sitesSegmentsOptions));
    }
  }, [tagsOptions, finalTableData, sitesSegmentsOptions]);

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
      <Dialog fullWidth open={createToggle} style={{ zIndex: 5, maxHeight: '85vh', marginTop: '15vh' }}>
        <CreateSLATest networks={networks} merakiOrganizations={merakiOrganizations} addSlaTest={addTest} popup={true} closeSlaTest={handleClose} />
      </Dialog>
      <Dialog fullWidth open={updateTestToggle} style={{ zIndex: 5, maxHeight: '85vh', marginTop: '15vh', overflow: 'auto' }}>
        <CreateSLATest
          updateSlaTest={updateSlaTest}
          slaTestDataToUpdate={testDataToUpdate}
          isUpdateTest={true}
          networks={networks}
          merakiOrganizations={merakiOrganizations}
          popup={true}
          closeSlaTest={handleClose}
        />
      </Dialog>
      <ResizablePanel
        styles={{ position: 'fixed', right: 0, top: APP_HEADER_HEIGHT, height: '100vh', float: 'right' }}
        show={isSlaTestPanelOpen}
        panelWidth={panelWidth}
        onHidePanel={onSlaTestPanelClose}
        onPanelWidthChange={onPanelWidthChange}
      >
        <div className={classes.slaTestPanelContainer}>
          {/* <PanelHeader direction="column" align="unset">
            <PanelTitle>Filters</PanelTitle>
          </PanelHeader>
          <FilterGroup maxGroupHeight="unset" label="Site Segments" styles={{ margin: '0' }} defaultOpen={true}>
            <FilterSegmentsGroup data={sitesSegmentsOptions} onClick={onSegmentClick} />
          </FilterGroup>
          <FilterGroup maxGroupHeight="unset" label="Tags" styles={{ margin: '0' }} defaultOpen={true}>
            <FilterTagsGroup data={tagsOptions} onClick={onTagClick} />
          </FilterGroup> */}
          <PanelHeader direction="column" align="unset" margin="20px 0">
            <PanelTitle>SLA Tests</PanelTitle>
          </PanelHeader>
          <Table onSelectedRowsUpdate={onSelectedRowsUpdate} columns={columns} data={filteredTableData} selectedRowsObject={getDefaultSelectedTestId(finalTableData, selectedRows)} />
        </div>
      </ResizablePanel>
    </>
  );
};
