import React from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { AnomalyBarChart } from './AnomalyBarChart';
import { AnomalyExperienceTableData, Column, ColumnAccessor, AnomalyPolicyLogsTableData, AnomalyCostTableData, CostDetailTableData, CostDetailHeader } from 'lib/api/http/SharedTypes';
import { AnomalyTable } from './AnomalyTable';
import { SeverityIcon } from './SeverityIcon';
import { AnomalySLATestTable } from './AnomalySLATestTable';
import { BarChartData } from './ExperienceTab';

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

const DUMMY_BAR_CHART_DATA: BarChartData[] = [
  {
    date: 'Nov 10',
    value: 40,
  },
  {
    date: 'Nov 11',
    value: 5,
  },
  {
    date: 'Nov 12',
    value: 38,
  },
  {
    date: 'Nov 13',
    value: 30,
  },
  {
    date: 'Nov 14',
    value: 21,
  },
  {
    date: 'Nov 15',
    value: 7,
  },
  {
    date: 'Nov 16',
    value: 15,
  },
];

const DUMMY_ANOMALY_TABLE_DATA: AnomalyCostTableData[] = [
  {
    name: 'WAN Link Status Change',
    severity: 'Low',
    hits: 10,
    cost: '$42/week',
  },
  {
    name: 'WAN Link UL Traffic Anomaly',
    severity: 'Medium',
    hits: 49,
    cost: '$6/day',
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

const getSeverityColour = (severity: string | JSX.Element) => {
  if (severity === 'Normal') {
    return '#52984E';
  }
  if (severity === 'Low') {
    return '#F9BA55';
  }
  if (severity === 'Medium') {
    return '#F69442';
  }
  return '#DC4545';
};

export const CostTab: React.FC<CostTabProps> = () => {
  const classes = AnalyticsStyles();

  const tableData: AnomalyCostTableData[] = DUMMY_ANOMALY_TABLE_DATA.map(item => ({
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

  const costSubComponent = React.useCallback(({ row }) => {
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
        <AnomalySLATestTable columns={costDetailColumns} data={costDetailData} sortableHeaders={['DATE']} />
      </div>
    );
  }, []);

  return (
    <div className={classes.anomalyTabPanelContainer}>
      <AnomalyBarChart
        inputData={DUMMY_BAR_CHART_DATA}
        xAxisText={`${DUMMY_BAR_CHART_DATA[0].date} to ${DUMMY_BAR_CHART_DATA[DUMMY_BAR_CHART_DATA.length - 1].date} (1 day interval)`}
        yAxisText="hits"
      />
      <div className={classes.anomalyTableContainer}>
        <div className={classes.anomalyExperienceTableTitle}>
          <span className={classes.anomalyTableTitle}>Triggers</span>
          <span className={classes.anomalyCount}>7</span>
        </div>
        <AnomalyTable inputColumns={anomalyTableColumns} data={tableData} subComponent={costSubComponent} />
      </div>
    </div>
  );
};
