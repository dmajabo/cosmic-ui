import { Button, FormControlLabel, Typography } from '@mui/material';
import { Column, ColumnAccessor, MetricsExplorerTableData } from 'lib/api/http/SharedTypes';
import { isEqual, sortBy, uniqWith } from 'lodash';
import React, { useEffect, useState } from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import ColumnsIcon from '../../icons/metrics explorer/columns.svg';
import SearchIcon from '../../icons/metrics explorer/search.svg';
import SortIcon from '../../icons/metrics explorer/sort.svg';
import { CheckboxData, DimensionOptions } from './Dimensions';
import { LegendLine } from './LegendLine';
import { Table } from './Table';
import styled from 'styled-components';
import { Checkbox, FormGroup, Popover } from '@mui/material';
import produce from 'immer';

interface MetricsTableProps {
  readonly dimensions: DimensionOptions[];
  readonly tableData: MetricsExplorerTableData[];
  readonly dataUnit: string;
}

enum DataUnitPrefix {
  unit = '',
  kiloUnit = 'K',
  megaUnit = 'M',
}

const COLOURS = [
  '#0288D1',
  '#6A1B9A',
  '#29B6F6',
  '#26A69A',
  '#558B2F',
  '#EC407A',
  '#689F38',
  '#AD1457',
  '#F48FB1',
  '#26C6DA',
  '#00695C',
  '#EF5350',
  '#E91E63',
  '#F44336',
  '#CE93D8',
  '#00838F',
  '#7E57C2',
  '#C62828',
  '#9FA8DA',
  '#80CBC4',
  '#283593',
  '#9CCC65',
  '#009688',
  '#5C6BC0',
  '#01579B',
  '#880E4F',
  '#7B1FA2',
  '#EF9A9A',
  '#C5E1A5',
  '#C2185B',
  '#0277BD',
  '#B39DDB',
  '#673AB7',
  '#AB47BC',
  '#81D4FA',
  '#303F9F',
  '#B71C1C',
  '#00BCD4',
  '#4527A0',
  '#8BC34A',
  '#80DEEA',
  '#D32F2F',
  '#512DA8',
  '#33691E',
  '#004D40',
  '#3F51B5',
  '#311B92',
  '#9C27B0',
  '#006064',
  '#00796B',
  '#03A9F4',
  '#4A148C',
  '#0097A7',
  '#1A237E',
];

