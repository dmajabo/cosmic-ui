import { uniq } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { MetricsStyles } from '../MetricsStyles';
import { LegendIcon } from './LegendIcon';

const LEGEND_DATA = [
  { low: 0, high: 10, color: '#75B472', className: 'green' },
  { low: 11, high: 20, color: '#FFC568', className: 'yellow' },
  { low: 21, high: 30, color: '#DF6060', className: 'red' },
];

const DUMMY_TABLE_DATA = [
  {
    time: 'Nov 1',
    connection: 'Site1-Segment',
    value: 3,
  },
  {
    time: 'Nov 1',
    connection: 'Site2-Segment',
    value: 3,
  },
  {
    time: 'Nov 1',
    connection: 'Site3-Segment',
    value: 3,
  },
  {
    time: 'Nov 2',
    connection: 'Site2-Segment',
    value: 12,
  },
  {
    time: 'Nov 3',
    connection: 'Site3-Segment',
    value: 25,
  },
  {
    time: 'Nov 4',
    connection: 'Site4-Segment',
    value: 6,
  },
  {
    time: 'Nov 5',
    connection: 'Site5-Segment',
    value: 20,
  },
  {
    time: 'Nov 6',
    connection: 'Site6-Segment',
    value: 23,
  },
  {
    time: 'Nov 7',
    connection: 'Site7-Segment',
    value: 6,
  },
];

const TableContainer = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    background-color: #fbfcfe;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    border: 1px solid #cbd2dc;
    border-collapse: collapse;

    td {
      padding: 15px;
      min-width: 200px;
      border: 1px solid #e7edf9;
    }
    .green {
      background-color: #75b472;
      border: 1px solid white;
      color: white;
    }
    .yellow {
      background-color: #ffc568;
      border: 1px solid white;
      color: white;
    }
    .red {
      background-color: #df6060;
      border: 1px solid white;
      color: white;
    }
  }
`;

const getTableItemClassName = (data: number) => LEGEND_DATA.find(item => data >= item.low && data <= item.high)?.className || '';

export const HealthTable: React.FC = () => {
  const classes = MetricsStyles();

  const DUMMY_TABLE_OBJECT = DUMMY_TABLE_DATA.reduce((acc, nextValue) => {
    acc[`${nextValue.time}_${nextValue.connection}`] = nextValue.value;
    return acc;
  }, {});
  const time = uniq(DUMMY_TABLE_DATA.map(item => item.time));
  const connection = uniq(DUMMY_TABLE_DATA.map(item => item.connection));
  return (
    <>
      <TableContainer>
        <table>
          <tbody>
            <tr>
              <td></td>
              {time.map(item => (
                <td key={item}>{item}</td>
              ))}
            </tr>
            {connection.map(item => (
              <tr>
                <td>{item}</td>
                {time.map(timeItem => (
                  <td className={getTableItemClassName(DUMMY_TABLE_OBJECT[`${timeItem}_${item}`])}>{DUMMY_TABLE_OBJECT[`${timeItem}_${item}`] || 'N/A'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      <div className={classes.legendContainer}>
        {LEGEND_DATA.map(item => (
          <span>
            <LegendIcon colour={item.color} />
            <span className={classes.legendText}>{`${item.low}-${item.high} drop(s)`}</span>
          </span>
        ))}
      </div>
    </>
  );
};
