import React from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { AnomalyBarChart } from './AnomalyBarChart';
import { Column, ColumnAccessor, AnomalyCostTableData, CostDetailTableData, CostDetailHeader } from 'lib/api/http/SharedTypes';
import { SeverityIcon } from './SeverityIcon';
import { DUMMY_ANOMALY_COST_TABLE_DATA, DUMMY_BAR_CHART_DATA } from '../../DummyData';
import { Row } from 'react-table';
import { getSeverityColour } from 'lib/api/http/utils';
import noop from 'lodash/noop';

interface CostTabProps {}

const anomalyTableColumns: Column[] = [
  {
    Header: 'NAME',
    accessor: ColumnAccessor.name,
  },
  {
    Header: 'SEVERITY',
    accessor: ColumnAccessor.severity,
  },
  {
    Header: 'HITS',
    accessor: ColumnAccessor.hits,
  },
  {
    Header: 'COST',
    accessor: ColumnAccessor.cost,
  },
];

const costDetailColumns: Column[] = [
  {
    Header: 'DATE',
    accessor: ColumnAccessor.date,
  },
  {
    Header: 'VPC ATTACHMENTS',
    accessor: ColumnAccessor.vpcAttachments,
  },
  {
    Header: 'VPN ATTACHMENTS',
    accessor: ColumnAccessor.vpnAttachments,
  },
  {
    Header: 'PEERING ATTACHMENTS',
    accessor: ColumnAccessor.peeringAttachments,
  },
  {
    Header: 'DATA PROCESSED',
    accessor: ColumnAccessor.dataProcessed,
  },
  {
    Header: 'TOTAL COST',
    accessor: ColumnAccessor.totalCost,
  },
];

const ANOMALY_COST_DETAIL_TABLE_SORTABLE_HEADERS = ['DATE'];

const ANOMALY_TABLE_SORTABLE_HEADERS = ['NAME'];

export const CostTab: React.FC<CostTabProps> = () => {
  const classes = AnalyticsStyles();

  const tableData: AnomalyCostTableData[] = DUMMY_ANOMALY_COST_TABLE_DATA.map(item => ({
    name: item.name,
    severity: (
      <div>
        <SeverityIcon colour={getSeverityColour(item.severity)} />
        <span className={classes.severityText}>{item.severity}</span>
      </div>
    ),
    hits: <div className={classes.hitsCount}>{item.hits}</div>,
    cost: item.cost,
  }));

  const costSubComponent = React.useCallback((row: Row<object>) => {
    const constDetailHeaderData: CostDetailHeader[] = [
      {
        label: 'Region:',
        value: 'US East(Ohio)',
      },
      {
        label: 'Price per AWS Transit Gateway attachment:',
        value: '$0.05/hour',
      },
      {
        label: 'Price per GB of data processed:',
        value: '$0.02',
      },
    ];
    const costDetailData: CostDetailTableData[] = [
      {
        date: 'Mon,Aug 17 2021',
        vpcAttachments: '160($ 8 cost/6 hrs usage)',
        vpnAttachments: '50($ 2.5 cost/6 hrs usage)',
        peeringAttachments: '30($ 1.5 cost/6 hrs usage)',
        dataProcessed: '10GB ($0.2 cost)',
        totalCost: '$12.2',
      },
    ];
    return (
      <div>
        <div className={classes.costDetailHeaderContainer}>
          {constDetailHeaderData.map(item => (
            <div key={item.label} className={classes.costDetailHeaderText}>
              <span className={classes.costDetailLabel}>{item.label}</span>
              <span className={classes.costDetailValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, []);

  return (
    <div className={classes.anomalyTabPanelContainer}>
      <AnomalyBarChart
        inputData={DUMMY_BAR_CHART_DATA}
        xAxisText={`${DUMMY_BAR_CHART_DATA[0].date} to ${DUMMY_BAR_CHART_DATA[DUMMY_BAR_CHART_DATA.length - 1].date} (1 day interval)`}
        yAxisText="hits"
        handleSelectedBarChartPointsChange={noop}
      />
      <div className={classes.anomalyTableContainer}>
        <div className={classes.anomalyExperienceTableTitle}>
          <span className={classes.anomalyTableTitle}>Triggers</span>
          <span className={classes.anomalyCount}>7</span>
        </div>
      </div>
    </div>
  );
};
