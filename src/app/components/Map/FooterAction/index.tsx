import React from 'react';
import { SliderWrapper, Wrapper } from './styles';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { IPanelBarLayoutTypes, ISelectedListItem, ITimeTypes, TIME_PERIOD } from 'lib/models/general';
import Toogle from 'app/components/Inputs/Toogle';
import { PanelWrapperStyles } from 'app/components/Basic/PanelBar/styles';
import TimeSlider from 'app/components/Inputs/TimeSlider';
import CalendarComponent from 'app/components/Inputs/Calendar';
import { SLIDER_RANGE_INPUT } from 'app/components/Inputs/TimeSlider/models';
import { ITimeMinMaxRange } from 'app/components/Inputs/TimeSlider/helpers';
// import { getTimeQueryMetricsString } from 'lib/api/ApiModels/Metrics/queryTimeRangeHelper';
// import { format } from 'date-fns';
// import { toTimestamp } from 'lib/api/ApiModels/Topology/endpoints';

interface IProps {
  show: boolean;
  isMetricks: boolean;
  onTryLoadData: (_time: Date) => void;
}

const FooterAction: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [selectedPeriod, setSelectedPeriod] = React.useState<ISelectedListItem<ITimeTypes> | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  React.useEffect(() => {
    if (topology && topology.selectedPeriod !== selectedPeriod) {
      setSelectedPeriod(topology.selectedPeriod);
    }
  }, [topology, topology.selectedPeriod]);

  React.useEffect(() => {
    if (topology && topology.selectedTime !== selectedTime) {
      setSelectedTime(topology.selectedTime);
    }
  }, [topology, topology.selectedTime]);

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
    topology.onChangeTime(_time);
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

  const onUpdateRange = (_range: ITimeMinMaxRange) => {
    topology.onUpdateTimeRange(_range);
  };

  return (
    <PanelWrapperStyles show={props.show} type={IPanelBarLayoutTypes.HORIZONTAL}>
      <Wrapper>
        {/* <div style={{ position: 'absolute', top: '-91px', left: '20px', fontSize: '12px' }}>
          <div>Selected calendar day: {selectedTime ? format(selectedTime, 'dd MMM yyyy h:mm aa') : 'current day. In Query - params will be empty'}</div>
          <div>Start Time in range: {topology && topology.timeRange ? format(topology.timeRange.min, 'yyyy MMM dd h:mm aa') : 'current day. In Query - params will be empty'}</div>
          <div>End Time in range: {topology && topology.timeRange ? format(topology.timeRange.max, 'yyyy MMM dd h:mm aa') : 'current day. In Query - params will be empty'}</div>
          <div>Query for metrics: {topology && topology.timeRange ? getTimeQueryMetricsString(topology.timeRange) : 'current day. In Query - params will be empty'}</div>
          <div>Query for topology: {selectedTime ? toTimestamp(selectedTime) : 'Query - params will be empty'}</div>
        </div> */}
        <Toogle selectedValue={selectedPeriod} values={TIME_PERIOD} onChange={onChangeTimePeriod} />
        <CalendarComponent onChange={onSetCurrentDay} selectedDay={selectedTime} />
        <SliderWrapper>
          <TimeSlider
            rangeId={SLIDER_RANGE_INPUT}
            onUpdateRange={onUpdateRange}
            selectedCalendarDay={selectedTime}
            currentPeriod={selectedPeriod ? selectedPeriod.value : null}
            onUpdate={onUpdateTime}
          />
        </SliderWrapper>
      </Wrapper>
    </PanelWrapperStyles>
  );
};

export default React.memo(FooterAction);
