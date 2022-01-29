import React from 'react';
import { ChartWrapContainer } from './style';
import useResizeAware from 'react-resize-aware';
import * as d3 from 'd3';
type DataItem = {
  name: string;
  value: number;
};

interface Props {
  readonly data: DataItem[];
}

const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'];

const DonutChart: React.FC<Props> = (props: Props) => {
  const [resizeListener, sizes] = useResizeAware();
  const radius = Math.min(sizes.width, sizes.height) / 2 - 30;

  const pie = React.useMemo(() => {
    const pieGenerator = d3
      .pie<any, DataItem>()
      .sort(null)
      .value(d => d.value);
    return pieGenerator(props.data);
  }, [props.data]);

  const arcs = React.useMemo(() => {
    const arcPathGenerator = d3
      .arc()
      .innerRadius(radius / 2)
      .outerRadius(radius * 0.99);
    return pie.map(d => {
      const _textArc = d3
        .arc()
        .innerRadius(radius)
        .outerRadius(radius * 1.1);
      const pos = _textArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      const _a = midangle < Math.PI ? 'start' : 'end';
      return { path: arcPathGenerator(d), labelPos: `translate(${pos})`, textAnchor: _a, ...d };
    });
  }, [radius, pie]);

  return (
    <ChartWrapContainer>
      {resizeListener}
      <svg id="donutChartContainerSvg" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g transform={`translate(${sizes.width / 2}, ${sizes.height / 2})`}>
          {arcs.map((arc, i) => {
            console.log(arc);
            return (
              <g>
                <path key={`path${i}`} d={arc.path} fill={colors[i]} stroke="var(--_primaryBg)" strokeWidth="5" />
                <g transform={`${arc.labelPos}`}>
                  <text fontSize="20" fill={colors[i]} textAnchor={arc.textAnchor}>
                    {arc.data.name}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </ChartWrapContainer>
  );
};

export default React.memo(DonutChart);
