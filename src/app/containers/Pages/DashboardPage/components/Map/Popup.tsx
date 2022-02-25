import isNumber from 'lodash/isNumber';
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
        <div className={classes.popupHeaderContainer}>
          <span className={classes.popupTitle}>{properties.name}</span>
        </div>
        <hr className={classes.popupHr} />
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Packet Loss: </span>
          <span className={classes.popupContentValue}>{isNumber(properties.packetloss) ? `${properties.packetloss}%` : 'NaN'}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Latency: </span>
          <span className={classes.popupContentValue}>{isNumber(properties.latency) ? `${properties.latency.toFixed(2)} ms` : 'NaN'}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Goodput: </span>
          <span className={classes.popupContentValue}>{isNumber(properties.goodput) ? `${properties.goodput / 1000} mbps` : 'NaN'}</span>
        </div>
      </div>
    </>
  );
};
