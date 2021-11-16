import React, { useState } from 'react';
import { CheckboxData, DimensionOptions } from './Dimensions';
import { Checkbox, FormControlLabel } from '@mui/material';
import { AnalyticsStyles } from '../AnalyticsStyles';
import DownArrow from '../icons/metrics explorer/downArrowTriangle.svg';
import UpArrow from '../icons/metrics explorer/upArrowTriangle.svg';

interface DimensionOptionsProps {
  readonly dimensionOption: DimensionOptions;
  readonly checkboxData: CheckboxData;
  readonly handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, dimensionName: string, dimensionType: string, dimensionItem: string) => void;
}

export const SubDimension: React.FC<DimensionOptionsProps> = ({ dimensionOption, checkboxData, handleCheckboxChange }) => {
  const classes = AnalyticsStyles();

  const [isTileOpen, setIsTileOpen] = useState<boolean>(true);

  const handleOpen = () => setIsTileOpen(true);

  const handleClose = () => setIsTileOpen(false);

  return (
    <>
      <div className={classes.subDimensionContainer}>
        <div className={classes.tabTitleContainer}>
          <div>
            <span>
              <img className={classes.subDimensionIcon} src={dimensionOption.icon} alt={dimensionOption.title} />
            </span>
            <span className={classes.subDimensionTitle}>{dimensionOption.title}</span>
          </div>
          <div>
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
        <div className={isTileOpen ? classes.subDimensionOptionsContainer : classes.hidden}>
          <div className={classes.subDimensionOptionBox}>
            <div className={`${classes.sourcesubDimensionOptionTitle} ${classes.sourceText}`}>Source</div>
            <div className={classes.subDimensionContentContainer}>
              <div className={classes.subDimensionContent}>
                {dimensionOption.source.map(item => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={checkboxData[`${dimensionOption.title}_source_${item}`]}
                        onChange={e => handleCheckboxChange(e, dimensionOption.title, 'source', item)}
                        name={`${dimensionOption.title}_source_${item}`}
                      />
                    }
                    label={item}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={classes.subDimensionOptionBox}>
            <div className={`${classes.sourcesubDimensionOptionTitle} ${classes.destinationText}`}>Destination</div>
            <div className={classes.subDimensionContentContainer}>
              <div className={classes.subDimensionContent}>
                {dimensionOption.destination.map(item => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={checkboxData[`${dimensionOption.title}_destination_${item}`]}
                        onChange={e => handleCheckboxChange(e, dimensionOption.title, 'destination', item)}
                        name={`${dimensionOption.title}_destination_${item}`}
                      />
                    }
                    label={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
