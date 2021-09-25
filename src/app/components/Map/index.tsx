import React from 'react';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
// import mockdata from 'utils/data.json';
// import mockdataDevices from 'utils/dataDevices.json';
import { ContainerWithFooter, ContainerWithMetrics, ContainerWithPanel, MapContainer } from './styles';
import HeadeerAction from './HeadeerAction';
import { IDeviceNode, IPanelBar, TopologyMetricsPanelTypes, TopologyPanelTypes, IWedgeNode, IVM_PanelDataNode, IAppGroup_PanelDataNode } from 'lib/models/topology';
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
import ApplicationGroupPanel from './PanelComponents/NodePanels/ApplicationGroupPanel';
interface IProps {}

const Map: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const { response, loading, error, onGetChainData } = useGetTopology<ITopologyDataRes>();
  const [showPanelBar, setShowPanelBar] = React.useState<IPanelBar<TopologyPanelTypes>>({ show: false, type: null });
  const [showMetricksBar, setShowMetricks] = React.useState<IPanelBar<TopologyMetricsPanelTypes>>({ show: false, type: null });
  const [showFooter, setShowFooter] = React.useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const showPanelRef = React.useRef(showPanelBar);
  const showMetrickRef = React.useRef(showMetricksBar);
  React.useEffect(() => {
    onTryLoadData();
  }, []);

  React.useEffect(() => {
    if (response !== null) {
      topology?.onSetData(response);
    }
  }, [response]);

  const onOpenPanel = (_panel: TopologyPanelTypes) => {
    const _objPanel = { type: _panel, show: true };
    const _objMetrick = { ...showMetrickRef.current, show: false };
    setShowFooter(false);
    setShowMetricks(_objMetrick);
    setShowPanelBar(_objPanel);
    showMetrickRef.current = _objMetrick;
    showPanelRef.current = _objPanel;
  };

  const onHidePanel = () => {
    setShowFooter(true);
    const _objPanel = { ...showPanelRef.current, show: false };
    setShowPanelBar(_objPanel);
    showPanelRef.current = _objPanel;
    setTimeout(() => {
      const _objPanel = { show: false, type: null };
      setShowPanelBar(_objPanel);
      showPanelRef.current = _objPanel;
    }, 800);
  };

  const onHideMetrics = () => {
    const _objMetrick = { ...showMetrickRef.current, show: false };
    setShowMetricks(_objMetrick);
    showMetrickRef.current = _objMetrick;
    setTimeout(() => {
      const _objMetrick = { show: false, type: null };
      setShowMetricks(_objMetrick);
      showMetrickRef.current = _objMetrick;
    }, 800);
  };

  const onTryLoadData = async () => {
    topology.onSetIsDataLoading();
    const _st = topology.selectedTime || null;
    const param = createTopologyQueryParam(_st);
    await onGetChainData([TopologyGroupApi.getAllGroups(), TopologyOrganizationApi.getAllOrganizations()], ['groups', 'organizations'], param);
  };

  const onReloadData = async (startTime: Date | null) => {
    topology.onSetIsDataLoading();
    const param = createTopologyQueryParam(startTime);
    await onGetChainData([TopologyGroupApi.getAllGroups(), TopologyOrganizationApi.getAllOrganizations()], ['groups', 'organizations'], param);
  };

  const onOpenNodePanel = (node: IDeviceNode | IWedgeNode, _type: TopologyMetricsPanelTypes) => {
    const _objPanel = { ...showPanelRef.current, show: false };
    setShowPanelBar(_objPanel);
    showPanelRef.current = _objPanel;
    setShowFooter(true);
    if (node && showMetricksBar && showMetricksBar.dataItem && node.id === showMetricksBar.dataItem.id) {
      return;
    }
    const _objMetrick = { type: _type, show: true, dataItem: node };
    setShowMetricks(_objMetrick);
    showMetrickRef.current = _objMetrick;
  };

  const onOpenVmPanel = (node: IVM_PanelDataNode) => {
    const _objPanel = { ...showPanelRef.current, show: false };
    setShowPanelBar(_objPanel);
    showPanelRef.current = _objPanel;
    setShowFooter(true);
    if (node && showMetricksBar && showMetricksBar.dataItem && showMetricksBar.dataItem.vm && node.vm.id === showMetricksBar.dataItem.vm.id) {
      return;
    }
    const _objMetrick = { type: TopologyMetricsPanelTypes.VM, show: true, dataItem: node };
    setShowMetricks(_objMetrick);
    showMetrickRef.current = _objMetrick;
  };

  const onOpenAppGroupPanel = (_data: IAppGroup_PanelDataNode) => {
    const _objPanel = { ...showPanelRef.current, show: false };
    setShowPanelBar(_objPanel);
    showPanelRef.current = _objPanel;
    setShowFooter(true);
    if (
      _data &&
      showMetricksBar &&
      showMetricksBar.dataItem &&
      showMetricksBar.dataItem.group &&
      _data.group.id === showMetricksBar.dataItem.group.id &&
      _data.vnet.id === showMetricksBar.dataItem.vnet.id
    ) {
      return;
    }
    const _objMetrick = { type: TopologyMetricsPanelTypes.APPLICATION_GROUP, show: true, dataItem: _data };
    setShowMetricks(_objMetrick);
    showMetrickRef.current = _objMetrick;
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
                  <HeadeerAction onShowPanel={onOpenPanel} onRefresh={onTryLoadData} />
                  <Graph
                    isFullScreen={isFullScreen}
                    onOpenFullScreen={onOpenFullScreen}
                    onClickVm={onOpenVmPanel}
                    onClickAppGroup={onOpenAppGroupPanel}
                    onClickDevice={onOpenNodePanel}
                    onClickWedge={onOpenNodePanel}
                  />
                </>
              )}
              {(loading || !topology.dataReadyToShow) && (
                <AbsLoaderWrapper>
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
              {showMetricksBar.type === TopologyMetricsPanelTypes.APPLICATION_GROUP && <ApplicationGroupPanel dataItem={showMetricksBar.dataItem} />}
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
