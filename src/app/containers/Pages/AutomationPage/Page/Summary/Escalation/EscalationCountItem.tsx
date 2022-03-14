import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ChartContent, ChartItem, ChartValue } from 'app/containers/Pages/DashboardPage/components/ManagmentItem/styles';
import { AxiosError } from 'axios';
import React from 'react';
import LoadingIndicator from 'app/components/Loading';

interface EscalationCountItemProps {
  readonly loading: boolean;
  readonly data: number | null;
  readonly error: AxiosError;
  readonly label: string;
  readonly dataColor: string;
}

export const EscalationCountItem: React.FC<EscalationCountItemProps> = ({ loading, data, error, label, dataColor }) => {
  return (
    <ChartItem style={{ height: 180, margin: 5 }}>
      {!error && data !== null && (
        <ChartContent>
          <ChartValue color={dataColor}>{data}</ChartValue>
          <ChartTitle>{label}</ChartTitle>
        </ChartContent>
      )}
      {!error && data === null && (
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
