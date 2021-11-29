import React from 'react';
import { useDelete, useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { PageWrapperStyles } from '../../Shared/styles';
import { IEdgeP, IEdgesRes } from 'lib/api/ApiModels/Edges/apiModel';
import Editor from '../Editor';
import { useBreadCrumbDataContext } from 'lib/hooks/Breadcrumb/useBreadcrumbDataContext';
import { EdgesBreadCrumbItemsType } from 'lib/hooks/Breadcrumb/models';
import { AccountsApi } from 'lib/api/ApiModels/Accounts/endpoints';
import { IAccountsRes, IAwsRegionsRes } from 'lib/api/ApiModels/Accounts/apiModel';
import { EdgesApi } from 'lib/api/ApiModels/Edges/edpoints';
import EdgeList from '../EdgeList';
import { ITopologyGroupsData, TopologyGroupApi } from 'lib/api/ApiModels/Topology/endpoints';
import EmptyPage from 'app/components/Basic/EmptyPage';
import { StepperText } from 'app/components/Basic/EmptyPage/styles';
import imgBg from 'app/images/EdgesMap.png';
interface Props {}

const MainPage: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { breadcrumb } = useBreadCrumbDataContext();
  const { loading, error, response, onGet } = useGet<IEdgesRes>();
  const { response: resGroupds, onGet: onGetGroups } = useGet<ITopologyGroupsData>();
  const { response: resRegions, onGet: onGetRegions } = useGet<IAwsRegionsRes>();
  const { response: resAccounts, onGet: onGetAccounts } = useGet<IAccountsRes>();
  const { response: resDelete, onDelete: onDeleteEedge } = useDelete<any>();
  const { edges } = useEdgesDataContext();
  const [showEditorPage, setShowEditorPage] = React.useState(false);
  const [edgeDataItem, setEdgeDataItem] = React.useState<IEdgeP>(null);
  const [tempItem, setTempItem] = React.useState<IEdgeP>(null);
  React.useEffect(() => {
    onTryLoadEdges();
    onTryLoadGroups();
    onTryLoadRegions();
    onTryLoadAccounts();
  }, []);

  React.useEffect(() => {
    if (response && response.edgeps) {
      edges.onSetData(response.edgeps);
    }
  }, [response]);

  React.useEffect(() => {
    if (resGroupds && resGroupds.groups) {
      edges.onSetGroups(resGroupds.groups);
    }
  }, [resGroupds]);

  React.useEffect(() => {
    if (resRegions && resRegions.awsRegions) {
      edges.onSetRegions(resRegions.awsRegions);
    }
  }, [resRegions]);

  React.useEffect(() => {
    if (resAccounts && resAccounts.controllers) {
      edges.onSetAccounts(resAccounts.controllers);
    }
  }, [resAccounts]);

  React.useEffect(() => {
    if (resDelete && tempItem) {
      setTempItem(null);
      edges.onDeleteEdge(tempItem.id);
    }
  }, [resDelete]);

  React.useEffect(() => {
    // TO DO
    if (error) {
      edges.onSetData(null);
    }
  }, [error]);

  React.useEffect(() => {
    if (showEditorPage && !breadcrumb.edgesBreadCrumbItems.length) {
      setEdgeDataItem(null);
      setShowEditorPage(false);
      return;
    }
    if (!showEditorPage && breadcrumb.edgesBreadCrumbItems.length) {
      setShowEditorPage(true);
    }
  }, [breadcrumb.edgesBreadCrumbItems]);

  const onTryLoadEdges = async () => {
    await onGet(EdgesApi.getEdges(), userContext.accessToken!);
  };

  const onTryLoadRegions = async () => {
    await onGetRegions(AccountsApi.getAllAwsRegions(), userContext.accessToken!);
  };

  const onTryLoadAccounts = async () => {
    await onGetAccounts(AccountsApi.getAccounts(), userContext.accessToken!);
  };

  const onTryLoadGroups = async () => {
    await onGetGroups(TopologyGroupApi.getAllGroups(), userContext.accessToken!);
  };

  const onOpenEditor = (_item?: IEdgeP) => {
    breadcrumb.onGoToEdges(EdgesBreadCrumbItemsType.CREATE);
    setEdgeDataItem(_item || null);
  };

  const onCloseEditor = () => {
    breadcrumb.onGoToEdges(EdgesBreadCrumbItemsType.EDGES);
    setEdgeDataItem(null);
  };

  const onDeleteEdge = (_item: IEdgeP) => {
    onTryDeleteEdge(_item);
  };

  const onTryDeleteEdge = async (_item: IEdgeP) => {
    setTempItem(_item);
    await onDeleteEedge(EdgesApi.deleteEdge(_item.id), userContext.accessToken!);
  };

  if (loading) {
    return (
      <AbsLoaderWrapper width="100%" height="100%">
        <LoadingIndicator margin="auto" />
      </AbsLoaderWrapper>
    );
  }

  if (showEditorPage) {
    return <Editor dataItem={edgeDataItem} onClose={onCloseEditor} />;
  }
  if (edges.dataReadyToShow) {
    return (
      <PageWrapperStyles>
        {!edges.data || !edges.data.length ? (
          <EmptyPage icon={imgBg} buttonLabel="Create Edge" onClick={() => onOpenEditor()}>
            <StepperText highLight margin="0 auto 20px auto">
              There is no created edges yet
            </StepperText>
            <StepperText margin="0 auto">To create an edge click on the button below.</StepperText>
          </EmptyPage>
        ) : null}
        {edges.data && edges.data.length ? <EdgeList data={edges.data} onCreate={onOpenEditor} onEdit={onOpenEditor} onDelete={onDeleteEdge} /> : null}
      </PageWrapperStyles>
    );
  }

  return null;
};

export default React.memo(MainPage);
