import React from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { AnomalyBarChart } from './AnomalyBarChart';
import { AnomalyExperienceTableData, Column, ColumnAccessor, AnomalyPolicyLogsTableData } from 'lib/api/http/SharedTypes';
import { AnomalyTable } from './AnomalyTable';
import { SeverityIcon } from './SeverityIcon';
import { AnomalySLATestTable } from './AnomalySLATestTable';
import { BarChartData } from './ExperienceTab';

interface PolicyTabProps {}

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

const DUMMY_ANOMALY_TABLE_DATA: AnomalyExperienceTableData[] = [
  {
    name: 'WAN Link Status Change',
    severity: 'Low',
    hits: 10,
  },
  {
    name: 'WAN Link UL Traffic Anomaly',
    severity: 'Medium',
    hits: 49,
  },
];

const DUMMY_LOGS_TABLE_DATA: AnomalyPolicyLogsTableData[] = [
  {
    hits: 17,
    time: 'Tue,Nov 14 2021,10:25pm',
    edge: 'Office 4',
    user: 'Jesse Roy',
    operation: 'Policy Change',
    changes: 'Uplink Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2), List Configuration (WAN1, WAN2)',
  },
];

const logsTableColumns: Column[] = [
  {
    Header: 'HITS',
    accessor: ColumnAccessor.hits,
  },
  {
    Header: 'TIME',
    accessor: ColumnAccessor.time,
  },
  {
    Header: 'EDGE',
    accessor: ColumnAccessor.edge,
  },
  {
    Header: 'USER',
    accessor: ColumnAccessor.user,
  },
  {
    Header: 'OPERATION',
    accessor: ColumnAccessor.operation,
  },
  {
    Header: 'CHANGES',
    accessor: ColumnAccessor.changes,
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

export const PolicyTab: React.FC<PolicyTabProps> = () => {
  const classes = AnalyticsStyles();

  const tableData: AnomalyExperienceTableData[] = DUMMY_ANOMALY_TABLE_DATA.map(item => ({
    name: item.name,
    severity: (
      <div>
        <SeverityIcon colour={getSeverityColour(item.severity)} />
        <span className={classes.severityText}>{item.severity}</span>
      </div>
    ),
    hits: <div className={classes.hitsCount}>{item.hits}</div>,
  }));

  const policySubComponent = React.useCallback(({ row }) => {
    const logsTableData: AnomalyPolicyLogsTableData[] = DUMMY_LOGS_TABLE_DATA.map(item => ({
      hits: <div className={classes.hitsCount}>{item.hits}</div>,
      time: item.time,
      edge: (
        <div>
          <span>
            <img className={classes.circularImage} src="https://www.blumira.com/wp-content/uploads/2020/03/cisco-meraki.png" alt="edge logo" />
          </span>
          <span className={classes.profileNameText}>{item.edge}</span>
        </div>
      ),
      user: (
        <div>
          <span>
            <img
              className={classes.circularImage}
              src="https://thumbs.dreamstime.com/b/yasaka-pagoda-sannen-zaka-street-kyoto-japan-yasaka-pagoda-sannen-zaka-street-kyoto-japan-118600109.jpg"
              alt="user profile"
            />
          </span>
          <span className={classes.profileNameText}>{item.user}</span>
        </div>
      ),
      operation: item.operation,
      changes: item.changes,
    }));

    return (
      <div>
        <div className={classes.anomalySubcomponentTitle}>Logs</div>
        <AnomalySLATestTable columns={logsTableColumns} data={logsTableData} sortableHeaders={['EDGE', 'USER']} />
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
        <AnomalyTable inputColumns={anomalyTableColumns} data={tableData} subComponent={policySubComponent} />
      </div>
    </div>
  );
};
