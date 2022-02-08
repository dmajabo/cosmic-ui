import React from 'react';
import { ChartWrapContainer } from './style';
import useResizeAware from 'react-resize-aware';
import * as d3 from 'd3';
import { DEFAULT_SEGMENTS_COLORS_SCHEMA } from 'lib/models/general';
export interface PieDataItem {
  name: string;
  value: number;
}

interface Props {
  readonly data: PieDataItem[];
}

const DonutChart: React.FC<Props> = (props: Props) => {
  const [resizeListener, sizes] = useResizeAware();
  const [colors] = React.useState<string[][]>(DEFAULT_SEGMENTS_COLORS_SCHEMA);
  const [total, setTotal] = React.useState<number>(0);
  const radius = Math.min(sizes.width, sizes.height) / 2 - 30;

  React.useEffect(() => {
    if (!props.data || !props.data.length) {
      setTotal(0);
      return;
    }
    const _total = props.data.reduce((a, b) => a + b.value, 0);
    setTotal(_total);
  }, [props.data]);

  const pie = React.useMemo(() => {
    const pieGenerator = d3
      .pie<any, PieDataItem>()
      .sort(null)
      .value(d => d.value);
    return pieGenerator(props.data);
  }, [props.data]);

  const arcs = React.useMemo(() => {
    const arcPathGenerator = d3
      .arc()
      .innerRadius(radius / 2)
      .outerRadius(radius * 0.95);
    return pie.map((d, index) => {
      const _textArc = d3
        .arc()
        .innerRadius(radius)
        .outerRadius(radius * 1.1);
      const pos = _textArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      const _a = midangle < Math.PI ? 'start' : 'end';
      const colorRowI = index % colors.length;
      const colorColumnI = index % colors[colorRowI].length;
      return { path: arcPathGenerator(d), labelPos: `translate(${pos})`, textAnchor: _a, color: colors[colorRowI][colorColumnI], ...d };
    });
  }, [radius, pie]);

  return (
    <ChartWrapContainer>
      {resizeListener}
      <svg id="donutChartContainerSvg" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g transform={`translate(${sizes.width / 2}, ${sizes.height / 2})`}>
          {arcs.map((arc, i) => {
            return (
              <g data-value={arc.data.value} key={`path${i}${arc.data.name}`}>
                <path d={arc.path} fill={arc.color} stroke="var(--_primaryBg)" strokeWidth="2.5" />
                <g transform={`${arc.labelPos}`}>
                  <text dy="8" fontFamily="DMSans" fontWeight="bold" fontSize="20" fill={arc.color} textAnchor={arc.textAnchor}>
                    {arc.data.value}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
        <g transform={`translate(${sizes.width / 2}, ${sizes.height / 2})`}>
          <text dx="0" dy="8" fontSize="48" fontFamily="DMSans" fontWeight="bold" fill="var(--_primaryTextColor)" textAnchor="middle">
            {total}
          </text>
          <text dx="0" dy="36" fontSize="14" fontFamily="DMSans" fontWeight="500" fill="var(--_defaultColor)" textAnchor="middle">
            Drops
          </text>
        </g>
      </svg>
    </ChartWrapContainer>
  );
};

export default React.memo(DonutChart);
