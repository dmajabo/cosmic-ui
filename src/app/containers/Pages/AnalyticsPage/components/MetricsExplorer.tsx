import React, { useState } from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import { CustomizationTile, CustomizationTabProps } from './CustomizationTile';
import DesignIcon from '../icons/metrics explorer/design.svg';
import DimensionsIcon from '../icons/metrics explorer/dimensions.svg';
import MetricsIcon from '../icons/metrics explorer/metrics.svg';
import TimeIcon from '../icons/metrics explorer/time.svg';
import DataSourceIcon from '../icons/metrics explorer/dataSource.svg';
import AddIcon from '../icons/metrics explorer/add.svg';
import EditIcon from '../icons/metrics explorer/edit.svg';
import CloseIcon from '../icons/metrics explorer/close.svg';
import NetworkIcon from '../icons/metrics explorer/dimensions-network.svg';
import AwsIcon from '../icons/metrics explorer/dimensions-aws.svg';
import MerakiIcon from '../icons/metrics explorer/dimensions-meraki.svg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import produce from 'immer';
import { DimensionOptions, Dimensions } from './Dimensions';
import { DataSource, DataSourceOptions } from './DataSource';
import { MetricsChart } from './MetricsChart';
import { ColumnAccessor, MetricsExplorerTableData } from 'lib/api/http/SharedTypes';
import { Tab, Tabs } from '@material-ui/core';
import { LookbackTimeTab } from './LookbackTimeTab';
import { CustomTimeTab } from './CustomTimeTab';

//TODO: Remove this once API is integrated
const DUMMY_DIMENSION_DATA: DimensionOptions[] = [
  {
    title: 'Network & Traffic Topology',
    icon: NetworkIcon,
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
    icon: NetworkIcon,
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
    icon: AwsIcon,
    options: ['AWS US East (Northern Virginia) Region', 'AWS US West (Northern California) Region'],
  },
  {
    title: 'Cisco Meraki Device Metrics',
    icon: MerakiIcon,
    options: ['Office 1', 'Office 2', 'Office 3', 'Office 4', 'Office 5', 'Office 6', 'Office 7', 'Office 8', 'Office 9', 'Office 10', 'Office 11', 'Office 12'],
  },
];

const DUMMY_METRICS_TABLE_DATA: MetricsExplorerTableData[] = [
  {
    average: 10,
    ninetyFifthPercentile: 10,
    max: 10,
    lastDatapoint: 10,
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
    average: 5,
    ninetyFifthPercentile: 20,
    max: 30,
    lastDatapoint: 15,
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
    icon: NetworkIcon,
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
  lookback = 'lookback',
  custom = 'custom',
}

interface TabPanelProps {
  readonly children?: React.ReactNode;
  readonly index: string;
  readonly value: string;
}

export interface SelectOptions {
  readonly value: string;
  readonly label: string;
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

export const MetricsExplorer: React.FC = () => {
  const classes = AnalyticsStyles();

  const [dimensions, setDimensions] = useState<DimensionOptions[]>(Dummy_selected_dimensions);
  const [dataSources, setDataSources] = useState<DataSourceOptions[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalName, setModalName] = useState<ModalName>(ModalName.Dimensions);
  const [timeTab, setTimeTab] = useState<TimeMetricTabValue>(TimeMetricTabValue.lookback);
  const [selectedLookback, setSelectedLookback] = useState<SelectOptions>({
    label: 'Last 5 minutes',
    value: '-5m',
  });
  const [selectedCustomFromDate, setSelectedCustomFromDate] = useState<string>('');
  const [selectedCustomToDate, setSelectedCustomToDate] = useState<string>('');
  const [selectedShow, setSelectedShow] = useState<SelectOptions>({
    label: 'Day',
    value: '-1d',
  });

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

  const handleLookbackChange = (value: SelectOptions) => setSelectedLookback(value);

  const handleCustomFromDateChange = (value: string) => setSelectedCustomFromDate(value);

  const handleCustomToDateChange = (value: string) => setSelectedCustomToDate(value);

  const handleShowChange = (value: SelectOptions) => setSelectedShow(value);

  const customizationtabOptions: CustomizationTabProps[] = [
    {
      img: DesignIcon,
      title: 'Design',
    },
    {
      img: DimensionsIcon,
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
                          <img src={CloseIcon} alt="close popup" />
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
                          <img src={CloseIcon} alt="close popup" />
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
      img: MetricsIcon,
      title: 'Metrics',
    },
    {
      img: TimeIcon,
      title: 'Time',
      content: (
        <>
          <Tabs classes={{ root: classes.timeTabContainer, indicator: classes.indicator }} value={timeTab} onChange={handleTimeTabChange} indicatorColor="primary">
            <Tab
              classes={{ selected: classes.selectedTab }}
              value={TimeMetricTabValue.lookback}
              label={<span className={classes.tableHeaderText}>LOOKBACK</span>}
              wrapped
              {...a11yProps(TimeMetricTabValue.lookback)}
            />
            <Tab
              classes={{ selected: classes.selectedTab }}
              value={TimeMetricTabValue.custom}
              label={<span className={classes.tableHeaderText}>CUSTOM</span>}
              wrapped
              {...a11yProps(TimeMetricTabValue.custom)}
            />
          </Tabs>
          <TabPanel value={timeTab} index={TimeMetricTabValue.lookback}>
            <LookbackTimeTab lookback={selectedLookback} handleLookbackChange={handleLookbackChange} />
          </TabPanel>
          <TabPanel value={timeTab} index={TimeMetricTabValue.custom}>
            <CustomTimeTab
              customFromDate={selectedCustomFromDate}
              customToDate={selectedCustomToDate}
              handleCustomFromDateChange={handleCustomFromDateChange}
              handleCustomToDateChange={handleCustomToDateChange}
              show={selectedShow}
              handleShowChange={handleShowChange}
            />
          </TabPanel>
        </>
      ),
    },
    {
      img: DataSourceIcon,
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
                      <img className={classes.dataSourceDropdownImg} src={dataSource.icon} alt={dataSource.title} />
                      {dataSource.title}
                    </span>
                    <span className={classes.countText}>{dataSource.options.length}</span>
                  </div>
                  <div>
                    <div className={classes.removeDimension} onClick={() => removeDataSource(dataSource.title)}>
                      <img src={CloseIcon} alt="close popup" />
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
        <MetricsChart dimensions={dimensions} tableData={DUMMY_METRICS_TABLE_DATA} lookback={selectedLookback.label} />
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
