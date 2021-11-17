import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateTime } from 'luxon';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';
import sortBy from 'lodash/sortBy';

interface DataPoint {
  readonly x: number;
  readonly y: number;
}

interface ChartData {
  readonly name: string;
  readonly data: DataPoint[];
}

interface LineChartProps {
  readonly dataValueSuffix?: string;
  readonly selectedRows: Data[];
  readonly inputData: MetricKeyValue;
  readonly timeFormat?: string;
}

const OLD_TIME_FORMAT: string = 'yyyy-MM-dd HH:mm:ss ZZZ z';

const COLORS = [
  '#004D40',
  '#00BCD4',
  '#01579B',
  '#0277BD',
  '#0288D1',
  '#03A9F4',
  '#1A237E',
  '#26A69A',
  '#4527A0',
  '#4A148C',
  '#512DA8',
  '#558B2F',
  '#5C6BC0',
  '#673AB7',
  '#006064',
  '#00695C',
  '#00796B',
  '#00838F',
  '#009688',
  '#0097A7',
  '#26C6DA',
  '#283593',
  '#29B6F6',
  '#303F9F',
  '#311B92',
  '#33691E',
  '#3F51B5',
  '#689F38',
  '#6A1B9A',
  '#7B1FA2',
  '#7E57C2',
  '#80CBC4',
  '#80DEEA',
  '#81D4FA',
  '#880E4F',
  '#8BC34A',
  '#9C27B0',
  '#9CCC65',
  '#9FA8DA',
  '#AB47BC',
  '#AD1457',
  '#B39DDB',
  '#B71C1C',
  '#C2185B',
  '#C5E1A5',
  '#C62828',
  '#CE93D8',
  '#D32F2F',
  '#E91E63',
  '#EC407A',
  '#EF5350',
  '#EF9A9A',
  '#F44336',
  '#F48FB1',
];
const ANOMALY_POINT_COLOR = 'red';

export const MetricsLineChart: React.FC<LineChartProps> = ({ selectedRows, dataValueSuffix, inputData }) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const tempChartData: ChartData[] = selectedRows.map(row => {
      return {
        name: `${row.name} &#9654 ${row.sourceDevice}`,
        data: sortBy(inputData[row.id], 'time').map(item => {
          const val = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC();
          return {
            x: val.toMillis(),
            y: dataValueSuffix === 'mbps' ? Number(item.value) / 1000 : Number(Number.parseFloat(item.value).toFixed(2)),
            marker: {
              enabled: false,
            },
            states: {
              hover: {
                lineWidthPlus: 0,
              },
            },
          };
        }),
        turboThreshold: inputData[row.id].length,
      };
    });
    const anomalyData: ChartData[] = selectedRows.map(row => {
      return {
        name: `${row.name}_anomaly`,
        data: sortBy(inputData[`${row.id}_anomaly`], 'time').map(item => {
          const val = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC();
          return {
            x: val.toMillis(),
            y: dataValueSuffix === 'mbps' ? Number(item.value) / 1000 : Number(Number.parseFloat(item.value).toFixed(2)),
            marker: {
              enabled: true,
              radius: 5,
              symbol: 'circle',
            },
          };
        }),
        turboThreshold: inputData[row.id].length,
        showInLegend: false,
        color: ANOMALY_POINT_COLOR,
        states: {
          hover: {
            lineWidthPlus: 0,
          },
        },
        lineWidth: 0,
      };
    });
    const finalChartData = sortBy(tempChartData, 'data').reverse().concat(anomalyData);
    setData(finalChartData);
  }, [inputData]);

  const lineChartOptions = {
    chart: {
      zoomType: 'x',
    },
    time: {
      useUTC: false,
    },
    title: false,
    xAxis: {
      type: 'datetime',
      tickInterval: 1000 * 60 * 60 * 24,
    },
    tooltip: {
      valueSuffix: dataValueSuffix ? ` ${dataValueSuffix}` : '',
    },
    yAxis: {
      title: false,
      labels: {
        format: dataValueSuffix ? `{text} ${dataValueSuffix}` : `{text}`,
      },
    },
    plotOptions: {
      series: {
        marker: {
          symbol: 'square',
          radius: 10,
        },
      },
    },
    legend: {
      symbolHeight: 20,
      symbolPadding: 10,
    },
    colors: COLORS,
    credits: {
      enabled: false,
    },
    series: data,
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
