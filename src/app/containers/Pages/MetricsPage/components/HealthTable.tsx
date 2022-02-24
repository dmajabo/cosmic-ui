import { useMetricsDataContext } from 'lib/hooks/Metrics/useMetricsDataContent';
import isNumber from 'lodash/isNumber';
import uniq from 'lodash/uniq';
import React from 'react';
import styled from 'styled-components';
import LegendRangeItem from '../../TrafficPage/Trends/Components/FlowsOverviewComponent/RangeItem/LegendRangeItem';
import { LegendRangeItemsWrapper } from '../../TrafficPage/Trends/Components/FlowsOverviewComponent/RangeItem/style';
import { HealthTableData } from './Cloud/DirectConnectConnectionHealth';

interface HealthTableProps {
  readonly tableData: HealthTableData[];
}

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
  }
`;

export const HealthTable: React.FC<HealthTableProps> = ({ tableData }) => {
  const { metrics } = useMetricsDataContext();
  const DUMMY_TABLE_OBJECT = tableData.reduce((acc, nextValue) => {
    acc[`${nextValue.time}_${nextValue.connection}`] = nextValue.value;
    return acc;
  }, {});
  const time = uniq(tableData.map(item => item.time));
  const connection = uniq(tableData.map(item => item.connection));

  const getItemStyle = (data: number) => {
    const rangeColor = metrics.rangePreference.find(item => data >= item.from && data <= item.to)?.color || '';
    if (isNumber(data) && rangeColor) {
      const style: React.CSSProperties = {
        backgroundColor: rangeColor,
        border: '1px solid white',
        color: 'white',
      };
      return style;
    }
    return null;
  };

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
                {time.map(timeItem => {
                  const itemStyle: React.CSSProperties = getItemStyle(DUMMY_TABLE_OBJECT[`${timeItem}_${item}`]);
                  return (
                    <td key={timeItem} style={itemStyle}>
                      {isNumber(DUMMY_TABLE_OBJECT[`${timeItem}_${item}`]) ? DUMMY_TABLE_OBJECT[`${timeItem}_${item}`] : 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      <LegendRangeItemsWrapper>
        {metrics.rangePreference.map(it => (
          <LegendRangeItem key={`rangeItem${it.id}`} range={it} />
        ))}
      </LegendRangeItemsWrapper>
    </>
  );
};
