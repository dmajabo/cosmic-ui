import React from 'react';
import { useGet, usePost } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { IAlertChannel, IAlertChannelRes } from 'lib/api/ApiModels/Workflow/apiModel';
import { WorkflowApi } from 'lib/api/ApiModels/Workflow/endpoints';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import EmailConfiguration from './EmailConfiguration';
import WebHookConfiguration from './WebHookConfiguration';
import { IBaseEntity } from 'lib/models/general';
import { toast, ToastContainer } from 'react-toastify';
interface Props {}

const Configutation: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IAlertChannelRes>();
  const { loading: loadingGet, error: getErrorById, response: resGetById, onGet: onGetById } = useGet<IAlertChannelRes>();
  const { loading: postLoading, error: postError, response: postRes, onPost } = usePost<IAlertChannel, IBaseEntity<string>>();
  const [dataRows, setDataRows] = React.useState<IAlertChannel[]>([]);

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
        <>Res Data items</>
      ) : (
        <>
          <EmailConfiguration onCreateChannel={onCreateChannel} />
          <WebHookConfiguration items={[]} />
        </>
      )}

      {(loading || postLoading || loadingGet) && (
        <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      <ToastContainer />
    </>
  );
};
export default React.memo(Configutation);
