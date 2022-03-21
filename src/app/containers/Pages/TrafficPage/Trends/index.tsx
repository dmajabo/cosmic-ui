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

interface Props {}

export const TrendsPage: React.FC<Props> = (props: Props) => {
  const [showSettingsPanel, setShowSettingsPanel] = React.useState<boolean>(false);

  const onOpenPanel = () => {
    setShowSettingsPanel(true);
  };
  const onHideSettingsPanel = () => {
    setShowSettingsPanel(false);
  };

  return (
    <ContentPanelWrapper>
      <PageWithPanelWrapperStyles padding="0" width={showSettingsPanel ? 'calc(100% - 520px)' : '100%'}>
        <HeaderActionsRow />
        <FlowsOverviewComponent onOpenPanel={onOpenPanel} />
        <BandwidthComponent />
        {/* <DroppedFlowsComponent /> */}
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
