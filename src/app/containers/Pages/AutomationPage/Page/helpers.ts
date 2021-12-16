import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';

export const createChannel = (type: AlertChannelType): IAlertChannel => {
  const _obj: IAlertChannel = {
    id: '',
    name: '',
    channelType: type,
    emailPolicy: {
      receiverEmailIds: [],
      emailSubjectPrefix: '',
    },
  };
  return _obj;
};
