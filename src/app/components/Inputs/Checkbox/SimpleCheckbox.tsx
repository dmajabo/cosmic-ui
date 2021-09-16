import React from 'react';
import { WrapLabel, Checkbox, Input, Overlay } from './styles';
import { сheckboxWithSizeIcon } from 'app/components/SVGIcons/checkBoxIcon';

interface Props {
  isChecked: boolean;
  toggleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  width?: string;
  height?: string;
  iconSize?: number;
}
const SimpleCheckbox: React.FC<Props> = props => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.toggleCheckboxChange) {
      return;
    }
    props.toggleCheckboxChange(e);
  };

  return (
    <WrapLabel disabled={props.isDisabled || false}>
      <Checkbox paddingLeft={props.width} minHeight={props.height} alignSvg="unset" disabled={props.isDisabled || false}>
        <Input type="checkbox" checked={props.isChecked} onChange={onChange} disabled={props.isDisabled} />
        <Overlay width={props.width} height={props.height}>
          {props.isChecked && сheckboxWithSizeIcon(props.iconSize)}
        </Overlay>
      </Checkbox>
    </WrapLabel>
  );
};
export default React.memo(SimpleCheckbox);
