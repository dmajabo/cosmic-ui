import React from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from '../../styles';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { useGet } from 'lib/api/http/useAxiosHook';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { settingIcon } from 'app/components/SVGIcons/settingIcon';
import { TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { TesseractApi } from 'lib/api/ApiModels/Services/tesseract';
import { INetworkSessionsBetweenSegments, ITesseractGetSessionsBetweenSegmentsResponse } from 'lib/api/ApiModels/Sessions/apiModel';
import HeatMap from 'react-heatmap-grid';
import * as d3 from 'd3';
import LegendRangeItem from './RangeItem/LegendRangeItem';
import { LegendRangeItemsWrapper } from './RangeItem/style';
interface Props {
  onOpenPanel: () => void;
}

export const FlowsOverviewComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const { response, loading, error, onGet } = useGet<ITesseractGetSessionsBetweenSegmentsResponse>();
  const [period, setPeriod] = React.useState(null);
  const [rows, setRowsData] = React.useState<any[][]>([]);
  const [xAxis, setXAxis] = React.useState<string[]>([]);
  const [yAxis, setYAxis] = React.useState<string[]>([]);
  const [range, setRange] = React.useState<string[]>([]);
  const [domain, setDomain] = React.useState<number[]>([]);

  React.useEffect(() => {
    const _range = traffic.rangePreference.map(it => it.color);
    const _domain = traffic.rangePreference.map(it => [it.from, it.to].filter(it => it !== null)).flat();
    setRange(_range);
    setDomain(_domain);
  }, [traffic.rangePreference]);

  React.useEffect(() => {
    if (period !== traffic.trendsPeriod) {
      setPeriod(traffic.trendsPeriod);
      onTryLoadSegments(traffic.trendsPeriod);
    }
  }, [traffic.trendsPeriod]);

  React.useEffect(() => {
    if (response && response.sessionsBetweenSegments && response.sessionsBetweenSegments.length) {
      // const _arr: INetworkSessionsBetweenSegments[] = [];
      // for (let i = 0; i < 15; i++) {
      //   const _destArr: any[] = [];
      //   for (let j = 0; j < Math.floor(Math.random() * (50 - 0 + 1) + 0); j++) {
      //     _destArr.push({ segmentId: `app_${j}`, count: Math.floor(Math.random() * (200 - 0 + 1) + 0) });
      //   }
      //   _arr.push({ sourceSegmentId: `app_${i}`, destSegments: _destArr });
      // }
      const _data: INetworkSessionsBetweenSegments[] = [...response.sessionsBetweenSegments]; // .concat(_arr);
      const _xAxis: string[] = _data.map(it => (it.sourceSegmentName ? it.sourceSegmentName : 'UNKNOWN'));
      const setData = new Set<string>();
      _data.forEach(source => {
        if (!source.destSegments || !source.destSegments.length) return;
        source.destSegments.forEach(dest => {
          if (dest.segmentName) {
            setData.add(dest.segmentName);
          } else {
            setData.add('UNKNOWN');
          }
        });
      });
      const _yAxis: string[] = Array.from(setData);
      const _rows = new Array(_yAxis.length).fill(null).map(() => new Array(_xAxis.length).fill(null));
      _data.forEach((source, colI) => {
        if (!source.destSegments || !source.destSegments.length) return;
        source.destSegments.forEach(dest => {
          const _id = dest.segmentName || 'UNKNOWN';
          const _rowIndex = _yAxis.findIndex(it => it === _id);
          _rows[_rowIndex][colI] = dest;
        });
      });
      setXAxis(_xAxis);
      setYAxis(_yAxis);
      setRowsData(_rows);
    }
  }, [response]);

  const onOpenPanel = () => {
    props.onOpenPanel();
  };

  // if (scale) {
  //   console.log(range)
  //   console.log(domain)
  //   console.log(scale(1))
  //   console.log(scale(8))
  // }

  const onTryLoadSegments = async (timePeriod: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => {
    await onGet(TesseractApi.getSessionBwSegments(timePeriod || TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_HOUR), userContext.accessToken!);
  };

  const getColor = (v: any) => {
    if (!range || !range.length || !domain || !domain.length) return { bg: 'transparent', color: 'var(--_primaryTextColor)' };
    const scale = d3.scaleQuantile().range(range).domain(domain);
    if (!scale) return { bg: 'transparent', color: 'var(--_primaryTextColor)' };
    if (!v || !v.count) return { bg: scale(0), color: 'var(--_primaryWhiteColor)' };
    return { bg: scale(v.count), color: 'var(--_primaryWhiteColor)' };
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartLabel className="textOverflowEllips">Flows Overview</ChartLabel>
        <SecondaryButton styles={{ margin: '0 0 0 auto' }} label="Settings" icon={settingIcon} onClick={onOpenPanel} />
      </ChartHeader>
      <ChartWrapper
        className="heatChartWrapperMap"
        style={{ borderColor: 'transparent', background: 'transparent', overflow: 'hidden', height: 'auto', maxHeight: 'calc(100% - 60px)', flexGrow: 1, flexShrink: 1 }}
      >
        {!error && rows && rows.length && (
          <HeatMap
            xLabels={xAxis}
            yLabels={yAxis}
            xLabelsLocation="top"
            xLabelWidth={190}
            yLabelWidth={190}
            height={48}
            data={rows}
            cellStyle={(background, value, min, max, data, x, y) => {
              const c = getColor(value);
              return {
                background: c.bg,
                color: c.color,
                fontSize: '14px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                textOverflow: 'hidden',
                overflow: 'hidden',
                border: '1px solid var(--_rowBorder)',
                width: '190px',
                minWidth: '190px',
                height: '48px',
                flexShrink: 0,
                margin: 0,
              };
            }}
            cellRender={(cell, col) => {
              if (!cell) {
                return <span title={`source: ${col}`}>0</span>;
              }
              return <span title={`source: ${col}, destination: ${cell.segmentName}`}>{cell.count}</span>;
            }}
            title={() => ''}
          />
        )}

        {loading && (
          <AbsLoaderWrapper width="100%" height="100%" zIndex={10}>
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {error && <ErrorMessage>{error.message || 'Something went wrong'}</ErrorMessage>}
      </ChartWrapper>
      {traffic.rangePreference && traffic.rangePreference.length ? (
        <LegendRangeItemsWrapper>
          {traffic.rangePreference.map(it => (
            <LegendRangeItem key={`rangeItem${it.id}`} range={it} />
          ))}
        </LegendRangeItemsWrapper>
      ) : null}
    </ChartContainer>
  );
};

export default React.memo(FlowsOverviewComponent);
