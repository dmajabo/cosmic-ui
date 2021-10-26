import React from 'react';
import { SwitchStyles, SwitchStylesCb, SwitchStylesSwitch } from './styles';

interface Props {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: React.ChangeEvent<HTMLInputElement>) => void;
}
const ToggleSwitch: React.FC<Props> = ({ checked, onChange, disabled }) => {
  return (
    <SwitchStyles>
      <SwitchStylesCb type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
      <SwitchStylesSwitch className="switch" />
    </SwitchStyles>
  );
};

export default React.memo(ToggleSwitch);
