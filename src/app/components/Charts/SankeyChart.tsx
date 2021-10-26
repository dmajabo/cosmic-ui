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
  React.useEffect(() => {
    document.addEventListener('resize', onResize, false);
    return () => {
      document.removeEventListener('resize', onResize);
    };
  }, []);
  React.useEffect(() => {
    createSankeyChart('sankeyChartContainerSvg', props.data);
  }, [props.data]);

  const onResize = () => {
    createSankeyChart('sankeyChartContainerSvg', props.data);
  };
  // return <HighchartsReact highcharts={HighchartsSankey(Highcharts)} options={chartOptions} />;
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg
        id="sankeyChartContainerSvg"
        style={{ backgroundColor: 'var(--_chartBg)' }}
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="none"
      >
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
