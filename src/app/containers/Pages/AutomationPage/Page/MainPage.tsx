import React, { useContext } from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import { PageWrapperStyles, TabsWrapperStyles } from '../../Shared/styles';
import TabPanel from 'app/components/Tabs/TabPanel';
import { AUTOMATIONS_TABS, AutomationTabTypes } from 'lib/hooks/Automation/models';
import { useAutomationDataContext } from 'lib/hooks/Automation/useAutomationDataContext';
import Triggers from './Triggers';
import Configutation from './Configutation';
import Accounts from './Accounts';
import { Summary } from './Summary';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { IObject } from 'lib/models/general';

interface IProps {}

const getAutomationTabs = (vendors: IObject<AccountVendorTypes>) =>
  vendors.hasOwnProperty(AccountVendorTypes.CISCO_MERAKI) ? AUTOMATIONS_TABS : AUTOMATIONS_TABS.filter(tab => tab.id !== AutomationTabTypes.Summary);

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { automation } = useAutomationDataContext();
  const classes = TabsStyles();
  const userContext = useContext<UserContextState>(UserContext);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    automation.onChangeSelectedTab(newValue);
  };

  return (
    <PageWrapperStyles>
      <TabsWrapperStyles>
        <Tabs
          value={automation.selectedTab.index}
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
          {getAutomationTabs(userContext.vendors).map(it => (
            <Tab disableRipple key={`automationKey${it.id}`} label={it.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
          ))}
        </Tabs>
      </TabsWrapperStyles>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: automation.selectedTab.index === AUTOMATIONS_TABS[0].index ? '1 1 100%' : '0' }}
        value={automation.selectedTab.index}
        index={AUTOMATIONS_TABS[0].index}
      >
        <Triggers />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: automation.selectedTab.index === AUTOMATIONS_TABS[1].index ? '1 1 100%' : '0' }}
        value={automation.selectedTab.index}
        index={AUTOMATIONS_TABS[1].index}
      >
        <Configutation />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: automation.selectedTab.index === AUTOMATIONS_TABS[2].index ? '1 1 100%' : '0' }}
        value={automation.selectedTab.index}
        index={AUTOMATIONS_TABS[2].index}
      >
        <Accounts />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: automation.selectedTab.index === AUTOMATIONS_TABS[3].index ? '1 1 100%' : '0' }}
        value={automation.selectedTab.index}
        index={AUTOMATIONS_TABS[3].index}
      >
        <Summary />
      </TabPanel>
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
