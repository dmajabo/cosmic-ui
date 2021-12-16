/* eslint-disable no-control-regex */
import React from 'react';
import { ChannelContent, ChannelHeaderRow, ChannelItemWrapper, ConfigurationSubTitle, ConfigurationTitle, LabelsWrapper } from '../styles';
import { emailIcon } from 'app/components/SVGIcons/automationIcons/configurationIcons';
import IconContainer from 'app/components/Basic/IconContainer';
import TextInputWithIcon from 'app/components/Inputs/TextInput/TextInputWithIcon';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { createChannel } from '../../helpers';

const emailRegExp =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
interface Props {
  onCreateChannel: (item: IAlertChannel) => void;
}

const EmailConfiguration: React.FC<Props> = (props: Props) => {
  const onChange = (value: string | null) => {
    if (!value) return;
    const _newChannel: IAlertChannel = createChannel(AlertChannelType.EMAIL);
    if (!_newChannel.id) {
      delete _newChannel.id;
    }
    props.onCreateChannel(_newChannel);
  };

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
          icon={plusIcon}
          onSubmit={onChange}
          onBlurChange={onChange}
          pattern={emailRegExp}
          type="email"
          placeholder="Type email here"
          emptyAfterSet
          styles={{ minHeight: '50px', height: '50px', flexShrink: 0 }}
        />
      </ChannelContent>
    </ChannelItemWrapper>
  );
};

export default React.memo(EmailConfiguration);
