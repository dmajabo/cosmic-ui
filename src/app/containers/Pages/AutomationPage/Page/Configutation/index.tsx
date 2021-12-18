import React from 'react';
import { useGet, usePut, usePost } from 'lib/api/http/useAxiosHook';
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
  const { loading: loadingGet, error: getErrorById, response: resGetById, onGet: onGetById } = useGet<IAlertChannel>();
  const { loading: postLoading, error: postError, response: postRes, onPost } = usePost<IAlertChannel, IBaseEntity<string>>();
  const { loading: patchLoading, error: patchError, response: updateRes, onPut } = usePut<IAlertChannel, IAlertChannel>();
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
    if (updateRes && updateRes.id) {
      const _items = dataRows && dataRows.length ? dataRows.slice() : [];
      const _index = _items.findIndex(it => it.id === updateRes.id);
      if (_index !== -1) {
        _items.splice(_index, 1, updateRes);
      } else {
        _items.push(updateRes);
      }
      toast.success('Channel was updated successfully.');
      setDataRows(_items);
    }
  }, [updateRes]);

  React.useEffect(() => {
    if (resGetById) {
      const _items = dataRows.slice();
      const _index = _items.findIndex(it => it.id === resGetById.id);
      if (_index !== -1) {
        _items.splice(_index, 1, resGetById);
        toast.success('Channel was updated successfully.');
      } else {
        _items.push(resGetById);
        toast.success('Channel was created');
      }
      setDataRows(_items);
    }
  }, [resGetById]);

  React.useEffect(() => {
    if (postError || getErrorById || patchError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [postError, getErrorById, patchError]);

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

  const onUpdateChannel = (item: IAlertChannel) => {
    onUpdateChannelById(item.id, item);
  };

  const onSaveChannel = async (_newChannel: IAlertChannel) => {
    await onPost(WorkflowApi.postChannel(), _newChannel, userContext.accessToken!);
  };

  const onUpdateChannelById = async (id: string, _data: IAlertChannel) => {
    await onPut(WorkflowApi.putChannelById(id), _data, userContext.accessToken!);
  };
  return (
    <>
      {dataRows && dataRows.length ? (
        dataRows.map(it => <Channel key={it.id} item={it} onCreateChannel={onCreateChannel} onUpdateChannel={onUpdateChannel} onAddServer={onAddServer} />)
      ) : (
        <EmailConfiguration onCreateChannel={onCreateChannel} onUpdateChannel={onUpdateChannel} />
      )}
      {(loading || postLoading || loadingGet || patchLoading) && (
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
