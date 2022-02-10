import React from 'react';
import Tag from 'app/components/Basic/Tag';

interface Props {
  name: string;
  label: string;
  icon: any;
}
const WebhookChannelItem: React.FC<Props> = (props: Props) => {
  return <Tag icon={props.icon} text={props.name} hideClearButton bgColor="var(--_appBg)" opacity="1" textColor="var(--_primaryTextColor)"></Tag>;
};

export default React.memo(WebhookChannelItem);
