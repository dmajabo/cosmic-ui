import React, { useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import DownArrow from '../../icons/metrics explorer/downArrowTriangle';
import UpArrow from '../../icons/metrics explorer/upArrowTriangle';

export interface CustomizationTabProps {
  readonly img: React.FC<React.SVGProps<SVGSVGElement>>;
  readonly title: string;
  readonly description?: string;
  readonly operationImage?: React.FC<React.SVGProps<SVGSVGElement>>;
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
          {img}
          <span className={classes.tabTitle}>{title}</span>
          <span className={classes.countText}>{description}</span>
        </div>
        <div>
          <span onClick={showModal}>{operationImage}</span>
          {isTileOpen ? (
            <span className={classes.arrow} onClick={handleClose}>
              {UpArrow}
            </span>
          ) : (
            <span className={classes.arrow} onClick={handleOpen}>
              {DownArrow}
            </span>
          )}
        </div>
      </div>
      <div className={isTileOpen ? classes.tabContent : classes.hidden}>{content}</div>
    </div>
  );
};
