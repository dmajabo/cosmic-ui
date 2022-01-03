import React from 'react';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { IOption } from '..';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  boxShadow: 'none',
  background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#437FEC',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 45%,transparent 15%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

const BpRadio: React.FC<RadioProps> = props => {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="primary"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};

interface CustomRadioProps {
  readonly radioOptions: IOption[];
  readonly setRadioValue: (value: string) => void;
  readonly defaultValue: IOption;
}

export const CustomRadio: React.FC<CustomRadioProps> = ({ radioOptions, setRadioValue, defaultValue }) => {
  const onRadioValueChange = event => setRadioValue(event.target.value);

  return (
    <FormControl component="fieldset">
      <RadioGroup defaultValue={defaultValue.value} onChange={onRadioValueChange} aria-label="options" name="customized-radios">
        {radioOptions.map(option => (
          <FormControlLabel key={option.value} value={option.value} control={<BpRadio />} label={option.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
