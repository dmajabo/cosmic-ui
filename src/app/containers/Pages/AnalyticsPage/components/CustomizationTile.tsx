import React, { useState } from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import DownArrow from '../icons/metrics explorer/downArrowTriangle.svg';
import UpArrow from '../icons/metrics explorer/upArrowTriangle.svg';

export interface CustomizationTabProps {
  readonly img: string;
  readonly title: string;
  readonly description?: string;
  readonly operationImage?: string;
  readonly operationName?: string;
  readonly showModal?: () => void;
  readonly content?: JSX.Element;
}

export const CustomizationTile: React.FC<CustomizationTabProps> = ({ img, title, description, operationImage, operationName, showModal, content }) => {
  const classes = AnalyticsStyles();
  const [isTileOpen, setIsTileOpen] = useState<boolean>(false);

  const handleOpen = () => setIsTileOpen(true);

  const handleClose = () => setIsTileOpen(false);

  return (
    <div className={classes.customizationTabContainer}>
      <div className={classes.tabTitleContainer}>
        <div>
          <img src={img} alt={title} />
          <span className={classes.tabTitle}>{title}</span>
          <span className={classes.countText}>{description}</span>
        </div>
        <div>
          <span onClick={showModal}>
            <img className={classes.operationImage} src={operationImage} alt={operationName} />
          </span>
          {isTileOpen ? (
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
      <div className={isTileOpen ? classes.tabContent : classes.hidden}>{content}</div>
    </div>
  );
};
