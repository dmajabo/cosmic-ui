import TextInput from 'app/components/Inputs/TextInput';
import React from 'react';

interface Props {
  name: string;
  onChange: (value: string | null, field: string) => void;
}

const GeneralStep: React.FC<Props> = ({ name, onChange }) => {
  const onInputChange = (value: string | null) => {
    onChange(value, 'name');
  };
  return (
    <>
      <TextInput id="networkName" name="name" value={name} label="Network Name" onChange={onInputChange} required />
    </>
  );
};
export default React.memo(GeneralStep);