//TODO: Change below Array when api is integrated
const dimensionColumns: Column[] = [
  {
    Header: (
      <>
        <div>
          <b>INTERFACE</b>
        </div>
        <div>(Source)</div>
      </>
    ),
    accessor: ColumnAccessor.interfaceSource,
  },
  {
    Header: (
      <>
        <div>
          <b>CONNECTIVITY TYPE</b>
        </div>
        <div>(Source)</div>
      </>
    ),
    accessor: ColumnAccessor.connectivityTypeSource,
  },
  {
    Header: (
      <>
        <div>
          <b>NETWORK BOUNDARY</b>
        </div>
        <div>(Source)</div>
      </>
    ),
    accessor: ColumnAccessor.networkBoundarySource,
  },
  {
    Header: (
      <>
        <div>
          <b>PROVIDER</b>
        </div>
        <div>(Source)</div>
      </>
    ),
    accessor: ColumnAccessor.providerSource,
  },
  {
    Header: (
      <>
        <div>
          <b>TRAFFIC ORIGINATION</b>
        </div>
        <div>(Source)</div>
      </>
    ),
    accessor: ColumnAccessor.trafficOriginationSource,
  },
  {
    Header: (
      <>
        <div>
          <b>INTERFACE CAPACITY</b>
        </div>
        <div>(Source)</div>
      </>
    ),
    accessor: ColumnAccessor.interfaceCapacitySource,
  },
  {
    Header: (
      <>
        <div>
          <b>VLAN</b>
        </div>
        <div>(Source)</div>
      </>
    ),
    accessor: ColumnAccessor.vlanSource,
  },
  {
    Header: (
      <>
        <div>
          <b>MAC ADDRESS</b>
        </div>
        <div>(Source)</div>
      </>
    ),
    accessor: ColumnAccessor.macAddressSource,
  },
  {
    Header: (
      <>
        <div>
          <b>INTERFACE</b>
        </div>
        <div>(Destination)</div>
      </>
    ),
    accessor: ColumnAccessor.interfaceDestination,
  },
  {
    Header: (
      <>
        <div>
          <b>CONNECTIVITY TYPE</b>
        </div>
        <div>(Destination)</div>
      </>
    ),
    accessor: ColumnAccessor.connectivityTypeDestination,
  },
  {
    Header: (
      <>
        <div>
          <b>NETWORK BOUNDARY</b>
        </div>
        <div>(Destination)</div>
      </>
    ),
    accessor: ColumnAccessor.networkBoundaryDestination,
  },
  {
    Header: (
      <>
        <div>
          <b>PROVIDER</b>
        </div>
        <div>(Destination)</div>
      </>
    ),
    accessor: ColumnAccessor.providerDestination,
  },
  {
    Header: (
      <>
        <div>
          <b>TRAFFIC ORIGINATION</b>
        </div>
        <div>(Destination)</div>
      </>
    ),
    accessor: ColumnAccessor.trafficOriginationDestination,
  },
  {
    Header: (
      <>
        <div>
          <b>INTERFACE CAPACITY</b>
        </div>
        <div>(Destination)</div>
      </>
    ),
    accessor: ColumnAccessor.interfaceCapacityDestination,
  },
  {
    Header: (
      <>
        <div>
          <b>VLAN</b>
        </div>
        <div>(Destination)</div>
      </>
    ),
    accessor: ColumnAccessor.vlanDestination,
  },
  {
    Header: (
      <>
        <div>
          <b>MAC ADDRESS</b>
        </div>
        <div>(DESTINATION)</div>
      </>
    ),
    accessor: ColumnAccessor.macAddressDestination,
  },
];

