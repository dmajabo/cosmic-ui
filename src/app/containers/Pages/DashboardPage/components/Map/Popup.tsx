import React from 'react';
import { DashboardStyles } from '../../DashboardStyles';
import { Properties } from './Map';

interface PopupProps {
  readonly properties: Properties;
}

export const Popup: React.FC<PopupProps> = ({ properties }) => {
  const classes = DashboardStyles();
  return (
    <>
      <div className={classes.popupContainer}>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Network Name: </span>
          <span className={classes.popupContentValue}>{properties.name}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Device: </span>
          <span className={classes.popupContentValue}>{properties.extId}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Packet Loss: </span>
          <span className={classes.popupContentValue}>{`${properties.packetloss} %`}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Latency: </span>
          <span className={classes.popupContentValue}>{`${properties.latency.toFixed(2)} ms`}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Goodput: </span>
          <span className={classes.popupContentValue}>{`${properties.goodput / 1000} mbps`}</span>
        </div>
      </div>
    </>
  );
};
