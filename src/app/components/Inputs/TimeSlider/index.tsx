import React from 'react';
// import { Handles, Rail, Slider, Ticks, Tracks } from 'react-compound-slider';
import { withStyles } from '@material-ui/core/styles';
import { ITimeConfig, ITimeValue } from './models';
import { ITimeTypes } from 'lib/models/general';
import { formatTick, getDomain, getDayInMiliseconds, getSliderValuesConfig, getTicks } from './helpers';
import Slider from '@material-ui/core/Slider';
import ValueLabelComponent from './ValueLabelComponent';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';

const SliderStyles = withStyles({
  root: {
    color: 'var(--_primaryColor)',
    height: 10,
    padding: '10px 0 15px 0',
    margin: 0,
    '&.MuiSlider-root.Mui-disabled': {
      opacity: 0.5,
    },
  },
  thumb: {
    '&:focus, &:hover, &$active': {
      boxShadow: '0px 4px 15px rgba(5, 20, 58, 0.15) !important',
    },
    '&.MuiSlider-thumb': {
      boxShadow: 'none',
      marginTop: -8,
      marginLeft: -12,
      height: 24,
      width: 24,
      border: '5px solid var(--_primaryBg)',
      backgroundColor: 'var(--_hoverButtonBg)',
      borderRadius: '50%',
    },
    '&:after': {
      display: 'none',
    },
  },
  active: {},
  track: {
    height: 10,
    borderRadius: 20,
    backgroundColor: 'var(--_vmBg)',
  },
  rail: {
    height: 10,
    borderRadius: 20,
    backgroundColor: 'var(--_vmBg)',
  },
  mark: {
    backgroundColor: 'var(--_primaryButtonBorder)',
    height: 16,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'var(--_primaryButtonBorder)',
  },
  markLabel: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 11,
    lineHeight: 'normal',
    color: 'var(--_disabledTextColor)',
    fontFamily: 'DMSans',
    letterSpacing: 'normal',
    top: '30px',
  },
})(Slider);

interface Props {
  currentPeriod: ITimeTypes;
  currentValue: Date | null;
  disabled?: boolean;
  onUpdate: (_time: number) => void; // miliseconds
}

const TimeSlider: React.FC<Props> = (props: Props) => {
  const [config, setConfig] = React.useState<ITimeConfig | null>(null);
  const [values, setValues] = React.useState<ITimeValue[]>([]);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [defaultValue] = React.useState<number>(new Date(Date.now()).getTime());
  const [disabled, setDisabled] = React.useState<boolean>(props.disabled || true);
  const [isTyping, setIsChanged] = React.useState(false);
  const debouncedValue = useDebounce(selected, DEBOUNCE_TIME);

  React.useEffect(() => {
    if ((debouncedValue || debouncedValue === null) && isTyping) {
      setIsChanged(false);
      // if (props.currentValue && props.currentValue.getTime() === selected) { return; }
      props.onUpdate(selected);
    }
  }, [debouncedValue]);

  React.useEffect(() => {
    onSetConfig(props.currentPeriod, props.currentValue);
  }, [props.currentValue, props.currentPeriod]);

  const onSetConfig = (_period: ITimeTypes, startDate: Date | null) => {
    const _obj: ITimeConfig = getSliderValuesConfig(_period, startDate, config);
    const _domain: number[] = getDomain(_obj.min, _obj.max);
    const _values: ITimeValue[] = getTicks(props.currentPeriod, _domain);
    _obj.domain = _domain;
    const _disabled = props.currentPeriod ? false : true;
    let _selected = _obj.max;
    if (props.currentValue) {
      _selected = getDayInMiliseconds(_period, props.currentValue);
    }
    setSelected(_selected);
    setDisabled(_disabled);
    setValues(_values);
    setConfig(_obj);
  };

  const handleChange = (event: object, value: number) => {
    if (!event || !props.currentPeriod) {
      return;
    }
    setSelected(value);
    setIsChanged(true);
  };

  if (!config || !values || !values.length) {
    return null;
  }

  return (
    <SliderStyles
      classes={{ markLabel: 'slider-label', mark: 'slider-mark' }}
      value={selected}
      defaultValue={defaultValue}
      min={config.min}
      step={config.step}
      max={config.max}
      disabled={disabled}
      valueLabelFormat={_v => formatTick(props.currentPeriod, _v)}
      ValueLabelComponent={ValueLabelComponent}
      marks={values}
      onChange={handleChange}
      valueLabelDisplay="auto"
    />
  );
};

export default React.memo(TimeSlider);
