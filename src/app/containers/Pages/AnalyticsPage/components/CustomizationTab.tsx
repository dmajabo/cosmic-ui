import React, { useState } from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import DownArrow from '../icons/metrics explorer/downArrowTriangle.svg';
import UpArrow from '../icons/metrics explorer/upArrowTriangle.svg';

export interface CustomizationTabProps {
  readonly img: string;
  readonly title: string;
  readonly countText?: string;
  readonly operationImage?: string;
  readonly operationName?: string;
  readonly tabContent?: JSX.Element;
}

export const CustomizationTab: React.FC<CustomizationTabProps> = ({ img, title, countText, operationImage, operationName, tabContent }) => {
  const classes = AnalyticsStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.customizationTabContainer}>
      <div className={classes.tabTitleContainer}>
        <div>
          <img src={img} alt={title} />
          <span className={classes.tabTitle}>{title}</span>
          <span className={classes.countText}>{countText}</span>
        </div>
        <div>
          <span>
            <img className={classes.operationImage} src={operationImage} alt={operationName} />
          </span>
          {isOpen ? (
            <span className={classes.arrow} onClick={handleClose}>
              <img src={UpArrow} alt="close" />
            </span>
          ) : (
            <span className={classes.arrow} onClick={handleOpen}>
              <img src={DownArrow} alt="open" />
            </span>
          )}
        </div>
      </div>
      <div className={isOpen ? classes.tabContent : classes.hidden}>{tabContent}</div>
    </div>
  );
};
