import React from 'react';
import { ISankeyData } from 'lib/api/ApiModels/Sessions/apiModel';
// import Highcharts from 'highcharts';
// import HighchartsSankey from 'highcharts/modules/sankey';
// import HighchartsReact from 'highcharts-react-official';
import { createSankeyChart } from './SankeyChartHelper';

interface Props {
  readonly data: ISankeyData;
}

const SankeyChart: React.FC<Props> = (props: Props) => {
  // const chartOptions = {
  //   chart: {
  //     type: 'sankey',
  //   },
  //   title: null,
  //   // tooltip: {
  //   //   valueSuffix: ` ${dataValueSuffix}`,
  //   // },
  //   plotOptions: {
  //     sankey: {
  //       dataLabels: {
  //         enabled: true,
  //       },
  //       colorByPoint: true,
  //     },
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   legend: false,
  //   series: [
  //     {
  //       keys: ['source', 'target', 'value'],
  //       data: _d,
  //       type: 'sankey',
  //     },
  //   ],
  // };
  React.useEffect(() => {
    createSankeyChart('sankeyChartContainer', props.data);
  }, [props.data]);
  // return <HighchartsReact highcharts={HighchartsSankey(Highcharts)} options={chartOptions} />;
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg id="sankeyChartContainer" style={{ backgroundColor: 'var(--_chartBg)' }} width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="sankeyChartContainerRoot">
          <g id="sankeyChartContainerLinks" />
          <g id="sankeyChartContainerNodes" />
        </g>
      </svg>
    </div>
  );
  // ); // <HighchartsReact highcharts={HighchartsSankey(Highcharts)} options={chartOptions} />;
};

export default React.memo(SankeyChart);
