import React from 'react';
import { WrapLabel, Checkbox, Input, Overlay } from './styles';
import { сheckboxIndeterminate, сheckboxWithSizeIcon } from 'app/components/SVGIcons/checkBoxIcon';

interface Props {
  isChecked: boolean;
  toggleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  readOnly?: boolean;
  width?: string;
  height?: string;
  iconSize?: number;
  wrapStyles?: Object;
  indeterminate?: boolean;
}
const SimpleCheckbox: React.FC<Props> = props => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.toggleCheckboxChange) {
      return;
    }
    props.toggleCheckboxChange(e);
  };

  return (
    <WrapLabel style={props.wrapStyles} disabled={props.isDisabled || false}>
      <Checkbox paddingLeft={props.width} minHeight={props.height} alignSvg="top" disabled={props.isDisabled || false}>
        <Input type="checkbox" checked={props.isChecked} onChange={onChange} disabled={props.isDisabled || props.readOnly} />
        <Overlay width={props.width} height={props.height}>
          {props.isChecked && !props.indeterminate && сheckboxWithSizeIcon(props.iconSize)}
          {props.isChecked && props.indeterminate && сheckboxIndeterminate(props.iconSize)}
        </Overlay>
      </Checkbox>
    </WrapLabel>
  );
};
export default React.memo(SimpleCheckbox);
