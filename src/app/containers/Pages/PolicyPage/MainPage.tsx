import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { usePolicyDataContext } from 'lib/hooks/Policy/usePolicyDataContext';
import { POLICY_TABS } from 'lib/hooks/Policy/models';
import { PageWrapperStyles, TabsWrapperStyles } from '../Shared/styles';
import Segments from './Page/Segments';
//import Rules from './Page/Rules';
// import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
// import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import Inventory from './Page/Inventory';
// import Rules from './Page/Rules';

interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { policy } = usePolicyDataContext();
  // const { vendors } = React.useContext<UserContextState>(UserContext);
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    policy.onChangeSelectedTab(newValue);
  };

  return (
    <PageWrapperStyles padding="20px 40px 40px 40px">
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
          <Tab disableRipple label={POLICY_TABS.segments.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(POLICY_TABS.segments.index)} className={classes.tabBigSize} />
          {/* {vendors && vendors[AccountVendorTypes.AMAZON_AWS] && (
            <Tab disableRipple label={POLICY_TABS.rules.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tabBigSize} />
          )} */}
          <Tab disableRipple label={POLICY_TABS.inventory.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(POLICY_TABS.inventory.index)} className={classes.tabBigSize} />
        </Tabs>
      </TabsWrapperStyles>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: policy.selectedTab.index === POLICY_TABS.segments.index ? '1 1 100%' : '0' }}
        value={policy.selectedTab.index}
        index={POLICY_TABS.segments.index}
      >
        <Segments />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: policy.selectedTab.index === POLICY_TABS.inventory.index ? '1 1 100%' : '0' }}
        value={policy.selectedTab.index}
        index={POLICY_TABS.inventory.index}
      >
        <Inventory />
      </TabPanel>
      {/* {vendors && vendors[AccountVendorTypes.AMAZON_AWS] && (
        <TabPanel
          styles={{ display: 'flex', flexDirection: 'column', flex: policy.selectedTab.index === POLICY_TABS.rules.index ? '1 1 100%' : '0' }}
          value={policy.selectedTab.index}
          index={POLICY_TABS.rules.index}
        >
          <Rules />
        </TabPanel>
      )} */}
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
