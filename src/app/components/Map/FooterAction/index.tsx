import React from 'react';
import { SliderWrapper, Wrapper } from './styles';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { IPanelBarLayoutTypes, ISelectedListItem, ITimeRange, ITimeTypes, TimeRangeFieldTypes, TIME_PERIOD } from 'lib/models/general';
import Toogle from 'app/components/Inputs/Toogle';
import { PanelWrapperStyles } from 'app/components/Basic/PanelBar/styles';
import TimeSlider from 'app/components/Inputs/TimeSlider';
import CalendarComponent from 'app/components/Inputs/Calendar';
import { getHours, isToday } from 'date-fns';

interface IProps {
  show: boolean;
  isMetricks: boolean;
  onTryLoadData: (_time: Date) => void;
}

const FooterAction: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes> | null>(null);
  const [selectedRange, setSelectedRange] = React.useState<ITimeRange | null>({ startTime: null, endTime: null });
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
    const _key = props.isMetricks ? TimeRangeFieldTypes.END : TimeRangeFieldTypes.START;
    topology?.onChangeTimePeriod(value, _key);
  };

  const onUpdateTime = (_time: number) => {
    const _selected = !_time ? null : new Date(_time);
    if (selectedPeriod && selectedPeriod.value !== ITimeTypes.DAY && !isToday(_selected)) {
      const _h = !isToday(_selected) ? 23 : getHours(Date.now());
      _selected.setHours(_h);
    }
    const key = props.isMetricks ? TimeRangeFieldTypes.END : TimeRangeFieldTypes.START;
    topology.onChangeTimeRange(_selected, key);
    if (props.isMetricks) {
      return;
    }
    const _timeStamp = _time ? new Date(_time) : null;
    props.onTryLoadData(_timeStamp);
  };

  const onSetCurrentDay = (_date: Date) => {
    const key = props.isMetricks ? TimeRangeFieldTypes.END : TimeRangeFieldTypes.START;
    topology.onChangeSelectedDay(_date, key);
    if (props.isMetricks) {
      return;
    }
    const _timeStamp = _date || null;
    props.onTryLoadData(_timeStamp);
  };

  return (
    <PanelWrapperStyles show={props.show} type={IPanelBarLayoutTypes.HORIZONTAL}>
      <Wrapper>
        <Toogle selectedValue={selectedPeriod} values={TIME_PERIOD} onChange={onChangeTimePeriod} />
        <CalendarComponent onChange={onSetCurrentDay} startTime={selectedRange.startTime} />
        <SliderWrapper>
          <TimeSlider currentValue={selectedRange.startTime} currentPeriod={selectedPeriod ? selectedPeriod.value : null} onUpdate={onUpdateTime} />
        </SliderWrapper>
      </Wrapper>
    </PanelWrapperStyles>
  );
};

export default React.memo(FooterAction);
