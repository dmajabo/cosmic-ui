import React from 'react';
import { IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
import Tag from 'app/components/Basic/Tag';
import { emailIconSmall } from 'app/components/SVGIcons/automationIcons/email';
import EmailStatusRow from './EmailStatusRow';

interface Props {
  name: string;
  emails: string[];
  icon: any;
  verificationStatus: IAlertVerificationStatus;
}
const EmailChannelItem: React.FC<Props> = (props: Props) => {
  return (
    <Tag showPopup={!!(props.emails && props.emails.length)} icon={emailIconSmall} text={props.name} hideClearButton bgColor="var(--_appBg)" opacity="1" textColor="var(--_primaryTextColor)">
      {props.emails && props.emails.length ? (
        <div>
          {props.emails.map(it => (
            <EmailStatusRow key={`emailTagTooltipStatusItem${it}`} name={it} verificationStatus={props.verificationStatus} />
          ))}
        </div>
      ) : null}
    </Tag>
  );
};

export default React.memo(EmailChannelItem);
