import React, { useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { CustomizationTile, CustomizationTabProps } from './CustomizationTile';
import DesignIcon from '../../icons/metrics explorer/design';
import DimensionsIcon from '../../icons/metrics explorer/dimensions';
import MetricsIcon from '../../icons/metrics explorer/metrics';
import TimeIcon from '../../icons/metrics explorer/time';
import DataSourceIcon from '../../icons/metrics explorer/dataSource';
import AddIcon from '../../icons/metrics explorer/add';
import EditIcon from '../../icons/metrics explorer/edit';
import CloseIcon from '../../icons/metrics explorer/close';
import NetworkIcon from '../../icons/metrics explorer/dimensions-network';
import AwsIcon from '../../icons/metrics explorer/dimensions-aws';
import MerakiIcon from '../../icons/metrics explorer/dimensions-meraki';
import Box from '@mui/material/Box';
import produce from 'immer';
import { DimensionOptions, Dimensions } from './Dimensions';
import { DataSource, DataSourceOptions } from './DataSource';
import { MetricsChart } from './MetricsChart';
import { ColumnAccessor, MetricsExplorerTableData } from 'lib/api/http/SharedTypes';
import { Modal, Tab, Tabs } from '@mui/material';
import { LookbackLabel, LookbackSelectOption, LookbackTimeTab, LookbackValue } from './LookbackTimeTab';
import { CustomTimeRangeLabel, CustomTimeRangeSelectOption, CustomTimeTab } from './CustomTimeTab';
import { DataUnitDropdown, DataUnitLabel, DataUnitValue, DataUnitSelectOption } from './DataUnitDropdown';
import { ChartTypeValue, ChartTypeDropdown, ChartTypeLabel } from './ChartTypeDropdown';
import LineChartIcon from '../../icons/metrics explorer/chartType/lineChart';

//TODO: Remove this once API is integrated
const DUMMY_DIMENSION_DATA: DimensionOptions[] = [
  {
    title: 'Network & Traffic Topology',
    icon: <NetworkIcon />,
    source: [
      { label: 'Interface', value: ColumnAccessor.interfaceSource },
      { label: 'Connectivity Type', value: ColumnAccessor.connectivityTypeSource },
      { label: 'Network Boundary', value: ColumnAccessor.networkBoundarySource },
      { label: 'Provider', value: ColumnAccessor.providerSource },
      { label: 'Traffic Origination', value: ColumnAccessor.trafficOriginationSource },
      { label: 'Interface Capacity', value: ColumnAccessor.interfaceCapacitySource },
      { label: 'VLAN', value: ColumnAccessor.vlanSource },
      { label: 'MAC Address', value: ColumnAccessor.macAddressSource },
    ],
    destination: [
      { label: 'Interface', value: ColumnAccessor.interfaceDestination },
      { label: 'Connectivity Type', value: ColumnAccessor.connectivityTypeDestination },
      { label: 'Network Boundary', value: ColumnAccessor.networkBoundaryDestination },
      { label: 'Provider', value: ColumnAccessor.providerDestination },
      { label: 'Traffic Origination', value: ColumnAccessor.trafficOriginationDestination },
      { label: 'Interface Capacity', value: ColumnAccessor.interfaceCapacityDestination },
      { label: 'VLAN', value: ColumnAccessor.vlanDestination },
      { label: 'MAC Address', value: ColumnAccessor.macAddressDestination },
    ],
  },
  {
    title: 'Dimension 2',
    icon: <NetworkIcon />,
    source: [
      { label: 'Interface', value: ColumnAccessor.interfaceSource },
      { label: 'Connectivity Type', value: ColumnAccessor.connectivityTypeSource },
      { label: 'Network Boundary', value: ColumnAccessor.networkBoundarySource },
      { label: 'Provider', value: ColumnAccessor.providerSource },
      { label: 'Traffic Origination', value: ColumnAccessor.trafficOriginationSource },
      { label: 'Interface Capacity', value: ColumnAccessor.interfaceCapacitySource },
      { label: 'VLAN', value: ColumnAccessor.vlanSource },
      { label: 'MAC Address', value: ColumnAccessor.macAddressSource },
    ],
    destination: [
      { label: 'Interface', value: ColumnAccessor.interfaceDestination },
      { label: 'Connectivity Type', value: ColumnAccessor.connectivityTypeDestination },
      { label: 'Network Boundary', value: ColumnAccessor.networkBoundaryDestination },
      { label: 'Provider', value: ColumnAccessor.providerDestination },
      { label: 'Traffic Origination', value: ColumnAccessor.trafficOriginationDestination },
      { label: 'Interface Capacity', value: ColumnAccessor.interfaceCapacityDestination },
      { label: 'VLAN', value: ColumnAccessor.vlanDestination },
      { label: 'MAC Address', value: ColumnAccessor.macAddressDestination },
    ],
  },
];

const DUMMY_DATA_SOURCE_OPTIONS: DataSourceOptions[] = [
  {
    title: 'Amazon Web Service',
    icon: <AwsIcon />,
    options: ['AWS US East (Northern Virginia) Region', 'AWS US West (Northern California) Region'],
  },
  {
    title: 'Cisco Meraki Device Metrics',
    icon: <MerakiIcon />,
    options: ['Office 1', 'Office 2', 'Office 3', 'Office 4', 'Office 5', 'Office 6', 'Office 7', 'Office 8', 'Office 9', 'Office 10', 'Office 11', 'Office 12'],
  },
];

const DUMMY_METRICS_TABLE_DATA: MetricsExplorerTableData[] = [
  {
    average: 10000,
    ninetyFifthPercentile: 1000,
    max: 1000,
    lastDatapoint: 10000,
    interfaceSource: 'interface source',
    interfaceDestination: 'interface dest',
    connectivityTypeSource: 'conn type source',
    connectivityTypeDestination: 'conn type dest',
    networkBoundarySource: 'net boundary source',
    networkBoundaryDestination: 'net boundary dest',
    providerSource: 'provider source',
    providerDestination: 'provider dest',
    trafficOriginationSource: 'traffic ori source',
    trafficOriginationDestination: 'traffic ori dest',
    interfaceCapacitySource: 'int cap source',
    interfaceCapacityDestination: 'int cap dest',
    vlanSource: 'vlan source',
    vlanDestination: 'vlan dest',
    macAddressSource: 'mac add source',
    macAddressDestination: 'mac add dest',
  },
  {
    average: 5000,
    ninetyFifthPercentile: 200,
    max: 300,
    lastDatapoint: 15000,
    interfaceSource: 'abc',
    interfaceDestination: 'interface dest 2',
    connectivityTypeSource: 'conn type source 2',
    connectivityTypeDestination: 'conn type dest 2',
    networkBoundarySource: 'net boundary source 2',
    networkBoundaryDestination: 'net boundary dest 2',
    providerSource: 'provider source 2',
    providerDestination: 'provider dest 2',
    trafficOriginationSource: 'traffic ori source 2',
    trafficOriginationDestination: 'traffic ori dest 2',
    interfaceCapacitySource: 'int cap source 2',
    interfaceCapacityDestination: 'int cap dest 2',
    vlanSource: 'vlan source 2',
    vlanDestination: 'vlan dest 2',
    macAddressSource: 'mac add source 2',
    macAddressDestination: 'mac add dest 2',
  },
];

const Dummy_selected_dimensions: DimensionOptions[] = [
  {
    title: 'Network & Traffic Topology',
    icon: <NetworkIcon />,
    source: [
      { label: 'Interface', value: ColumnAccessor.interfaceSource },
      { label: 'Connectivity Type', value: ColumnAccessor.connectivityTypeSource },
      { label: 'MAC Address', value: ColumnAccessor.macAddressSource },
    ],
    destination: [
      { label: 'Network Boundary', value: ColumnAccessor.networkBoundaryDestination },
      { label: 'Traffic Origination', value: ColumnAccessor.trafficOriginationDestination },
    ],
  },
];

enum ModalName {
  Dimensions = 'Dimensions',
  DataSource = 'Data Source',
}

enum TimeMetricTabValue {
  Lookback = 'Lookback',
  Custom = 'Custom',
}

interface TabPanelProps {
  readonly name: string;
  readonly value: string;
}

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

export interface SelectChartTypeOption {
  readonly value: ChartTypeValue;
  readonly label: ChartTypeLabel;
  readonly icon: React.ReactNode;
}

export const getDimensionCount = (dimensions: DimensionOptions[]) => {
  return dimensions.reduce((accu, nextValue) => {
    const subDimensionCount = nextValue.source.length + nextValue.destination.length;
    return accu + subDimensionCount;
  }, 0);
};

export const getDataSourceCount = (dataSources: DataSourceOptions[]) => {
  return dataSources.reduce((acc, nextValue) => acc + nextValue.options.length, 0);
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value, name }) => {
  return (
    <div role="tabpanel" hidden={value !== name} id={`simple-tabpanel-${name}`} aria-labelledby={`simple-tab-${name}`}>
      {children}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const INITIAL_LOOKBACK_TIME_RANGE_VALUE: LookbackSelectOption = {
  label: LookbackLabel.fiveMinutes,
  value: LookbackValue.fiveMinutes,
};

const INITIAL_SHOW_TIME_RANGE_VALUE: CustomTimeRangeSelectOption = {
  label: CustomTimeRangeLabel.oneDay,
  value: LookbackValue.oneDay,
};

const INITIAL_DATA_UNIT_VALUE: DataUnitSelectOption = {
  label: DataUnitLabel.bits,
  value: DataUnitValue.bits,
};

const INITIAL_CHART_TYPE_VALUE: SelectChartTypeOption = {
  label: ChartTypeLabel.lineChart,
  value: ChartTypeValue.lineChart,
  icon: LineChartIcon,
};

export const MetricsExplorer: React.FC = () => {
  const classes = AnalyticsStyles();

  const [dimensions, setDimensions] = useState<DimensionOptions[]>(Dummy_selected_dimensions);
  const [dataSources, setDataSources] = useState<DataSourceOptions[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalName, setModalName] = useState<ModalName>(ModalName.Dimensions);
  const [timeTab, setTimeTab] = useState<TimeMetricTabValue>(TimeMetricTabValue.Lookback);
  const [selectedLookbackTimeRange, setSelectedLookbackTimeRange] = useState<LookbackSelectOption>(INITIAL_LOOKBACK_TIME_RANGE_VALUE);
  const [selectedCustomFromDate, setSelectedCustomFromDate] = useState<string>('');
  const [selectedCustomToDate, setSelectedCustomToDate] = useState<string>('');
  const [selectedShowTimeRange, setSelectedShowTimeRange] = useState<CustomTimeRangeSelectOption>(INITIAL_SHOW_TIME_RANGE_VALUE);
  const [dataUnit, setDataUnit] = useState<DataUnitSelectOption>(INITIAL_DATA_UNIT_VALUE);
  const [chartType, setChartType] = useState<SelectChartTypeOption>(INITIAL_CHART_TYPE_VALUE);

  const handleDimensionModalOpen = () => {
    setModalName(ModalName.Dimensions);
    setIsModalOpen(true);
  };
  const handleDataSourceModalOpen = () => {
    setModalName(ModalName.DataSource);
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);

  const addDimensions = (dimensions: DimensionOptions[]) => setDimensions(dimensions);

  const addDataSources = (dataSources: DataSourceOptions[]) => setDataSources(dataSources);

  const removeDimension = (dimensionName: string, dimensionType: string, dimensionItem: string) => {
    const selectedDimension = dimensions.find(dimension => dimension.title === dimensionName);
    if (selectedDimension) {
      const newDimensions = produce(dimensions, draft => {
        const selectedDimension = draft.find(dimension => dimension.title === dimensionName);
        if (dimensionType === 'source') {
          selectedDimension.source = selectedDimension.source.filter(item => item.value !== dimensionItem);
        } else {
          selectedDimension.destination = selectedDimension.destination.filter(item => item.value !== dimensionItem);
        }
      });
      setDimensions(newDimensions);
    }
  };

  const removeDataSource = (dataSourceName: string) => {
    const newDataSources = dataSources.filter(dataSource => dataSource.title !== dataSourceName);
    setDataSources(newDataSources);
  };

  const handleTimeTabChange = (event, newValue: TimeMetricTabValue) => setTimeTab(newValue);

  const handleLookbackTimeRangeChange = (value: LookbackSelectOption) => setSelectedLookbackTimeRange(value);

  const handleCustomFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedCustomFromDate(event.target.value);

  const handleCustomToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedCustomToDate(event.target.value);

  const handleTimeRangeChange = (value: CustomTimeRangeSelectOption) => setSelectedShowTimeRange(value);

  const handleDataUnitChange = (value: DataUnitSelectOption) => setDataUnit(value);

  const handleChartTypeChange = (value: SelectChartTypeOption) => setChartType(value);

  const customizationtabOptions: CustomizationTabProps[] = [
    {
      img: <DesignIcon />,
      title: 'Design',
      content: <ChartTypeDropdown chartType={chartType} handleChartTypeChange={handleChartTypeChange} />,
    },
    {
      img: <DimensionsIcon />,
      title: 'Dimensions',
      description: `${getDimensionCount(dimensions)}`,
      operationImage: getDimensionCount(dimensions) > 0 ? EditIcon : AddIcon,
      showModal: handleDimensionModalOpen,
      operationName: getDimensionCount(dimensions) > 0 ? 'edit dimensions' : 'add dimensions',
      content:
        getDimensionCount(dimensions) === 0 ? (
          <div className={classes.tabContentText}>No dimensions added. To add dimensions click the “Add” button on top.</div>
        ) : (
          <div>
            {dimensions.map(dimension =>
              dimension.source.map(item => {
                return (
                  <div key={item.value} className={`${classes.whiteBorderBox} ${classes.sourceText}`}>
                    <div className={classes.tabTitleContainer}>
                      <div>
                        <span>
                          {`Source: `}
                          <b>{item.label}</b>
                        </span>
                      </div>
                      <div>
                        <div className={classes.removeDimension} onClick={() => removeDimension(dimension.title, 'source', item.value)}>
                          {CloseIcon}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }),
            )}
            {dimensions.map(dimension =>
              dimension.destination.map(item => {
                return (
                  <div key={item.value} className={`${classes.whiteBorderBox} ${classes.destinationText}`}>
                    <div className={classes.tabTitleContainer}>
                      <div>
                        <span>
                          {`Destination: `}
                          <b>{item.label}</b>
                        </span>
                      </div>
                      <div>
                        <div className={classes.removeDimension} onClick={() => removeDimension(dimension.title, 'destination', item.value)}>
                          {CloseIcon}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }),
            )}
          </div>
        ),
    },
    {
      img: <MetricsIcon />,
      title: 'Metrics',
      content: <DataUnitDropdown dataUnit={dataUnit} handleDataUnitChange={handleDataUnitChange} />,
    },
    {
      img: <TimeIcon />,
      title: 'Time',
      content: (
        <>
          <Tabs classes={{ root: classes.timeTabContainer, indicator: classes.indicator }} value={timeTab} onChange={handleTimeTabChange} indicatorColor="primary">
            <Tab
              classes={{ selected: classes.selectedTab }}
              value={TimeMetricTabValue.Lookback}
              label={<span className={classes.tableHeaderText}>LOOKBACK</span>}
              wrapped
              disableRipple
              {...a11yProps(TimeMetricTabValue.Lookback)}
            />
            <Tab
              classes={{ selected: classes.selectedTab }}
              value={TimeMetricTabValue.Custom}
              label={<span className={classes.tableHeaderText}>CUSTOM</span>}
              wrapped
              disableRipple
              {...a11yProps(TimeMetricTabValue.Custom)}
            />
          </Tabs>
          <TabPanel value={timeTab} name={TimeMetricTabValue.Lookback}>
            <LookbackTimeTab timeRange={selectedLookbackTimeRange} handleTimeRangeChange={handleLookbackTimeRangeChange} />
          </TabPanel>
          <TabPanel value={timeTab} name={TimeMetricTabValue.Custom}>
            <CustomTimeTab
              fromDate={selectedCustomFromDate}
              toDate={selectedCustomToDate}
              onFromDateChange={handleCustomFromDateChange}
              onToDateChange={handleCustomToDateChange}
              timeRange={selectedShowTimeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </TabPanel>
        </>
      ),
    },
    {
      img: <DataSourceIcon />,
      title: 'Data Source',
      description: `${getDataSourceCount(dataSources)} of ${getDataSourceCount(DUMMY_DATA_SOURCE_OPTIONS)}`,
      operationImage: getDataSourceCount(dataSources) > 0 ? EditIcon : AddIcon,
      showModal: handleDataSourceModalOpen,
      operationName: getDataSourceCount(dataSources) > 0 ? 'edit data sources' : 'add data sources',
      content:
        getDataSourceCount(dataSources) === 0 ? (
          <div className={classes.tabContentText}>No data sources added. To add data sources click the “Add” button on top.</div>
        ) : (
          <div>
            {dataSources.map(dataSource => (
              <div key={dataSource.title} className={`${classes.whiteBorderBox}`}>
                <div className={classes.tabTitleContainer}>
                  <div>
                    <span>
                      <div className={classes.dataSourceDropdownImg}>{dataSource.icon}</div>
                      {dataSource.title}
                    </span>
                    <span className={classes.countText}>{dataSource.options.length}</span>
                  </div>
                  <div>
                    <div className={classes.removeDimension} onClick={() => removeDataSource(dataSource.title)}>
                      {CloseIcon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
    },
  ];

  return (
    <div className={classes.metricsExplorerContainer}>
      <div className={classes.leftBox}>
        <MetricsChart dimensions={dimensions} tableData={DUMMY_METRICS_TABLE_DATA} lookback={selectedLookbackTimeRange.label} dataUnit={dataUnit.label} />
      </div>
      <div className={classes.rightBox}>
        <div className={classes.rightContainerTitle}>Metrics Customization</div>
        <div className={classes.rightBoxContent}>
          {customizationtabOptions.map(item => (
            <CustomizationTile
              key={item.title}
              img={item.img}
              title={item.title}
              description={item.description}
              operationImage={item.operationImage}
              operationName={item.operationName}
              showModal={item.showModal}
              content={item.content}
            />
          ))}
        </div>
      </div>
      <Modal
        sx={{
          backgroundColor: 'rgba(5,20,58,0.1)',
        }}
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.popupContainer}>
          {modalName === ModalName.Dimensions ? (
            <Dimensions dimensions={dimensions} addDimensions={addDimensions} dimensionData={DUMMY_DIMENSION_DATA} closePopup={handleModalClose} />
          ) : (
            <DataSource dataSources={dataSources} addDataSources={addDataSources} dataSourcesData={DUMMY_DATA_SOURCE_OPTIONS} closePopup={handleModalClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
};
