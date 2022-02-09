import React from 'react';
import { ChannelIcon, ChannelLabel } from './styles';
import { IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
import { getStyles, getTagStyles, ITagStyles } from '../Configutation/EmailConfiguration/tagStatusHelper';
import { TagStyles, TagBg, TagText } from 'app/components/Basic/Tag/style';

interface Props {
  name: string;
  label: string;
  icon: any;
  verificationStatus: IAlertVerificationStatus;
}
const EmailChannelItem: React.FC<Props> = (props: Props) => {
  const [styles, setStyles] = React.useState<ITagStyles>(getStyles(null));

  React.useEffect(() => {
    const _styles: ITagStyles = getTagStyles(props.name, props.verificationStatus);
    setStyles(_styles);
  }, [props.verificationStatus, props.name]);
  return (
    <TagStyles style={{ maxWidth: '260px', overflow: 'hidden', margin: '0 10px 10px 0' }}>
      <TagBg className="channelTagBg" bgColor="var(--_appBg)" opacity="1" />
      <ChannelIcon>{props.icon}</ChannelIcon>
      <ChannelLabel>{props.label}:</ChannelLabel>
      <TagText className="textSimple" style={{ maxWidth: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} color={styles.textColor}>
        {props.name}
      </TagText>
    </TagStyles>
  );
};

export default React.memo(EmailChannelItem);