const FlexStart = styled.div`
  display: flex;
  .image {
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const dataColumns = (dataUnit: string): Column[] => [
  {
    Header: (
      <FlexStart>
        <div>
          <div>
            <b>AVERAGE</b>
          </div>
          <div>{`(${dataUnit})`}</div>
        </div>
        <div>
          <img className="image" src={SortIcon} alt="sort by name" />
        </div>
      </FlexStart>
    ),
    accessor: ColumnAccessor.average,
  },
  {
    Header: (
      <FlexStart>
        <div>
          <div>
            <b>95TH PERCENTILE</b>
          </div>
          <div>{`(${dataUnit})`}</div>
        </div>
        <div>
          <img className="image" src={SortIcon} alt="sort by name" />
        </div>
      </FlexStart>
    ),
    accessor: ColumnAccessor.ninetyFifthPercentile,
  },
  {
    Header: (
      <FlexStart>
        <div>
          <div>
            <b>MAX</b>
          </div>
          <div>{`(${dataUnit})`}</div>
        </div>
        <div>
          <img className="image" src={SortIcon} alt="sort by name" />
        </div>
      </FlexStart>
    ),
    accessor: ColumnAccessor.max,
  },
  {
    Header: (
      <FlexStart>
        <div>
          <div>
            <b>LAST DATAPOINT</b>
          </div>
          <div>{`(${dataUnit})`}</div>
        </div>
        <div>
          <img className="image" src={SortIcon} alt="sort by name" />
        </div>
      </FlexStart>
    ),
    accessor: ColumnAccessor.lastDatapoint,
  },
];

const COLUMNS_POPOVER = 'columns-popover';
const REGEX = /[-[\]{}()*+?.,\\^$|#\s]/g;
const TEN_THOUSAND = 10000;
const MILLION = 1000000;

const getTableDataUnitPrefix = (tableData: MetricsExplorerTableData[]) => {
  const maxAverage = Math.max(...tableData.map(item => item.average));
  return maxAverage >= TEN_THOUSAND ? (maxAverage >= MILLION ? DataUnitPrefix.megaUnit : DataUnitPrefix.kiloUnit) : DataUnitPrefix.unit;
};

export const MetricsTable: React.FC<MetricsTableProps> = ({ dimensions, tableData, dataUnit }) => {
  const classes = AnalyticsStyles();

  const allUniqueDimensions = uniqWith(
    dimensions.reduce((acc, nextValue) => acc.concat(nextValue.source, nextValue.destination), []),
    isEqual,
  );
  const uniqueDimensionValues = allUniqueDimensions.map(item => item.value);

  const filteredDimensionColumns = dimensionColumns.filter(column => uniqueDimensionValues.includes(column.accessor));

  const initialCheckboxData = (tableColumns: Column[]) =>
    tableColumns.reduce((accu, nextValue) => {
      accu[nextValue.accessor] = true;
      return accu;
    }, {});

  const tableDataUnit = getTableDataUnitPrefix(tableData) + dataUnit;

  const [searchText, setSearchText] = useState<string>('');
  const [filteredTableData, setFilteredTableData] = useState<MetricsExplorerTableData[]>(tableData);
  const [finalTableColumns, setFinalTableColumns] = useState<Column[]>([
    {
      Header: '',
      accessor: ColumnAccessor.legendLine,
    },
    ...filteredDimensionColumns,
    ...dataColumns(tableDataUnit),
  ]);
  const [columnCheckboxData, setColumnCheckboxData] = useState<CheckboxData>(initialCheckboxData(finalTableColumns));
  const [selectedColumns, setSelectedColumns] = useState<Column[]>([]);
  const [columnAnchorEl, setColumnAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [dragId, setDragId] = useState<ColumnAccessor>();

  //adds \ before every special character of string to use in regular expression
  const escapeRegExp = (value: string) => value.replace(REGEX, '\\$&');

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = filteredTableData.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setFilteredTableData(filteredRows);
  };

  const getDataUnitAppliedValue = (data: number) => {
    if (tableDataUnit === DataUnitPrefix.kiloUnit + dataUnit) {
      return data / TEN_THOUSAND;
    }
    if (tableDataUnit === DataUnitPrefix.megaUnit + dataUnit) {
      return data / MILLION;
    }
    return data;
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value);

  const tableDataInput = filteredTableData.map((item, index) => ({
    average: getDataUnitAppliedValue(item.average),
    ninetyFifthPercentile: getDataUnitAppliedValue(item.ninetyFifthPercentile),
    max: getDataUnitAppliedValue(item.max),
    lastDatapoint: getDataUnitAppliedValue(item.lastDatapoint),
    interfaceSource: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.interfaceSource}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.interfaceSource}</div>
      </div>
    ),
    interfaceDestination: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.interfaceDestination}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.interfaceDestination}</div>
      </div>
    ),
    connectivityTypeSource: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.connectivityTypeSource}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.connectivityTypeSource}</div>
      </div>
    ),
    connectivityTypeDestination: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.connectivityTypeDestination}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.connectivityTypeDestination}</div>
      </div>
    ),
    networkBoundarySource: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.networkBoundarySource}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.networkBoundarySource}</div>
      </div>
    ),
    networkBoundaryDestination: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.networkBoundaryDestination}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.networkBoundaryDestination}</div>
      </div>
    ),
    providerSource: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.providerSource}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.providerSource}</div>
      </div>
    ),
    providerDestination: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.providerDestination}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.providerDestination}</div>
      </div>
    ),
    trafficOriginationSource: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.trafficOriginationSource}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.trafficOriginationSource}</div>
      </div>
    ),
    trafficOriginationDestination: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.trafficOriginationDestination}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.trafficOriginationDestination}</div>
      </div>
    ),
    interfaceCapacitySource: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.interfaceCapacitySource}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.interfaceCapacitySource}</div>
      </div>
    ),
    interfaceCapacityDestination: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.interfaceCapacityDestination}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.interfaceCapacityDestination}</div>
      </div>
    ),
    vlanSource: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.vlanSource}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.vlanSource}</div>
      </div>
    ),
    vlanDestination: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.vlanDestination}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.vlanDestination}</div>
      </div>
    ),
    macAddressSource: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.macAddressSource}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.macAddressSource}</div>
      </div>
    ),
    macAddressDestination: (
      <div>
        <div className={classes.metricsTableDimensionName}>{item.macAddressDestination}</div>
        <div className={classes.metricsTableDimensionSubtitle}>{item.macAddressDestination}</div>
      </div>
    ),
    legendLine: <LegendLine colour={COLOURS[index]} />,
  }));

  const handleColmunsClick = (event: React.MouseEvent<HTMLButtonElement>) => setColumnAnchorEl(event.currentTarget);

  const handleColumnsClose = () => setColumnAnchorEl(null);

  const isColumnsPopoverOpen = Boolean(columnAnchorEl);
  const columnsPopoverId = isColumnsPopoverOpen ? COLUMNS_POPOVER : undefined;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setColumnCheckboxData({
      ...columnCheckboxData,
      [event.target.name]: event.target.checked,
    });

  const handleDrag = event => setDragId(event.currentTarget.id);

  const handleDrop = event => {
    const dragItem = finalTableColumns.find(column => column.accessor === dragId);
    const dropItem = finalTableColumns.find(column => column.accessor === event.currentTarget.id);

    const dragItemOrder = dragItem.order;
    const dropItemOrder = dropItem.order;

    const newColumnOrder = produce(finalTableColumns, draft => {
      const dragItemFound = draft.find(item => item.accessor === dragId);
      dragItemFound.order = dropItemOrder;

      const dropItemFound = draft.find(item => item.accessor === event.currentTarget.id);
      dropItemFound.order = dragItemOrder;
    });

    setFinalTableColumns(sortBy(newColumnOrder, 'order'));

    const selectedColumnAccessors = selectedColumns.map(item => item.accessor);
    const newSelectedColumns = newColumnOrder.filter(item => selectedColumnAccessors.includes(item.accessor));
    setSelectedColumns(sortBy(newSelectedColumns, 'order'));
  };

  useEffect(() => {
    if (!searchText) {
      setFilteredTableData(tableData);
    }
  }, [searchText, tableData]);

  useEffect(() => {
    const newColumns = [
      {
        Header: '',
        accessor: ColumnAccessor.legendLine,
      },
      ...filteredDimensionColumns,
      ...dataColumns(tableDataUnit),
    ];
    setFinalTableColumns(newColumns.map((item, index) => ({ Header: item.Header, accessor: item.accessor, order: index + 1 })));
  }, [dimensions, tableDataUnit]);

  useEffect(() => setColumnCheckboxData(initialCheckboxData(finalTableColumns)), [finalTableColumns]);

  useEffect(() => {
    const newSelectedColumns = finalTableColumns.filter(item => columnCheckboxData[item.accessor]);
    setSelectedColumns(newSelectedColumns);
  }, [columnCheckboxData]);

  return (
    <div className={classes.metricsTableContainer}>
      <div className={classes.tabTitleContainer}>
        <div>
          <input type="text" className={classes.metricsTableSearchBar} value={searchText} onChange={handleSearchTextChange} placeholder="Search" />
          <span className={classes.searchIcon}>
            <img src={SearchIcon} alt="search" />
          </span>
        </div>
        <div>
          <Button aria-describedby={columnsPopoverId} className={classes.otherButton} variant="contained" onClick={handleColmunsClick} disableElevation>
            <Typography className={classes.otherButtonText} noWrap>
              COLUMNS
            </Typography>
            <img src={ColumnsIcon} alt="columns" />
          </Button>
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
              {finalTableColumns
                .filter(column => column.accessor !== ColumnAccessor.legendLine)
                .map(item => (
                  <FormControlLabel
                    key={item.accessor}
                    className={classes.popoverItem}
                    control={<Checkbox checked={columnCheckboxData[item.accessor]} onChange={handleCheckboxChange} name={item.accessor} />}
                    label={
                      <div className={classes.popoverText} draggable={true} id={item.accessor} onDragOver={e => e.preventDefault()} onDragStart={handleDrag} onDrop={handleDrop}>
                        <FlexStart>{item.Header}</FlexStart>
                        <div className={classes.dragIcon} />
                      </div>
                    }
                  />
                ))}
            </FormGroup>
          </Popover>
        </div>
      </div>
      <Table columns={selectedColumns} data={tableDataInput} />
    </div>
  );
};
