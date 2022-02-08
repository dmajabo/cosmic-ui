import React from 'react';
import { FromToLine, FromToWrapper, RangeItemWrapper } from './style';
import TextInput from 'app/components/Inputs/TextInput';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import TextNumberInput from 'app/components/Inputs/TextInput/TextNumberInput';
import ColorPiker from 'app/components/Inputs/ColorPiker';
import { DEFAULT_SEGMENTS_COLORS_SCHEMA } from 'lib/models/general';
import { IFlowPreferenceRange } from 'lib/api/ApiModels/Policy/Preference';

interface Props {
  range: IFlowPreferenceRange;
  index: number;
  onRemoveRange: (id: string) => void;
  onUpdateRange: (item: IFlowPreferenceRange, index: number) => void;
}

const RangeItem: React.FC<Props> = (props: Props) => {
  const onChange = (v: any, field: string) => {
    const _obj: IFlowPreferenceRange = { ...props.range };
    _obj[field] = v;
    props.onUpdateRange(_obj, props.index);
  };
  const onRemoveRange = () => {
    props.onRemoveRange(props.range.id);
  };
  return (
    <RangeItemWrapper>
      <ColorPiker
        id={`color${props.range.id}`}
        colorSchema={DEFAULT_SEGMENTS_COLORS_SCHEMA}
        styles={{ width: '20px', minHeight: '20px', height: '20px', margin: 'auto 20px auto 0' }}
        // required?: boolean;
        previewColorStyles={{ padding: '0', width: '100%', height: '100%', border: 'none' }}
        onChange={v => onChange(v, 'color')}
        color={props.range.color}
      />
      <TextInput
        name="rangeName"
        value={props.range.name}
        onChange={v => onChange(v, 'name')}
        styles={{ minHeight: '50px', height: '50px', width: '160px', margin: 'auto 20px auto 0' }}
        placeholder="Name"
        // inputStyles={{ borderColor: !props.name ? 'var(--_errorColor)' : 'var(--_defaultInputBorder)' }}
      />
      <FromToWrapper>
        <TextNumberInput
          name="rangeName"
          value={props.range.from}
          onChange={v => onChange(v, 'from')}
          styles={{ minHeight: '50px', height: '50px', width: '80px', margin: 'auto 0' }}
          placeholder="From"
          readOnly
          // inputStyles?: Object;
        />
        <FromToLine />
        <TextNumberInput
          name="rangeName"
          value={props.range.to}
          onChange={v => onChange(v, 'to')}
          styles={{ minHeight: '50px', height: '50px', width: '80px', margin: 'auto 0' }}
          placeholder="To"
          step="1"
          min={props.range.from + 1}
          // inputStyles?: Object;
        />
      </FromToWrapper>
      <IconWrapper classes="inheritRemoveFill" onClick={onRemoveRange} icon={deleteIcon('var(--_defaultIconColor)')} styles={{ margin: 'auto 0', flexShrink: 0 }} width="20px" height="20px" />
    </RangeItemWrapper>
  );
};

export default React.memo(RangeItem);
