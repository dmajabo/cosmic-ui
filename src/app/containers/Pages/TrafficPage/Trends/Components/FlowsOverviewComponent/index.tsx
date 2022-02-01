import React from 'react';
// import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from '../../styles';
// import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { useGet } from 'lib/api/http/useAxiosHook';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { settingIcon } from 'app/components/SVGIcons/settingIcon';
import HeatMapChart from 'app/components/Charts/HeatMap/HeatMapChart';

interface Props {
  onOpenPanel: () => void;
}

export const FlowsOverviewComponent: React.FC<Props> = (props: Props) => {
  // const userContext = React.useContext<UserContextState>(UserContext);
  // const { traffic } = useTrafficDataContext();
  const { response, loading, error } = useGet<any>();

  const [xLabels] = React.useState<string[]>(new Array(10).fill(0).map((_, i) => `${i}`));
  const [yLabels] = React.useState<string[]>(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [data] = React.useState<any[][]>(new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))));

  React.useEffect(() => {}, [response]);
  const onOpenPanel = () => {
    props.onOpenPanel();
  };
  return (
    <ChartContainer>
      <ChartHeader>
        <ChartLabel className="textOverflow">Flows Overview</ChartLabel>
        <SecondaryButton styles={{ margin: '0 0 0 auto' }} label="Settings" icon={settingIcon} onClick={onOpenPanel} />
      </ChartHeader>
      <ChartWrapper>
        {!error && data && data.length && <HeatMapChart data={data} xLabels={xLabels} yLabels={yLabels} />}
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {error && <ErrorMessage>{error.message || 'Something went wrong'}</ErrorMessage>}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default React.memo(FlowsOverviewComponent);
