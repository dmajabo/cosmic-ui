import React, { useContext } from 'react';
import { ContainerWithFooter, TopoContainer, MapContainer } from './styles';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { DATA_READY_STATE } from 'lib/models/general';
// import PanelBar from 'app/components/Basic/PanelBar';
// import Entities from './PanelComponents/EntitiesComponent/Entities';
// import GroupsComponent from './PanelComponents/GroupsComponent/GroupsComponent';
import { ITopologyDataRes } from 'lib/api/ApiModels/Topology/apiModels';
import FooterAction from './FooterAction';
import Graph from './Graph';
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { createTopologyQueryParam, ITopologyQueryParam } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';

interface IProps {}

const TopoMapV2: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData<ITopologyDataRes>();
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  React.useEffect(() => {
    onTryLoadData();
  }, []);

  React.useEffect(() => {
    if (response !== null) {
      topology.onSetData(response);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      topology.onSetIsDataReadyToShow(DATA_READY_STATE.ERROR);
    }
  }, [error]);

  const onOpenFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onTryLoadData = async () => {
    topology.onSetIsDataReadyToShow(DATA_READY_STATE.LOADING);
    const _st = topology.selectedTime || null;
    const param: ITopologyQueryParam = createTopologyQueryParam(_st);
    await onGetChainData([PolicyApi.getAllGroups(), TopoApi.getAllOrganizations()], ['groups', 'organizations'], userContext.accessToken!, param);
  };

  const onReloadData = async (startTime: Date | null) => {
    topology.onSetIsDataReadyToShow(DATA_READY_STATE.LOADING);
    const param: ITopologyQueryParam = createTopologyQueryParam(startTime);
    await onGetChainData([PolicyApi.getAllGroups(), TopoApi.getAllOrganizations()], ['groups', 'organizations'], userContext.accessToken!, param);
  };

  return (
    <>
      <TopoContainer className={isFullScreen ? 'fullscreen' : ''}>
        <ContainerWithFooter>
          <MapContainer>
            {topology.originData && <Graph isFullScreen={isFullScreen} onReload={onTryLoadData} onOpenFullScreen={onOpenFullScreen} />}
            {(loading || topology.dataReadyToShow === DATA_READY_STATE.LOADING) && (
              <AbsLoaderWrapper>
                <LoadingIndicator margin="auto" />
              </AbsLoaderWrapper>
            )}
            {(error || topology.dataReadyToShow === DATA_READY_STATE.ERROR) && (
              <AbsLoaderWrapper width="100%" height="100%">
                <ErrorMessage fontSize={28} margin="auto">
                  {error && error.message ? error.message : 'Something went wrong. Please refresh page'}
                </ErrorMessage>
              </AbsLoaderWrapper>
            )}
          </MapContainer>
          {topology.originData && <FooterAction show onTryLoadData={onReloadData} isMetricks={topology.topoPanel && topology.topoPanel.show} />}
        </ContainerWithFooter>
        {/* <PanelBar show={showPanelBar.show} onHidePanel={onHidePanel} type={IPanelBarLayoutTypes.VERTICAL}>
          {showPanelBar.type === TopologyPanelTypes.ENTITIES && <Entities />}
          {showPanelBar.type === TopologyPanelTypes.GROUPS && <GroupsComponent />}
        </PanelBar> */}
      </TopoContainer>
    </>
  );
};

export default React.memo(TopoMapV2);
