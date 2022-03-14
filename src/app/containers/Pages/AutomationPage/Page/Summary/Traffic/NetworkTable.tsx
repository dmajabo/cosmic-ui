import { ALERT_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React from 'react';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import SummaryTable from './SummaryTable';

interface NetworkTableProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

export const NetworkTable: React.FC<NetworkTableProps> = ({ timeRange }) => {
  return (
    <>
      <ChartTitle>Network</ChartTitle>
      <SummaryTable data={[]} showLoader={false} />
    </>
  );
};
