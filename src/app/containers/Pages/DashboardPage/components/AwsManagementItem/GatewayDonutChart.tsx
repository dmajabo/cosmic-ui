import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import DonutChart, { PieDataItem } from 'app/components/Charts/DonutChart';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';

import React from 'react';
import { ChartContent, ChartItem, ChartValue } from '../ManagmentItem/styles';
import LoadingIndicator from 'app/components/Loading';
import { AxiosError } from 'axios';
interface GatewayDonutChartProps {
  readonly data: PieDataItem[];
  readonly loading: boolean;
  readonly error: AxiosError;
}

export const GatewayDonutChart: React.FC<GatewayDonutChartProps> = ({ data, loading, error }) => {
  return (
    <ChartItem>
      <ChartTitle>Gateways</ChartTitle>
      {!error && data !== null && (
        <>
          <DonutChart
            data={data}
            legendPosition="bottom"
            donutWidth={100}
            donutHeight={85}
            legendSize={0.85}
            arcLabelFontSize={16}
            donutPadding={0}
            disabledLegendHide
            totalStyle={{ fontSize: 28, fontLabelSize: 12, offsetY: 0, offsetLabelY: 18 }}
            donutRadius={{ innerRadius: 1.75, outerRadius: 0.85, textOuteOffset: 0.3, hoverOuterRadius: 0.875 }}
            legendStyles={{ flexWrap: 'nowrap', overflow: 'visible' }}
            legendItemStyle={{ width: 'calc(50% - 8px)', justifyContent: 'center' }}
            centerCountText="Total"
          />
        </>
      )}
      {!error && !data && (
        <ChartContent>
          <ChartValue style={{ fontSize: '18px', lineHeight: '20px', margin: 'auto' }} color="var(--_primaryTextColor)">
            No data
          </ChartValue>
        </ChartContent>
      )}
      {loading && (
        <AbsLoaderWrapper width="100%" height="100%" zIndex={10}>
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      {error && <ErrorMessage margin="auto">{error.message || 'Something went wrong'}</ErrorMessage>}
    </ChartItem>
  );
};
