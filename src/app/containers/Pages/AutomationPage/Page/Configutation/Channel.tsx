import React from 'react';
import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import EmailConfiguration from './EmailConfiguration';
import WebHookConfiguration from './WebHookConfiguration';

interface Props {
  item: IAlertChannel;
  onCreateChannel: (channel: IAlertChannel) => void;
  onUpdateChannel: (channel: IAlertChannel) => void;
  onAddServer: (_item: IAlertChannel) => void;
  onDeleteChannel?: (channel: IAlertChannel) => void;
}

const Channel: React.FC<Props> = (props: Props) => {
  if (props.item.channelType === AlertChannelType.EMAIL) {
    return <EmailConfiguration showDelete onDeleteChannel={props.onDeleteChannel} channel={props.item} onCreateChannel={props.onCreateChannel} onUpdateChannel={props.onUpdateChannel} />;
  }
  if (props.item.channelType === AlertChannelType.WEBHOOK) {
    return <WebHookConfiguration onDeleteChannel={props.onDeleteChannel} channel={props.item} onAddServer={props.onAddServer} />;
  }
  return null;
};

export default React.memo(Channel);
