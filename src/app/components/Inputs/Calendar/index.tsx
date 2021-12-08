import React from 'react';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import IconButton from 'app/components/Buttons/IconButton';
import { calendarIcon } from 'app/components/SVGIcons/calendarIcon';
import { DisplayedDay, DisplayedDaySpan, Wrapper } from './styles';
import { differenceInCalendarDays, format, getDate, getMonth, getYear } from 'date-fns';

interface IProps {
  selectedDay: null | Date;
  onChange: (value: Date) => void;
}
const CalendarComponent: React.FC<IProps> = (props: IProps) => {
  const [selectedDay, setSelectedDay] = React.useState<DayValue>(null);
  const [maxDay, setMaxDay] = React.useState<DayValue>(null);
  const [displayDay, setDisplayDay] = React.useState<string[]>(null);

  React.useEffect(() => {
    const _current = props.selectedDay ? props.selectedDay : null;
    onSetDates(_current);
  }, [props.selectedDay]);

  const onSetDates = (_current: Date | null) => {
    const _today = new Date();
    let current: DayValue = null;
    if (_current) {
      current = {
        year: getYear(_current),
        month: getMonth(_current) + 1,
        day: getDate(_current),
      };
    } else {
      current = {
        year: getYear(_today),
        month: getMonth(_today) + 1,
        day: getDate(_today),
      };
    }
    const maximumDate: DayValue = {
      year: getYear(_today),
      month: getMonth(_today) + 1,
      day: getDate(_today),
    };
    if (differenceInCalendarDays(new Date(current.year, current.month - 1, current.day), Date.now()) !== 0) {
      const _d = format(_current, 'd');
      const _m = format(_current, 'MMM');
      setDisplayDay([_d, _m]);
    } else {
      setDisplayDay(null);
    }
    setMaxDay(maximumDate);
    setSelectedDay(current);
  };

  const onChange = (e: DayValue) => {
    let _selectedDay = new Date(e.year, e.month - 1, e.day);
    _selectedDay = differenceInCalendarDays(_selectedDay, Date.now()) !== 0 ? new Date(e.year, e.month - 1, e.day) : null;
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
        <IconButton styles={{ margin: '0', position: 'absolute', top: 0, left: 0, width: '40px', height: '40px' }} icon={calendarIcon} onClick={() => onFocus(ref)} />
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
