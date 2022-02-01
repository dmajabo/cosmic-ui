import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { usePolicyDataContext } from 'lib/hooks/Policy/usePolicyDataContext';
import { POLICY_TABS } from 'lib/hooks/Policy/models';
import { PageWrapperStyles, TabsWrapperStyles } from '../Shared/styles';
import Segments from './Page/Segments';
// import Rules from './Page/Rules';

interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { policy } = usePolicyDataContext();
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    policy.onChangeSelectedTab(newValue);
  };

  return (
    <PageWrapperStyles>
      <TabsWrapperStyles>
        <Tabs
          value={policy.selectedTab.index}
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
          {POLICY_TABS.map(it => (
            <Tab disableRipple key={`automationKey${it.id}`} label={it.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
          ))}
        </Tabs>
      </TabsWrapperStyles>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: policy.selectedTab.index === POLICY_TABS[0].index ? '1 1 100%' : '0' }}
        value={policy.selectedTab.index}
        index={POLICY_TABS[0].index}
      >
        <Segments />
      </TabPanel>
      {/* <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: policy.selectedTab.index === POLICY_TABS[1].index ? '1 1 100%' : '0' }}
        value={policy.selectedTab.index}
        index={POLICY_TABS[1].index}
      >
        <Rules />
      </TabPanel> */}
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
