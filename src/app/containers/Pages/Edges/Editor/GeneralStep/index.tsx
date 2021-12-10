import React from 'react';
// import CustomSlider from 'app/components/Basic/CustomSlider';
import TextInput from 'app/components/Inputs/TextInput';
import { ConnectionValues } from '../model';
// import { EdgePriceValues } from '../model';
import CustomAutocomplete from 'app/components/Inputs/CustomAutocomplete';
import { PanelContentLabel } from '../FormPanel/styles';
import TextTagInput from 'app/components/Inputs/TextInput/TextTagInput';
import { ConnectionPKeysMap, getNewConnectionP, IConnectionP } from 'lib/api/ApiModels/Edges/apiModel';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
interface Props {
  name: string;
  description: string;
  // price: number;
  tags: string[];
  connectionPolicy: IConnectionP;
}

const GeneralStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [connectionsValueString, setConnectionValueString] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (props.connectionPolicy) {
      const _str: string[] = [];
      Object.keys(ConnectionPKeysMap).forEach(key => {
        if (props.connectionPolicy[key]) {
          _str.push(ConnectionPKeysMap[key]);
        }
      });
      setConnectionValueString(_str);
    }
  }, [props.connectionPolicy]);

  const onInputChange = (value: string | null) => {
    edges.onChangeGeneralField(value, 'name');
  };

  const onDescriptionChange = (value: string | null) => {
    edges.onChangeGeneralField(value, 'description');
  };

  const onConnectionChange = (values: string[]) => {
    const _values: IConnectionP = getNewConnectionP();
    Object.keys(ConnectionPKeysMap).forEach(key => {
      const _v = values.find(it => ConnectionPKeysMap[key].toLowerCase() === it.toLowerCase());
      if (_v) {
        _values[key] = true;
      }
    });
    edges.onChangeGeneralField(_values, 'connectionPolicy');
  };

  const onTagsChange = (value: string[]) => {
    edges.onChangeGeneralField(value, 'tags');
  };

  return (
    <>
      <TextInput inputStyles={{ height: '50px' }} styles={{ margin: '0 0 20px 0' }} id="networkName" name="name" value={props.name} label="Name" onChange={onInputChange} required />
      <TextInput area styles={{ margin: '0 0 20px 0' }} id="description" name="description" value={props.description} label="Description" onChange={onDescriptionChange} />
      {/* <CustomSlider wrapStyles={{ margin: '0 0 20px 0' }} label="Cost" min={100} max={500} step={50} value={price} values={EdgePriceValues} defaultValue={100} onChange={onSliderChange} /> */}
      <PanelContentLabel>Criteria</PanelContentLabel>
      <CustomAutocomplete
        required
        simpleTag
        styles={{ margin: '0 0 20px 0' }}
        label="Connection Types"
        id="connectionPolicy"
        options={ConnectionValues}
        value={connectionsValueString}
        onChange={onConnectionChange}
      />
      <TextTagInput id="tags" name="tags" value={props.tags} label="Tags" onChange={onTagsChange} styles={{ margin: '0 0 20px 0' }} required />
    </>
  );
};
export default React.memo(GeneralStep);
