import React from 'react';
import { useGet, usePost } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import Setuper from '../Setuper';
import { PageWrapperStyles } from '../../Shared/styles';
import { IEdgeModel } from 'lib/api/ApiModels/Edges/apiModel';
import Editor from '../Editor';
import { useBreadCrumbDataContext } from 'lib/hooks/Breadcrumb/useBreadcrumbDataContext';
import { EdgesBreadCrumbItemsType } from 'lib/hooks/Breadcrumb/models';
import { AccountsApi } from 'lib/api/ApiModels/Accounts/endpoints';
import { IAccountsRes, IAwsRegionsRes } from 'lib/api/ApiModels/Accounts/apiModel';
import { EdgesApi } from 'lib/api/ApiModels/Edges/edpoints';
import EdgeList from '../EdgeList';
interface Props {}

const MainPage: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { breadcrumb } = useBreadCrumbDataContext();
  const { loading, error, response, onGet } = useGet();
  const { response: resRegions, onGet: onGetRegions } = useGet<IAwsRegionsRes>();
  const { response: resAccounts, onGet: onGetAccounts } = useGet<IAccountsRes>();
  const { loading: postLoading, error: postError, response: postResponce } = usePost();
  const { edges } = useEdgesDataContext();
  const [showEditorPage, setShowEditorPage] = React.useState(false);
  const [edgeDataItem, setEdgeDataItem] = React.useState<IEdgeModel>(null);

  React.useEffect(() => {
    onTryLoadEdges();
    onTryLoadRegions();
    onTryToAccounts();
  }, []);

  React.useEffect(() => {
    if (response) {
      edges.onSetData(response);
    }
  }, [response]);

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
    // TO DO
    if (postResponce) {
      console.log(postResponce);
    }
  }, [postResponce]);

  React.useEffect(() => {
    // TO DO
    if (error) {
      edges.onSetData(null);
    }
  }, [error]);

  React.useEffect(() => {
    if (postError) {
      console.log(postError);
    }
  }, [postError]);

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

  const onTryToAccounts = async () => {
    await onGetAccounts(AccountsApi.getAccounts(), userContext.accessToken!);
  };

  const onSaveEdge = async (_data: IEdgeModel) => {
    edges.onUpdateEdges(_data);
    onCloseEditor();
    // await onPost(EdgesApi.postCreateEdge(), _data, userContext.accessToken!);
  };

  const onOpenEditor = (_item?: IEdgeModel) => {
    breadcrumb.onGoToEdges(EdgesBreadCrumbItemsType.CREATE);
    setEdgeDataItem(_item || null);
  };

  const onCloseEditor = () => {
    breadcrumb.onGoToEdges(EdgesBreadCrumbItemsType.EDGES);
    setEdgeDataItem(null);
  };

  const onDeleteEdge = (_item: IEdgeModel) => {
    console.log(_item);
  };

  if (loading) {
    return (
      <AbsLoaderWrapper width="100%" height="100%">
        <LoadingIndicator margin="auto" />
      </AbsLoaderWrapper>
    );
  }

  if (showEditorPage) {
    return <Editor dataItem={edgeDataItem} onClose={onCloseEditor} onSave={onSaveEdge} />;
  }
  if (edges.dataReadyToShow) {
    return (
      <PageWrapperStyles>
        {!edges.data || !edges.data.length ? <Setuper onGoToEditor={onOpenEditor} /> : null}
        {edges.data && edges.data.length && <EdgeList data={edges.data} onCreate={onOpenEditor} onEdit={onOpenEditor} onDelete={onDeleteEdge} />}
        {postLoading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </PageWrapperStyles>
    );
  }

  return null;
};

export default React.memo(MainPage);
