import React from 'react';
import { TagStyles, TagBg, TagText, TagIcon } from 'app/components/Basic/Tag/style';

interface Props {
  name: string;
  label: string;
  icon: any;
}
const WebhookChannelItem: React.FC<Props> = (props: Props) => {
  return (
    <TagStyles style={{ maxWidth: '260px', overflow: 'hidden', margin: '0 10px 10px 0' }}>
      <TagBg className="channelTagBg" bgColor="var(--_appBg)" opacity="1" />
      <TagIcon>{props.icon}</TagIcon>
      {/* <ChannelLabel>{props.label}:</ChannelLabel> */}
      <TagText className="textSimple" color="var(--_primaryTextColor)" style={{ maxWidth: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {props.name}
      </TagText>
    </TagStyles>
  );
};

export default React.memo(WebhookChannelItem);
