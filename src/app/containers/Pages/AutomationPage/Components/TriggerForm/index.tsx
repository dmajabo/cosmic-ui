import React from 'react';
import { ITrigger, ITriggerAnomaly, ITriggerRule } from 'lib/models/Automation/trigger';
import TextInput from 'app/components/Inputs/TextInput';
import { FieldRow, FormWrapper } from './styles';
import Toogle from 'app/components/Inputs/Toogle';
import { ISelectedListItem } from 'lib/models/general';
import { TriggerFieldTypes, TRIGGER_FIELD } from './models';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { jsonClone } from 'lib/helpers/cloneHelper';
import AnomalyItem from './AnomalyItem';
import RuleItem from './RuleItem';

interface Props {}

const TriggerForm: React.FC<Props> = (props: Props) => {
  const [trigger, setTrigger] = React.useState<ITrigger>({ name: '', createdDate: '', anomaly: [], rules: [] });
  const [selectedField, setSelectedField] = React.useState<ISelectedListItem<TriggerFieldTypes>>(TRIGGER_FIELD[0]);
  const onChange = (value: string | null) => {
    const _tr = { ...trigger, name: value };
    setTrigger(_tr);
  };

  const onChangeField = (value: ISelectedListItem<TriggerFieldTypes>) => {
    if (value.id === selectedField.id) return;
    setSelectedField(value);
  };
  const onAdd = () => {
    const _item: ITrigger = jsonClone(trigger);
    if (selectedField.id === TriggerFieldTypes.ANOMALY) {
      _item.anomaly.push({ type: '' });
    }
    if (selectedField.id === TriggerFieldTypes.RULES) {
      _item.rules.push({ type: '' });
    }
    setTrigger(_item);
  };

  const onUpdateAnomaly = (index: number, item: ITriggerAnomaly) => {
    const _item: ITrigger = jsonClone(trigger);
    _item.anomaly.splice(index, 1, item);
    setTrigger(_item);
  };

  const onDeleteAnomaly = (index: number) => {
    const _item: ITrigger = jsonClone(trigger);
    _item.anomaly.splice(index, 1);
    setTrigger(_item);
  };

  const onUpdateRule = (index: number, item: ITriggerRule) => {
    const _item: ITrigger = jsonClone(trigger);
    _item.rules.splice(index, 1, item);
    setTrigger(_item);
  };

  const onDeleteRule = (index: number) => {
    const _item: ITrigger = jsonClone(trigger);
    _item.rules.splice(index, 1);
    setTrigger(_item);
  };

  return (
    <FormWrapper>
      <FieldRow>
        <TextInput id="triggerName" name="triggerName" value={trigger.name} label="Trigger Name" onChange={onChange} />
      </FieldRow>
      <FieldRow>
        <Toogle selectedValue={selectedField} values={TRIGGER_FIELD} onChange={onChangeField} />
      </FieldRow>
      <FieldRow direction="column">
        {selectedField.id === TriggerFieldTypes.ANOMALY && (
          <>
            {trigger.anomaly.length
              ? trigger.anomaly.map((it, index) => <AnomalyItem key={`anomalyTriggerItem${index}`} index={index} onDelete={onDeleteAnomaly} onUpdateItem={onUpdateAnomaly} dataItem={it} />)
              : null}
          </>
        )}
        {selectedField.id === TriggerFieldTypes.RULES && (
          <>
            {trigger.rules.length
              ? trigger.rules.map((it, index) => <RuleItem key={`ruleTriggerItem${index}`} index={index} onDelete={onDeleteRule} onUpdateItem={onUpdateRule} dataItem={it} />)
              : null}
          </>
        )}
      </FieldRow>
      <FieldRow>
        <PrimaryButton label="Add more" icon={plusIcon} onClick={onAdd} />
      </FieldRow>
    </FormWrapper>
  );
};

export default React.memo(TriggerForm);
