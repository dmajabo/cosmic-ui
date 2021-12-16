import React from 'react';
import IconContainer from 'app/components/Basic/IconContainer';
import { webhookIcon } from 'app/components/SVGIcons/automationIcons/configurationIcons';
import { ChannelContent, ChannelHeaderRow, ChannelItemWrapper, ConfigurationSubTitle, ConfigurationTitle, LabelsWrapper } from '../styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';

interface Props {
  items: any[];
}

const WebHookConfiguration: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    console.log('add server');
  };
  return (
    <ChannelItemWrapper margin="0">
      <ChannelHeaderRow>
        <IconContainer iconWidth="22px" iconHeight="22px" icon={webhookIcon} />
        <LabelsWrapper>
          <ConfigurationTitle>Default Webhook Servers</ConfigurationTitle>
          <ConfigurationSubTitle>
            {!props.items || !props.items.length ? 'There are no Webhook servers. To add server click on the “Add Server” button.' : 'To add server click on the “Add Server” button.'}
          </ConfigurationSubTitle>
        </LabelsWrapper>
        <SecondaryButton styles={{ margin: 'auto 0 auto 20px' }} onClick={onClick} label="Add server" icon={plusIcon} />
      </ChannelHeaderRow>
      {props.items && props.items.length ? <ChannelContent></ChannelContent> : null}
    </ChannelItemWrapper>
  );
};

export default React.memo(WebHookConfiguration);
