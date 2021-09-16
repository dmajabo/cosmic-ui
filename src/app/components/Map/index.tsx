import React from 'react';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
// import mockdata from 'utils/data.json';
// import mockdataDevices from 'utils/dataDevices.json';
import { ContainerWithFooter, ContainerWithMetrics, ContainerWithPanel, MapContainer } from './styles';
import HeadeerAction from './HeadeerAction';
import { IDeviceNode, IPanelBar, TopologyMetricsPanelTypes, TopologyPanelTypes, IVm, IWedgeNode } from 'lib/models/topology';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import { useGetTopologyAsync } from 'lib/api/http/useGetTopology';
import PanelBar from 'app/components/Basic/PanelBar';
import Entities from './PanelComponents/EntitiesComponent/Entities';
import GroupsComponent from './PanelComponents/GroupsComponent/GroupsComponent';
import { createTopologyQueryParam, ITopologyDataRes, TopologyGroupApi, TopologyOrganizationApi } from 'lib/api/ApiModels/Topology/endpoints';
import VmPanel from './PanelComponents/NodePanels/VmPanel';
import FooterAction from './FooterAction';
import Graph from './Graph';
import DevicePanel from './PanelComponents/NodePanels/DevicePanel';
import WedgePanel from './PanelComponents/NodePanels/WedgePanel';
interface IProps {}

const Map: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [stateLoad, loadData] = useGetTopologyAsync<ITopologyDataRes>();

  const [showLoading, setShowLoading] = React.useState<boolean>(true);
  const [showPanelBar, setShowPanelBar] = React.useState<IPanelBar<TopologyPanelTypes>>({ show: false, type: null });
  const [showMetricksBar, setShowMetricks] = React.useState<IPanelBar<TopologyMetricsPanelTypes>>({ show: false, type: null });
  const [showFooter, setShowFooter] = React.useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);

  React.useEffect(() => {
    onTryLoadData();
  }, []);

  React.useEffect(() => {
    if (stateLoad && !stateLoad.isLoading && !stateLoad.isError && stateLoad.response && stateLoad.response.item) {
      topology?.onSetData(stateLoad.response.item);
    }
    if (stateLoad && !stateLoad.isLoading && (stateLoad.isError || !stateLoad.response)) {
      topology?.onSetData(null);
    }
    if (showLoading && stateLoad && !stateLoad.isLoading) {
      setShowLoading(false);
    }
  }, [stateLoad]);

  const onOpenPanel = (_panel: TopologyPanelTypes) => {
    setShowFooter(false);
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
    setShowMetricks({ ...showMetricksBar, show: false });
    setTimeout(() => {
      setShowMetricks({ show: false, type: null });
    }, 800);
  };

  const onTryLoadData = async () => {
    let _st = null;
    if (topology.selectedRange && topology.selectedRange.startTime) {
      _st = topology.selectedRange.startTime;
    } else if (topology.selectedRange && topology.selectedRange.selectedDay) {
      _st = topology.selectedRange.selectedDay;
    }
    const param = createTopologyQueryParam(_st);
    await loadData(TopologyGroupApi.getAllGroups(), TopologyOrganizationApi.getAllOrganizations(), param);
  };

  const onReloadData = async (startTime: Date | null) => {
    setShowLoading(true);
    const param = createTopologyQueryParam(startTime);
    await loadData(TopologyGroupApi.getAllGroups(), TopologyOrganizationApi.getAllOrganizations(), param);
  };

  const onRefresh = () => {
    setShowLoading(true);
    onTryLoadData();
  };

  const onOpenNodePanel = (vm: IVm | IDeviceNode | IWedgeNode, _type: TopologyMetricsPanelTypes) => {
    if (showPanelBar && showPanelBar.show) {
      setShowPanelBar({ show: false, type: null });
      setShowFooter(true);
    }
    if (vm && showPanelBar && showPanelBar.dataItem && vm.id === showPanelBar.dataItem.id) {
      return;
    }
    setShowMetricks({ type: _type, show: true, dataItem: vm });
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
                  <Graph
                    links={topology.links}
                    devices={topology.devices}
                    wedges={topology.wedges}
                    vnets={topology.vnets}
                    networksGroups={topology.networksGroups}
                    isFullScreen={isFullScreen}
                    onOpenFullScreen={onOpenFullScreen}
                    onClickVm={onOpenNodePanel}
                    onClickDevice={onOpenNodePanel}
                    onClickWedge={onOpenNodePanel}
                  />
                </>
              )}
              {showLoading && (
                <AbsLoaderWrapper size={40}>
                  <LoadingIndicator margin="auto" />
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
