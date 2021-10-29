import React from 'react';
import { TriggerRow } from '../../../styles/styles';
import RadioButton from 'app/components/Inputs/RadioButton';
import { TriggersTypes } from '../model';
import Dropdown from 'app/components/Inputs/Dropdown';
import { ISelectedListItem } from 'lib/models/general';
import { ITrigger } from 'lib/models/Automation/trigger';
import TriggerForm from '../../../Components/TriggerForm';
interface Props {
  triggers: ITrigger[];
  selectedTrigger: string;
  onSelectTrigger: (_value: string) => void;
}

const TriggersStep: React.FC<Props> = (props: Props) => {
  const [selectedValue, setSelectedValue] = React.useState<TriggersTypes>(TriggersTypes.EXISTING_TRIGGER);
  const [triggers, setTriggers] = React.useState<ISelectedListItem<string>[]>([]);

  React.useEffect(() => {
    let _items = [];
    if (props.triggers && props.triggers.length) {
      _items = props.triggers.map(it => ({ id: it.id, value: it.name, label: it.name }));
    }
    setTriggers(_items);
  }, [props.triggers]);

  const handleChange = (checked: boolean, value: TriggersTypes) => {
    if (value === selectedValue) return;
    if (props.selectedTrigger) {
      props.onSelectTrigger(null);
    }
    setSelectedValue(value);
  };

  const onSelectTrigger = (_item: ISelectedListItem<string> | null) => {
    if (props.selectedTrigger && _item && props.selectedTrigger === _item.value) return;
    if (!_item) {
      props.onSelectTrigger('');
      return;
    }
    props.onSelectTrigger(_item.value);
  };

  return (
    <>
      <TriggerRow>
        <RadioButton
          checked={selectedValue === TriggersTypes.EXISTING_TRIGGER}
          onChange={handleChange}
          value={TriggersTypes.EXISTING_TRIGGER}
          label="Use Created Trigger"
          name="radio-buttons"
          wrapstyles={{ margin: '0 auto 12px 0' }}
        />
        {selectedValue === TriggersTypes.EXISTING_TRIGGER && (
          <>
            <Dropdown
              dropWrapStyles={{ width: '100%', height: '60px', maxWidth: '500px', minWidth: '180px', margin: '0 0 20px 0' }}
              wrapStyles={{ width: '100%', height: '100%' }}
              selectStyles={{ borderColor: 'rgba(109, 121, 134, 0.3)' }}
              placeholder="Select"
              selectedValue={props.selectedTrigger}
              values={triggers}
              onSelectValue={onSelectTrigger}
            />
          </>
        )}
      </TriggerRow>
      <TriggerRow>
        <RadioButton
          checked={selectedValue === TriggersTypes.NEW_TRIGGER}
          onChange={handleChange}
          value={TriggersTypes.NEW_TRIGGER}
          name="radio-buttons"
          label="Create New Trigger"
          wrapstyles={{ margin: selectedValue === TriggersTypes.NEW_TRIGGER ? '0 auto 12px 0' : '0 auto 20px 0' }}
        />
        {selectedValue === TriggersTypes.NEW_TRIGGER && <TriggerForm />}
      </TriggerRow>
    </>
  );
};

export default React.memo(TriggersStep);
