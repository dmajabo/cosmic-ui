import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import { SessionsSelectValuesTypes, SESSIONS_SELECT_VALUES, SESSIONS_TABS } from 'lib/hooks/Sessions/model';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { ActionPart, ActionRowStyles, PageWrapperStyles, TabsWrapperStyles } from '../../Shared/styles';
import OverviewPage from '../OverviewPage';
import TabPanel from 'app/components/Tabs/TabPanel';
import Dropdown from 'app/components/Inputs/Dropdown';
import { ISelectedListItem } from 'lib/models/general';
import TrendsPage from '../TrendsPage';
import SessionsSwitch from '../Components/SessionsSwitch';
import SessionPage from '../SessionPage';

interface IProps {}

const Page: React.FC<IProps> = (props: IProps) => {
  const { sessions } = useSessionsDataContext();
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    sessions.onChangeSelectedTab(newValue);
  };

  const onChangePeriod = (_value: ISelectedListItem<SessionsSelectValuesTypes>) => {
    sessions.onChangeSelectedPeriod(_value);
  };

  const onSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sessions.onChangeSwitch(e.target.checked);
  };

  return (
    <PageWrapperStyles>
      <TabsWrapperStyles>
        <Tabs
          value={sessions.selectedTab.index}
          onChange={handleChange}
          className={classes.tabs}
          TabIndicatorProps={{
            style: {
              background: 'var(--_hoverButtonBg)',
              boxShadow: '0px 4px 7px rgba(67, 127, 236, 0.15)',
              borderRadius: '100px',
            },
          }}
        >
          {SESSIONS_TABS.map(it => (
            <Tab label={it.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
          ))}
        </Tabs>
      </TabsWrapperStyles>
      <ActionRowStyles>
        {sessions.selectedTab.index !== 0 && (
          <ActionPart margin="0 auto 0 0">
            <SessionsSwitch checked={sessions.checkedSwitch} onChange={onSwitchChange} />
          </ActionPart>
        )}
        <ActionPart margin="0 0 0 auto">
          <Dropdown label="Show" selectedValue={sessions.selectedPeriod} values={SESSIONS_SELECT_VALUES} onSelectValue={onChangePeriod} />
        </ActionPart>
      </ActionRowStyles>
      <TabPanel value={sessions.selectedTab.index} index={SESSIONS_TABS[0].index}>
        <OverviewPage />
      </TabPanel>
      <TabPanel value={sessions.selectedTab.index} index={SESSIONS_TABS[1].index}>
        <TrendsPage />
      </TabPanel>
      <TabPanel value={sessions.selectedTab.index} index={SESSIONS_TABS[2].index}>
        <SessionPage />
      </TabPanel>
    </PageWrapperStyles>
  );
};

export default React.memo(Page);
