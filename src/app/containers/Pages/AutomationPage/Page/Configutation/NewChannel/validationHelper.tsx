import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { IObject } from 'lib/models/general';

export const channelValidator = (channel: IAlertChannel): IObject<string> => {
  if (!channel) return null;
  if (!channel.name || !channel.name.length) return { name: 'Name field is required' };
  if (!channel.channelType) return { channelType: 'Type field is required' };
  if (channel.channelType === AlertChannelType.EMAIL && !channel.emailPolicy) return { emailPolicy: 'Policy is required' };
  if (channel.channelType === AlertChannelType.WEBHOOK && !channel.webhookPolicy) return { webhookPolicy: 'Policy is required' };
  if (channel.channelType === AlertChannelType.WEBHOOK && channel.webhookPolicy && !channel.webhookPolicy.webhookType) return { webhookType: 'Webhook type is required' };
  if (channel.channelType === AlertChannelType.WEBHOOK && channel.webhookPolicy) {
    if (!channel.webhookPolicy.webhookUrl) {
      return { webhookUrl: 'Webhook url is required' };
    }
    const isValidUrl = validURL(channel.webhookPolicy.webhookUrl);
    if (!isValidUrl) return { webhookUrl: 'Webhook url invalid' };
  }
  return null;
};

const validURL = str => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};
