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
  color: string;
  id: string;
  name: string;
  from: number;
  to: number;
  prevTo: number;
  nextFrom: number;
  index: number;
  onRemoveRange: (id: string) => void;
  onUpdateRange: (item: IFlowPreferenceRange, index: number) => void;
}

const RangeItem: React.FC<Props> = (props: Props) => {
  // const [range, setRange] = React.useState<IFlowRange>(props.range);
  const [fromMin, setFromMin] = React.useState<number>(0);
  const [fromMax, setFromMax] = React.useState<number>(Infinity);
  const [toMin, setToMin] = React.useState<number>(0);
  const [toMax, setToMax] = React.useState<number>(Infinity);

  React.useEffect(() => {
    const { fromMinValue, fromMaxValue, toMinValue, toMaxValue } = getMinMAxValues(props.from, props.to, props.prevTo, props.nextFrom);
    setFromMin(fromMinValue);
    setFromMax(fromMaxValue);
    setToMin(toMinValue);
    setToMax(toMaxValue);
  }, [props.from, props.to, props.prevTo, props.nextFrom]);

  const getMinMAxValues = (from: number, to: number, prevTo: number, nextFrom: number) => {
    const fmin = prevTo || prevTo === 0 ? prevTo + 1 : 0;
    const fmax = to || to === 0 ? Math.max(0, to - 1) : Infinity;
    const tmin = from || from === 0 ? from + 1 : 1;
    const tmax = nextFrom || nextFrom === 0 ? Math.max(0, nextFrom - 1) : Infinity;
    return { fromMinValue: fmin, fromMaxValue: fmax, toMinValue: tmin, toMaxValue: tmax };
  };

  const onChange = (v: any, field: string) => {
    const _obj: IFlowPreferenceRange = { ...props.range };
    _obj[field] = v;
    console.log(_obj);
    props.onUpdateRange(_obj, props.index);
  };
  const onRemoveRange = () => {
    props.onRemoveRange(props.id);
  };
  return (
    <RangeItemWrapper>
      <ColorPiker
        id={`color${props.id}`}
        colorSchema={DEFAULT_SEGMENTS_COLORS_SCHEMA}
        styles={{ width: '20px', minHeight: '20px', height: '20px', margin: 'auto 20px auto 0' }}
        // required?: boolean;
        previewColorStyles={{ padding: '0', width: '100%', height: '100%' }}
        onChange={v => onChange(v, 'color')}
        color={props.color}
      />
      <TextInput
        name="rangeName"
        value={props.name}
        onChange={v => onChange(v, 'name')}
        styles={{ minHeight: '50px', height: '50px', width: '160px', margin: 'auto 20px auto 0' }}
        placeholder="Name"
        // inputStyles?: Object;
      />
      <FromToWrapper>
        <TextNumberInput
          name="rangeName"
          value={props.from}
          onChange={v => onChange(v, 'from')}
          styles={{ minHeight: '50px', height: '50px', width: '80px', margin: 'auto 0' }}
          placeholder="From"
          step="1"
          min={fromMin}
          max={fromMax}
          // inputStyles?: Object;
        />
        <FromToLine />
        <TextNumberInput
          name="rangeName"
          value={props.to}
          onChange={v => onChange(v, 'to')}
          styles={{ minHeight: '50px', height: '50px', width: '80px', margin: 'auto 0' }}
          placeholder="To"
          step="1"
          min={toMin}
          max={toMax}
          // inputStyles?: Object;
        />
      </FromToWrapper>
      <IconWrapper classes="inheritRemoveFill" onClick={onRemoveRange} icon={deleteIcon('var(--_defaultIconColor)')} styles={{ margin: 'auto 0', flexShrink: 0 }} width="20px" height="20px" />
    </RangeItemWrapper>
  );
};

export default React.memo(RangeItem);
