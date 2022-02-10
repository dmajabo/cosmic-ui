import React from 'react';
import { IFlowPreferenceRange } from 'lib/api/ApiModels/Policy/Preference';
import { LegendRangeColorStyle, LegendRangeItemStyle, LegendRangeValueStyle } from './style';
interface Props {
  range: IFlowPreferenceRange;
}

const LegendRangeItem: React.FC<Props> = ({ range }) => {
  return (
    <LegendRangeItemStyle>
      <LegendRangeColorStyle color={range.color} />
      <LegendRangeValueStyle>
        {range.from} - {range.to}
      </LegendRangeValueStyle>
    </LegendRangeItemStyle>
  );
};

export default React.memo(LegendRangeItem);
