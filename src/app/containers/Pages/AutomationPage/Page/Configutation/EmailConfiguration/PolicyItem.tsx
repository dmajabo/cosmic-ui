import React from 'react';
import Tag from 'app/components/Basic/Tag';
import { IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
import { getStyles, getTagStyles, ITagStyles } from './tagStatusHelper';
interface Props {
  tag: string;
  index: number;
  verificationStatus: IAlertVerificationStatus;
  onDeleteEmail: (index: number) => void;
}

const PolicyItem: React.FC<Props> = (props: Props) => {
  const [styles, setStyles] = React.useState<ITagStyles>(getStyles());

  React.useEffect(() => {
    const _styles: ITagStyles = getTagStyles(props.tag, props.verificationStatus);
    setStyles(_styles);
  }, [props.verificationStatus, props.tag]);

  const onDeleteEmail = (index: number) => {
    props.onDeleteEmail(index);
  };
  return <Tag text={props.tag} index={props.index} onRemove={onDeleteEmail} bgColor={styles.bgColor} textColor={styles.textColor} />;
};

export default React.memo(PolicyItem);
