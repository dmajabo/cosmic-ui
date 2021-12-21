import React from 'react';
import IconContainer from 'app/components/Basic/IconContainer';
import { webhookIcon } from 'app/components/SVGIcons/automationIcons/configurationIcons';
import { ChannelHeaderRow, ChannelItemWrapper, ConfigurationSubTitle, ConfigurationTitle, LabelsWrapper } from '../styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { createChannel } from '../../helpers';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { deleteIcon } from 'app/components/SVGIcons/delete';

interface Props {
  channel: IAlertChannel;
  onAddServer: (_item: IAlertChannel) => void;
  onDeleteChannel?: (item: IAlertChannel) => void;
}

const WebHookConfiguration: React.FC<Props> = (props: Props) => {
  const [channel] = React.useState<IAlertChannel>(props.channel);
  const onClick = () => {
    const _obj: IAlertChannel = createChannel(AlertChannelType.WEBHOOK);
    props.onAddServer(_obj);
  };
  const onDeleteChannel = () => {
    if (!props.onDeleteChannel) return;
    props.onDeleteChannel(props.channel);
  };
  if (!channel) return null;
  return (
    <ChannelItemWrapper>
      <ChannelHeaderRow>
        <IconContainer iconWidth="22px" iconHeight="22px" icon={webhookIcon} />
        <LabelsWrapper>
          <ConfigurationTitle>{channel.name || 'Default Webhook Servers'}</ConfigurationTitle>
          <ConfigurationSubTitle>
            {/* to do */}
            {!props.channel || !props.channel.emailPolicy || !props.channel.emailPolicy.receiverEmailIds
              ? 'There are no Webhook servers. To add server click on the “Add Server” button.'
              : 'To add server click on the “Add Server” button.'}
          </ConfigurationSubTitle>
        </LabelsWrapper>
        <SecondaryButton styles={{ margin: 'auto 0 auto 20px' }} onClick={onClick} label="Add server" icon={plusIcon} />
        {channel.id && (
          <PrimaryButton
            styles={{ margin: 'auto 0 auto 20px' }}
            label="Delete"
            icon={deleteIcon('var(--_pButtonColor)')}
            onClick={onDeleteChannel}
            bgColor="var(--_errorColor)"
            borderColor="var(--_errorColor)"
            hoverBg="var(--_errorColor)"
            hoverBorder="var(--_errorColor)"
          />
        )}
      </ChannelHeaderRow>
      {/* {props.items && props.items.length ? <ChannelContent></ChannelContent> : null} */}
    </ChannelItemWrapper>
  );
};

export default React.memo(WebHookConfiguration);
