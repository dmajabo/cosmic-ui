import React from 'react';
import { GeneralFieldsRow } from '../../../styles/styles';
import TextInput from 'app/components/Inputs/TextInput';

interface Props {
  name: string;
  description: string;
  onChange: (value: string, field: string) => void;
}

const ReviewStep: React.FC<Props> = (props: Props) => {
  const onChange = (value: string, field: string) => {
    props.onChange(value, field);
  };
  return (
    <GeneralFieldsRow>
      <TextInput id="automationName" name="automationName" value={props.name} label="Name" onChange={v => onChange(v, 'name')} styles={{ maxWidth: '500px', margin: '0 20px 20px 0' }} />
      <TextInput
        id="automationDescription"
        name="automationDescription"
        value={props.description}
        label="Description"
        onChange={v => onChange(v, 'description')}
        styles={{ maxWidth: '500px', margin: '0 20px 20px 0' }}
      />
    </GeneralFieldsRow>
  );
};

export default React.memo(ReviewStep);
