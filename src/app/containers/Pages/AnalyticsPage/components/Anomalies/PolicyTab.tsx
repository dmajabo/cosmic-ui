import React from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import { AnomalyBarChart } from './AnomalyBarChart';
import { AnomalyExperienceTableData, Column, ColumnAccessor, AnomalyPolicyLogsTableData } from 'lib/api/http/SharedTypes';
import { AnomalyTable } from './AnomalyTable';
import { SeverityIcon } from './SeverityIcon';
import { AnomalySLATestTable } from './AnomalySLATestTable';
import { DUMMY_ANOMALY_TABLE_DATA, DUMMY_BAR_CHART_DATA, DUMMY_LOGS_TABLE_DATA } from '../../DummyData';
import { getSeverityColour } from './ExperienceTab';
import { Row } from 'react-table';

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

const LOGS_TABLE_COLUMNS: Column[] = [
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

const LOGS_TABLE_SORTABLE_HEADERS = ['EDGE', 'USER'];

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

  const policySubComponent = React.useCallback((row: Row<object>) => {
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
      changes: <div className={classes.ellipsisText}>{item.changes}</div>,
    }));

    return (
      <div>
        <div className={classes.anomalySubcomponentTitle}>Logs</div>
        <AnomalySLATestTable columns={LOGS_TABLE_COLUMNS} data={logsTableData} sortableHeaders={LOGS_TABLE_SORTABLE_HEADERS} />
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
