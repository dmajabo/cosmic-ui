import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateTime } from 'luxon';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';
import sortBy from 'lodash/sortBy';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

interface DataPoint {
  readonly x: number;
  readonly y: number;
}

interface ChartData {
  readonly name: string;
  readonly data: DataPoint[];
}

interface AreaDataPoint {
  readonly x: number;
  readonly low: number;
  readonly high: number;
}

interface AreaChartData {
  readonly name: string;
  readonly data: [number, number, number][];
}

interface LineChartProps {
  readonly dataValueSuffix?: string;
  readonly selectedRows: Data[];
  readonly inputData: MetricKeyValue;
  readonly timeFormat?: string;
}

const OLD_TIME_FORMAT: string = 'yyyy-MM-dd HH:mm:ss ZZZ z';

const COLORS = [
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
const ANOMALY_POINT_COLOR = 'red';

export const MetricsLineChart: React.FC<LineChartProps> = ({ selectedRows, dataValueSuffix, inputData }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [areaChartData, setAreaChartData] = useState<AreaChartData[]>([]);

  useEffect(() => {
    const tempChartData: ChartData[] = selectedRows.map(row => {
      return {
        id: `${row.name} &#9654 ${row.sourceDevice}`,
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
        zIndex: 1,
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
        linkedTo: `${row.name} &#9654 ${row.sourceDevice}`,
        turboThreshold: inputData[row.id].length,
        color: ANOMALY_POINT_COLOR,
        states: {
          hover: {
            lineWidthPlus: 0,
          },
        },
        zIndex: 1,
        lineWidth: 0,
      };
    });
    const areaData: AreaChartData[] = selectedRows.map(row => {
      return {
        name: `${row.name}_bounds`,
        data: sortBy(inputData[`${row.id}_lowerbound`], 'time').map((item, index) => {
          const val = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC();
          return [
            val.toMillis(),
            dataValueSuffix === 'mbps' ? Number(item.value) / 1000 : Number(Number.parseFloat(item.value).toFixed(2)),
            dataValueSuffix === 'mbps'
              ? Number(Number.parseFloat(inputData[`${row.id}_upperbound`][index].value)) / 1000
              : Number(Number.parseFloat(inputData[`${row.id}_upperbound`][index].value).toFixed(2)),
          ];
        }),
        type: 'arearange',
        turboThreshold: inputData[row.id].length,
        linkedTo: `${row.name} &#9654 ${row.sourceDevice}`,
        color: 'ghostwhite',
        zIndex: 0,
        fillOpacity: 0.1,
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
    setAreaChartData(areaData);
  }, [inputData]);

  const lineChartOptions = {
    chart: {
      zoomType: 'xy',
    },
    time: {
      useUTC: false,
    },
    title: false,
    xAxis: {
      type: 'datetime',
      crosshair: true,
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
    series: [...data, ...areaChartData],
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
