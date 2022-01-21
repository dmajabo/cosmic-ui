import React from 'react';
import { ModalLabel, ModalRow } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { ISegmentExternalSegMatchRuleP } from 'lib/api/ApiModels/Policy/Segment';
import ExternalRule from './ExternalRule';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import * as helper from '../helper';
import { RulesContainer } from '../styles';
interface Props {
  matchRules: ISegmentExternalSegMatchRuleP[];
  onUpdateExtRule: (rule: ISegmentExternalSegMatchRuleP, index?: number) => void;
  onRemoveExtRule: (rule: ISegmentExternalSegMatchRuleP, index: number) => void;
}

const ExternalStep: React.FC<Props> = (props: Props) => {
  const [disabledCreate, setDisabledCreate] = React.useState<boolean>(props.matchRules.length ? true : false);

  React.useEffect(() => {
    if (!props.matchRules || !props.matchRules.length) {
      setDisabledCreate(false);
    } else {
      const allValid = helper.checkExtRules(props.matchRules);
      setDisabledCreate(!allValid);
    }
  }, [props.matchRules]);
  const onCreateRule = () => {
    setDisabledCreate(true);
    const _r: ISegmentExternalSegMatchRuleP = helper.onCreateExtRule();
    props.onUpdateExtRule(_r);
  };

  const onUpdateRule = (rule: ISegmentExternalSegMatchRuleP, index: number) => {
    props.onUpdateExtRule(rule, index);
  };

  const onRemoveRule = (rule: ISegmentExternalSegMatchRuleP, index: number) => {
    props.onRemoveExtRule(rule, index);
  };

  return (
    <>
      <ModalRow margin="0px 0 10px 0">
        <ModalLabel>External Rules</ModalLabel>
      </ModalRow>
      <RulesContainer>
        {props.matchRules && props.matchRules.length ? (
          props.matchRules.map((it, index) => (
            <ModalRow margin="0 0 20px 0">
              <ExternalRule key={`extMatchRule${it.uiId}`} data={it} index={index} onChange={onUpdateRule} onRemoveRule={onRemoveRule} />
            </ModalRow>
          ))
        ) : (
          <ModalRow margin="40px auto 40px auto">There are no external rules yet. To create rule click the button bellow.</ModalRow>
        )}
        <ModalRow margin="0">
          <SecondaryButton
            icon={addIcon}
            disabled={disabledCreate}
            onClick={onCreateRule}
            label="Add rule"
            styles={{ margin: props.matchRules && props.matchRules.length ? '0 0 0 auto' : '0 auto' }}
          />
        </ModalRow>
      </RulesContainer>
    </>
  );
};

export default React.memo(ExternalStep);
