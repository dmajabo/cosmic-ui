import React from 'react';
import IconContainer from 'app/components/Basic/IconContainer';
import { webhookIcon } from 'app/components/SVGIcons/automationIcons/configurationIcons';
import { ChannelHeaderRow, ChannelItemWrapper, ConfigurationSubTitle, ConfigurationTitle, LabelsWrapper } from '../styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { AlertChannelType, IAlertChannel, createChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
// import { editIcon } from 'app/components/SVGIcons/edit';

interface Props {
  channel: IAlertChannel;
  showDelete?: boolean;
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
        {props.showDelete && (
          <SettingsButton buttonStyles={{ top: '-40px', right: '-40px' }} id={`settingsAnomalyButton${channel.id}`} width="24px" height="40px" hoverIconColor="var(--_hoverButtonBg)">
            <PopupContent>
              {/* <PopupItem label="Edit" icon={editIcon} onClick={onEdit} /> */}
              <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={onDeleteChannel} />
            </PopupContent>
          </SettingsButton>
        )}
      </ChannelHeaderRow>
      {/* {props.items && props.items.length ? <ChannelContent></ChannelContent> : null} */}
    </ChannelItemWrapper>
  );
};

export default React.memo(WebHookConfiguration);
