import React from 'react';
// import { IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
import { getStyles, getTagStyles, ITagStyles } from '../Configutation/EmailConfiguration/tagStatusHelper';

interface Props {
  name: string;
  // verificationStatus: IAlertVerificationStatus;
}
const EmailStatusRow: React.FC<Props> = (props: Props) => {
  const [styles, setStyles] = React.useState<ITagStyles>(getStyles(null));

  React.useEffect(() => {
    const _styles: ITagStyles = getTagStyles(props.name, null); // props.verificationStatus
    setStyles(_styles);
  }, [props.name]);
  return (
    <div className="value" style={{ color: styles.textColor, margin: '0 10px 0 0' }}>
      {props.name}
    </div>
  );
};

export default React.memo(EmailStatusRow);
