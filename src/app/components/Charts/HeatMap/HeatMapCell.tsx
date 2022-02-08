import React from 'react';
import { GridCell } from './styles';

interface Props {
  cell: any;
  scale: any;
  style: any;
}
const HeatMapCell: React.FC<Props> = (props: Props) => {
  console.log(props.scale);
  return (
    <GridCell
      title={props.cell.value}
      style={props.style}
      bgColor={!props.cell.gridLabelCell && props.scale ? props.scale(props.cell.value) : 'var(--_chartBg)'}
      color={props.cell.gridLabelCell ? null : 'var(--_primaryWhiteColor)'}
    >
      <span className="textOverflowEllips">{props.cell.value}</span>
    </GridCell>
  );
};

export default React.memo(HeatMapCell);
