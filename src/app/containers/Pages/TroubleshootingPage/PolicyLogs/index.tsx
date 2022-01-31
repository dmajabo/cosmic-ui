import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import SearchIcon from '../../AnalyticsPage/icons/metrics explorer/search';
import FilterIcon from '../../MetricsPage/icons/performance dashboard/filter';
import ColumnsIcon from '../../MetricsPage/icons/performance dashboard/columns';
import { LookbackLabel } from '../../AnalyticsPage/components/Metrics Explorer/LookbackTimeTab';
import { AnomalyPolicyLogsTableData, Column, ColumnAccessor } from 'lib/api/http/SharedTypes';
import { AnomalySLATestTable } from '../../AnalyticsPage/components/Anomalies/AnomalySLATestTable';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CheckboxData } from '../../AnalyticsPage/components/Metrics Explorer/Dimensions';
import { Checkbox, FormControlLabel, FormGroup, Popover } from '@mui/material';
import noop from 'lodash/noop';
import SecondaryButtonwithEvent from '../../AnalyticsPage/components/SecondaryButtonwithEvent';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { DateTime } from 'luxon';
import { VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';

const REGEX = /[-[\]{}()*+?.,\\^$|#\s]/g;

interface PolicyLogsSelectOption {
  readonly label: LookbackLabel;
  readonly value: PolicyLogsTimeRangeValue;
}

interface PolicyLogsData {
  readonly id: string;
  readonly operation: string;
  readonly policyType: string;
  readonly ctrlrId: string;
  readonly ctrlrName: string;
  readonly vendor: string;
  readonly oldValue: string;
  readonly newValue: string;
  readonly timestamp: string;
}

interface PolicyLogsResponse {
  readonly count: string;
  readonly policyLogs: PolicyLogsData[];
}

enum PolicyLogsTimeRangeValue {
  oneHour = 'POLICYLOG_QUERY_LAST_HOUR',
  oneDay = 'POLICYLOG_QUERY_LAST_DAY',
  oneWeek = 'POLICYLOG_QUERY_LAST_WEEK',
  oneMonth = 'POLICYLOG_QUERY_LAST_MONTH',
}

const INITIAL_ANOMALY_TIME_RANGE_VALUE: PolicyLogsSelectOption = {
  label: LookbackLabel.oneWeek,
  value: PolicyLogsTimeRangeValue.oneWeek,
};

const TIME_RANGE_OPTIONS: PolicyLogsSelectOption[] = [
  {
    label: LookbackLabel.oneHour,
    value: PolicyLogsTimeRangeValue.oneHour,
  },
  {
    label: LookbackLabel.oneDay,
    value: PolicyLogsTimeRangeValue.oneDay,
  },
  {
    label: LookbackLabel.oneWeek,
    value: PolicyLogsTimeRangeValue.oneWeek,
  },
  {
    label: LookbackLabel.oneMonth,
    value: PolicyLogsTimeRangeValue.oneMonth,
  },
];

const LOGS_TABLE_COLUMNS: Column[] = [
  {
    Header: 'TIME',
    accessor: ColumnAccessor.time,
  },
  {
    Header: 'EDGE',
    accessor: ColumnAccessor.edge,
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

const TABLE_TIME_FORMAT = 'EEE, MMM dd yyyy, hh:mm a';

const INPUT_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss ZZZ z';

export const PolicyLogs: React.FC = () => {
  const classes = TroubleshootingStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const [searchText, setSearchText] = useState<string>('');
  const [timeRange, setTimeRange] = useState<PolicyLogsSelectOption>(INITIAL_ANOMALY_TIME_RANGE_VALUE);
  const [columnCheckboxData, setColumnCheckboxData] = useState<CheckboxData>(initialCheckboxData);
  const [selectedColumns, setSelectedColumns] = useState<Column[]>([]);
  const [columnAnchorEl, setColumnAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [policyLogsData, setPolicyLogsData] = useState<PolicyLogsData[]>([]);
  const [filteredPolicyLogsData, setFilteredPolicyLogsData] = useState<PolicyLogsData[]>([]);

  const { response, loading, error, onGet } = useGet<PolicyLogsResponse>();

  const handleColmunsClick = (event: React.MouseEvent<HTMLButtonElement>) => setColumnAnchorEl(event.currentTarget);

  const handleColumnsClose = () => setColumnAnchorEl(null);

  const isColumnsPopoverOpen = Boolean(columnAnchorEl);

  const columnsPopoverId = isColumnsPopoverOpen ? COLUMNS_POPOVER : undefined;

  useEffect(() => {
    onGet(TopoApi.getPolicyLogs(), userContext.accessToken!, { time_range: timeRange.value });
  }, [timeRange]);

  useEffect(() => {
    if (response && response.policyLogs) {
      const formattedPolicyLogsData: PolicyLogsData[] = response.policyLogs.map(item => {
        const { timestamp, ...other } = item;
        const garbagesubstring = timestamp.slice(item.timestamp.indexOf('.'), timestamp.indexOf('.') + 10);
        const timeString = timestamp.replace(garbagesubstring, '');
        return {
          ...other,
          timestamp: DateTime.fromFormat(timeString, INPUT_TIME_FORMAT).toUTC().toFormat(TABLE_TIME_FORMAT),
        };
      });
      setPolicyLogsData(formattedPolicyLogsData);
    }
  }, [response]);

  useEffect(() => {
    const newSelectedColumns = LOGS_TABLE_COLUMNS.filter(item => columnCheckboxData[item.accessor]);
    setSelectedColumns(newSelectedColumns);
  }, [columnCheckboxData]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setColumnCheckboxData({
      ...columnCheckboxData,
      [event.target.name]: event.target.checked,
    });

  useEffect(() => {
    if (!searchText) {
      setFilteredPolicyLogsData(policyLogsData);
    }
  }, [searchText, policyLogsData]);

  //adds \ before every special character of string to use in regular expression
  const escapeRegExp = (value: string) => value.replace(REGEX, '\\$&');

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows: PolicyLogsData[] = policyLogsData.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        if (row[field]) {
          return searchRegex.test(row[field].toString());
        }
        return false;
      });
    });
    setFilteredPolicyLogsData(filteredRows);
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value);

  const handleTimeRangeChange = (value: PolicyLogsSelectOption) => setTimeRange(value);

  const logsTableData: AnomalyPolicyLogsTableData[] = filteredPolicyLogsData.map(item => {
    return {
      time: item.timestamp,
      edge: (
        <div>
          <span>{item.vendor === VendorTypes.MERAKI ? ciscoMerakiLogoIcon(28) : awsIcon(28)}</span>
          <span className={classes.profileNameText}>{item.ctrlrName}</span>
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
          <span className={classes.profileNameText}>{item.vendor}</span>
        </div>
      ),
      operation: item.operation,
      changes: (
        <div className={`${classes.tabTitleContainer} ${classes.policyLogsViewDetailsButton}`}>
          <div className={classes.ellipsisText}>{item.policyType}</div>
          <div>
            <span className={classes.policyLogsDetailsText}>VIEW DETAILS</span>
            <ArrowRightIcon fontSize="medium" className={classes.policyLogsArrowRight} />
          </div>
        </div>
      ),
    };
  });

  return (
    <div className={classes.policyLogsContainer}>
      <div className={classes.tabTitleContainer}>
        <div>
          <input type="text" className={classes.policyLogsSearchBar} value={searchText} onChange={handleSearchTextChange} placeholder="Search" />
          <span className={classes.searchIcon}>
            <SearchIcon />
          </span>
        </div>
        <div>
          <SecondaryButtonwithEvent
            styles={{ marginRight: 10 }}
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
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorMessage fontSize={28} margin="auto">
            {error.message}
          </ErrorMessage>
        ) : (
          <AnomalySLATestTable columns={selectedColumns} data={logsTableData} sortableHeaders={POLICY_LOGS_TABLE_SORTABLE_HEADERS} />
        )}
      </div>
    </div>
  );
};
