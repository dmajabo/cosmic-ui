import { ChartTitle } from 'app/components/ChartContainer/styles';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { AxiosError } from 'axios';
import React from 'react';
import { ChartContent, ChartItem, ChartValue, ChartValueLabel } from '../ManagmentItem/styles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';

interface ManagementCountProps {
  readonly color: string;
  readonly count: number;
  readonly title: string;
  readonly error?: AxiosError;
  readonly loading?: boolean;
  readonly subtitle?: string | JSX.Element;
}

export const ManagementCount: React.FC<ManagementCountProps> = ({ count = null, color, title, loading = false, error = null, subtitle = null }) => {
  return (
    <ChartItem>
      <ChartTitle>{title}</ChartTitle>
      {!error && count !== null && (
        <ChartContent style={{ cursor: 'pointer' }}>
          <ChartValue color={color}>{count}</ChartValue>
          <ChartValueLabel>{subtitle}</ChartValueLabel>
        </ChartContent>
      )}
      {!error && count === null && (
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
