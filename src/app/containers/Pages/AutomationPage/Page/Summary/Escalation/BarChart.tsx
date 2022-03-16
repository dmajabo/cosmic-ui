import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export interface BarChartData {
  readonly date: string;
  readonly value: number;
}

interface BarChartProps {
  readonly inputData: BarChartData[];
  readonly xAxisText: string;
  readonly yAxisText: string;
  readonly chartTitle?: string;
}

const barChartOptions = (chartTitle, xAxisText: string, yAxisText: string, barChartData: number[], categories: string[]) => ({
  chart: {
    type: 'column',
    backgroundColor: '#FBFCFE',
    borderColor: '#CBD2DC',
    borderRadius: 6,
    borderWidth: 1,
    spacing: [30, 10, 10, 10],
    height: 400,
  },
  title: {
    text: chartTitle ? chartTitle : null,
    style: {
      fontSize: 16,
      fontWeight: 700,
    },
    align: 'left',
    margin: 30,
    x: 10,
  },
  yAxis: {
    title: {
      text: yAxisText,
    },
  },
  xAxis: {
    categories: categories,
    title: {
      text: xAxisText,
    },
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        color: '#75B472',
      },
      maxPointWidth: 40,
      borderRadius: 6,
    },
  },
  colors: ['#75B472'],
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: {
    data: barChartData,
  },
});

export const BarChart: React.FC<BarChartProps> = ({ inputData, xAxisText, yAxisText, chartTitle }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [barChartData, setBarChartData] = useState<number[]>([]);

  useEffect(() => {
    const chartCategories = inputData.map(item => item.date);
    const chartData = inputData.map(item => item.value);
    setBarChartData(chartData);
    setCategories(chartCategories);
  }, [inputData]);

  return <HighchartsReact highcharts={Highcharts} options={barChartOptions(chartTitle, xAxisText, yAxisText, barChartData, categories)} />;
};
