import React from 'react';
import TextInput from 'app/components/Inputs/TextInput';
interface Props {
  name: string;
  type: string;
  onChange: (value: any | null, field: string) => void;
}

const SitesStep: React.FC<Props> = ({ name, type, onChange }) => {
  const onInputChange = (value: string | null) => {
    onChange(value, 'name');
  };

  return (
    <>
      <TextInput styles={{ margin: '0 0 20px 0' }} id="sitesGroupName" name="name" value={name} label="Group Name" onChange={onInputChange} required />
    </>
  );
};
export default React.memo(SitesStep);
