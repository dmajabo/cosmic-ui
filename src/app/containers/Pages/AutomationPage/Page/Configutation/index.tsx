import React from 'react';
import { useGet, usePost } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { IAlertChannel, IAlertChannelRes } from 'lib/api/ApiModels/Workflow/apiModel';
import { WorkflowApi } from 'lib/api/ApiModels/Workflow/endpoints';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import EmailConfiguration from './EmailConfiguration';
// import WebHookConfiguration from './WebHookConfiguration';
import { IBaseEntity, IModal } from 'lib/models/general';
import { toast, ToastContainer } from 'react-toastify';
import ModalComponent from 'app/components/Modal';
import ServerEditor from './WebHookConfiguration/ServerEditor';
import Channel from './Channel';
interface Props {}

const Configutation: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IAlertChannelRes>();
  const { loading: loadingGet, error: getErrorById, response: resGetById, onGet: onGetById } = useGet<IAlertChannelRes>();
  const { loading: postLoading, error: postError, response: postRes, onPost } = usePost<IAlertChannel, IBaseEntity<string>>();
  const [dataRows, setDataRows] = React.useState<IAlertChannel[]>([]);
  const [showServerModal, setShowServerModal] = React.useState<IModal<IAlertChannel>>({ show: false, dataItem: null });
  React.useEffect(() => {
    onTryLoadAlertChannels();
  }, []);

  React.useEffect(() => {
    if (postRes && postRes.id) {
      onTryLoadChannel(postRes.id);
    }
  }, [postRes]);

  React.useEffect(() => {
    if (resGetById) {
      console.log(resGetById);
      toast.success('Channel was created');
    }
  }, [resGetById]);

  React.useEffect(() => {
    if (postError || getErrorById) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [postError, getErrorById]);

  React.useEffect(() => {
    if (error && error.message) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [error]);

  React.useEffect(() => {
    if (response) {
      setDataRows(response.channels);
    }
  }, [response]);

  const onAddServer = (_item: IAlertChannel) => {
    setShowServerModal({ show: true, dataItem: _item });
  };

  const onCloseServerModal = () => {
    setShowServerModal({ show: false, dataItem: null });
  };

  const onTryLoadAlertChannels = async () => {
    await onGet(WorkflowApi.getAllChannels(), userContext.accessToken!);
  };

  const onTryLoadChannel = async (id: string) => {
    await onGetById(WorkflowApi.getChannelById(id), userContext.accessToken!);
  };

  const onCreateChannel = (item: IAlertChannel) => {
    onSaveChannel(item);
  };

  const onSaveChannel = async (_newChannel: IAlertChannel) => {
    await onPost(WorkflowApi.postChannel(), _newChannel, userContext.accessToken!);
  };
  return (
    <>
      {dataRows && dataRows.length ? (
        dataRows.map(it => <Channel key={it.id} item={it} onCreateChannel={onCreateChannel} onAddServer={onAddServer} />)
      ) : (
        <EmailConfiguration onCreateChannel={onCreateChannel} />
      )}
      {(loading || postLoading || loadingGet) && (
        <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      {showServerModal && showServerModal.show && (
        <ModalComponent
          modalStyles={{ maxWidth: '580px', maxHeight: '610px', padding: '40px' }}
          useFadeAnimation
          id="addServerModalWindow"
          open={showServerModal && showServerModal.show}
          onClose={onCloseServerModal}
          showHeader
          showCloseButton
          title={showServerModal && showServerModal.dataItem && showServerModal.dataItem.id ? 'Update Server' : 'Add Server'}
        >
          <ServerEditor dataItem={showServerModal.dataItem} onClose={onCloseServerModal} />
        </ModalComponent>
      )}
      <ToastContainer />
    </>
  );
};
export default React.memo(Configutation);
