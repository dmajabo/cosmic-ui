import React from 'react';
import { SliderWrapper, Wrapper } from './styles';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { IPanelBarLayoutTypes, ISelectedListItem, ITimeRange, ITimeTypes, TIME_PERIOD } from 'lib/models/general';
import Toogle from 'app/components/Inputs/Toogle';
import { PanelWrapperStyles } from 'app/components/Basic/PanelBar/styles';
import TimeSlider from 'app/components/Inputs/TimeSlider';
import CalendarComponent from 'app/components/Inputs/Calendar';
// import { format } from 'date-fns';

interface IProps {
  show: boolean;
  isMetricks: boolean;
  onTryLoadData: (_time: Date) => void;
}

const FooterAction: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes> | null>(null);
  const [selectedRange, setSelectedRange] = React.useState<ITimeRange | null>({ startTime: null, endTime: null, selectedCalendarDay: null });
  React.useEffect(() => {
    if (topology && topology.selectedPeriod !== selectedPeriod) {
      setSelectedPeriod(topology.selectedPeriod);
    }
  }, [topology, topology.selectedPeriod]);

  React.useEffect(() => {
    if (topology && topology.selectedRange !== selectedRange) {
      setSelectedRange(topology.selectedRange);
    }
  }, [topology, topology.selectedRange]);

  // const onFilter = (value: string | null) => {
  //   topology?.onFilterQueryChange(value);
  // };

  // const onSelect = (_item: ISelectedListItem<ITopologySelectTypes>) => {
  //   topology?.onSetSelectedType(_item.id);
  // };

  const onChangeTimePeriod = (value: ISelectedListItem<ITimeTypes>) => {
    topology?.onChangeTimePeriod(value);
  };

  const onUpdateTime = (_time: Date | null) => {
    topology.onChangeTimeRange(_time);
    if (props.isMetricks) {
      return;
    }
    const _timeStamp = _time ? new Date(_time) : null;
    props.onTryLoadData(_timeStamp);
  };

  const onSetCurrentDay = (_date: Date) => {
    topology.onChangeSelectedDay(_date);
    if (props.isMetricks) {
      return;
    }
    const _timeStamp = _date || null;
    props.onTryLoadData(_timeStamp);
  };

  return (
    <PanelWrapperStyles show={props.show} type={IPanelBarLayoutTypes.HORIZONTAL}>
      <Wrapper>
        {/* <div style={{ position: 'absolute', top: '-60px', left: '20px', fontSize: '12px' }}>
          <div>Selected calendar day: {selectedRange.selectedCalendarDay ? format(selectedRange.selectedCalendarDay, 'dd MMM yyyy h:mm') : 'current day. In Query params will be empty'}</div>
          <div>Start Time: {selectedRange.startTime ? format(selectedRange.startTime, 'yyyy MMM dd h:mm') : 'current day. In Query params will be empty'}</div>
          <div>End Time: {selectedRange.endTime ? format(selectedRange.endTime, 'yyyy MMM dd h:mm') : null}</div>
        </div> */}
        <Toogle selectedValue={selectedPeriod} values={TIME_PERIOD} onChange={onChangeTimePeriod} />
        <CalendarComponent onChange={onSetCurrentDay} selectedDay={selectedRange.selectedCalendarDay} />
        <SliderWrapper>
          <TimeSlider
            selectedCalendarDay={selectedRange.selectedCalendarDay}
            currentValue={selectedRange.startTime}
            currentPeriod={selectedPeriod ? selectedPeriod.value : null}
            onUpdate={onUpdateTime}
          />
        </SliderWrapper>
      </Wrapper>
    </PanelWrapperStyles>
  );
};

export default React.memo(FooterAction);
