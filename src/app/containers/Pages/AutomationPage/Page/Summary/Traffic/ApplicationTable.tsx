import { ALERT_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React from 'react';
import { ChartTitle } from 'app/components/ChartContainer/styles';
import SummaryTable from './SummaryTable';

interface ApplicationTableProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ timeRange }) => {
  return (
    <>
      <ChartTitle>Application</ChartTitle>
      <SummaryTable data={[]} showLoader={false} />
    </>
  );
};
