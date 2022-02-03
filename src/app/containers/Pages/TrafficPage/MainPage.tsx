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
import { IPreferenceRes, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { useGet } from 'lib/api/http/useAxiosHook';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { sessions } = useSessionsDataContext();
  const { traffic } = useTrafficDataContext();
  const { response: getRes, loading, onGet: onGetPreferrences } = useGet<IPreferenceRes>();
  const { response: getStitchRes, loading: stitchloading, onGet: onGetStitchPreferrences } = useGet<IPreferenceRes>();
  const { response: trendsRes, loading: trendsLoading, onGet: onGetTrendsPreferrences } = useGet<IPreferenceRes>();
  const classes = TabsStyles();

  React.useEffect(() => {
    onTryLoadTrendsPreferences();
    onTryLoadPreferences();
    onTryLoadStitchPreferences();
  }, []);

  React.useEffect(() => {
    if (trendsRes) {
      traffic.onSetFlowRangePreference(trendsRes);
    }
  }, [trendsRes]);

  React.useEffect(() => {
    if (getRes) {
      sessions.onSetLogPreference(getRes);
    }
  }, [getRes]);

  React.useEffect(() => {
    if (getStitchRes) {
      sessions.onSetLogStitchPreference(getStitchRes);
    }
  }, [getStitchRes]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    traffic.onChangeSelectedTab(newValue);
  };

  const onTryLoadPreferences = async () => {
    await onGetPreferrences(PolicyApi.getPreferenceByKey(USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_FALSE, userContext.user.sub), userContext.accessToken!);
  };
  const onTryLoadStitchPreferences = async () => {
    await onGetStitchPreferrences(PolicyApi.getPreferenceByKey(USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_TRUE, userContext.user.sub), userContext.accessToken!);
  };
  const onTryLoadTrendsPreferences = async () => {
    await onGetTrendsPreferrences(PolicyApi.getPreferenceByKey(USER_PREFERENCE_KEYS.FLOWS_OVERRVIEW_SETTINGS_RANGES, userContext.user.sub), userContext.accessToken!);
  };

  if (loading || stitchloading || trendsLoading) {
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
