import React from 'react';
import ActionCardItem from '../../../Components/ActionCardItem';
import { ActionsListWrapper } from '../../../styles/styles';
import { emailIcon } from 'app/components/SVGIcons/automationIcons/email';
import { slackIcon } from 'app/components/SVGIcons/automationIcons/slack';
import { ActionTypes } from '../model';
import { IMappedObject } from 'lib/models/general';
interface Props {
  selectedActions: string[] | null;
  onChooseAction: (id: string) => void;
}
const ActionsStep: React.FC<Props> = (props: Props) => {
  const [selectedMap, setSelectedMap] = React.useState<IMappedObject | null>(null);

  React.useEffect(() => {
    if (!props.selectedActions || !props.selectedActions.length) {
      setSelectedMap(null);
      return;
    } else {
      const _obj = {};
      props.selectedActions.forEach(it => {
        _obj[it] = it;
      });
      setSelectedMap(_obj);
    }
  }, [props.selectedActions]);
  const onSelect = (id: string) => {
    props.onChooseAction(id);
  };
  return (
    <ActionsListWrapper>
      <ActionCardItem icon={emailIcon} id={ActionTypes.EMAIL} label="Email" selected={selectedMap && selectedMap[ActionTypes.EMAIL]} onSelect={onSelect} />
      <ActionCardItem icon={slackIcon} id={ActionTypes.SLACK} label="Slack" selected={selectedMap && selectedMap[ActionTypes.SLACK]} onSelect={onSelect} />
    </ActionsListWrapper>
  );
};

export default React.memo(ActionsStep);
