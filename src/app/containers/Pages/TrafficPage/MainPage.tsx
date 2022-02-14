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
import { buildPreferenceKey, getPreferenceByKey, IPolicysvcListUiPreferenceRequest, IPolicysvcListUiPreferenceResponse, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { usePost } from 'lib/api/http/useAxiosHook';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { sessions } = useSessionsDataContext();
  const { traffic } = useTrafficDataContext();
  const { response, loading, onPost: onGetPreferrences } = usePost<IPolicysvcListUiPreferenceRequest, IPolicysvcListUiPreferenceResponse>();
  const [isDataLoaded, setDataLoaded] = React.useState<boolean>(false);

  const classes = TabsStyles();

  React.useEffect(() => {
    onTryLoadPreferences();
    setDataLoaded(true);
  }, []);

  React.useEffect(() => {
    if (response) {
      const _rangePref = getPreferenceByKey(response, buildPreferenceKey(USER_PREFERENCE_KEYS.FLOWS_OVERRVIEW_SETTINGS_RANGES, userContext.user.sub));
      const _sttichOn = getPreferenceByKey(response, buildPreferenceKey(USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_TRUE, userContext.user.sub));
      const _sttichOff = getPreferenceByKey(response, buildPreferenceKey(USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_FALSE, userContext.user.sub));
      traffic.onSetFlowRangePreference(_rangePref);
      sessions.onSetLogPreference(_sttichOff, _sttichOn);
    }
  }, [response]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    traffic.onChangeSelectedTab(newValue);
  };

  const onTryLoadPreferences = async () => {
    const _obj: IPolicysvcListUiPreferenceRequest = {
      userKeys: [
        { userId: userContext.user.sub, prefKey: buildPreferenceKey(USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_FALSE, userContext.user.sub) },
        { userId: userContext.user.sub, prefKey: buildPreferenceKey(USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_TRUE, userContext.user.sub) },
        { userId: userContext.user.sub, prefKey: buildPreferenceKey(USER_PREFERENCE_KEYS.FLOWS_OVERRVIEW_SETTINGS_RANGES, userContext.user.sub) },
      ],
    };
    await onGetPreferrences(PolicyApi.getPostPreferencesList(), _obj, userContext.accessToken!);
  };

  if (loading || !isDataLoaded) {
    return (
      <PageWrapperStyles padding="20px 40px 40px 40px">
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      </PageWrapperStyles>
    );
  }

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
          <Tab disableRipple label={TRAFFIC_TABS.trends.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
          <Tab disableRipple label={TRAFFIC_TABS.logs.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
        </Tabs>
      </TabsWrapperStyles>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: traffic.selectedTab.index === TRAFFIC_TABS.trends.index ? '1 1 100%' : '0' }}
        value={traffic.selectedTab.index}
        index={TRAFFIC_TABS.trends.index}
      >
        <TrendsPage />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: traffic.selectedTab.index === TRAFFIC_TABS.logs.index ? '1 1 100%' : '0' }}
        value={traffic.selectedTab.index}
        index={TRAFFIC_TABS.logs.index}
      >
        <SessionPage />
      </TabPanel>
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
