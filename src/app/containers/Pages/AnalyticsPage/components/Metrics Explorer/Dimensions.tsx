import React, { useEffect, useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import CloseIcon from '../../icons/metrics explorer/close';
import SearchIcon from '../../icons/metrics explorer/search';
import SaveIcon from '../../icons/metrics explorer/save';
import { SubDimension } from './SubDimension';
import { getDimensionCount } from './MetricsExplorer';
import produce from 'immer';
import { ColumnAccessor } from 'lib/api/http/SharedTypes';

interface DimensionsProps {
  readonly closePopup: () => void;
  readonly dimensionData: DimensionOptions[];
  readonly addDimensions: (dimensions: DimensionOptions[]) => void;
  readonly dimensions: DimensionOptions[];
}

export interface OptionData {
  readonly label: string;
  readonly value: ColumnAccessor;
}

export interface DimensionOptions {
  readonly title: string;
  readonly icon?: React.ReactNode;
  readonly source: OptionData[];
  readonly destination: OptionData[];
}

export interface CheckboxData {
  [id: string]: boolean;
}

export const Dimensions: React.FC<DimensionsProps> = ({ closePopup, dimensionData, addDimensions, dimensions }) => {
  const classes = AnalyticsStyles();

  const [searchText, setSearchText] = useState<string>('');
  const [dimensionOptions, setDimensionOptions] = useState<DimensionOptions[]>([]);
  const [checkboxData, setCheckboxData] = useState<CheckboxData>({});
  const [selectedDimensions, setSelectedDimensions] = useState<DimensionOptions[]>([]);

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

  const setInitialCheckboxData = () => {
    const tempCheckboxData: CheckboxData = {};
    dimensionData.forEach(item => {
      item.source.forEach(value => {
        tempCheckboxData[`${item.title}_source_${value.value}`] = false;
      });
      item.destination.forEach(value => {
        tempCheckboxData[`${item.title}_destination_${value.value}`] = false;
      });
    });
    dimensions.forEach(dimension => {
      dimension.source.forEach(value => (tempCheckboxData[`${dimension.title}_source_${value.value}`] = true));
      dimension.destination.forEach(value => (tempCheckboxData[`${dimension.title}_destination_${value.value}`] = true));
    });
    setSelectedDimensions(dimensions);
    setCheckboxData(tempCheckboxData);
  };

  const updateSelectedDimensions = (dimensions: DimensionOptions[], dimensionName: string, dimensionType: string, dimensionItem: OptionData, checked: boolean) => {
    return produce(dimensions, draft => {
      const selectedDimension = draft.find(dimension => dimension.title === dimensionName);
      if (dimensionType === 'source') {
        selectedDimension.source = checked ? selectedDimension.source.concat(dimensionItem) : selectedDimension.source.filter(item => item.value !== dimensionItem.value);
      } else {
        selectedDimension.destination = checked ? selectedDimension.destination.concat(dimensionItem) : selectedDimension.destination.filter(item => item !== dimensionItem);
      }
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, dimensionName: string, dimensionType: string, dimensionItem: OptionData) => {
    setCheckboxData({
      ...checkboxData,
      [event.target.name]: event.target.checked,
    });
    const selectedDimension = selectedDimensions.find(dimension => dimension.title === dimensionName);
    if (selectedDimension) {
      const newSelectedDimensions = updateSelectedDimensions(selectedDimensions, dimensionName, dimensionType, dimensionItem, event.target.checked);
      setSelectedDimensions(newSelectedDimensions);
    } else {
      const newDimensions: DimensionOptions[] = [
        ...selectedDimensions,
        {
          title: dimensionName,
          source: [],
          destination: [],
        },
      ];
      const newSelectedDimensions = updateSelectedDimensions(newDimensions, dimensionName, dimensionType, dimensionItem, event.target.checked);
      setSelectedDimensions(newSelectedDimensions);
    }
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
          <CloseIcon />
        </div>
        <span className={classes.popupTitle}>Dimensions</span>
        <input type="text" className={classes.searchBar} value={searchText} onChange={handleSearchTextChange} placeholder="Search" />
        <span className={classes.searchIcon}>
          <SearchIcon />
        </span>
      </div>
      <div className={classes.popupContent}>
        {dimensionOptions.map(option => (
          <SubDimension key={option.title} dimensionOption={option} checkboxData={checkboxData} handleCheckboxChange={handleCheckboxChange} />
        ))}
      </div>
      <div className={`${classes.tabTitleContainer} ${classes.popupFooterContainer}`}>
        <div className={classes.verticalCenter}>
          <span className={classes.selectedDimensionText}>Selected Dimensions:</span>
          <span className={classes.selectedDimensionCount}>{getDimensionCount(selectedDimensions)}</span>
        </div>
        <div className={classes.verticalCenter}>
          <span className={classes.grayBorderButton} onClick={closePopup}>
            <span className={classes.buttonText}>CANCEL</span>
          </span>
          <span className={classes.blueSaveButton} onClick={handleSave}>
            <span className={`${classes.saveButton} ${classes.buttonText}`}>SAVE</span>
            <SaveIcon />
          </span>
        </div>
      </div>
    </>
  );
};
