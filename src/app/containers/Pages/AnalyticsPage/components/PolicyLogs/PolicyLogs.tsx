import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import SearchIcon from '../../icons/metrics explorer/search';
import FilterIcon from '../../../MetricsPage/icons/performance dashboard/filter';
import ColumnsIcon from '../../../MetricsPage/icons/performance dashboard/columns';
import { LookbackLabel, LookbackSelectOption, LookbackValue } from '../Metrics Explorer/LookbackTimeTab';
import { AnomalyPolicyLogsTableData, Column, ColumnAccessor } from 'lib/api/http/SharedTypes';
import { AnomalySLATestTable } from '../Anomalies/AnomalySLATestTable';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CheckboxData } from '../Metrics Explorer/Dimensions';
import { Checkbox, FormControlLabel, FormGroup, Popover } from '@mui/material';
import { DUMMY_POLICY_LOGS_TABLE_DATA } from '../../DummyData';
import noop from 'lodash/noop';
import SecondaryButtonwithEvent from '../SecondaryButtonwithEvent';

// const REGEX = /[-[\]{}()*+?.,\\^$|#\s]/g;

const INITIAL_ANOMALY_TIME_RANGE_VALUE: LookbackSelectOption = {
  label: LookbackLabel.oneWeek,
  value: LookbackValue.oneWeek,
};

const TIME_RANGE_OPTIONS: LookbackSelectOption[] = [
  {
    label: LookbackLabel.fiveMinutes,
    value: LookbackValue.fiveMinutes,
  },
  {
    label: LookbackLabel.fifteenMinutes,
    value: LookbackValue.fifteenMinutes,
  },
  {
    label: LookbackLabel.thirtyMinutes,
    value: LookbackValue.thirtyMinutes,
  },
  {
    label: LookbackLabel.oneHour,
    value: LookbackValue.oneHour,
  },
  {
    label: LookbackLabel.sixHours,
    value: LookbackValue.sixHours,
  },
  {
    label: LookbackLabel.twelveHours,
    value: LookbackValue.twelveHours,
  },
  {
    label: LookbackLabel.twentyFourHours,
    value: LookbackValue.twentyFourHours,
  },
  {
    label: LookbackLabel.oneDay,
    value: LookbackValue.oneDay,
  },
  {
    label: LookbackLabel.oneWeek,
    value: LookbackValue.oneWeek,
  },
  {
    label: LookbackLabel.oneMonth,
    value: LookbackValue.oneMonth,
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

const dropdownStyle = {
  option: provided => ({
    ...provided,
    padding: 10,
    color: 'black',
  }),
  control: provided => ({
    ...provided,
    height: 50,
    border: 'none',
  }),
};

const initialCheckboxData: CheckboxData = LOGS_TABLE_COLUMNS.reduce((accu, nextValue) => {
  accu[nextValue.accessor] = true;
  return accu;
}, {});

const COLUMNS_POPOVER = 'columns-popover';

const POLICY_LOGS_TABLE_SORTABLE_HEADERS = ['EDGE', 'USER'];

export const PolicyLogs: React.FC = () => {
  const classes = AnalyticsStyles();
  const [searchText, setSearchText] = useState<string>('');
  const [timeRange, setTimeRange] = useState<LookbackSelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);
  const [columnCheckboxData, setColumnCheckboxData] = useState<CheckboxData>(initialCheckboxData);
  const [selectedColumns, setSelectedColumns] = useState<Column[]>([]);
  const [columnAnchorEl, setColumnAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleColmunsClick = (event: React.MouseEvent<HTMLButtonElement>) => setColumnAnchorEl(event.currentTarget);

  const handleColumnsClose = () => setColumnAnchorEl(null);

  const isColumnsPopoverOpen = Boolean(columnAnchorEl);

  const columnsPopoverId = isColumnsPopoverOpen ? COLUMNS_POPOVER : undefined;

  useEffect(() => {
    const newSelectedColumns = LOGS_TABLE_COLUMNS.filter(item => columnCheckboxData[item.accessor]);
    setSelectedColumns(newSelectedColumns);
  }, [columnCheckboxData]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setColumnCheckboxData({
      ...columnCheckboxData,
      [event.target.name]: event.target.checked,
    });

  //adds \ before every special character of string to use in regular expression
  // const escapeRegExp = (value: string) => value.replace(REGEX, '\\$&');

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    // const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value);

  const handleTimeRangeChange = (value: LookbackSelectOption) => setTimeRange(value);

  const logsTableData: AnomalyPolicyLogsTableData[] = DUMMY_POLICY_LOGS_TABLE_DATA.map(item => ({
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
    changes: (
      <div className={`${classes.tabTitleContainer} ${classes.policyLogsViewDetailsButton}`}>
        <div className={classes.ellipsisText}>{item.changes}</div>
        <div>
          <span className={classes.policyLogsDetailsText}>VIEW DETAILS</span>
          <ArrowRightIcon fontSize="medium" className={classes.policyLogsArrowRight} />
        </div>
      </div>
    ),
  }));

  return (
    <div className={classes.policyLogsContainer}>
      <div className={classes.tabTitleContainer}>
        <div>
          <input type="text" className={classes.policyLogsSearchBar} value={searchText} onChange={handleSearchTextChange} placeholder="Search" />
          <span className={classes.searchIcon}>{SearchIcon}</span>
        </div>
        <div>
          <SecondaryButtonwithEvent
            label={
              <>
                <span className={classes.otherButtonText}>FILTER</span>
                <FilterIcon />
              </>
            }
            onClick={noop}
          />
          <SecondaryButtonwithEvent
            aria-describedby={columnsPopoverId}
            label={
              <>
                <span className={classes.otherButtonText}>COLUMNS</span>
                <ColumnsIcon />
              </>
            }
            onClick={handleColmunsClick}
          />
          <Popover
            id={columnsPopoverId}
            open={isColumnsPopoverOpen}
            onClose={handleColumnsClose}
            anchorEl={columnAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <FormGroup className={classes.popoverContainer}>
              {LOGS_TABLE_COLUMNS.filter(column => column.accessor !== ColumnAccessor.hits).map(item => (
                <FormControlLabel
                  key={item.accessor}
                  className={classes.popoverItem}
                  control={<Checkbox checked={columnCheckboxData[item.accessor]} onChange={handleCheckboxChange} name={item.accessor} />}
                  label={<span className={classes.popoverText}>{item.Header}</span>}
                />
              ))}
            </FormGroup>
          </Popover>
          <span className={classes.anomalyTimeRangeText}>Show:</span>
          <Select styles={dropdownStyle} className={classes.inlineSelect} label="Single select" value={timeRange} options={TIME_RANGE_OPTIONS} onChange={handleTimeRangeChange} />
        </div>
      </div>
      <div className={classes.policyLogsTableContainer}>
        <AnomalySLATestTable columns={selectedColumns} data={logsTableData} sortableHeaders={POLICY_LOGS_TABLE_SORTABLE_HEADERS} />
      </div>
    </div>
  );
};
