import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BarChartData } from './ExperienceTab';
interface AnomalyBarChartProps {
  readonly inputData: BarChartData[];
  readonly xAxisText: string;
  readonly yAxisText: string;
  readonly handleSelectedBarChartPointsChange: (selectedPoints: string[]) => void;
}

const barChartOptions = (xAxisText: string, yAxisText: string, barChartData: number[], categories: string[], handleSelectedBarChartPointsChange: (selectedPoints: string[]) => void) => ({
  chart: {
    type: 'column',
    backgroundColor: '#FBFCFE',
    borderColor: '#CBD2DC',
    borderRadius: 6,
    borderWidth: 1,
    spacing: [30, 10, 10, 10],
    height: 270,
  },
  title: {
    text: null,
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
        color: '#2C82C9',
      },
      maxPointWidth: 40,
      borderRadius: 6,
    },
    series: {
      allowPointSelect: true,
      point: {
        events: {
          select: function (this: any) {
            const selectedPoints = this.series.chart.getSelectedPoints();
            const selectedDates: string[] = selectedPoints.map(item => item.category);
            handleSelectedBarChartPointsChange(selectedDates);
          },
          unselect: function (this: any) {
            const selectedPoints = this.series.chart.getSelectedPoints();
            const selectedDates: string[] = selectedPoints.map(item => item.category);
            handleSelectedBarChartPointsChange(selectedDates);
          },
        },
      },
    },
  },
  colors: ['#2C82C9'],
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

export const AnomalyBarChart: React.FC<AnomalyBarChartProps> = ({ inputData, xAxisText, yAxisText, handleSelectedBarChartPointsChange }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [barChartData, setBarChartData] = useState<number[]>([]);

  useEffect(() => {
    const chartCategories = inputData.map(item => item.date);
    const chartData = inputData.map(item => item.value);
    setBarChartData(chartData);
    setCategories(chartCategories);
  }, [inputData]);

  return <HighchartsReact highcharts={Highcharts} options={barChartOptions(xAxisText, yAxisText, barChartData, categories, handleSelectedBarChartPointsChange)} />;
};
