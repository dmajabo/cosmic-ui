import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@mui/material';
import React, { useState } from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import { DataSourceOptions } from './DataSource';
import { CheckboxData } from './Dimensions';
import DownArrow from '../icons/metrics explorer/downArrowTriangle.svg';
import UpArrow from '../icons/metrics explorer/upArrowTriangle.svg';

interface DataSourceOptionProps {
  readonly dataSourceOption: DataSourceOptions;
  readonly checkboxData: CheckboxData;
  readonly handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, dataSourceName: string, dataSourceItem: string) => void;
  readonly selectAllDataSourceOption: (event: React.ChangeEvent<HTMLInputElement>, dataSource: DataSourceOptions) => void;
}

const NUMBER_OF_COLUMNS = 4;

export const DataSourceOption: React.FC<DataSourceOptionProps> = ({ dataSourceOption, checkboxData, handleCheckboxChange, selectAllDataSourceOption }) => {
  const classes = AnalyticsStyles();

  const [isTileOpen, setIsTileOpen] = useState<boolean>(true);

  const handleOpen = () => setIsTileOpen(true);

  const handleClose = () => setIsTileOpen(false);
  return (
    <>
      <div className={classes.subDimensionContainer}>
        <div className={classes.tabTitleContainer}>
          <div>
            <Checkbox checked={checkboxData[`${dataSourceOption.title}_all`]} onChange={e => selectAllDataSourceOption(e, dataSourceOption)} name={`${dataSourceOption.title}_all`} />
            <span>
              <img className={classes.subDimensionIcon} src={dataSourceOption.icon} alt={dataSourceOption.title} />
            </span>
            <span className={classes.subDimensionTitle}>{dataSourceOption.title}</span>
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
          <div className={classes.dataSourceOptionBox}>
            <div className={classes.dataSourceContentContainer}>
              <div className={dataSourceOption.options.length < NUMBER_OF_COLUMNS ? classes.dataSourceSingleColumnOptionContent : classes.dataSourceOptionContent}>
                {dataSourceOption.options.map(item => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={checkboxData[`${dataSourceOption.title}_${item}`]}
                        onChange={e => handleCheckboxChange(e, dataSourceOption.title, item)}
                        name={`${dataSourceOption.title}_${item}`}
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
