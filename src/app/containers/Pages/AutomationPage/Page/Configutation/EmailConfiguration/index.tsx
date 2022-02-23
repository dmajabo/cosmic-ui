/* eslint-disable no-useless-escape */
import React from 'react';
import { ChannelContent, ChannelHeaderRow, ChannelItemWrapper, ConfigurationTitle, LabelsWrapper } from '../styles';
import { emailIcon } from 'app/components/SVGIcons/automationIcons/configurationIcons';
import IconContainer from 'app/components/Basic/IconContainer';
import TextInputWithIcon from 'app/components/Inputs/TextInput/TextInputWithIcon';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { AlertChannelType, IAlertChannel, createChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import PolicyItem from './PolicyItem';
import { DEFAULT_EMAIL_CHANNEL_NAME } from 'lib/hooks/Automation/models';

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
interface Props {
  channel?: IAlertChannel;
  showDelete?: boolean;
  onCreateChannel: (item: IAlertChannel) => void;
  onUpdateChannel: (item: IAlertChannel) => void;
  onDeleteChannel?: (item: IAlertChannel) => void;
}

const EmailConfiguration: React.FC<Props> = (props: Props) => {
  const [channel, setChannel] = React.useState<IAlertChannel>(null);
  const [typedEmail, setTypedEmail] = React.useState<string>(null);
  const [emailError, setEmailError] = React.useState<string>(null);
  React.useEffect(() => {
    const _channel: IAlertChannel = props.channel || createChannel(AlertChannelType.EMAIL);
    setChannel(_channel);
    setEmailError(null);
    setTypedEmail(null);
  }, []);

  const onChange = (value: string | null) => {
    const err = onValidateEmail(value);
    setEmailError(err);
    setTypedEmail(value);
    if (err || !value || !value.length) return;
    const _obj: IAlertChannel = jsonClone(channel);
    _obj.emailPolicy.receiverEmailIds.push(value);
    setEmailError(null);
    setTypedEmail(null);
    setChannel(_obj);
    if (!_obj.id) {
      props.onCreateChannel(_obj);
      return;
    }
    props.onUpdateChannel(_obj);
  };

  const onValidateEmail = (value: string | null): string => {
    if (!value) return null;
    const isValid = emailRegExp.test(value);
    if (!isValid) return 'Email invalid';
    return null;
  };

  const onDeleteEmail = (index: number) => {
    const _obj: IAlertChannel = jsonClone(channel);
    _obj.emailPolicy.receiverEmailIds.splice(index, 1);
    setChannel(_obj);
    if (!_obj.id) return;
    props.onUpdateChannel(_obj);
  };

  const onClearAll = () => {
    const _obj: IAlertChannel = jsonClone(channel);
    _obj.emailPolicy.receiverEmailIds = [];
    setChannel(_obj);
    if (!_obj.id) return;
    props.onUpdateChannel(_obj);
  };

  const onDeleteChannel = () => {
    if (!props.onDeleteChannel) return;
    props.onDeleteChannel(props.channel);
  };

  if (!channel) return null;
  return (
    <ChannelItemWrapper>
      <ChannelHeaderRow>
        <IconContainer iconWidth="22px" iconHeight="22px" icon={emailIcon} />
        <LabelsWrapper>
          <ConfigurationTitle>{channel.name || DEFAULT_EMAIL_CHANNEL_NAME}</ConfigurationTitle>
        </LabelsWrapper>
        {props.showDelete && (
          <SettingsButton buttonStyles={{ top: '-40px', right: '-40px' }} id={`settingsAnomalyButton${channel.id}`} width="24px" height="40px" hoverIconColor="var(--_hoverButtonBg)">
            <PopupContent>
              {/* <PopupItem label="Edit" icon={editIcon} onClick={onEdit} /> */}
              <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={onDeleteChannel} />
            </PopupContent>
          </SettingsButton>
        )}
      </ChannelHeaderRow>
      <ChannelContent>
        <TextInputWithIcon
          id="emailServer"
          name="emailServer"
          value={typedEmail}
          error={emailError}
          icon={plusIcon}
          onSubmit={onChange}
          onBlurChange={onChange}
          type="email"
          placeholder="Type email here"
          emptyAfterSet
          styles={{
            minHeight: '50px',
            height: 'auto',
            flexShrink: 0,
            margin: channel && channel.emailPolicy && channel.emailPolicy.receiverEmailIds && channel.emailPolicy.receiverEmailIds.length ? '0 0 20px 0' : '0',
          }}
        />
        {channel && channel.emailPolicy && channel.emailPolicy.receiverEmailIds && channel.emailPolicy.receiverEmailIds.length ? (
          <>
            {channel.emailPolicy.receiverEmailIds.map((it, index) => (
              <PolicyItem key={`emailTag${it}`} tag={it} index={index} onDeleteEmail={onDeleteEmail} />
            ))}
            <SecondaryButton
              iconWidth="10px"
              iconHeight="10px"
              styles={{ display: 'inline-flex', alignItems: 'center', height: '30px', padding: '8px 12px', margin: '3px 6px 3px 0px', border: 'none', verticalAlign: 'top' }}
              withoutBorder
              label="Clear all"
              icon={closeSmallIcon}
              onClick={onClearAll}
            />
          </>
        ) : null}
      </ChannelContent>
    </ChannelItemWrapper>
  );
};

export default React.memo(EmailConfiguration);
