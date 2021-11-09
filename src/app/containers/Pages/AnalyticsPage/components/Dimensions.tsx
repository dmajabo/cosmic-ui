import React, { useEffect, useState } from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import CloseIcon from '../icons/metrics explorer/close.svg';
import SearchIcon from '../icons/metrics explorer/search.svg';
import SaveIcon from '../icons/metrics explorer/save.svg';
import { SubDimension } from './SubDimension';

interface DimensionsProps {
  readonly closePopup: () => void;
  readonly dimensionData: DimensionOptions[];
  readonly addDimensions: (dimensions: string[]) => void;
  readonly dimensions: string[];
}

export interface DimensionOptions {
  readonly title: string;
  readonly icon: string;
  readonly source: string[];
  readonly destination: string[];
}

export interface CheckboxData {
  [id: string]: boolean;
}

export const Dimensions: React.FC<DimensionsProps> = ({ closePopup, dimensionData, addDimensions, dimensions }) => {
  const classes = AnalyticsStyles();

  const [searchText, setSearchText] = useState<string>('');
  const [dimensionOptions, setDimensionOptions] = useState<DimensionOptions[]>([]);
  const [checkboxData, setCheckboxData] = useState<CheckboxData>({});
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

  const setInitialCheckboxData = () => {
    const tempCheckboxData: CheckboxData = {};
    dimensionData.forEach(item => {
      item.source.forEach(value => {
        tempCheckboxData[`${item.title}_Source_${value}`] = false;
      });
      item.destination.forEach(value => {
        tempCheckboxData[`${item.title}_Destination_${value}`] = false;
      });
    });
    dimensions.forEach(value => {
      tempCheckboxData[value] = true;
    });
    setSelectedDimensions(dimensions);
    setCheckboxData(tempCheckboxData);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxData({
      ...checkboxData,
      [event.target.name]: event.target.checked,
    });
    event.target.checked ? setSelectedDimensions(selectedDimensions.concat(event.target.name)) : setSelectedDimensions(selectedDimensions.filter(item => item !== event.target.name));
  };

  const handleSave = () => {
    addDimensions(selectedDimensions);
    closePopup();
  };

  useEffect(() => {
    setDimensionOptions(dimensionData);
    setInitialCheckboxData();
  }, []);

  return (
    <>
      <div className={classes.popupTitleContainer}>
        <div className={classes.closePopup} onClick={closePopup}>
          <img src={CloseIcon} alt="close popup" />
        </div>
        <span className={classes.popupTitle}>Dimensions</span>
        <input type="text" className={classes.searchBar} value={searchText} onChange={handleSearchTextChange} placeholder="Search" />
        <span className={classes.searchIcon}>
          <img src={SearchIcon} alt="search" />
        </span>
      </div>
      <div className={classes.popupContent}>
        <SubDimension dimensionOptions={dimensionOptions} checkboxData={checkboxData} handleCheckboxChange={handleCheckboxChange} />
      </div>
      <div className={`${classes.tabTitleContainer} ${classes.popupFooterContainer}`}>
        <div className={classes.verticalCenter}>
          <span className={classes.selectedDimensionText}>Selected Dimensions:</span>
          <span className={classes.selectedDimensionCount}>{selectedDimensions.length}</span>
        </div>
        <div className={classes.verticalCenter}>
          <span className={classes.grayBorderButton} onClick={closePopup}>
            <span className={classes.buttonText}>CANCEL</span>
          </span>
          <span className={classes.blueSaveButton} onClick={handleSave}>
            <span className={`${classes.saveButton} ${classes.buttonText}`}>SAVE</span>
            <img src={SaveIcon} alt="save" />
          </span>
        </div>
      </div>
    </>
  );
};
