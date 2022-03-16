import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ChartContent, ChartItem, ChartValue } from 'app/containers/Pages/DashboardPage/components/ManagmentItem/styles';
import { AxiosError } from 'axios';
import React from 'react';
import LoadingIndicator from 'app/components/Loading';
import DonutChart, { PieDataItem } from 'app/components/Charts/DonutChart';
import { LocationState, TabName } from 'app/containers/Pages/MetricsPage';
import history from 'utils/history';
import { ROUTE } from 'lib/Routes/model';
import { ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
import { isEmpty, uniqueId } from 'lodash';

interface EscalationDonutChartProps {
  readonly loading: boolean;
  readonly data: PieDataItem[];
  readonly error: AxiosError;
  readonly chartTitle: string;
  readonly alertType: ModelalertType;
}

const EMPTY_PIE_DATA: PieDataItem[] = [
  {
    id: uniqueId(),
    color: 'darkred',
    hide: false,
    name: 'None',
    value: 0,
  },
];

export const EscalationDonutChart: React.FC<EscalationDonutChartProps> = ({ loading, error, data, chartTitle, alertType }) => {
  const onItemClick = (item: PieDataItem) => {
    const state: LocationState = { tabName: TabName.Performance, destination: '', networkId: item.id, deviceId: '', anomalyType: alertType };
    history.push(ROUTE.app + ROUTE.metrics, state);
  };

  return (
    <ChartItem style={{ margin: 10 }}>
      <ChartTitle>{chartTitle}</ChartTitle>
      {!error && data !== null && (
        <DonutChart
          data={isEmpty(data) ? EMPTY_PIE_DATA : data}
          legendPosition="bottom"
          donutWidth={100}
          donutHeight={85}
          arcLabelFontSize={16}
          donutPadding={0}
          disabledLegendHide
          totalStyle={{ fontSize: 28, fontLabelSize: 12, offsetY: 0, offsetLabelY: 18 }}
          donutRadius={{ innerRadius: 1.75, outerRadius: 0.85, textOuteOffset: 0.3, hoverOuterRadius: 0.875 }}
          legendStyles={{ flexWrap: 'nowrap', overflow: 'visible' }}
          legendItemStyle={{ width: 'calc(50% - 8px)', justifyContent: 'center' }}
          centerCountText="Total"
          onItemClick={onItemClick}
        />
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
