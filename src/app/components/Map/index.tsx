import React from 'react';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
// import mockdata from 'utils/data.json';
// import mockdataDevices from 'utils/dataDevices.json';
import { ContainerWithFooter, ContainerWithMetrics, ContainerWithPanel, MapContainer } from './styles';
import HeadeerAction from './HeadeerAction';
import { IDeviceNode, IPanelBar, TopologyMetricsPanelTypes, TopologyPanelTypes, IWedgeNode, IVM_PanelDataNode } from 'lib/models/topology';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import PanelBar from 'app/components/Basic/PanelBar';
import Entities from './PanelComponents/EntitiesComponent/Entities';
import GroupsComponent from './PanelComponents/GroupsComponent/GroupsComponent';
import { createTopologyQueryParam, ITopologyDataRes, TopologyGroupApi, TopologyOrganizationApi } from 'lib/api/ApiModels/Topology/endpoints';
import VmPanel from './PanelComponents/NodePanels/VmPanel';
import FooterAction from './FooterAction';
import Graph from './Graph';
import DevicePanel from './PanelComponents/NodePanels/DevicePanel';
import WedgePanel from './PanelComponents/NodePanels/WedgePanel';
import { useGetTopology } from 'lib/api/http/useAxiosHook';
import { ErrorMessage } from '../Basic/ErrorMessage/ErrorMessage';
interface IProps {}

const Map: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const { response, loading, error, onGetChainData } = useGetTopology<ITopologyDataRes>();
  const [showPanelBar, setShowPanelBar] = React.useState<IPanelBar<TopologyPanelTypes>>({ show: false, type: null });
  const [showMetricksBar, setShowMetricks] = React.useState<IPanelBar<TopologyMetricsPanelTypes>>({ show: false, type: null });
  const [showFooter, setShowFooter] = React.useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);

  React.useEffect(() => {
    onTryLoadData();
  }, []);

  React.useEffect(() => {
    if (response !== null) {
      topology?.onSetData(response);
    }
  }, [response]);

  const onOpenPanel = (_panel: TopologyPanelTypes) => {
    setShowFooter(false);
    topology.onSaveStartTime(false);
    setShowMetricks({ show: false, type: null });
    setShowPanelBar({ type: _panel, show: true });
  };

  const onHidePanel = () => {
    if (showPanelBar.type === TopologyPanelTypes.GROUPS) {
      setShowFooter(true);
    }
    setShowPanelBar({ ...showPanelBar, show: false });
    setTimeout(() => {
      setShowPanelBar({ show: false, type: null });
    }, 800);
  };

  const onHideMetrics = () => {
    topology.onSaveStartTime(false);
    setShowMetricks({ ...showMetricksBar, show: false });
    setTimeout(() => {
      setShowMetricks({ show: false, type: null });
    }, 800);
  };

  const onTryLoadData = async () => {
    let _st = null;
    if (topology.selectedRange && topology.selectedRange.startTime) {
      _st = topology.selectedRange.startTime;
    }
    const param = createTopologyQueryParam(_st);
    await onGetChainData([TopologyGroupApi.getAllGroups(), TopologyOrganizationApi.getAllOrganizations()], ['groups', 'organizations'], param);
  };

  const onReloadData = async (startTime: Date | null) => {
    const param = createTopologyQueryParam(startTime);
    await onGetChainData([TopologyGroupApi.getAllGroups(), TopologyOrganizationApi.getAllOrganizations()], ['groups', 'organizations'], param);
  };

  const onRefresh = () => {
    onTryLoadData();
  };

  const onOpenNodePanel = (node: IDeviceNode | IWedgeNode, _type: TopologyMetricsPanelTypes) => {
    if (showPanelBar && showPanelBar.show) {
      setShowPanelBar({ show: false, type: null });
      setShowFooter(true);
    }
    if (node && showMetricksBar && showMetricksBar.dataItem && node.id === showMetricksBar.dataItem.id) {
      return;
    }
    topology.onSaveStartTime(true);
    setShowMetricks({ type: _type, show: true, dataItem: node });
  };

  const onOpenVmPanel = (node: IVM_PanelDataNode) => {
    if (showPanelBar && showPanelBar.show) {
      setShowPanelBar({ show: false, type: null });
      setShowFooter(true);
    }
    if (node && showMetricksBar && showMetricksBar.dataItem && showMetricksBar.dataItem.vm && node.vm.id === showMetricksBar.dataItem.vm.id) {
      return;
    }
    topology.onSaveStartTime(true);
    setShowMetricks({ type: TopologyMetricsPanelTypes.VM, show: true, dataItem: node });
  };

  const onOpenFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <ContainerWithPanel className={isFullScreen ? 'fullscreen' : ''}>
        <ContainerWithFooter>
          <ContainerWithMetrics className={!showFooter ? 'withPanel' : ''}>
            <MapContainer>
              {topology.originData && (
                <>
                  <HeadeerAction onShowPanel={onOpenPanel} onRefresh={onRefresh} />
                  <Graph isFullScreen={isFullScreen} onOpenFullScreen={onOpenFullScreen} onClickVm={onOpenVmPanel} onClickDevice={onOpenNodePanel} onClickWedge={onOpenNodePanel} />
                </>
              )}
              {loading && (
                <AbsLoaderWrapper size={40}>
                  <LoadingIndicator margin="auto" />
                </AbsLoaderWrapper>
              )}
              {error && (
                <AbsLoaderWrapper width="100%" height="100%">
                  <ErrorMessage fontSize={28} margin="auto">
                    {error.message}
                  </ErrorMessage>
                </AbsLoaderWrapper>
              )}
            </MapContainer>
            <PanelBar show={showMetricksBar.show} onHidePanel={onHideMetrics} type={IPanelBarLayoutTypes.VERTICAL}>
              {showMetricksBar.type === TopologyMetricsPanelTypes.VM && <VmPanel dataItem={showMetricksBar.dataItem} />}
              {showMetricksBar.type === TopologyMetricsPanelTypes.Device && <DevicePanel dataItem={showMetricksBar.dataItem} />}
              {showMetricksBar.type === TopologyMetricsPanelTypes.Wedge && <WedgePanel dataItem={showMetricksBar.dataItem} />}
            </PanelBar>
          </ContainerWithMetrics>
          <FooterAction onTryLoadData={onReloadData} isMetricks={showMetricksBar && showMetricksBar.show} show={showFooter} />
        </ContainerWithFooter>
        <PanelBar show={showPanelBar.show} onHidePanel={onHidePanel} type={IPanelBarLayoutTypes.VERTICAL}>
          {showPanelBar.type === TopologyPanelTypes.ENTITIES && <Entities />}
          {showPanelBar.type === TopologyPanelTypes.GROUPS && <GroupsComponent />}
        </PanelBar>
      </ContainerWithPanel>
    </>
  );
};

export default React.memo(Map);
