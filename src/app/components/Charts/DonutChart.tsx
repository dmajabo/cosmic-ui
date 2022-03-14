import React from 'react';
import { ChartLegendWrapContainer, ChartWrapContainer, LegendBottom, LegendColor, LegendItem, LegendLabel, LegendLeft, LegendRight, TextStyle } from './style';
import useResizeAware from 'react-resize-aware';
import * as d3 from 'd3';
import { DEFAULT_SEGMENTS_COLORS_SCHEMA } from 'lib/models/general';

const getRadius = (w: number, h: number, padding: number): number => {
  if (padding || padding === 0) return Math.min(w, h) / 2 - padding;
  return Math.min(w, h) / 2 - 30;
};

const getDonutRadius = (_radius: number, donutRadius?: DonutRadius): DonutRadius => {
  const _i = donutRadius && donutRadius.innerRadius ? donutRadius.innerRadius : 2;
  const _o = donutRadius && donutRadius.outerRadius ? donutRadius.outerRadius : 0.85;
  const _ho = donutRadius && donutRadius.hoverOuterRadius ? donutRadius.hoverOuterRadius : 0.9;
  const r_inner = _radius / _i;
  const r_outer = _radius * _o;
  const _textOuterOffset = donutRadius && donutRadius.textOuteOffset ? donutRadius.textOuteOffset : 0.3;
  const textouter = r_outer * (_o + _textOuterOffset);
  return { innerRadius: r_inner, outerRadius: r_outer, textInnerRadius: textouter, textOuterRadius: textouter, hoverOuterRadius: _ho };
};
export interface PieDataItem {
  name: string;
  id: string;
  value: number;
  color?: string;
  hide: boolean;
}

interface DonutRadius {
  innerRadius: number;
  outerRadius: number;
  textInnerRadius?: number;
  textOuterRadius?: number;
  textOuteOffset?: number;
  hoverOuterRadius?: number;
}

interface TotalProps {
  fontSize: number;
  fontLabelSize: number;
  offsetY: number;
  offsetLabelY: number;
}
interface Props {
  readonly data: PieDataItem[];
  readonly legendPosition: 'both' | 'bottom';
  readonly donutWidth?: number;
  readonly donutHeight?: number;
  readonly donutRadius?: DonutRadius;
  readonly donutPadding?: number;
  readonly arcLabelStyle?: Object;
  readonly arcLabelFontSize?: number;
  readonly totalStyle?: TotalProps;
  readonly legendSize?: number;
  readonly legendStyles?: Object;
  readonly legendItemStyle?: Object;
  readonly disabledLegendHide?: boolean;
  readonly onItemClick?: (item: PieDataItem) => void;
  readonly centerCountText?: string;
}

