import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateTime } from 'luxon';
import { MetricKeyValue } from './PacketLoss';
import { Data } from './Table';
import sortBy from 'lodash/sortBy';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
  },
});

interface DataPoint {
  readonly x: number;
  readonly y: number;
}

interface ChartData {
  readonly name: string;
  readonly data: DataPoint[];
}

interface AreaChartData {
  readonly name: string;
  readonly data: [number, number, number?][];
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

const addNullPointsForUnavailableData = (array: number[][]) => {
  let data = [];
  data.push(array[0]);
  array.forEach((point, index) => {
    if (index > 0) {
      const prevTimestamp = array[index - 1][0];
      if (point[0] - prevTimestamp > 1000 * 60 * 10) {
        data.push([prevTimestamp + 1, null, null]);
        data.push(point);
      } else {
        data.push(point);
      }
    }
  });
  return data;
};

export const MetricsLineChart: React.FC<LineChartProps> = ({ selectedRows, dataValueSuffix, inputData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tempChartData: ChartData[] = selectedRows.map(row => {
      return {
        id: `${row.name} &#9654 ${row.sourceDevice}`,
        name: `${row.name} &#9654 ${row.sourceDevice}`,
        data: sortBy(inputData[row.id], 'time').map(item => {
          const timestamp = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC();
          return {
            x: timestamp.toMillis(),
            y: dataValueSuffix === 'mbps' ? Number(item.value) / 1000 : Number(Number.parseFloat(item.value).toFixed(2)),
            marker: {
              enabled: false,
            },
            states: {
              hover: {
                lineWidthPlus: 0,
              },
            },
            dataValueSuffix: dataValueSuffix,
            rowName: row.name,
            deviceName: row.sourceDevice,
            destination: row.destination,
          };
        }),
        zIndex: 1,
        turboThreshold: inputData[row.id].length,
        tooltip: {
          useHTML: true,
          pointFormat: `
          <br /><div><b>Test:</b> {point.rowName}</div><br />
          <div><b>Device:</b> {point.deviceName}</div><br />
          <div><b>Destination:</b> {point.destination}</div><br />
          <div><b>Value:</b> {point.y:,.0f}{point.dataValueSuffix}</div><br />
          `,
        },
      };
    });
    const anomalyData: ChartData[] = selectedRows.map(row => ({
      id: `${row.name}_anomaly`,
      name: `${row.name}_anomaly`,
      data: sortBy(inputData[`${row.id}_anomaly`], 'time').map(item => {
        const timestamp = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC().toMillis();

        return {
          x: timestamp,
          y: dataValueSuffix === 'mbps' ? Number(item.value) / 1000 : Number(Number.parseFloat(item.value).toFixed(2)),
          marker: {
            enabled: true,
            radius: 3,
            symbol: 'circle',
          },
          dataValueSuffix: dataValueSuffix,
          rowName: row.name,
          deviceName: row.sourceDevice,
          destination: row.destination,
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
      tooltip: {
        useHTML: true,
        pointFormat: `
          <div><b>Anomaly:</b> {point.y:,.0f}{point.dataValueSuffix}</div><br />
          `,
      },
    }));
    const thresholdData: AreaChartData[] = selectedRows.map(row => {
      const thresholdSeriesData = sortBy(inputData[`${row.id}_threshold`], 'time').map((item, index) => {
        const timestamp = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC().toMillis();
        return [timestamp, dataValueSuffix === 'mbps' ? Number(item.value) / 1000 : Number(Number.parseFloat(item.value).toFixed(2))];
      });
      const data = addNullPointsForUnavailableData(thresholdSeriesData);
      return {
        id: `${row.name}_threshold`,
        name: `${row.name}_threshold`,
        data: data,
        linkedTo: `${row.name} &#9654 ${row.sourceDevice}`,
        lineWidth: 1,
        states: {
          hover: {
            lineWidthPlus: 0,
          },
        },
        color: 'rgba(239,154,154,0.4)',
        dashStyle: 'LongDash',
        zIndex: 1,
        tooltip: {
          useHTML: true,
          pointFormat: `
          <div><b>Threshold:</b> {point.y:,.0f}{point.dataValueSuffix}</div><br />
          `,
        },
      };
    });
    const areaData: AreaChartData[] = selectedRows.map(row => {
      const sortedUpperboundData = sortBy(inputData[`${row.id}_upperbound`], 'time');
      const areaSeriesData = sortBy(inputData[`${row.id}_lowerbound`], 'time').map((item, index) => {
        const timestamp = DateTime.fromFormat(item.time, OLD_TIME_FORMAT).toUTC();
        return [
          timestamp.toMillis(),
          dataValueSuffix === 'mbps' ? Number((Number(item.value) / 1000).toFixed(2)) : Number(Number.parseFloat(item.value).toFixed(2)),
          dataValueSuffix === 'mbps'
            ? Number((Number(sortedUpperboundData[index]?.value || 'NaN') / 1000).toFixed(2))
            : Number(Number.parseFloat(sortedUpperboundData[index]?.value || 'NaN').toFixed(2)),
        ];
      });
      const data = addNullPointsForUnavailableData(areaSeriesData);
      return {
        name: `${row.name}_bounds`,
        data: data,
        type: 'arearange',
        turboThreshold: inputData[row.id].length,
        linkedTo: `${row.name} &#9654 ${row.sourceDevice}`,
        color: 'rgb(235,240,250)',
        zIndex: 0,
        states: {
          hover: {
            lineWidthPlus: 0,
          },
        },
        lineWidth: 0,
        tooltip: {
          useHTML: true,
          pointFormat: `
          <div><b>Upperbound: </b>{point.high:,.0f}</div><br />
          <div><b>Lowerbound: </b>{point.low:,.0f}</div><br />
          `,
        },
      };
    });
    const finalChartData = [];
    tempChartData.forEach((item, index) => {
      finalChartData.push(item);
      finalChartData.push(anomalyData[index]);
      finalChartData.push(thresholdData[index]);
      finalChartData.push(areaData[index]);
    });
    setData(finalChartData);
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
    yAxis: {
      title: false,
      labels: {
        format: dataValueSuffix ? `{text} ${dataValueSuffix}` : `{text}`,
      },
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      series: {
        marker: { enabled: false },
      },
    },
    legend: {
      useHTML: true,
      symbolPadding: 0,
      symbolWidth: 0,
      symbolHeight: 0,
      labelFormatter: function (this: Highcharts.Point) {
        return `<span><span style="background-color:${this.color}; padding-right: 15px; margin-right: 10px; border-radius: 6px;" >&nbsp</span>${this.name}</span>`;
      },
    },
    colors: COLORS,
    credits: {
      enabled: false,
    },
    series: data,
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
