import React, { useState } from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import CloseIcon from '../icons/metrics explorer/close.svg';
import SearchIcon from '../icons/metrics explorer/search.svg';
import NetworkIcon from '../icons/metrics explorer/dimensions-network.svg';

interface DimensionsProps {
  readonly closePopup: () => void;
}

export const Dimensions: React.FC<DimensionsProps> = ({ closePopup }) => {
  const classes = AnalyticsStyles();

  const [searchText, setSearchText] = useState<string>('');

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

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
        <div className={classes.subDimensionContainer}>
          <div className={classes.subDimensionTitleContainer}>
            <span>
              <img src={NetworkIcon} alt="Network and Traffic Topology" />
            </span>
            <span className={classes.subDimensionTitle}>{`Network & Traffic Topology`}</span>
          </div>
        </div>
      </div>
    </>
  );
};
