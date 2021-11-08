import React from 'react';
// import CustomSlider from 'app/components/Basic/CustomSlider';
import TextInput from 'app/components/Inputs/TextInput';
import { ConnectionValues } from '../model';
// import { EdgePriceValues } from '../model';
import CustomAutocomplete from 'app/components/Inputs/CustomAutocomplete';
import { PanelContentLabel } from '../FormPanel/styles';
import TextTagInput from 'app/components/Inputs/TextInput/TextTagInput';
interface Props {
  name: string;
  description: string;
  // price: number;
  tags: string;
  connection: string[];
  onChange: (value: any | null, field: string) => void;
}

const GeneralStep: React.FC<Props> = ({ name, connection, description, tags, onChange }) => {
  const onInputChange = (value: string | null) => {
    onChange(value, 'name');
  };

  const onDescriptionChange = (value: string | null) => {
    onChange(value, 'description');
  };

  const onConnectionChange = (value: string[]) => {
    onChange(value, 'connection');
  };

  const onTagsChange = (value: string) => {
    onChange(value, 'tags');
  };

  return (
    <>
      <TextInput inputStyles={{ height: '50px' }} styles={{ margin: '0 0 20px 0' }} id="networkName" name="name" value={name} label="Name" onChange={onInputChange} required />
      <TextInput area styles={{ margin: '0 0 20px 0' }} id="description" name="description" value={description} label="Description" onChange={onDescriptionChange} />
      {/* <CustomSlider wrapStyles={{ margin: '0 0 20px 0' }} label="Cost" min={100} max={500} step={50} value={price} values={EdgePriceValues} defaultValue={100} onChange={onSliderChange} /> */}
      <PanelContentLabel>Criteria</PanelContentLabel>
      <CustomAutocomplete simpleTag styles={{ margin: '0 0 20px 0' }} label="Connection Types" id="connections" options={ConnectionValues} value={connection} onChange={onConnectionChange} />
      <TextTagInput id="tags" name="tags" value={tags} label="Tags" onChange={onTagsChange} styles={{ margin: '0 0 20px 0' }} required />
    </>
  );
};
export default React.memo(GeneralStep);
