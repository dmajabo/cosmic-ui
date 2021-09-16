import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ChartActionBlock, ChartTitle, ChartContainerStyles, ChartActionLabel, Chart } from './styles';
import LoadingIndicator from 'app/components/Loading';
interface Props {
  title: string;
  showLoader?: boolean;
  children: React.ReactElement;
  styles?: Object;
}

const ChartWrapper: React.FC<Props> = (props: Props) => {
  return (
    <ChartContainerStyles style={props.styles}>
      <ChartTitle>{props.title}</ChartTitle>
      <ChartActionBlock>
        <ChartActionLabel margin="0 4px 0 0">Open in</ChartActionLabel>
        <ChartActionLabel color="var(--_highlightColor)">Metrics Explorer</ChartActionLabel>
      </ChartActionBlock>
      <Chart>{props.children}</Chart>
      {props.showLoader && (
        <AbsLoaderWrapper size={40} width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </ChartContainerStyles>
  );
};

export default React.memo(ChartWrapper);
