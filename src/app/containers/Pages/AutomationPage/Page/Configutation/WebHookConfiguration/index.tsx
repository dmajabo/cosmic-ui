import React from 'react';
import IconContainer from 'app/components/Basic/IconContainer';
import { webhookIcon } from 'app/components/SVGIcons/automationIcons/configurationIcons';
import { ChannelContent, ChannelHeaderRow, ChannelItemWrapper, ConfigurationTitle, LabelsWrapper } from '../styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { AlertChannelType, IAlertChannel, createChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
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
    <ChannelItemWrapper style={{ minHeight: '500px' }}>
      <ChannelHeaderRow>
        <IconContainer iconWidth="22px" iconHeight="22px" icon={webhookIcon} />
        <LabelsWrapper>
          <ConfigurationTitle>{channel.name || 'Default Webhook Servers'}</ConfigurationTitle>
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
      <ChannelContent style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100% - 80px)' }}>
        <ErrorMessage margin="auto auto 20px auto" color="var(--_primaryTextColor)" fontSize={18}>
          There are no servers yet
        </ErrorMessage>
        <ErrorMessage margin="0 auto auto auto" color="var(--_disabledTextColor)" fontSize={16}>
          To add a server click the “Add Server” button.
        </ErrorMessage>
      </ChannelContent>
    </ChannelItemWrapper>
  );
};

export default React.memo(WebHookConfiguration);
