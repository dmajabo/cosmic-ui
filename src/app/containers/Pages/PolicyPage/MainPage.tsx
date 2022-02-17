import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { usePolicyDataContext } from 'lib/hooks/Policy/usePolicyDataContext';
import { InventoryPanelTypes, POLICY_TABS } from 'lib/hooks/Policy/models';
import { PageWrapperStyles, PageWrapperWithPanelStyles, TabsWrapperStyles } from '../Shared/styles';
import Segments from './Page/Segments';
//import Rules from './Page/Rules';
// import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
// import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import Inventory from './Page/Inventory';
// import ResizablePanel from 'app/components/Basic/PanelBar/ResizablePanel';
import RoutesPanel from './Page/Inventory/Panels/RoutesPanel';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';
// import { OKULIS_LOCAL_STORAGE_KEYS } from 'lib/api/http/utils';
import PanelBar from 'app/components/Basic/PanelBar';
import SecurityGroupsPanel from './Page/Inventory/Panels/SecurityGroupsPanel';
import { INetworkRouteTable, INetworkSecurityGroup } from 'lib/api/ApiModels/Topology/apiModels';
// import Rules from './Page/Rules';

interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { policy } = usePolicyDataContext();
  // const [panelWidth, setPanelWidth] = React.useState<number>(0);
  // const { vendors } = React.useContext<UserContextState>(UserContext);

  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    policy.onChangeSelectedTab(newValue);
  };

  const onHidePanel = () => {
    policy.onClosePanel();
  };

  // const onPanelWidthChange = (w: number) => {
  //   setPanelWidth(w);
  // };

  return (
    <PageWrapperWithPanelStyles>
      {/* style={{ width: `calc(100% - ${panelWidth}px)` }} */}
      <PageWrapperStyles style={{ width: policy && policy.panel && policy.panel.show ? 'calc(100% - 520px)' : '100%', flexGrow: 'unset' }} padding="20px 40px 40px 40px">
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
      {policy.selectedTab.index === POLICY_TABS.inventory.index && (
        <PanelBar
          show={policy && policy.panel && policy.panel.show}
          onHidePanel={onHidePanel}
          maxWidth="520px"
          styles={{ transition: 'none', position: 'fixed', top: APP_HEADER_HEIGHT, right: 0, height: `calc(100vh - ${APP_HEADER_HEIGHT})`, zIndex: 12 }}
        >
          {policy && policy.panel && policy.panel.type === InventoryPanelTypes.Routes && <RoutesPanel dataItem={policy.panel.dataItem as INetworkRouteTable[]} />}
          {policy && policy.panel && policy.panel.type === InventoryPanelTypes.SecurityGroups && <SecurityGroupsPanel dataItem={policy.panel.dataItem as INetworkSecurityGroup[]} />}
        </PanelBar>
      )}
    </PageWrapperWithPanelStyles>
  );
};

export default React.memo(MainPage);
