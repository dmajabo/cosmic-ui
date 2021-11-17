import React, { useEffect, useState } from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import CloseIcon from '../icons/metrics explorer/close.svg';
import SearchIcon from '../icons/metrics explorer/search.svg';
import SaveIcon from '../icons/metrics explorer/save.svg';
import { DataSourceOption } from './DataSourceOption';
import { CheckboxData } from './Dimensions';
import produce from 'immer';
import { Checkbox, FormControlLabel } from '@mui/material';

interface DataSourceProps {
  readonly closePopup: () => void;
  readonly dataSourcesData: DataSourceOptions[];
  readonly addDataSources: (dataSources: DataSourceOptions[]) => void;
  readonly dataSources: DataSourceOptions[];
}

export interface DataSourceOptions {
  readonly title: string;
  readonly icon?: string;
  readonly options: string[];
}

export const DataSource: React.FC<DataSourceProps> = ({ closePopup, dataSourcesData, addDataSources, dataSources }) => {
  const classes = AnalyticsStyles();

  const [searchText, setSearchText] = useState<string>('');
  const [dataSourceOptions, setDataSourceOptions] = useState<DataSourceOptions[]>([]);
  const [selectedDataSources, setSelectedDataSources] = useState<DataSourceOptions[]>([]);
  const [checkboxData, setCheckboxData] = useState<CheckboxData>({
    all_items: false,
  });

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

  const handleSave = () => {
    addDataSources(selectedDataSources);
    closePopup();
  };

  const setInitialCheckboxData = () => {
    const tempCheckboxData: CheckboxData = {};
    dataSourcesData.forEach(item => {
      item.options.forEach(value => {
        tempCheckboxData[`${item.title}_${value}`] = false;
      });
      tempCheckboxData[`${item.title}_all`] = false;
    });
    dataSources.forEach(dimension => {
      dimension.options.forEach(value => (tempCheckboxData[`${dimension.title}_${value}`] = true));
    });
    tempCheckboxData['all_items'] = false;
    setSelectedDataSources(dataSources);
    setCheckboxData(tempCheckboxData);
  };

  const getDataSourceCount = (selectedDataSources: DataSourceOptions[]) => selectedDataSources.reduce((acc, nextValue) => acc + nextValue.options.length, 0);

  const updateSelectedDataSources = (dataSources: DataSourceOptions[], dataSourceName: string, dataSourceItem: string, checked: boolean) =>
    produce(dataSources, draft => {
      const selectedDimension = draft.find(dataSource => dataSource.title === dataSourceName);
      selectedDimension.options = checked ? selectedDimension.options.concat(dataSourceItem) : selectedDimension.options.filter(item => item !== dataSourceItem);
    });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, dataSourceName: string, dataSourceItem: string) => {
    setCheckboxData({
      ...checkboxData,
      [event.target.name]: event.target.checked,
    });

    const selectedDataSource = selectedDataSources.find(dataSource => dataSource.title === dataSourceName);
    if (selectedDataSource) {
      const newSelectedDataSources = updateSelectedDataSources(selectedDataSources, dataSourceName, dataSourceItem, event.target.checked);
      setSelectedDataSources(newSelectedDataSources);
    } else {
      const newDataSource = dataSourcesData.find(dataSource => dataSource.title === dataSourceName);
      const newDataSources: DataSourceOptions[] = [
        ...selectedDataSources,
        {
          title: newDataSource.title,
          icon: newDataSource.icon,
          options: [],
        },
      ];
      const newSelectedDataSources = updateSelectedDataSources(newDataSources, dataSourceName, dataSourceItem, event.target.checked);
      setSelectedDataSources(newSelectedDataSources);
    }
  };

  const selectAllDataSourceOption = (event: React.ChangeEvent<HTMLInputElement>, dataSource: DataSourceOptions) => {
    const tempCheckboxData: CheckboxData = {};
    dataSource.options.forEach(option => {
      tempCheckboxData[`${dataSource.title}_${option}`] = event.target.checked;
    });
    setCheckboxData({
      ...checkboxData,
      [event.target.name]: event.target.checked,
      ...tempCheckboxData,
    });
    const filteredDataSources = selectedDataSources.filter(item => item.title !== dataSource.title);
    event.target.checked ? setSelectedDataSources(filteredDataSources.concat(dataSource)) : setSelectedDataSources(filteredDataSources);
  };

  const selectAllDataSources = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempCheckboxData: CheckboxData = {};
    dataSourcesData.forEach(item => {
      item.options.forEach(value => {
        tempCheckboxData[`${item.title}_${value}`] = event.target.checked;
      });
      tempCheckboxData[`${item.title}_all`] = event.target.checked;
    });
    setCheckboxData({
      ...checkboxData,
      [event.target.name]: event.target.checked,
      ...tempCheckboxData,
    });
    event.target.checked ? setSelectedDataSources(dataSourcesData) : setSelectedDataSources([]);
  };

  useEffect(() => {
    setDataSourceOptions(dataSourcesData);
    setInitialCheckboxData();
  }, []);

  return (
    <>
      <div className={classes.popupTitleContainer}>
        <div className={classes.closePopup} onClick={closePopup}>
          <img src={CloseIcon} alt="close popup" />
        </div>
        <span className={classes.popupTitle}>Data Source</span>
        <input type="text" className={classes.searchBar} value={searchText} onChange={handleSearchTextChange} placeholder="Search" />
        <span className={classes.searchIcon}>
          <img src={SearchIcon} alt="search" />
        </span>
        <FormControlLabel key="all_items" control={<Checkbox checked={checkboxData['all_items']} onChange={e => selectAllDataSources(e)} name="all_items" />} label="Use All Data Sources" />
      </div>
      <div className={classes.popupContent}>
        {dataSourceOptions.map(dataSource => (
          <DataSourceOption
            key={dataSource.title}
            dataSourceOption={dataSource}
            checkboxData={checkboxData}
            handleCheckboxChange={handleCheckboxChange}
            selectAllDataSourceOption={selectAllDataSourceOption}
          />
        ))}
      </div>
      <div className={`${classes.tabTitleContainer} ${classes.popupFooterContainer}`}>
        <div className={classes.verticalCenter}>
          <span className={classes.selectedDimensionText}>Selected Dimensions:</span>
          <span className={classes.selectedDimensionCount}>{getDataSourceCount(selectedDataSources)}</span>
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
