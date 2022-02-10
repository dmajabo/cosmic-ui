import React from 'react';
import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import EmailChannelItem from './EmailChannelItem';
import { emailIconSmall } from 'app/components/SVGIcons/automationIcons/email';
import WebhookChannelItem from './WebhookChannelItem';
import { slackIcon } from 'app/components/SVGIcons/automationIcons/slack';
import { DEFAULT_EMAIL_CHANNEL_NAME } from 'lib/hooks/Automation/models';
interface Props {
  id: string;
  channel: IAlertChannel;
}

const TriggerChannel: React.FC<Props> = (props: Props) => {
  if (props.channel.channelType === AlertChannelType.EMAIL) {
    if (!props.channel.emailPolicy) return null;
    return (
      <EmailChannelItem
        emails={props.channel.emailPolicy.receiverEmailIds}
        name={props.channel.name || DEFAULT_EMAIL_CHANNEL_NAME}
        icon={emailIconSmall}
        verificationStatus={props.channel.verificationStatus}
      />
    );
  }
  if (props.channel.channelType === AlertChannelType.WEBHOOK) {
    if (!props.channel.webhookPolicy || !props.channel.webhookPolicy.webhookType || !props.channel.webhookPolicy.webhookUrl) return null;
    return <WebhookChannelItem name={props.channel.webhookPolicy.webhookType} label="Webhook" icon={slackIcon(16)} />;
  }
  return null;
};

export default React.memo(TriggerChannel);
