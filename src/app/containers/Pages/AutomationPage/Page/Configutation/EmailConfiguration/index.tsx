/* eslint-disable no-useless-escape */
import React from 'react';
import { ChannelContent, ChannelHeaderRow, ChannelItemWrapper, ConfigurationSubTitle, ConfigurationTitle, LabelsWrapper } from '../styles';
import { emailIcon } from 'app/components/SVGIcons/automationIcons/configurationIcons';
import IconContainer from 'app/components/Basic/IconContainer';
import TextInputWithIcon from 'app/components/Inputs/TextInput/TextInputWithIcon';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { createChannel } from '../../helpers';
import Tag from 'app/components/Basic/Tag';
import { jsonClone } from 'lib/helpers/cloneHelper';

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
interface Props {
  channel?: IAlertChannel;
  onCreateChannel: (item: IAlertChannel) => void;
  onUpdateChannel: (item: IAlertChannel) => void;
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

  if (!channel) return null;
  return (
    <ChannelItemWrapper>
      <ChannelHeaderRow>
        <IconContainer iconWidth="22px" iconHeight="22px" icon={emailIcon} />
        <LabelsWrapper>
          <ConfigurationTitle>Default Email Recipients</ConfigurationTitle>
          <ConfigurationSubTitle>Here you can add email recipients and use them in automation.</ConfigurationSubTitle>
        </LabelsWrapper>
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
        {channel && channel.emailPolicy && channel.emailPolicy.receiverEmailIds && channel.emailPolicy.receiverEmailIds.length
          ? channel.emailPolicy.receiverEmailIds.map((it, index) => <Tag key={`emailTag${it}`} text={it} index={index} onRemove={onDeleteEmail} />)
          : null}
      </ChannelContent>
    </ChannelItemWrapper>
  );
};

export default React.memo(EmailConfiguration);
