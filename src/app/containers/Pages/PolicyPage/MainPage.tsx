import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { usePolicyDataContext } from 'lib/hooks/Policy/usePolicyDataContext';
import { PolicyTabTypes, POLICY_TABS } from 'lib/hooks/Policy/models';
import { PageWrapperStyles, TabsWrapperStyles } from '../Shared/styles';
import Segments from './Page/Segments';
//import Rules from './Page/Rules';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { GetControllerVendorResponse } from 'lib/api/http/SharedTypes';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';

interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { policy } = usePolicyDataContext();
  const classes = TabsStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const { response: vendorResponse, onGet: onGetVendors } = useGet<GetControllerVendorResponse>();
  const [isAwsConfigured, setIsAwsConfigured] = useState<boolean>(false);

  useEffect(() => {
    onGetVendors(PolicyApi.getControllerVendors(), userContext.accessToken!);
  }, []);

  useEffect(() => {
    if (vendorResponse && vendorResponse.vendors && vendorResponse.vendors.length) {
      setIsAwsConfigured(vendorResponse.vendors.includes(AccountVendorTypes.AMAZON_AWS) ? true : false);
    }
  }, [vendorResponse]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    policy.onChangeSelectedTab(newValue);
  };

  const getPolicyTabs = () => (isAwsConfigured ? POLICY_TABS : POLICY_TABS.filter(tab => tab.id !== PolicyTabTypes.Rules));

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
          {getPolicyTabs().map(it => (
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
      {/* {isAwsConfigured && (
        <TabPanel
          styles={{ display: 'flex', flexDirection: 'column', flex: policy.selectedTab.index === POLICY_TABS[1].index ? '1 1 100%' : '0' }}
          value={policy.selectedTab.index}
          index={POLICY_TABS[1].index}
        >
          <Rules />
        </TabPanel>
      )} */}
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
