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

export const getDimensionCount = (dimensions: DimensionOptions[]) => {
  return dimensions.reduce((accu, nextValue) => {
    const subDimensionCount = nextValue.source.length + nextValue.destination.length;
    return accu + subDimensionCount;
  }, 0);
};

export const getDataSourceCount = (dataSources: DataSourceOptions[]) => {
  return dataSources.reduce((acc, nextValue) => acc + nextValue.options.length, 0);
};

export const MetricsExplorer: React.FC = () => {
  const classes = AnalyticsStyles();

  const [dimensions, setDimensions] = useState<DimensionOptions[]>(Dummy_selected_dimensions);
  const [dataSources, setDataSources] = useState<DataSourceOptions[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalName, setModalName] = useState<ModalName>(ModalName.Dimensions);
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
        <MetricsChart dimensions={dimensions} tableData={DUMMY_METRICS_TABLE_DATA} />
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
