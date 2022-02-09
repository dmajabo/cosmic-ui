import React from 'react';
import Tag from 'app/components/Basic/Tag';
import { IAlertChannel, IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
// import { getStyles, getTagStyles, ITagStyles } from './tagStatusHelper';
interface Props {
  channel: IAlertChannel;
}

const TriggerChannel: React.FC<Props> = (props: Props) => {
  // const [styles, setStyles] = React.useState<ITagStyles>(getStyles());

  // React.useEffect(() => {
  //   const _styles: ITagStyles = getTagStyles(props.tag, props.verificationStatus);
  //   setStyles(_styles);
  // }, [props.verificationStatus, props.tag]);
  // return <Tag text={props.tag} index={props.index} onRemove={onDeleteEmail} bgColor={styles.bgColor} textColor={styles.textColor} />;
  return (
    <>
      <></>
      <></>
    </>
  );
};

export default React.memo(TriggerChannel);
