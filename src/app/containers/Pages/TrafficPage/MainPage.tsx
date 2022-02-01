import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { PageWrapperStyles, TabsWrapperStyles } from '../Shared/styles';
import SessionPage from './SessionPage';
import { TRAFFIC_TABS } from 'lib/hooks/Traffic/models';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { TrendsPage } from './Trends';
// import Rules from './Page/Rules';

interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { traffic } = useTrafficDataContext();
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    traffic.onChangeSelectedTab(newValue);
  };

  return (
    <PageWrapperStyles padding="20px 40px 40px 40px">
      <TabsWrapperStyles>
        <Tabs
          value={traffic.selectedTab.index}
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
          {TRAFFIC_TABS.map(it => (
            <Tab disableRipple key={`trafficKey${it.id}`} label={it.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
          ))}
        </Tabs>
      </TabsWrapperStyles>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: traffic.selectedTab.index === TRAFFIC_TABS[0].index ? '1 1 100%' : '0' }}
        value={traffic.selectedTab.index}
        index={TRAFFIC_TABS[0].index}
      >
        <TrendsPage />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: traffic.selectedTab.index === TRAFFIC_TABS[1].index ? '1 1 100%' : '0' }}
        value={traffic.selectedTab.index}
        index={TRAFFIC_TABS[1].index}
      >
        <SessionPage />
      </TabPanel>
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
