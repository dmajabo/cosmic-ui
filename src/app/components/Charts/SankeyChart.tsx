import React from 'react';
import { ISankeyData } from 'lib/api/ApiModels/Sessions/apiModel';
import { createSankeyChart } from './SankeyChartHelper';
import { ChartWrapContainer } from './style';
import { prepareSankeyData } from './sankeyDataHelper';
import useResizeAware from 'react-resize-aware';
import { applicationIcon, dedstionationIcon, networksIcon } from '../SVGIcons/sankeyIcons/sankeyIcons';

interface Props {
  readonly data: ISankeyData;
}

const SankeyChart: React.FC<Props> = (props: Props) => {
  const [visibleData, setVisibleData] = React.useState<ISankeyData>(null);
  const [resizeListener, sizes] = useResizeAware();
  // const debouncedChanges = useDebounce(sizes, 300);

  // React.useEffect(() => {
  //   if (debouncedChanges && debouncedChanges.width && debouncedChanges.height) {
  //     updateChart();
  //   }
  // }, [debouncedChanges]);

  React.useEffect(() => {
    const _data: ISankeyData = prepareSankeyData(props.data);
    setVisibleData(_data);
  }, [props.data]);

  React.useEffect(() => {
    if (visibleData && sizes && sizes.width && sizes.height) {
      updateChart();
    }
  }, [visibleData, sizes]);

  const updateChart = () => {
    createSankeyChart('sankeyChartContainerSvg', visibleData);
  };

  return (
    <ChartWrapContainer>
      {resizeListener}
      <svg id="sankeyChartContainerSvg" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        {visibleData && (
          <g id="sankeyHeader" opacity="0">
            <g transform="translate(30, 10)">
              <rect rx="8" ry="8" width="140" height="32" fill="var(--_disabledButtonBg)" />
              <g transform="translate(26, 8)">{dedstionationIcon}</g>
              <text x="50" y="21" fontSize="14" fontWeight="700" fill="var(--_primaryColor)">
                Networks
              </text>
            </g>
            <g transform={`translate(${sizes.width / 2 - 70}, 10)`}>
              <rect rx="8" ry="8" width="140" height="32" fill="var(--_disabledButtonBg)" />
              <g transform="translate(36, 8)">{networksIcon}</g>
              <text x="60" y="21" fontSize="14" fontWeight="700" fill="var(--_primaryColor)">
                TGW
              </text>
            </g>
            <g transform={`translate(${sizes.width - 170}, 10)`}>
              <rect rx="8" ry="8" width="140" height="32" fill="var(--_disabledButtonBg)" />
              <g transform="translate(16, 8)">{applicationIcon}</g>
              <text x="40" y="21" fontSize="14" fontWeight="700" fill="var(--_primaryColor)">
                Applications
              </text>
            </g>
          </g>
        )}
        <g id="sankeyChartContainerRoot" transform="translate(30, 52)">
          <g id="sankeyChartContainerLinks" />
          <g id="sankeyChartContainerNodes" />
        </g>
      </svg>
    </ChartWrapContainer>
  );
};

export default React.memo(SankeyChart);
