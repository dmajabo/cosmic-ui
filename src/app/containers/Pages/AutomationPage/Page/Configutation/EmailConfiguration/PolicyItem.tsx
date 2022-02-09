import React from 'react';
import Tag from 'app/components/Basic/Tag';
import { IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
import { getStyles, getTagStyles, ITagStyles } from './tagStatusHelper';
import { StatusRow, TagStatus } from '../styles';

interface Props {
  tag: string;
  index: number;
  verificationStatus: IAlertVerificationStatus;
  onDeleteEmail: (index: number) => void;
}

const PolicyItem: React.FC<Props> = (props: Props) => {
  const [styles, setStyles] = React.useState<ITagStyles>(getStyles(null));

  React.useEffect(() => {
    const _styles: ITagStyles = getTagStyles(props.tag, props.verificationStatus);
    setStyles(_styles);
  }, [props.verificationStatus, props.tag]);

  const onDeleteEmail = (index: number) => {
    props.onDeleteEmail(index);
  };

  return (
    <Tag showPopup text={props.tag} index={props.index} onRemove={onDeleteEmail} bgColor={styles.bgColor} textColor={styles.textColor}>
      <TagStatus>
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
      </TagStatus>
    </Tag>
  );
};

export default React.memo(PolicyItem);
