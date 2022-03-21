import React from 'react';
import { DashboardStyles } from '../../DashboardStyles';
import { Properties } from '../Map/Map';
interface AwsPopupProps {
  readonly properties: Properties;
}

export const AwsPopup: React.FC<AwsPopupProps> = ({ properties }) => {
  const classes = DashboardStyles();
  return (
    <>
      <div className={classes.popupContainer}>
        <div className={classes.popupHeaderContainer}>
          <span className={classes.popupTitle}>{properties.title}</span>
        </div>
        <hr className={classes.popupHr} />
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>ID: </span>
          <span className={classes.popupContentValue}>{properties.id}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>AWS Account: </span>
          <span className={classes.popupContentValue}>{properties.ownerId}</span>
        </div>
      </div>
    </>
  );
};
