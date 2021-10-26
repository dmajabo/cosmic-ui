import React from 'react';
import { Label, Wrapper } from './styles';
import ToggleSwitch from './ToggleSwitch';

interface Props {
  checked: boolean;
  showLabels?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwitchInput: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = React.useState(props.checked);

  React.useEffect(() => {
    if (props.checked !== checked) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    props.onChange(event);
  };
  return (
    <Wrapper>
      {props.showLabels && (
        <Label active={!checked} margin="0 8px 0 0">
          Off
        </Label>
      )}
      <ToggleSwitch checked={checked} onChange={handleChange} />
      {props.showLabels && (
        <Label active={checked} margin="0 0 0 8px">
          On
        </Label>
      )}
    </Wrapper>
  );
};

export default React.memo(SwitchInput);
