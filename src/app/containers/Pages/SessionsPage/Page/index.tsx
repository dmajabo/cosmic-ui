import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import { SESSIONS_TABS } from 'lib/hooks/Sessions/model';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { PageWrapperStyles, TabsWrapperStyles } from '../../Shared/styles';
import OverviewPage from '../OverviewPage';
import TabPanel from 'app/components/Tabs/TabPanel';
// import TrendsPage from '../TrendsPage';
// import SessionPage from '../SessionPage';

interface IProps {}

const Page: React.FC<IProps> = (props: IProps) => {
  const { sessions } = useSessionsDataContext();
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    sessions.onChangeSelectedTab(newValue);
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
            <Tab key={`sessionsTab${it.id}`} label={it.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
          ))}
        </Tabs>
      </TabsWrapperStyles>
      <TabPanel value={sessions.selectedTab.index} index={SESSIONS_TABS[0].index}>
        <OverviewPage />
      </TabPanel>
      {/* <TabPanel value={sessions.selectedTab.index} index={SESSIONS_TABS[1].index}>
        <TrendsPage />
      </TabPanel> */}
      {/* <TabPanel value={sessions.selectedTab.index} index={SESSIONS_TABS[1].index}>
        <SessionPage />
      </TabPanel> */}
    </PageWrapperStyles>
  );
};

export default React.memo(Page);
