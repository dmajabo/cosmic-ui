import React from 'react';
import { Slider, Mark } from '@mui/material';
import { withStyles } from '@mui/styles';
import ValueLabelComponent from './ValueLabelComponent';
import { SliderWrapper } from './styles';
import { InputLabel } from 'app/components/Inputs/styles/Label';
import { Required } from 'app/components/Inputs/FormTextInput/styles';

const SliderStyles = withStyles({
  root: {
    color: 'var(--_primaryTextColor)',
    height: 40,
    padding: '12px 0px 20px 0px',
    boxSizing: 'border-box',
    margin: 0,
    '&.MuiSlider-root.Mui-disabled': {
      opacity: 0.5,
    },
  },
  thumb: {
    '&:focus, &:hover, &$active': {
      boxShadow: 'none !important',
    },
    '&.MuiSlider-thumb': {
      display: 'inline-flex',
      top: 'calc(50% - 12px)',
      marginTop: 0,
      marginLeft: -8,
      height: 16,
      width: 16,
      border: '4px solid var(--_primaryBg)',
      backgroundColor: 'var(--_defaultIconColor)',
      borderRadius: '50%',
      boxShadow: '0px 4px 15px rgba(5, 20, 58, 0.15) !important',
      zIndex: 1,
    },
    '&:after': {
      display: 'none',
    },
  },
  active: {},
  track: {
    height: 8,
    borderRadius: 10,
    display: 'none',
  },
  rail: {
    height: 8,
    borderRadius: 10,
    backgroundColor: 'var(--_vmBg)',
    position: 'relative',
    top: '0px',
    opacity: 1,
  },
  mark: {
    display: 'none',
  },
  markLabel: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 11,
    lineHeight: 'normal',
    color: 'var(--_disabledTextColor)',
    fontFamily: 'DMSans',
    letterSpacing: 'normal',
    top: 'unset',
    bottom: '0',
    transform: 'unset',
  },
  markActive: {
    color: 'var(--_primaryTextColor)',
  },
})(Slider);

interface Props {
  step: number;
  min: number;
  max: number;
  value: number;
  label?: string;
  values: Mark[];
  defaultValue?: number;
  onChange: (value: number) => void;
  wrapStyles?: Object;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const CustomSlider: React.FC<Props> = ({ label, min, max, step, value, values, defaultValue, onChange, wrapStyles, required, disabled, readOnly }) => {
  const [selected, setSelected] = React.useState<number>(value || min);
  const [displayedValues, setDisplayedValues] = React.useState<Mark[]>([]);

  React.useEffect(() => {
    setDisplayedValues([
      ...values.map((it, index) => {
        if (index === 0) {
          return { ...it, label: <span className="slider-mark text-left">{it.label}</span> };
        }
        if (index === values.length - 1) {
          return { ...it, label: <span className="slider-mark text-right">{it.label}</span> };
        }
        return { ...it, label: <span className="slider-mark">{it.label}</span> };
      }),
    ]);
  }, [values]);

  React.useEffect(() => {
    if (value !== selected) {
      setSelected(value);
    }
  }, [value]);
  const onChangeSelected = (event: Event, value: number, activeThumb: number) => {
    setSelected(value);
  };

  const onChangeCommited = (event: React.SyntheticEvent | Event, value: number) => {
    if (!event || value === undefined || value === null) return;
    onChange(value);
  };

  if (!values || !values.length) return null;
  return (
    <SliderWrapper style={wrapStyles}>
      {label && (
        <InputLabel disabled={disabled || readOnly}>
          {label}
          {required && <Required>*</Required>}
        </InputLabel>
      )}
      <SliderStyles
        value={selected}
        defaultValue={defaultValue}
        min={min}
        step={step}
        max={max}
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        marks={displayedValues}
        onChange={onChangeSelected}
        onChangeCommitted={onChangeCommited}
      />
    </SliderWrapper>
  );
};

export default React.memo(CustomSlider);
