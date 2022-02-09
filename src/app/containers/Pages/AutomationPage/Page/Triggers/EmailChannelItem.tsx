import React from 'react';
import { IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
import { getStyles, getTagStyles, ITagStyles } from '../Configutation/EmailConfiguration/tagStatusHelper';
import { TagStyles, TagBg, TagText, TagIcon } from 'app/components/Basic/Tag/style';
import Tag from 'app/components/Basic/Tag';
import { emailIconSmall } from 'app/components/SVGIcons/automationIcons/email';

interface Props {
  name: string;
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
    // <TagStyles style={{ maxWidth: '260px', overflow: 'hidden', margin: '0 10px 10px 0' }}>
    //   <TagBg className="channelTagBg" bgColor="var(--_appBg)" opacity="1" />
    //   <TagIcon>{props.icon}</TagIcon>
    //   <TagText className="textSimple" style={{ maxWidth: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} color="var(--_primaryTextColor)">
    //     {props.name}
    //   </TagText>
    // </TagStyles>
    <Tag showPopup icon={emailIconSmall} text={props.name} hideClearButton bgColor="var(--_appBg)" opacity="1" textColor="var(--_primaryTextColor)">
      {/* <TagStatus>
        <StatusRow style={{ margin: '0 0 8px 0' }}>
          <div className="label">Email:</div>
          <div className="value" style={{ color: styles.textColor }}>
            {props.tag}
          </div>
        </StatusRow>
        {styles.status && (
          <StatusRow>
            <div className="label">Status:</div>
            <div className="value" style={{ color: styles.textColor }}>
              {styles.status}
            </div>
          </StatusRow>
        )}
      </TagStatus> */}
    </Tag>
  );
};

export default React.memo(EmailChannelItem);
