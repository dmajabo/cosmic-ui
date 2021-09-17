import React from 'react';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import IconButton from 'app/components/Buttons/IconButton';
import { calendarIcon } from 'app/components/SVGIcons/calendarIcon';
import { DisplayedDay, DisplayedDaySpan, Wrapper } from './styles';
import { differenceInCalendarDays, format, getDate, getMonth, getYear } from 'date-fns';

interface IProps {
  startTime: null | Date;
  onChange: (value: Date) => void;
}
const CalendarComponent: React.FC<IProps> = (props: IProps) => {
  const [selectedDay, setSelectedDay] = React.useState<DayValue>(null);
  const [maxDay, setMaxDay] = React.useState<DayValue>(null);
  const [displayDay, setDisplayDay] = React.useState<string[]>(null);

  React.useEffect(() => {
    const _current = getCurrentDay(props.startTime);
    onSetDates(_current);
  }, [props.startTime]);

  const getCurrentDay = (startTime: Date): Date => {
    if (startTime) {
      return startTime;
    }
    return new Date();
  };

  const onSetDates = (_current: Date) => {
    const current: DayValue = {
      year: getYear(_current),
      month: getMonth(_current) + 1,
      day: getDate(_current),
    };
    const _today = new Date();
    const maximumDate: DayValue = {
      year: getYear(_today),
      month: getMonth(_today) + 1,
      day: getDate(_today),
    };
    if (differenceInCalendarDays(new Date(current.year, current.month - 1, current.day), Date.now()) !== 0) {
      const _d = format(new Date(current.year, current.month - 1, current.day), 'd');
      const _m = format(new Date(current.year, current.month - 1, current.day), 'MMM');
      setDisplayDay([_d, _m]);
    } else {
      setDisplayDay(null);
    }
    setMaxDay(maximumDate);
    setSelectedDay(current);
  };

  const onChange = (e: DayValue) => {
    setSelectedDay(e);
    const _today = new Date();
    let _selectedDay = new Date(e.year, e.month - 1, e.day, _today.getHours());
    const dif = differenceInCalendarDays(_selectedDay, Date.now());
    if (dif === 0) {
      _selectedDay = null;
    } else if (dif < -1) {
      _selectedDay = new Date(e.year, e.month - 1, e.day, 23);
    }
    props.onChange(_selectedDay);
  };

  const onFocus = (ref: any) => {
    ref.current.focus();
  };
  const renderCustomInput = ({ ref }) => (
    <div>
      <input
        readOnly
        type="button"
        ref={ref} // necessary
        placeholder=""
        value={''}
        style={{
          padding: '10px',
          opacity: '0',
          background: 'transparent',
          borderRadius: '6px',
          outline: 'none',
          border: 'none',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
        }}
      />
      {!displayDay ? (
        <IconButton styles={{ margin: '0', position: 'absolute', top: 0, left: 0 }} icon={calendarIcon} onClick={() => onFocus(ref)} />
      ) : (
        <DisplayedDay onClick={() => onFocus(ref)}>
          <DisplayedDaySpan>{displayDay[0]}</DisplayedDaySpan>
          <DisplayedDaySpan>{displayDay[1]}</DisplayedDaySpan>
        </DisplayedDay>
      )}
    </div>
  );
  return (
    <Wrapper>
      <DatePicker
        value={selectedDay}
        calendarPopperPosition="top"
        onChange={onChange}
        renderInput={renderCustomInput} // render a custom input
        shouldHighlightWeekends
        maximumDate={maxDay}
        colorPrimary="var(--_hoverButtonBg)"
      />
    </Wrapper>
  );
};

export default React.memo(CalendarComponent);
