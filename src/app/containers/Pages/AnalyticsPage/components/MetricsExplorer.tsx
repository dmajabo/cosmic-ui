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
import { isEmpty, sortBy } from 'lodash';

const DUMMY_DIMENSION_DATA: DimensionOptions[] = [
  {
    title: 'Network & Traffic Topology',
    icon: NetworkIcon,
    source: ['Interface', 'Connectivity Type', 'Network Boundary', 'Provider', 'Traffic Origination', 'Interface Capacity', 'VLAN', 'MAC Address'],
    destination: ['Interface', 'Connectivity Type', 'Network Boundary', 'Provider', 'Traffic Origination', 'Interface Capacity', 'VLAN', 'MAC Address'],
  },
];

export const MetricsExplorer: React.FC = () => {
  const classes = AnalyticsStyles();

  const [dimensions, setDimesions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const addDimensions = (dimensions: string[]) => {
    const sortedDimensions = sortBy(dimensions).reverse();
    setDimesions(sortedDimensions);
  };

  const removeDimension = (dimension: string) => setDimesions(dimensions.filter(item => item !== dimension));

  const customizationtabOptions: CustomizationTabProps[] = [
    {
      img: DesignIcon,
      title: 'Design',
    },
    {
      img: DimensionsIcon,
      title: 'Dimensions',
      description: `${dimensions.length}`,
      operationImage: isEmpty(dimensions) ? AddIcon : EditIcon,
      showModal: handleModalOpen,
      operationName: isEmpty(dimensions) ? 'add dimensions' : 'edit dimensions',
      content: isEmpty(dimensions) ? (
        <div className={classes.tabContentText}>No dimensions added. To add dimensions click the “Add” button on top.</div>
      ) : (
        <div>
          {dimensions.map(item => {
            const dimensionArray = item.split('_');
            return (
              <div key={item} className={`${classes.whiteBorderBox} ${dimensionArray[1] === 'Source' ? classes.sourceText : classes.destinationText}`}>
                <div className={classes.tabTitleContainer}>
                  <div>
                    <span>
                      {`${dimensionArray[1]}: `}
                      <b>{dimensionArray[2]}</b>
                    </span>
                  </div>
                  <div>
                    <div className={classes.removeDimension} onClick={() => removeDimension(item)}>
                      <img src={CloseIcon} alt="close popup" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