const DonutChart: React.FC<Props> = (props: Props) => {
  const [resizeListener, sizes] = useResizeAware();
  const [colors] = React.useState<string[][]>(DEFAULT_SEGMENTS_COLORS_SCHEMA);
  const [chartData, setChartData] = React.useState<PieDataItem[]>(props.data || []);
  const [total, setTotal] = React.useState<number>(0);
  const [donutWidthCoef] = React.useState<number>(props.legendPosition !== 'both' ? 1 : 0.5);
  const [donutHeightCoef] = React.useState<number>(props.legendPosition !== 'bottom' ? 1 : props.legendSize ? props.legendSize : 1);
  const radius = getRadius(sizes.width, sizes.height, props.donutPadding);
  const arcPathGenerator = (inner, outer, cr, d) => d3.arc().innerRadius(inner).outerRadius(outer).cornerRadius(cr)(d);
  const textArc = (inner, outer) => d3.arc().innerRadius(inner).outerRadius(outer);
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
    const r: DonutRadius = getDonutRadius(radius, props.donutRadius);
    const _textArc = textArc(r.textInnerRadius, r.textOuterRadius);
    const onMouseEnter = (d, color) => {
      if (d.data.hide) return;
      const outer = radius * r.hoverOuterRadius;
      const outerLabel = radius * (r.hoverOuterRadius + 0.2);
      const svg = d3.select(`#donutChartContainerSvg`);
      svg.selectAll('.arcValue').transition().style('opacity', 0.1);
      const g = d3.select(`#arcG${d.index}`);
      g.raise();
      const fg = g.select(`#arcValueFG${d.index}`);
      const _fgOuterX = textArc(outerLabel, outerLabel).centroid(d);
      fg.interrupt().transition().style('opacity', 1).attr('x', _fgOuterX[0]);
      const _arc = g.select(`#arc${d.index}`);
      _arc.interrupt();
      _arc
        .transition()
        .attrTween('d', function (this) {
          var interpolate = d3.interpolate(this._current, d);
          var _this = this;
          return function (t) {
            _this._current = interpolate(t);
            return arcPathGenerator(r.innerRadius, outer, 4, _this._current);
          };
        })
        .attr('stroke', color);
      const _arcLabelSize = props.arcLabelFontSize ? props.arcLabelFontSize + 4 : 24;
      fg.selectAll('div').transition().style('font-size', _arcLabelSize);
    };

    const onMouseLeave = d => {
      const svg = d3.select(`#donutChartContainerSvg`);
      svg.selectAll('.arcValue').transition().style('opacity', 1);
      const g = d3.select(`#arcG${d.index}`);
      const fg = g.select(`#arcValueFG${d.index}`);
      const _fgOuterX = _textArc.centroid(d);
      fg.interrupt().transition().style('opacity', 1).attr('x', _fgOuterX[0]);
      const _arc = g.select(`#arc${d.index}`);
      _arc.interrupt();
      _arc
        .transition()
        .attrTween('d', function (this) {
          var interpolate = d3.interpolate(this._current, d);
          var _this = this;
          return function (t) {
            _this._current = interpolate(t);
            return arcPathGenerator(r.innerRadius, r.outerRadius, 6, _this._current);
          };
        })
        .attr('stroke', 'var(--_primaryBg)');
      const _arcLabelSize = props.arcLabelFontSize ? props.arcLabelFontSize : 20;
      fg.selectAll('div').transition().style('font-size', _arcLabelSize);
    };

    const onArcClick = (d: PieDataItem) => {
      if (!props.onItemClick) return;
      props.onItemClick(d);
    };
    return pie.map((d, index) => {
      const _isLeft = props.legendPosition === 'both' ? index <= (pie.length - 1) / 2 : true;
      const _obj = {
        path: arcPathGenerator(r.innerRadius, r.outerRadius, 6, d),
        labelPos: _textArc.centroid(d),
        labelTextAlign: 'center',
        isLeftArc: _isLeft,
        ...d,
      };
      if (!d.data.color) {
        const colorRowI = index % colors.length;
        const colorColumnI = index % colors[colorRowI].length;
        _obj.color = colors[colorRowI][colorColumnI];
      } else {
        _obj.color = d.data.color;
      }
      _obj.onMouseEnter = () => onMouseEnter(d, _obj.color);
      _obj.onMouseLeave = () => onMouseLeave(d);
      _obj.onClick = () => onArcClick(d.data);
      return _obj;
    });
  }, [radius, pie]);

  const onLegendItemClick = (index: number) => {
    if (props.disabledLegendHide) return;
    const _chartData = chartData.slice();
    _chartData[index].hide = !chartData[index].hide;
    const svg = d3.select(`#donutChartContainerSvg`);
    svg.selectAll('.arcValue').transition().attr('opacity', 1);
    setChartData(_chartData);
  };

  const _arcLabelFontSize = props.arcLabelFontSize || 20;
  const centerX = sizes && sizes.width ? (sizes.width * donutWidthCoef) / 2 : 0;
  const centerY = sizes && sizes.height ? (sizes.height * donutHeightCoef) / 2 : 0;
  return (
    <ChartLegendWrapContainer>
      <ChartWrapContainer width={props.donutWidth} height={props.donutHeight}>
        {resizeListener}
        <svg id="donutChartContainerSvg" className="donutChart" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          {arcs && arcs.length ? (
            <>
              <g transform={`translate(${centerX}, ${centerY})`}>
                {arcs.map((arc, i) => {
                  if (arc.data.hide || !arc.data) return null;
                  return (
                    <g id={`arcG${arc.index}`} data-value={arc.data.value} key={`path${i}${arc.data.name}`} onClick={arc.onClick} style={{ cursor: 'pointer' }}>
                      <path id={`arc${arc.index}`} d={arc.path} fill={arc.color} stroke="var(--_primaryBg)" strokeWidth="2.5" />
                      <foreignObject
                        id={`arcValueFG${arc.index}`}
                        className="arcValue"
                        width="1"
                        height="1"
                        style={{ overflow: 'visible' }}
                        x={arc.labelPos[0]}
                        y={arc.labelPos[1] - _arcLabelFontSize / 2}
                      >
                        <div
                          id={`arcValue${arc.index}`}
                          title={`${arc.data.name}: ${arc.data.value}`}
                          onMouseEnter={arc.onMouseEnter}
                          onMouseLeave={arc.onMouseLeave}
                          style={{
                            fontFamily: 'DMSans',
                            fontWeight: 'bold',
                            fontSize: _arcLabelFontSize + 'px',
                            lineHeight: _arcLabelFontSize + 'px',
                            color: arc.color,
                            textAlign: 'center',
                            direction: arc.labelPos[0] < 0 ? 'rtl' : 'ltr',
                            whiteSpace: 'nowrap',
                            transform: 'translateX(-50%)',
                            ...props.arcLabelStyle,
                          }}
                        >
                          {arc.data.value}
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </g>
              <g transform={`translate(${centerX}, ${centerY})`}>
                <TextStyle dx="0" dy={props.totalStyle ? props.totalStyle.offsetY : '8'} fSize={props.totalStyle ? props.totalStyle.fontSize : 48} weight={700} color="var(--_primaryTextColor)">
                  {total}
                </TextStyle>
                <TextStyle dx="0" dy={props.totalStyle ? props.totalStyle.offsetLabelY : '36'} fSize={props.totalStyle ? props.totalStyle.fontLabelSize : 14} color="var(--_defaultColor)">
                  {props.centerCountText || 'Rules'}
                </TextStyle>
              </g>
            </>
          ) : null}
        </svg>
      </ChartWrapContainer>
    </ChartLegendWrapContainer>
  );
};

export default React.memo(DonutChart);
