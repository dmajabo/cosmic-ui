import React from 'react';
import { withStyles } from '@mui/styles';
import { ITimeConfig, ITimeValue } from './models';
import { ITimeTypes } from 'lib/models/general';
import { getDomain, getMinMaxSliderRange, getSliderValuesConfig, getTicks, ITimeMinMaxRange } from './helpers';
import { Slider } from '@mui/material';
import ValueLabelComponent from './ValueLabelComponent';
import { differenceInCalendarDays, differenceInMinutes, format, isThisHour, isToday } from 'date-fns';

const SliderStyles = withStyles({
  root: {
    '&.MuiSlider-root': {
      color: 'var(--_primaryTextColor)',
      height: 40,
      padding: '10px 0px 20px 0px',
      boxSizing: 'border-box',
      margin: 0,
    },
    '& *': {
      fontFamily: 'DMSans !important',
    },
    '&.MuiSlider-root.Mui-disabled': {
      opacity: 0.5,
    },
    '& .MuiSlider-thumb': {
      display: 'inline-flex',
      top: 'calc(50% - 17px)',
      marginTop: 0,
      marginLeft: -12,
      height: 24,
      width: 24,
      border: '5px solid var(--_primaryBg)',
      backgroundColor: 'var(--_hoverButtonBg)',
      borderRadius: '50%',
      boxShadow: '0px 4px 15px rgba(5, 20, 58, 0.15) !important',
      zIndex: 1,
      transform: 'none',
      '&:focus, &:hover, &:active': {
        boxShadow: 'none !important',
      },
      '&:after': {
        display: 'none',
      },
    },
    '& .MuiSlider-track': {
      height: 10,
      borderRadius: 20,
      paddingRight: '50px',
      top: '10px',
      boxSizing: 'content-box',
      transform: 'none',
      border: 'none',
      background:
        'linear-gradient(90deg, rgba(67, 127, 236, 0) calc(100% - 100px), rgba(67, 127, 236, 0.2) calc(100% - 75px), #437FEC calc(100% - 50px), rgba(67, 127, 236, 0.2) calc(100% - 25px), rgba(67, 127, 236, 0) 100%)',
    },
    '& .MuiSlider-rail': {
      height: 10,
      borderRadius: 20,
      backgroundColor: 'var(--_vmBg)',
      position: 'relative',
      top: '0',
      transform: 'none',
    },
    '& .MuiSlider-mark': {
      display: 'none',
    },
    '& .MuiSlider-markActive': {
      display: 'none',
    },
    '& .MuiSlider-markLabel': {
      transform: 'none',
      position: 'absolute',
      whiteSpace: 'nowrap',
      top: '32px',
      color: 'var(--_disabledTextColor)',
      fontSize: '11px',
      fontStyle: 'normal',
      fontFamily: 'DMSans',
      fontWeight: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      '& .sliderMarkBorder': {
        position: 'absolute',
        top: '-25px',
        background: 'var(--_borderColor)',
        width: '1px',
        height: '16px',
        '&.activeBorder': {
          width: '2px',
          top: '-30px',
          height: '26px',
        },
        '&.lastBorder': {
          left: '-2px',
        },
      },
      '& .sliderMarkText': {
        textAlign: 'center',
        marginLeft: '-50%',
      },
      '& .highLight': {
        fontWeight: '700',
        color: 'var(--_primaryTextColor)',
      },
    },
  },
})(Slider);

interface Props {
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

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log('Check config');
      onSetConfig(props.currentPeriod, props.selectedCalendarDay);
    }, 60000); // every 1min
    return () => clearInterval(interval);
  }, []);

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
    const _visibleItems = _values.map((it, index) => ({
      ...it,
      label: (
        <>
          <span className={`sliderMarkBorder${it.highlight || index === _values.length - 1 ? ' activeBorder' : ''}${index === _values.length - 1 ? ' lastBorder' : ''}`} />
          <span className={`sliderMarkText${it.highlight || index === _values.length - 1 ? ' highLight' : ''}`}>{it.label}</span>
        </>
      ),
    }));
    console.log(_visibleItems);
    setSelected(_selected);
    setValues(_visibleItems);
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

  const handleChange = (event: Event, value: number, activeThumb: number) => {
    if (!event || !props.currentPeriod) return;
    setSelected(value);
  };

  const onChangeCommited = (event: React.SyntheticEvent | Event, value: number) => {
    if (!event || !value || differenceInMinutes(value, props.selectedCalendarDay) === 0) return;
    let _d = new Date(value);
    if (isToday(value) && isThisHour(value)) {
      _d = null;
    }
    props.onUpdate(_d);
  };

  if (!config || !values || !values.length) {
    return null;
  }
  return (
    <SliderStyles
      value={selected}
      defaultValue={defaultValue}
      min={config.min}
      step={config.step}
      max={config.max}
      valueLabelDisplay="auto"
      components={{
        ValueLabel: ValueLabelComponent,
      }}
      marks={values}
      onChange={handleChange}
      onChangeCommitted={onChangeCommited}
      valueLabelFormat={(value: number) => `${format(value, 'yyyy MMM dd')},   ${format(value, 'h aa')}`}
    />
  );
};

export default React.memo(TimeSlider);
