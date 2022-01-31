import React from 'react';
import { IFlowRange } from '../models';
import { FromToLine, FromToWrapper, RangeItemColor, RangeItemWrapper } from './style';
import TextInput from 'app/components/Inputs/TextInput';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import TextNumberInput from 'app/components/Inputs/TextInput/TextNumberInput';

interface Props {
  range: IFlowRange;
  index: number;
  onRemoveRange: (id: string) => void;
  onUpdateRange: (item: IFlowRange, index: number) => void;
}

const RangeItem: React.FC<Props> = (props: Props) => {
  const onChange = (v: any, field: string) => {
    const _obj: IFlowRange = { ...props.range };
    _obj[field] = v;
    props.onUpdateRange(_obj, props.index);
  };
  const onRemoveRange = () => {
    props.onRemoveRange(props.range.id);
  };
  return (
    <RangeItemWrapper>
      <RangeItemColor color={props.range.color} />
      <TextInput
        name="rangeName"
        value={props.range.name}
        onChange={v => onChange(v, 'name')}
        styles={{ minHeight: '50px', height: '50px', width: '160px', margin: 'auto 20px auto 0' }}
        placeholder="Name"
        // inputStyles?: Object;
      />
      <FromToWrapper>
        <TextNumberInput
          name="rangeName"
          value={props.range.from}
          onChange={v => onChange(v, 'from')}
          styles={{ minHeight: '50px', height: '50px', width: '80px', margin: 'auto 0' }}
          placeholder="From"
          // inputStyles?: Object;
        />
        <FromToLine />
        <TextNumberInput
          name="rangeName"
          value={props.range.to}
          onChange={v => onChange(v, 'to')}
          styles={{ minHeight: '50px', height: '50px', width: '80px', margin: 'auto 0' }}
          placeholder="To"
          // inputStyles?: Object;
        />
      </FromToWrapper>
      <IconWrapper classes="inheritRemoveFill" onClick={onRemoveRange} icon={deleteIcon('var(--_defaultIconColor)')} styles={{ margin: 'auto 0', flexShrink: 0 }} width="20px" height="20px" />
    </RangeItemWrapper>
  );
};

export default React.memo(RangeItem);
