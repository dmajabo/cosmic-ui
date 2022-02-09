import { isNumber } from 'lodash';
import uniq from 'lodash/uniq';
import React from 'react';
import styled from 'styled-components';
import { MetricsStyles } from '../MetricsStyles';
import { HealthTableData } from './Cloud/DirectConnectConnectionHealth';
import { LegendIcon } from './LegendIcon';

interface HealthTableProps {
  readonly tableData: HealthTableData[];
}

const LEGEND_DATA = [
  { low: 0, high: 10, color: '#75B472', className: 'green' },
  { low: 11, high: 20, color: '#FFC568', className: 'yellow' },
  { low: 21, high: 30, color: '#DF6060', className: 'red' },
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

export const HealthTable: React.FC<HealthTableProps> = ({ tableData }) => {
  const classes = MetricsStyles();

  const DUMMY_TABLE_OBJECT = tableData.reduce((acc, nextValue) => {
    acc[`${nextValue.time}_${nextValue.connection}`] = nextValue.value;
    return acc;
  }, {});
  const time = uniq(tableData.map(item => item.time));
  const connection = uniq(tableData.map(item => item.connection));

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
              <tr key={item}>
                <td>{item}</td>
                {time.map(timeItem => (
                  <td key={timeItem} className={getTableItemClassName(DUMMY_TABLE_OBJECT[`${timeItem}_${item}`])}>
                    {isNumber(DUMMY_TABLE_OBJECT[`${timeItem}_${item}`]) ? DUMMY_TABLE_OBJECT[`${timeItem}_${item}`] : 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      <div className={classes.legendContainer}>
        {LEGEND_DATA.map(item => (
          <span key={item.color}>
            <LegendIcon colour={item.color} />
            <span className={classes.legendText}>{`${item.low}-${item.high} drop(s)`}</span>
          </span>
        ))}
      </div>
    </>
  );
};
