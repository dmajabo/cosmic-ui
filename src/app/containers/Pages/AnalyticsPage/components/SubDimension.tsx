import React, { useState } from 'react';
import { CheckboxData, DimensionOptions } from './Dimensions';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { AnalyticsStyles } from '../AnalyticsStyles';
import DownArrow from '../icons/metrics explorer/downArrowTriangle.svg';
import UpArrow from '../icons/metrics explorer/upArrowTriangle.svg';

interface DimensionOptionsProps {
  readonly dimensionOptions: DimensionOptions[];
  readonly checkboxData: CheckboxData;
  readonly handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, dimensionName: string, dimensionType: string, dimensionItem: string) => void;
}

export const SubDimension: React.FC<DimensionOptionsProps> = ({ dimensionOptions, checkboxData, handleCheckboxChange }) => {
  const classes = AnalyticsStyles();

  const [isTileOpen, setIsTileOpen] = useState<boolean>(true);

  const handleOpen = () => setIsTileOpen(true);

  const handleClose = () => setIsTileOpen(false);

  return (
    <>
      {dimensionOptions.map(option => (
        <div key={option.title} className={classes.subDimensionContainer}>
          <div className={classes.tabTitleContainer}>
            <div>
              <span>
                <img className={classes.subDimensionIcon} src={option.icon} alt={option.title} />
              </span>
              <span className={classes.subDimensionTitle}>{option.title}</span>
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
                  <FormGroup>
                    {option.source.slice(0, option.source.length / 2).map(item => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            checked={checkboxData[`${option.title}_source_${item}`]}
                            onChange={e => handleCheckboxChange(e, option.title, 'source', item)}
                            name={`${option.title}_source_${item}`}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>
                <div className={classes.subDimensionContent}>
                  <FormGroup>
                    {option.source.slice(-option.source.length / 2).map(item => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            checked={checkboxData[`${option.title}_source_${item}`]}
                            onChange={e => handleCheckboxChange(e, option.title, 'source', item)}
                            name={`${option.title}_source_${item}`}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className={classes.subDimensionOptionBox}>
              <div className={`${classes.sourcesubDimensionOptionTitle} ${classes.destinationText}`}>Destination</div>
              <div className={classes.subDimensionContentContainer}>
                <div className={classes.subDimensionContent}>
                  <FormGroup>
                    {option.destination.slice(0, option.destination.length / 2).map(item => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            checked={checkboxData[`${option.title}_destination_${item}`]}
                            onChange={e => handleCheckboxChange(e, option.title, 'destination', item)}
                            name={`${option.title}_destination_${item}`}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>
                <div className={classes.subDimensionContent}>
                  <FormGroup>
                    {option.destination.slice(-option.destination.length / 2).map(item => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            checked={checkboxData[`${option.title}_destination_${item}`]}
                            onChange={e => handleCheckboxChange(e, option.title, 'destination', item)}
                            name={`${option.title}_destination_${item}`}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
