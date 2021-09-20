import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

interface DataMetrics {
  readonly time: string;
  readonly value: string;
}
interface PacketLossMetrics {
  readonly deviceId: string;
  readonly metric: DataMetrics[];
}

interface ChartData {
  name: string;
  data: number[];
}

interface LineChartProps {
  readonly dataValueSuffix?: string;
  readonly inputData: PacketLossMetrics[];
  readonly timeFormat?: string;
}
export const MetricsLineChart: React.FC<LineChartProps> = ({ dataValueSuffix, inputData }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<ChartData[]>([]);
  const [tickInterval, setTickInterval] = useState<number>(0);

  useEffect(() => {
    if (inputData.length > 0) {
      const newCategories = inputData[0].metric.map(item => {
        return moment(item.time).format('YY/MM/DD HH:mm');
      });
      const newData = inputData.map(item => {
        return {
          name: item.deviceId,
          data: item.metric.map(dataItem => {
            return Number(Number.parseFloat(dataItem.value).toFixed(2));
          }),
        };
      });
      setCategories(newCategories);
      setData(newData);
      setTickInterval(Math.floor(newData[0].data.length / 5));
    }
  }, [inputData]);

  const lineChartOptions = {
    time: {
      useUTC: false,
    },
    title: false,
    xAxis: {
      tickInterval: tickInterval,
      categories: categories,
      labels: {
        autoRotation: 0,
      },
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
    legend: false,
    credits: {
      enabled: false,
    },
    series: data,
  };

  return <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />;
};
