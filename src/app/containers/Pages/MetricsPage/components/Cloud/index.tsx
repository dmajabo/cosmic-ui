import PanelBar from 'app/components/Basic/PanelBar';
import { ContentPanelWrapper } from 'app/components/Basic/PanelBar/styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import { LookbackLabel, LookbackSelectOption, LookbackValue } from 'app/containers/Pages/AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import { PageWithPanelWrapperStyles } from 'app/containers/Pages/Shared/styles';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import { noop } from 'lodash';
import React, { useState } from 'react';
import { TabName } from '../..';
import FilterIcon from '../../icons/performance dashboard/filter';
import { MetricsStyles } from '../../MetricsStyles';
import { ConnectivityHealthSidePanel } from '../Sites/ConnectivityHealthSidePanel';
import { DirectConnectConnectionHealth } from './DirectConnectConnectionHealth';
import { DirectConnectVirtualHealth } from './DirectConnectVirtualHealth';
import { Transit } from './Transit';

interface CloudTabProps {
  readonly selectedTabName: TabName;
}
export const Cloud: React.FC<CloudTabProps> = ({ selectedTabName }) => {
  const classes = MetricsStyles();
  const [showSettingsPanel, setShowSettingsPanel] = useState<boolean>(false);

  const onOpenPanel = () => {
    setShowSettingsPanel(true);
  };
  const onHideSettingsPanel = () => {
    setShowSettingsPanel(false);
  };

  return (
    <ContentPanelWrapper>
      <PageWithPanelWrapperStyles padding="0" width={showSettingsPanel ? 'calc(100% - 520px)' : '100%'}>
        {/* <DirectConnectConnectionHealth selectedTabName={selectedTabName} timeRange={timeRange} onOpenPanel={onOpenPanel} />
        <DirectConnectVirtualHealth selectedTabName={selectedTabName} timeRange={timeRange} /> */}
        <Transit selectedTabName={selectedTabName} />
      </PageWithPanelWrapperStyles>
      <PanelBar
        styles={{ position: 'fixed', top: APP_HEADER_HEIGHT, right: '0', maxHeight: `calc(100% - ${APP_HEADER_HEIGHT})`, zIndex: 11 }}
        maxWidth="520px"
        show={showSettingsPanel}
        onHidePanel={onHideSettingsPanel}
        type={IPanelBarLayoutTypes.VERTICAL}
      >
        {showSettingsPanel && <ConnectivityHealthSidePanel />}
      </PanelBar>
    </ContentPanelWrapper>
  );
};
