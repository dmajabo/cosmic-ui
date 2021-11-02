import React from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import { CustomizationTile, CustomizationTabProps } from './CustomizationTile';
import DesignIcon from '../icons/metrics explorer/design.svg';
import DimensionsIcon from '../icons/metrics explorer/dimensions.svg';
import MetricsIcon from '../icons/metrics explorer/metrics.svg';
import TimeIcon from '../icons/metrics explorer/time.svg';
import DataSourceIcon from '../icons/metrics explorer/dataSource.svg';
import AddIcon from '../icons/metrics explorer/add.svg';
import EditIcon from '../icons/metrics explorer/edit.svg';

export const MetricsExplorer: React.FC = () => {
  const classes = AnalyticsStyles();

  const customizationtabOptions: CustomizationTabProps[] = [
    {
      img: DesignIcon,
      title: 'Design',
    },
    {
      img: DimensionsIcon,
      title: 'Dimensions',
      description: '0',
      operationImage: AddIcon,
      operationName: 'add dimensions',
      content: <div className={classes.tabContentText}>No dimensions added. To add dimensions click the “Add” button on top.</div>,
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
              content={item.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
