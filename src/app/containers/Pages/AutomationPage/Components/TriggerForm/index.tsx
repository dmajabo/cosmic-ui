import React from 'react';
import { ITrigger } from 'lib/models/Automation/trigger';
import TextInput from 'app/components/Inputs/TextInput';
import { FieldRow, FormWrapper } from './styles';
import Toogle from 'app/components/Inputs/Toogle';
import { ISelectedListItem } from 'lib/models/general';
import { ITriggerFieldTypes, TRIGGER_FIELD } from './models';

interface Props {}

const TriggerForm: React.FC<Props> = (props: Props) => {
  const [trigger, setTrigger] = React.useState<ITrigger>({ name: '', createdDate: '', anomaly: [], rules: [] });
  const [selectedField, setSelectedField] = React.useState<ISelectedListItem<ITriggerFieldTypes>>(TRIGGER_FIELD[0]);
  const [anomalies, setAnomalies] = React.useState<any[]>([]);
  const [rules, setRules] = React.useState<any[]>([]);
  const onChange = (value: string | null) => {
    const _tr = { ...trigger, name: value };
    setTrigger(_tr);
  };

  const onChangeField = (value: ISelectedListItem<ITriggerFieldTypes>) => {
    if (value.id === selectedField.id) return;
    setSelectedField(value);
  };

  const onCreateNewAnomaly = () => {
    const _obj = {};
    const _items = [...anomalies, _obj];
    setAnomalies(_items);
  };

  const onCreateNewRule = () => {
    const _obj = {};
    const _items = [...rules, _obj];
    setRules(_items);
  };

  return (
    <FormWrapper>
      <FieldRow>
        <TextInput id="triggerName" name="triggerName" value={trigger.name} label="Trigger Name" onChange={onChange} />
      </FieldRow>
      <FieldRow>
        <Toogle selectedValue={selectedField} values={TRIGGER_FIELD} onChange={onChangeField} />
      </FieldRow>
    </FormWrapper>
  );
};

export default React.memo(TriggerForm);
