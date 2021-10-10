import React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import { BpCheckedIcon, BpIcon, Label } from './styles';

interface Props {
  label: string;
  wrapstyles?: Object;
}

const RadioButton: React.FC<Props & RadioProps> = props => {
  return (
    <Label style={props.wrapstyles}>
      <Radio
        sx={{
          padding: 0,
          margin: 'auto 12px auto 0',
          '&:hover': {
            bgcolor: 'transparent',
          },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
      <span className="labelValue">{props.label}</span>
    </Label>
  );
};

export default React.memo(RadioButton);
