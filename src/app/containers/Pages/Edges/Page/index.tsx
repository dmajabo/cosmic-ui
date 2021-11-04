import React from 'react';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import Setuper from '../Setuper';
import { PageWrapperStyles } from '../../Shared/styles';
import { IEdgeModel } from '../model';
import Editor from '../Editor';
import { useBreadCrumbDataContext } from 'lib/hooks/Breadcrumb/useBreadcrumbDataContext';
import { EdgesBreadCrumbItemsType } from 'lib/hooks/Breadcrumb/models';
interface Props {}

const MainPage: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet();
  const { edges } = useEdgesDataContext();
  const [showEditorPage, setShowEditorPage] = React.useState(false);
  const [edgeDataItem, setEdgeDataItem] = React.useState<IEdgeModel>(null);
  const { breadcrumb } = useBreadCrumbDataContext();
  React.useEffect(() => {
    onTryLoadEdges();
  }, []);

  React.useEffect(() => {
    if (response) {
      edges.onSetData(response);
    }
  }, [response]);

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
    await onGet('api/v1/test', userContext.idToken!);
  };

  const onOpenEditor = (_item?: IEdgeModel) => {
    breadcrumb.onGoToEdges(EdgesBreadCrumbItemsType.CREATE);
    setEdgeDataItem(_item || null);
  };

  const onCloseEditor = () => {
    breadcrumb.onGoToEdges(EdgesBreadCrumbItemsType.EDGES);
    setEdgeDataItem(null);
  };

  if (showEditorPage) {
    return <Editor dataItem={edgeDataItem} onClose={onCloseEditor} />;
  }

  return (
    <PageWrapperStyles>
      {loading && (
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      {edges.dataReadyToShow && <Setuper onGoToEditor={onOpenEditor} />}
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
