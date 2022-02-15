import React, { useState } from 'react';
import { DashboardStyles } from './DashboardStyles';
import './react-grid-layout.css';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { styled } from '@mui/system';
import { TabsUnstyled } from '@mui/material';
import { DashboardSitesViewTab } from './enum';
import styles from 'styled-components';

const Tab = styled(TabUnstyled)`
  color: #848da3;
  cursor: pointer;
  font-size: 12px;
  background: #f3f6fc;
  padding: 15px 40px 15px 40px;
  border: none;
  border-radius: 6px;
  display: flex;

  &.Mui-selected {
    color: #437fec;
    font-weight: bold;
  }

  &:hover {
    color: #437fec;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    color: #437fec;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  border-radius: 6px;
  display: flex;
  align-content: space-between;
`;

const DashboardPage: React.FC = () => {
  const classes = DashboardStyles();
  const [sitesViewTabName, setSitesViewTabName] = useState<DashboardSitesViewTab>(DashboardSitesViewTab.Map);

  const onTabChange = (event: React.SyntheticEvent<Element, Event>, value: string | number) => {
    setSitesViewTabName(value as DashboardSitesViewTab);
  };

  return (
    <div className={classes.flexContainer}>
      <div className={classes.sitesContainer}>
        <div className={classes.sitesHeader}>
          <div className={classes.sitesHeaderLeftSection}>
            <span className={classes.sites}>Sites</span>
            <div className={classes.pillContainer}>
              <span className={classes.pillText}>50</span>
            </div>
          </div>
          <TabsUnstyled value={sitesViewTabName} onChange={onTabChange}>
            <div className={classes.tabListContainer}>
              <TabsList>
                <Tab value={DashboardSitesViewTab.Map}>{DashboardSitesViewTab.Map.toUpperCase()}</Tab>
                <Tab value={DashboardSitesViewTab.List}>{DashboardSitesViewTab.List.toUpperCase()}</Tab>
              </TabsList>
            </div>
          </TabsUnstyled>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default React.memo(DashboardPage);
