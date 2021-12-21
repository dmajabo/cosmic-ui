import React from 'react';
import { MainColumn, PanelColumn, Wrapper } from './styles';
import { IDeleteDataModel } from './model';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import FormPanel from './FormPanel';
import EdgesMap from './EdgesMap';
import { DeploymentTypes, IEdgeP } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { IBaseEntity, IModal } from 'lib/models/general';
import ModalComponent from 'app/components/Modal';
import { TopologyGroupTypesAsString } from 'lib/models/topology';
import { useDelete, useGet, usePost, usePut } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteGroupComponent from './Components/DeleteGroupComponent';
import { removeUiFields } from './helper';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';

interface Props {
  onClose: () => void;
}

const Editor: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { edges } = useEdgesDataContext();
  const { loading: postLoading, error: postError, response: postResponce, onPost } = usePost<IEdgeP, IBaseEntity<string>>();
  const { loading: putLoading, error: putError, response: putResponce, onPut } = usePut<IEdgeP, IBaseEntity<string>>();
  const { loading: getLoading, error: getError, response: resEdge, onGet } = useGet<IEdgeP>();
  const { loading: deleteLoading, error: deleteError, response: resDelete, onDelete: onDeleteGroup } = useDelete<any>();

  const [deleteModalData, setDeleteModalData] = React.useState<IModal<IDeleteDataModel>>({ show: false, dataItem: null });

  React.useEffect(() => {
    if (!edges.editEdge) {
      edges.onSetEditEdge(null);
    }
  }, []);

  React.useEffect(() => {
    if (postResponce && postResponce.id) {
      onTryLoadEdge(postResponce.id);
      return;
    } else if (postResponce && !postResponce.id) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [postResponce]);

  React.useEffect(() => {
    if (putResponce && putResponce.id) {
      onTryLoadEdge(putResponce.id);
      return;
    } else if (putResponce && !putResponce.id) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [putResponce]);

  React.useEffect(() => {
    if (resEdge) {
      edges.onUpdateEdges(resEdge);
      props.onClose();
    }
  }, [resEdge]);

  React.useEffect(() => {
    if (getError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [getError]);

  React.useEffect(() => {
    if (postError || putError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [postError, putError]);

  React.useEffect(() => {
    if (resDelete && deleteModalData && deleteModalData.dataItem) {
      toast.success(`Group '${deleteModalData.dataItem.name}' was deleted successfully!`);
      edges.onDeleteGroup(deleteModalData.dataItem.type, deleteModalData.dataItem.id, true);
      setDeleteModalData({ show: false, dataItem: null });
    }
  }, [resDelete]);

  React.useEffect(() => {
    if (deleteError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [deleteError]);

  const onClose = () => {
    props.onClose();
  };

  const onDeleteSitesGroup = (gr: ITopologyGroup, edgeName: string) => {
    setDeleteModalData({
      show: true,
      dataItem: {
        id: gr.id,
        name: gr.name,
        type: TopologyGroupTypesAsString.BRANCH_NETWORKS,
        message: `Are you sure you want to delete “${gr.name}“ group from ${edgeName ? `“${edgeName}“` : 'this edge'}?`,
      },
    });
  };

  const onDeleteAppsGroup = (gr: ITopologyGroup, edgeName: string) => {
    setDeleteModalData({
      show: true,
      dataItem: {
        id: gr.id,
        name: gr.name,
        type: TopologyGroupTypesAsString.APPLICATION,
        message: `Are you sure you want to delete “${gr.name}“ group from ${edgeName ? `“${edgeName}“` : 'this edge'}?`,
      },
    });
  };

  const onDeleteAccept = (id: string, all: boolean) => {
    if (all) {
      onTryDeleteGroup(id);
      return;
    }
    edges.onDeleteGroup(deleteModalData.dataItem.type, deleteModalData.dataItem.id, false);
    setDeleteModalData({ show: false, dataItem: null });
  };

  const onCloseDeleteModal = () => {
    setDeleteModalData({ show: false, dataItem: null });
  };

  const onTryDeleteGroup = async (id: string) => {
    await onDeleteGroup(PolicyApi.deleteGroup(id), userContext.accessToken!);
  };

  const onSave = async () => {
    const _obj: IEdgeP = jsonClone(edges.editEdge);
    if (!_obj.id) {
      delete _obj.id;
      removeUiFields(_obj);
      await onPost(TopoApi.postCreateEdge(), { edge_p: _obj }, userContext.accessToken!);
      return;
    }
    removeUiFields(_obj);
    await onPut(TopoApi.putUpdateEdge(edges.editEdge.id), { edge_p: _obj }, userContext.accessToken!);
  };

  const onTryLoadEdge = async (id: string) => {
    await onGet(TopoApi.getEdgeById(id), userContext.accessToken!);
  };

  if (!edges.editEdge) return null;

  return (
    <>
      <Wrapper>
        <MainColumn>
          <EdgesMap
            name={edges.editEdge.name}
            sites={edges.editEdge.siteGroupIds}
            apps={edges.editEdge.appGroupIds}
            segmentPolicy={edges.editEdge.segmentPolicy}
            transitType={edges.editEdge.deploymentPolicy && edges.editEdge.deploymentPolicy.length ? edges.editEdge.deploymentPolicy[0].deploymentType : DeploymentTypes.EXISTING_GWS}
            selectedRegions={edges.editEdge.deploymentPolicy && edges.editEdge.deploymentPolicy.length ? edges.editEdge.deploymentPolicy[0].regionCode : null}
            selectedWedgeIds={edges.editEdge.deploymentPolicy && edges.editEdge.deploymentPolicy.length ? edges.editEdge.deploymentPolicy[0].wanGwExtIds : null}
          />
        </MainColumn>
        <PanelColumn width="50vw" maxWidth="680px" padding="0">
          <FormPanel onClose={onClose} onSave={onSave} onDeleteSitesGroup={onDeleteSitesGroup} onDeleteAppsGroup={onDeleteAppsGroup} />
        </PanelColumn>
        {(postLoading || getLoading || putLoading) && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </Wrapper>
      {deleteModalData && deleteModalData.show && (
        <ModalComponent modalStyles={{ maxWidth: '450px', maxHeight: '520px' }} useFadeAnimation id="deleteModalWindow" open={deleteModalData && deleteModalData.show} onClose={onCloseDeleteModal}>
          <DeleteGroupComponent data={deleteModalData.dataItem} loading={deleteLoading} onDelete={onDeleteAccept} onClose={onCloseDeleteModal} />
        </ModalComponent>
      )}
      <ToastContainer />
    </>
  );
};

export default React.memo(Editor);
