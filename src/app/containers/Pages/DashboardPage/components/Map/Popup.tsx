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
        <div className={classes.ciscoPopupIcon} />
        <h3>{properties.title}</h3>
      </div>
      <p>{properties.city_name}</p>
    </>
  );
};
