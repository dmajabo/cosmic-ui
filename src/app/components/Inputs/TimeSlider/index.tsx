import React from 'react';
// import { Handles, Rail, Slider, Ticks, Tracks } from 'react-compound-slider';
import { withStyles } from '@material-ui/core/styles';
import { ITimeConfig, ITimeValue } from './models';
import { ITimeTypes } from 'lib/models/general';
import { getDomain, getMinMaxSliderRange, getSliderValuesConfig, getTicks, ITimeMinMaxRange } from './helpers';
import Slider from '@material-ui/core/Slider';
import ValueLabelComponent from './ValueLabelComponent';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import { differenceInCalendarDays, format, isThisHour, isToday } from 'date-fns';

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
      '& .slider-thumb-circle': {
        boxShadow: '0px 4px 15px rgba(5, 20, 58, 0.15)',
      },
      boxShadow: 'none !important',
    },
    '&.MuiSlider-thumb': {
      display: 'inline-flex',
      boxShadow: 'none',
      marginTop: -8,
      marginLeft: -12,
      height: 24,
      width: 'auto',
      border: 'none',
      backgroundColor: 'transparent',
      borderRadius: 'unset',
      '& .slider-thumb-circle': {
        height: 24,
        width: 24,
        border: '5px solid var(--_primaryBg)',
        backgroundColor: 'var(--_hoverButtonBg)',
        borderRadius: '50%',
        zIndex: 1,
      },
      '& .slider-thumb-gradient': {
        display: 'inline-block',
        position: 'absolute',
        height: '50px',
        width: '10px',
        background: 'linear-gradient(180deg, rgba(67, 127, 236, 0) 0%, rgba(67, 127, 236, 0.2) 26.04%, #437FEC 100%)',
        transform: 'rotate(-90deg)',
        top: '-12px',
        right: '30px',
      },
    },
    '&:after': {
      display: 'none',
    },
  },
  active: {},
  track: {
    height: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
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
  rangeId: string;
  selectedCalendarDay: Date | null;
  currentPeriod: ITimeTypes;
  disabled?: boolean;
  onUpdate: (_time: Date) => void;
  onUpdateRange: (range: ITimeMinMaxRange) => void;
}

const TimeSlider: React.FC<Props> = (props: Props) => {
  const [config, setConfig] = React.useState<ITimeConfig | null>(null);
  const [values, setValues] = React.useState<ITimeValue[]>([]);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [defaultValue] = React.useState<number>(new Date(Date.now()).getTime());
  const [isTyping, setIsChanged] = React.useState(false);
  const debouncedValue = useDebounce(selected, DEBOUNCE_TIME);

  React.useEffect(() => {
    if ((debouncedValue || debouncedValue === null) && isTyping) {
      setIsChanged(false);
      // if (props.currentValue && props.currentValue.getTime() === selected) { return; }
      let _d = new Date(selected);
      if (isToday(selected) && isThisHour(selected)) {
        _d = null;
      }
      props.onUpdate(_d);
    }
  }, [debouncedValue]);

  React.useEffect(() => {
    onSetConfig(props.currentPeriod, props.selectedCalendarDay);
  }, [props.currentPeriod]);

  React.useEffect(() => {
    if (differenceInCalendarDays(selected, props.selectedCalendarDay) !== 0 || (isToday(props.selectedCalendarDay) && !isThisHour(props.selectedCalendarDay))) {
      onSetConfig(props.currentPeriod, props.selectedCalendarDay);
    }
  }, [props.selectedCalendarDay]);

  const onSetConfig = (_period: ITimeTypes, startDate: Date | null) => {
    const _obj: ITimeConfig = getSliderValuesConfig(_period, startDate);
    const _domain: number[] = getDomain(_obj.min, _obj.max);
    _obj.domain = _domain;
    const _selected = _obj.selected || _obj.max;
    const _values: ITimeValue[] = getTicks(props.currentPeriod, _domain, _selected);
    setSelected(_selected);
    setValues(_values);
    setConfig(_obj);
    if (config && (_obj.min !== config.min || _obj.max !== config.max)) {
      const _range: ITimeMinMaxRange = getMinMaxSliderRange(_obj.min, _obj.max);
      props.onUpdateRange(_range);
    }
    if (!config) {
      const _range: ITimeMinMaxRange = getMinMaxSliderRange(_obj.min, _obj.max);
      props.onUpdateRange(_range);
    }
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

  // const valuetext = () => {

  // }

  return (
    <>
      <input
        style={{ visibility: 'hidden', opacity: '0', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: 0, height: 0 }}
        id={props.rangeId}
        type="range"
        min={config.min}
        max={config.max}
        value={selected}
        readOnly
        disabled
        onChange={() => {}}
      />
      <SliderStyles
        classes={{ markLabel: 'slider-label', mark: 'slider-mark' }}
        value={selected}
        defaultValue={defaultValue}
        min={config.min}
        step={config.step}
        max={config.max}
        ValueLabelComponent={ValueLabelComponent}
        marks={values}
        onChange={handleChange}
        ThumbComponent={props => (
          <span {...props}>
            <span className="slider-thumb-gradient" />
            <span className="slider-thumb-circle" />
          </span>
        )}
        valueLabelDisplay="auto"
        valueLabelFormat={(value: number) => `${format(value, 'yyyy MMM dd')} ${format(value, 'h aa')}`}
      />
    </>
  );
};

export default React.memo(TimeSlider);
