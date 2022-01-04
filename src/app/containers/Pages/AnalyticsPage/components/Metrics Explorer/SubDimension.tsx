import React, { useState } from 'react';
import { CheckboxData, DimensionOptions, OptionData } from './Dimensions';
import { Checkbox, FormControlLabel } from '@mui/material';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import DownArrow from '../../icons/metrics explorer/downArrowTriangle';
import UpArrow from '../../icons/metrics explorer/upArrowTriangle';

interface DimensionOptionsProps {
  readonly dimensionOption: DimensionOptions;
  readonly checkboxData: CheckboxData;
  readonly handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, dimensionName: string, dimensionType: string, dimensionItem: OptionData) => void;
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
              <div>{dimensionOption.icon}</div>
            </span>
            <span className={classes.subDimensionTitle}>{dimensionOption.title}</span>
          </div>
          <div>
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
        <div className={isTileOpen ? classes.subDimensionOptionsContainer : classes.hidden}>
          <div className={classes.subDimensionOptionBox}>
            <div className={`${classes.sourcesubDimensionOptionTitle} ${classes.sourceText}`}>Source</div>
            <div className={classes.subDimensionContentContainer}>
              <div className={classes.subDimensionContent}>
                {dimensionOption.source.map(item => (
                  <FormControlLabel
                    key={item.value}
                    control={
                      <Checkbox
                        checked={checkboxData[`${dimensionOption.title}_source_${item.value}`]}
                        onChange={e => handleCheckboxChange(e, dimensionOption.title, 'source', item)}
                        name={`${dimensionOption.title}_source_${item.value}`}
                      />
                    }
                    label={item.label}
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
                    key={item.value}
                    control={
                      <Checkbox
                        checked={checkboxData[`${dimensionOption.title}_destination_${item.value}`]}
                        onChange={e => handleCheckboxChange(e, dimensionOption.title, 'destination', item)}
                        name={`${dimensionOption.title}_destination_${item.value}`}
                      />
                    }
                    label={item.label}
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
