import LegendRangeItem from 'app/containers/Pages/TrafficPage/Trends/Components/FlowsOverviewComponent/RangeItem/LegendRangeItem';
import { TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { TesseractApi } from 'lib/api/ApiModels/Services/tesseract';
import { INetworkSessionsBetweenSegments, ITesseractGetSessionsBetweenSegmentsResponse } from 'lib/api/ApiModels/Sessions/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import React, { useEffect } from 'react';
import { ChartItem } from '../ManagmentItem/styles';
import { ChartHeaderContainer, ChartHeaderText, LegendContainer } from './styles';
import HeatMap from 'react-heatmap-grid';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import * as d3 from 'd3';
import history from 'utils/history';
import { ROUTE } from 'lib/Routes/model';

export const Segments: React.FC = () => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const { response, loading, error, onGet } = useGet<ITesseractGetSessionsBetweenSegmentsResponse>();
  const [period, setPeriod] = React.useState(null);
  const [rows, setRowsData] = React.useState<any[][]>([]);
  const [xAxis, setXAxis] = React.useState<string[]>([]);
  const [yAxis, setYAxis] = React.useState<string[]>([]);
  const [range, setRange] = React.useState<string[]>([]);
  const [domain, setDomain] = React.useState<number[]>([]);

  useEffect(() => {
    const _range = traffic.rangePreference.map(it => it.color);
    const _domain = traffic.rangePreference.map(it => [it.from, it.to].filter(it => it !== null)).flat();
    setRange(_range);
    setDomain(_domain);
  }, [traffic.rangePreference]);

  useEffect(() => {
    if (period !== traffic.trendsPeriod) {
      setPeriod(traffic.trendsPeriod);
      onTryLoadSegments(traffic.trendsPeriod);
    }
  }, [traffic.trendsPeriod]);

  React.useEffect(() => {
    if (response && response.sessionsBetweenSegments && response.sessionsBetweenSegments.length) {
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
          _rows[_rowIndex][colI] = { ...dest, sourceSegmentId: source.sourceSegmentId };
        });
      });
      setXAxis(_xAxis);
      setYAxis(_yAxis);
      setRowsData(_rows);
    }
  }, [response]);

  const onTryLoadSegments = async (timePeriod: TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES) => {
    await onGet(TesseractApi.getSessionBwSegments(timePeriod || TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_WEEK), userContext.accessToken!);
  };

  const onCellClick = (col: number, row: number) => {
    if (!rows[row][col]) return;
    history.push(ROUTE.app + ROUTE.traffic);
  };

  const getColor = (v: any) => {
    if (!range || !range.length || !domain || !domain.length) return { bg: 'transparent', color: 'var(--_primaryTextColor)' };
    const scale = d3.scaleQuantile().range(range).domain(domain);
    if (!scale) return { bg: 'transparent', color: 'var(--_primaryTextColor)' };
    if (!v || !v.count) return { bg: scale(0), color: 'var(--_primaryWhiteColor)' };
    return { bg: scale(v.count), color: 'var(--_primaryWhiteColor)' };
  };

  return (
    <ChartItem style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
      <ChartHeaderContainer>
        <ChartHeaderText>Sessions</ChartHeaderText>
        <LegendContainer>
          {!error && rows && rows.length && traffic.rangePreference && traffic.rangePreference.length
            ? traffic.rangePreference.map(it => <LegendRangeItem key={`rangeItem${it.id}`} range={it} />)
            : null}
        </LegendContainer>
      </ChartHeaderContainer>
      {!error && rows && rows.length ? (
        <HeatMap
          xLabels={xAxis}
          yLabels={yAxis}
          xLabelsLocation="top"
          xLabelWidth={190}
          yLabelWidth={190}
          height={48}
          data={rows}
          onClick={onCellClick}
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
      ) : (
        <ErrorMessage className="empty" color="var(--_primaryTextColor)" fontSize={20} margin="auto">
          No data
        </ErrorMessage>
      )}

      {loading && (
        <AbsLoaderWrapper className="loading" width="100%" height="100%" zIndex={10}>
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      {error && <ErrorMessage className="error">{error.message || 'Something went wrong'}</ErrorMessage>}
    </ChartItem>
  );
};
