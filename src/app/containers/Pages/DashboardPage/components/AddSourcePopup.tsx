import React from 'react';
import { DashboardStyles } from '../DashboardStyles';
import AwsIcon from '../Icons/aws.svg';
import MerakiIcon from '../Icons/meraki.svg';

export const AddSourcePopup: React.FC = () => {
  const classes = DashboardStyles();

  const handlePopupButtonClick = () => {
    //TODO: Add redirect to add edges screen
  };

  return (
    <div className={classes.demoPopupContainer} onClick={e => e.stopPropagation()}>
      <div className={classes.demoIconContainer}>
        <img className={classes.demoAwsIcon} src={AwsIcon} alt="aws icon" />
        <img className={classes.demoMerakiIcon} src={MerakiIcon} alt="aws icon" />
      </div>
      <div className={classes.demoPopupTitle}>Add your first traffic light source</div>
      <div className={classes.demoPopupSubtitle}>Not ready to add your own data sources? Try out our fully functional demo environment.</div>
      <div className={classes.demoPopUpButtonContainer}>
        <div className={classes.demoPopupButton} onClick={handlePopupButtonClick}>
          GET STARTED
        </div>
      </div>
    </div>
  );
};
