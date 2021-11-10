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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { DimensionOptions, Dimensions } from './Dimensions';
import { isEmpty } from 'lodash';

const DUMMY_DIMENSION_DATA: DimensionOptions[] = [
  {
    title: 'Network & Traffic Topology',
    icon: NetworkIcon,
    source: ['Interface', 'Connectivity Type', 'Network Boundary', 'Provider', 'Traffic Origination', 'Interface Capacity', 'VLAN', 'MAC Address'],
    destination: ['Interface', 'Connectivity Type', 'Network Boundary', 'Provider', 'Traffic Origination', 'Interface Capacity', 'VLAN', 'MAC Address'],
  },
];

export const getDimensionCount = (dimensions: DimensionOptions[]) => {
  return dimensions.reduce((accu, nextValue) => {
    const subDimensionCount = nextValue.source.length + nextValue.destination.length;
    return accu + subDimensionCount;
  }, 0);
};

export const MetricsExplorer: React.FC = () => {
  const classes = AnalyticsStyles();

  const [dimensions, setDimensions] = useState<DimensionOptions[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const addDimensions = (dimensions: DimensionOptions[]) => {
    setDimensions(dimensions);
  };

  const removeDimension = (selectedDimension: DimensionOptions, dimensionType: string, dimensionItem: string) => {
    const filteredDimensions = dimensions.filter(dimension => dimension.title !== selectedDimension.title);
    if (dimensionType === 'source') {
      selectedDimension.source = selectedDimension.source.filter(item => item !== dimensionItem);
    } else {
      selectedDimension.destination = selectedDimension.destination.filter(item => item !== dimensionItem);
    }
    setDimensions(filteredDimensions.concat(selectedDimension));
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
      operationImage: isEmpty(dimensions) ? AddIcon : EditIcon,
      showModal: handleModalOpen,
      operationName: isEmpty(dimensions) ? 'add dimensions' : 'edit dimensions',
      content: isEmpty(dimensions) ? (
        <div className={classes.tabContentText}>No dimensions added. To add dimensions click the “Add” button on top.</div>
      ) : (
        <div>
          {dimensions.map(dimension =>
            dimension.source.map(item => {
              return (
                <div key={item} className={`${classes.whiteBorderBox} ${classes.sourceText}`}>
                  <div className={classes.tabTitleContainer}>
                    <div>
                      <span>
                        {`Source: `}
                        <b>{item}</b>
                      </span>
                    </div>
                    <div>
                      <div className={classes.removeDimension} onClick={() => removeDimension(dimension, 'source', item)}>
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
                <div key={item} className={`${classes.whiteBorderBox} ${classes.destinationText}`}>
                  <div className={classes.tabTitleContainer}>
                    <div>
                      <span>
                        {`Destination: `}
                        <b>{item}</b>
                      </span>
                    </div>
                    <div>
                      <div className={classes.removeDimension} onClick={() => removeDimension(dimension, 'destination', item)}>
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
      description: '126 of 126',
      operationImage: EditIcon,
      operationName: 'edit data source',
    },
  ];

  return (
    <div className={classes.metricsExplorerContainer}>
      <div className={classes.leftBox}></div>
      <div className={classes.rightBox}>
        <div className={classes.containerTitle}>Metrics Customization</div>
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
          <Dimensions dimensions={dimensions} addDimensions={addDimensions} dimensionData={DUMMY_DIMENSION_DATA} closePopup={handleModalClose} />
        </Box>
      </Modal>
    </div>
  );
};
