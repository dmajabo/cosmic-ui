import React from 'react';
import { useGet, usePut, usePost, useDelete } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { AlertChannelType, createChannel, IAlertChannel, IAlertChannelRes } from 'lib/api/ApiModels/Workflow/apiModel';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import EmailConfiguration from './EmailConfiguration';
// import WebHookConfiguration from './WebHookConfiguration';
import { IBaseEntity, IModal } from 'lib/models/general';
import { toast, ToastContainer } from 'react-toastify';
import ModalComponent from 'app/components/Modal';
import ServerEditor from './WebHookConfiguration/ServerEditor';
import Channel from './Channel';
import { ActionPart, ActionRowStyles } from 'app/containers/Pages/Shared/styles';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import NewChannel from './NewChannel';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
interface Props {}

const Configutation: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IAlertChannelRes>();
  const { loading: loadingGet, error: getErrorById, response: resGetById, onGet: onGetById } = useGet<IAlertChannel>();
  const { loading: postLoading, error: postError, response: postRes, onPost } = usePost<IAlertChannel, IBaseEntity<string>>();
  const { loading: putLoading, error: putError, response: updateRes, onPut } = usePut<IAlertChannel, IAlertChannel>();
  const { loading: deleteLoading, error: deleteError, response: deleteRes, onDelete } = useDelete<IBaseEntity<string>>();
  const [dataRows, setDataRows] = React.useState<IAlertChannel[]>([]);
  const [showServerModal, setShowServerModal] = React.useState<IModal<IAlertChannel>>({ show: false, dataItem: null });
  const [showCreateChannel, setShowCreateModal] = React.useState<IModal<IAlertChannel>>({ show: false, dataItem: null });
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
    if (deleteRes && deleteRes.id) {
      const _items = dataRows.filter(it => it.id !== deleteRes.id);
      toast.success('Channel was deleted successfully.');
      setDataRows(_items);
    }
  }, [deleteRes]);

  React.useEffect(() => {
    if (postError || getErrorById || putError || deleteError) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [postError, getErrorById, putError, deleteError]);

  React.useEffect(() => {
    if (error && error.message) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [error]);

  React.useEffect(() => {
    if (response) {
      setDataRows(
        response.channels.sort((a, b) => {
          if (a.channelType === AlertChannelType.EMAIL) return -1;
          if (b.channelType === AlertChannelType.WEBHOOK) return 1;
          return 0;
        }),
      );
    }
  }, [response]);

  const onCreateNewChannel = () => {
    const _channel: IAlertChannel = createChannel(AlertChannelType.EMAIL);
    setShowCreateModal({ show: true, dataItem: _channel });
  };

  const onCloseChannelModal = () => {
    setShowCreateModal({ show: false, dataItem: null });
  };

  const onAddServer = (_item: IAlertChannel) => {
    setShowServerModal({ show: true, dataItem: _item });
  };

  const onCloseServerModal = () => {
    setShowServerModal({ show: false, dataItem: null });
  };

  const onTryLoadAlertChannels = async () => {
    await onGet(AlertApi.getAllChannels(), userContext.accessToken!);
  };

  const onTryLoadChannel = async (id: string) => {
    await onGetById(AlertApi.getChannelById(id), userContext.accessToken!);
  };

  const onCreateChannel = (item: IAlertChannel) => {
    onSaveChannel(item);
  };

  const onUpdateChannel = (item: IAlertChannel) => {
    onUpdateChannelById(item.id, item);
  };

  const onSaveNewChannel = (item: IAlertChannel) => {
    setShowCreateModal({ show: false, dataItem: null });
    onSaveChannel(item);
  };

  const onDeleteChannel = (item: IAlertChannel) => {
    onTryDelete(item.id);
  };

  const onTryDelete = async (id: string) => {
    await onDelete(AlertApi.deleteChannel(id), userContext.accessToken!);
  };

  const onSaveChannel = async (_newChannel: IAlertChannel) => {
    if (_newChannel.channelType === AlertChannelType.EMAIL) {
      delete _newChannel.webhookPolicy;
    }
    if (_newChannel.channelType === AlertChannelType.WEBHOOK) {
      delete _newChannel.emailPolicy;
    }
    await onPost(AlertApi.postChannel(), _newChannel, userContext.accessToken!);
  };

  const onUpdateChannelById = async (id: string, _data: IAlertChannel) => {
    await onPut(AlertApi.putChannelById(id), _data, userContext.accessToken!);
  };
  return (
    <>
      <ActionRowStyles>
        <ActionPart margin="0 0 0 auto" justifyContent="flex-end">
          <PrimaryButton height="50px" label="Create Channel" icon={addIcon} onClick={onCreateNewChannel} />
        </ActionPart>
      </ActionRowStyles>
      {dataRows && dataRows.length ? (
        dataRows.map(it => (
          <Channel key={`channel${it.id}`} item={it} onDeleteChannel={onDeleteChannel} onCreateChannel={onCreateChannel} onUpdateChannel={onUpdateChannel} onAddServer={onAddServer} />
        ))
      ) : (
        <>
          <EmailConfiguration onCreateChannel={onCreateChannel} onUpdateChannel={onUpdateChannel} />
          {/* <WebHookConfiguration items={[]} onAddServer={onAddServer} /> */}
        </>
      )}
      {(loading || postLoading || loadingGet || putLoading || deleteLoading) && (
        <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      {showCreateChannel && showCreateChannel.show && (
        <ModalComponent
          modalStyles={{ maxWidth: '580px', maxHeight: '610px' }}
          useFadeAnimation
          id="newChannelModalWindow"
          open={showCreateChannel && showCreateChannel.show}
          onClose={onCloseChannelModal}
          showHeader
          showCloseButton
          title="Create Channel"
        >
          <NewChannel dataItem={showCreateChannel.dataItem} onClose={onCloseChannelModal} onSave={onSaveNewChannel} />
        </ModalComponent>
      )}
      {showServerModal && showServerModal.show && (
        <ModalComponent
          modalStyles={{ maxWidth: '580px', maxHeight: '610px' }}
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
