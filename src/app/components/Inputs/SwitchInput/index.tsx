import React from 'react';
import { Switch } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { Label, Wrapper } from './styles';

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 20,
  padding: 0,
  display: 'flex',
  margin: 0,
  '& .MuiSwitch-switchBase': {
    padding: '3px 4px',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: 'transparent',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'var(--_onBg)',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'var(--_thumbBg)',
    width: 14,
    height: 14,
    borderRadius: '50%',
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: '30px',
    width: '100%',
    height: '100%',
    opacity: 1,
    backgroundColor: 'var(--_offBg)',
    boxSizing: 'border-box',
  },
}));

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
      <CustomSwitch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
      {props.showLabels && (
        <Label active={checked} margin="0 0 0 8px">
          On
        </Label>
      )}
    </Wrapper>
  );
};

export default React.memo(SwitchInput);
