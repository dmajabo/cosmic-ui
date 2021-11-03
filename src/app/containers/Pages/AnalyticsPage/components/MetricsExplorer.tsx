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

  const [addedDimensions, setAddedDimesions] = useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addDimensions = (dimensions: string[]) => {
    const sortedDimensions = sortBy(dimensions).reverse();
    setAddedDimesions(sortedDimensions);
  };

  const removeDimension = (dimension: string) => {
    setAddedDimesions(addedDimensions.filter(item => item !== dimension));
  };

  const customizationtabOptions: CustomizationTabProps[] = [
    {
      img: DesignIcon,
      title: 'Design',
    },
    {
      img: DimensionsIcon,
      title: 'Dimensions',
      description: `${addedDimensions.length}`,
      operationImage: isEmpty(addedDimensions) ? AddIcon : EditIcon,
      operationEventHandler: handleOpen,
      operationName: isEmpty(addedDimensions) ? 'add dimensions' : 'edit dimensions',
      content: isEmpty(addedDimensions) ? (
        <div className={classes.tabContentText}>No dimensions added. To add dimensions click the “Add” button on top.</div>
      ) : (
        <div>
          {addedDimensions.map(item => {
            const dimensionArray = item.split('_');
            return (
              <div className={`${classes.whiteBorderBox} ${dimensionArray[1] === 'Source' ? classes.sourceText : classes.destinationText}`}>
                <div className={classes.tabTitleContainer}>
                  <div>
                    <span>
                      {`${dimensionArray[1]}: `}
                      <b>{dimensionArray[2]}</b>
                    </span>
                  </div>
                  <div>
                    <div
                      className={classes.removeDimension}
                      onClick={() => {
                        removeDimension(item);
                      }}
                    >
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
              operationEventHandler={item.operationEventHandler}
              content={item.content}
            />
          ))}
        </div>
      </div>
      <Modal
        sx={{
          backgroundColor: 'rgba(5,20,58,0.1)',
        }}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.popupContainer}>
          <Dimensions addedDimensions={addedDimensions} addDimensions={addDimensions} dimensionData={DUMMY_DIMENSION_DATA} closePopup={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};
