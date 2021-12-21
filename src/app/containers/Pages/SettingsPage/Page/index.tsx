import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import { PageWrapperStyles, TabsWrapperStyles } from '../../Shared/styles';
import TabPanel from 'app/components/Tabs/TabPanel';
import { SETTINGS_TABS } from 'lib/hooks/Settings/model';
import { useSettingsDataContext } from 'lib/hooks/Settings/useSettingsDataContenxt';
// import AdminPage from 'app/containers/Pages/SettingsPage/Admin';
import Logging from '../Logging';
import Inventory from '../Inventory';
import Accounts from '../Accounts';

interface IProps {}

const Page: React.FC<IProps> = (props: IProps) => {
  const { settings } = useSettingsDataContext();
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    settings.onChangeSelectedTab(newValue);
  };

  return (
    <PageWrapperStyles>
      <TabsWrapperStyles>
        <Tabs
          value={settings.selectedTab.index}
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
          {SETTINGS_TABS.map(it => (
            <Tab key={`settingsTab${it.id}`} label={it.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
          ))}
        </Tabs>
      </TabsWrapperStyles>
      {/* <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: settings.selectedTab.index === SETTINGS_TABS[0].index ? '1 1 100%' : '0' }}
        value={settings.selectedTab.index}
        index={SETTINGS_TABS[0].index}
      >
        <AdminPage />
      </TabPanel> */}
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: settings.selectedTab.index === SETTINGS_TABS[0].index ? '1 1 100%' : '0' }}
        value={settings.selectedTab.index}
        index={SETTINGS_TABS[0].index}
      >
        <Logging />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: settings.selectedTab.index === SETTINGS_TABS[1].index ? '1 1 100%' : '0' }}
        value={settings.selectedTab.index}
        index={SETTINGS_TABS[1].index}
      >
        <Accounts />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: settings.selectedTab.index === SETTINGS_TABS[2].index ? '1 1 100%' : '0' }}
        value={settings.selectedTab.index}
        index={SETTINGS_TABS[2].index}
      >
        <Inventory />
      </TabPanel>
    </PageWrapperStyles>
  );
};

export default React.memo(Page);
