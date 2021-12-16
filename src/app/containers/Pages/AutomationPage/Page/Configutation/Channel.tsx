import React from 'react';
import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import EmailConfiguration from './EmailConfiguration';
import WebHookConfiguration from './WebHookConfiguration';

interface Props {
  item: IAlertChannel;
  onCreateChannel: (channel: IAlertChannel) => void;
  onAddServer: (_item: IAlertChannel) => void;
}

const Channel: React.FC<Props> = (props: Props) => {
  if (props.item.channelType === AlertChannelType.EMAIL) {
    return <EmailConfiguration channel={props.item} onCreateChannel={props.onCreateChannel} />;
  }
  if (props.item.channelType === AlertChannelType.WEBHOOK) {
    return <WebHookConfiguration onAddServer={props.onAddServer} items={[]} />;
  }
  return null;
};

export default React.memo(Channel);
