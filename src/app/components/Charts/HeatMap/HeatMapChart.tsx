import React from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import 'react-virtualized/styles.css';
import HeatMapCell from './HeatMapCell';

interface Props {
  data: any[][];
  scale: any;
}

const HeatMapChart: React.FC<Props> = (props: Props) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <MultiGrid
          cellRenderer={rest => <HeatMapCell key={rest.key} cell={{ ...props.data[rest.rowIndex][rest.columnIndex] }} scale={props.scale} {...rest} />}
          columnWidth={190}
          columnCount={props.data[0].length}
          fixedColumnCount={1}
          fixedRowCount={1}
          height={height}
          rowHeight={48}
          rowCount={props.data.length}
          width={width}
        />
      )}
    </AutoSizer>
  );
};

export default React.memo(HeatMapChart);
