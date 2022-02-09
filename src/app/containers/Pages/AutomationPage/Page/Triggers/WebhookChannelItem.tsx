import React from 'react';
import { ChannelIcon, ChannelLabel } from './styles';
import { TagStyles, TagBg, TagText } from 'app/components/Basic/Tag/style';

interface Props {
  name: string;
  label: string;
  icon: any;
}
const WebhookChannelItem: React.FC<Props> = (props: Props) => {
  return (
    <TagStyles style={{ maxWidth: '260px', overflow: 'hidden', margin: '0 10px 10px 0' }}>
      <TagBg className="channelTagBg" bgColor="var(--_appBg)" opacity="1" />
      <ChannelIcon>{props.icon}</ChannelIcon>
      <ChannelLabel>{props.label}:</ChannelLabel>
      <TagText className="textSimple" color="var(--_primaryTextColor)" style={{ maxWidth: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {props.name}
      </TagText>
    </TagStyles>
  );
};

export default React.memo(WebhookChannelItem);
