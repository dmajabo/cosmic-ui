import React from 'react';
import { ChartLegendWrapContainer, ChartWrapContainer, LegendColor, LegendItem, LegendLabel, LegendLeft, LegendRight } from './style';
import useResizeAware from 'react-resize-aware';
import * as d3 from 'd3';
import { DEFAULT_SEGMENTS_COLORS_SCHEMA } from 'lib/models/general';
export interface PieDataItem {
  name: string;
  id: string;
  value: number;
  hide: boolean;
}

interface Props {
  readonly data: PieDataItem[];
  onItemClick?: (item: PieDataItem) => void;
}

const DonutChart: React.FC<Props> = (props: Props) => {
  const [resizeListener, sizes] = useResizeAware();
  const [colors] = React.useState<string[][]>(DEFAULT_SEGMENTS_COLORS_SCHEMA);
  const [chartData, setChartData] = React.useState<PieDataItem[]>(props.data || []);
  const [total, setTotal] = React.useState<number>(0);
  const radius = Math.min(sizes.width, sizes.height) / 2 - 30;
  const arcPathGenerator = (inner, outer, cr, d) => d3.arc().innerRadius(inner).outerRadius(outer).cornerRadius(cr)(d);
  React.useEffect(() => {
    setChartData(props.data);
  }, [props.data]);

  React.useEffect(() => {
    if (!chartData || !chartData.length) {
      setTotal(0);
      return;
    }
    const _total = chartData.reduce((a, b) => {
      return b.hide ? a : a + b.value;
    }, 0);
    setTotal(_total);
  }, [chartData]);

  const pie = React.useMemo(() => {
    const pieGenerator = d3
      .pie<any, PieDataItem>()
      .sort(null)
      .value(d => (d.hide ? 0 : d.value));
    return pieGenerator(chartData);
  }, [chartData]);

  const arcs = React.useMemo(() => {
    const r_inner = radius / 2;
    const r_outer = radius * 0.85;

    const onMouseEnter = (d, color) => {
      if (d.data.hide) return;
      const outer = radius * 0.9;
      const svg = d3.select(`#donutChartContainerSvg`);
      svg.selectAll('.arcValue').transition().attr('opacity', 0.1);
      const g = d3.select(`#arcG${d.index}`);
      g.raise();
      g.selectAll('.arcValue').interrupt().transition().attr('opacity', 1);
      const _arc = g.select(`#arc${d.index}`);
      _arc.interrupt();
      _arc.transition().attr('d', arcPathGenerator(r_inner, outer, 4, d)).attr('stroke', color);
      g.selectAll('text').transition().attr('font-size', 24);
    };

    const onMouseLeave = d => {
      const svg = d3.select(`#donutChartContainerSvg`);
      svg.selectAll('.arcValue').transition().attr('opacity', 1);
      const g = d3.select(`#arcG${d.index}`);
      const _arc = g.select(`#arc${d.index}`);
      _arc.interrupt();
      _arc.transition().attr('d', arcPathGenerator(r_inner, r_outer, 6, d)).attr('stroke', 'var(--_primaryBg)');
      g.selectAll('text').transition().attr('font-size', 20);
    };

    const onArcClick = (d: PieDataItem) => {
      if (!props.onItemClick) return;
      props.onItemClick(d);
    };
    return pie.map((d, index) => {
      const _textArc = d3
        .arc()
        .innerRadius(radius * 0.85)
        .outerRadius(radius * 1.2);
      const _isLeft = index <= (pie.length - 1) / 2;
      const colorRowI = index % colors.length;
      const colorColumnI = index % colors[colorRowI].length;
      return {
        onMouseEnter: () => onMouseEnter(d, colors[colorRowI][colorColumnI]),
        onMouseLeave: () => onMouseLeave(d),
        onClick: () => onArcClick(d.data),
        path: arcPathGenerator(r_inner, r_outer, 6, d),
        labelPos: `translate(${_textArc.centroid(d)})`,
        isLeftArc: _isLeft,
        color: colors[colorRowI][colorColumnI],
        ...d,
      };
    });
  }, [radius, pie]);

  const onLegendItemClick = (index: number) => {
    const _chartData = chartData.slice();
    _chartData[index].hide = !chartData[index].hide;
    const svg = d3.select(`#donutChartContainerSvg`);
    svg.selectAll('.arcValue').transition().attr('opacity', 1);
    setChartData(_chartData);
  };

  return (
    <ChartLegendWrapContainer>
      <ChartWrapContainer>
        {resizeListener}
        <svg id="donutChartContainerSvg" className="donutChart" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          {arcs && arcs.length ? (
            <>
              <g transform={`translate(${(sizes.width * 0.5) / 2}, ${sizes.height / 2})`}>
                {arcs.map((arc, i) => {
                  if (arc.data.hide) return null;
                  return (
                    <g id={`arcG${arc.index}`} data-value={arc.data.value} key={`path${i}${arc.data.name}`} onClick={arc.onClick} style={{ cursor: 'pointer' }}>
                      <path id={`arc${arc.index}`} d={arc.path} fill={arc.color} stroke="var(--_primaryBg)" strokeWidth="2.5" />
                      <g id={`arcValue${arc.index}`} transform={`${arc.labelPos}`} className="arcValue">
                        <text y="10" fontFamily="DMSans" fontWeight="bold" fontSize="20" fill={arc.color} textAnchor="middle">
                          {arc.data.value}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
              <g transform={`translate(${(sizes.width * 0.5) / 2}, ${sizes.height / 2})`}>
                <text dx="0" dy="8" fontSize="48" fontFamily="DMSans" fontWeight="bold" fill="var(--_primaryTextColor)" textAnchor="middle">
                  {total}
                </text>
                <text dx="0" dy="36" fontSize="14" fontFamily="DMSans" fontWeight="500" fill="var(--_defaultColor)" textAnchor="middle">
                  Drops
                </text>
              </g>
            </>
          ) : null}
        </svg>
      </ChartWrapContainer>
      <LegendLeft>
        {arcs.map(it => {
          if (!it.isLeftArc) return null;
          return (
            <LegendItem
              title={`${it.data.name}: ${it.data.value}`}
              key={`leftLEgendItem${it.data.name}`}
              onClick={() => onLegendItemClick(it.index)}
              onMouseEnter={it.onMouseEnter}
              onMouseLeave={it.onMouseLeave}
            >
              <LegendColor color={it.color} hide={it.data.hide} />
              <LegendLabel hide={it.data.hide}>{it.data.name}</LegendLabel>
            </LegendItem>
          );
        })}
      </LegendLeft>
      <LegendRight>
        {arcs.map(it => {
          if (it.isLeftArc) return null;
          return (
            <LegendItem
              key={`rightLEgendItem${it.data.name}`}
              title={`${it.data.name}: ${it.data.value}`}
              onClick={() => onLegendItemClick(it.index)}
              onMouseEnter={it.onMouseEnter}
              onMouseLeave={it.onMouseLeave}
            >
              <LegendColor color={it.color} hide={it.data.hide} />
              <LegendLabel hide={it.data.hide}>{it.data.name}</LegendLabel>
            </LegendItem>
          );
        })}
      </LegendRight>
    </ChartLegendWrapContainer>
  );
};

export default React.memo(DonutChart);
