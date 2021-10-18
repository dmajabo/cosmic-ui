import React from 'react';
import { Checkbox, Input, Overlay, Label } from './CheckBoxStyles';
import { сheckboxWithSizeIcon } from 'app/components/SVGIcons/checkBoxIcon';

interface Props {
  label: string;
  isChecked: boolean;
  toggleCheckboxChange?: (checked: boolean) => void;
  isDisabled?: boolean;
  readOnly?: boolean;
  width?: string;
  height?: string;
  iconSize?: number;
}
const CheckBox: React.FC<Props> = props => {
  const onChange = (e: any) => {
    if (!props.toggleCheckboxChange) {
      return;
    }
    const _v = props.isChecked ? false : true;
    props.toggleCheckboxChange(_v);
  };

  return (
    <Checkbox onClick={onChange} paddingLeft={props.width} minHeight={props.height} alignSvg="top" checked={props.isChecked} disabled={props.isDisabled || props.readOnly}>
      <Input type="checkbox" onChange={() => {}} checked={props.isChecked} width={props.width} height={props.height} />
      <Overlay width={props.width} height={props.height}>
        {props.isChecked && сheckboxWithSizeIcon(props.iconSize)}
      </Overlay>
      <Label isChecked={props.isChecked}>{props.label}</Label>
    </Checkbox>
  );
};
export default React.memo(CheckBox);
