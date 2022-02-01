import React from 'react';
import HeaderActionsRow from './Components/HeaderActionsRow';
import DroppedFlowsComponent from './Components/DroppedFlowsComponent';
import BandwidthComponent from './Components/BandwidthComponent';
import FlowsOverviewComponent from './Components/FlowsOverviewComponent';
import { ContentPanelWrapper } from 'app/components/Basic/PanelBar/styles';
import { PageWithPanelWrapperStyles } from '../../Shared/styles';
import PanelBar from 'app/components/Basic/PanelBar';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import FlowsOverviewSettings from './Components/FlowsOverviewComponent/FlowsOverviewSettings';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { IPreferenceRes, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';

interface Props {}

export const TrendsPage: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const [showSettingsPanel, setShowSettingsPanel] = React.useState<boolean>(false);
  const { response: getRes, onGet: onGetPreferrences } = useGet<IPreferenceRes>();

  React.useEffect(() => {
    onTryLoadPreferences();
  }, []);
  React.useEffect(() => {
    if (getRes) {
      traffic.onSetFlowRangePreference(getRes);
    }
  }, [getRes]);

  const onOpenPanel = () => {
    setShowSettingsPanel(true);
  };
  const onHideSettingsPanel = () => {
    setShowSettingsPanel(false);
  };

  const onTryLoadPreferences = async () => {
    await onGetPreferrences(PolicyApi.getPreferenceByKey(USER_PREFERENCE_KEYS.FLOWS_OVERRVIEW_SETTINGS_RANGES, userContext.user.sub), userContext.accessToken!);
  };
  return (
    <ContentPanelWrapper>
      <PageWithPanelWrapperStyles padding="0" width={showSettingsPanel ? 'calc(100% - 520px)' : '100%'}>
        <HeaderActionsRow />
        <DroppedFlowsComponent />
        <BandwidthComponent />
        <FlowsOverviewComponent onOpenPanel={onOpenPanel} />
      </PageWithPanelWrapperStyles>
      <PanelBar
        styles={{ position: 'fixed', top: APP_HEADER_HEIGHT, right: '0', maxHeight: `calc(100% - ${APP_HEADER_HEIGHT})`, zIndex: 11 }}
        maxWidth="520px"
        show={showSettingsPanel}
        onHidePanel={onHideSettingsPanel}
        type={IPanelBarLayoutTypes.VERTICAL}
      >
        {showSettingsPanel && <FlowsOverviewSettings />}
      </PanelBar>
    </ContentPanelWrapper>
  );
};

export default React.memo(TrendsPage);
