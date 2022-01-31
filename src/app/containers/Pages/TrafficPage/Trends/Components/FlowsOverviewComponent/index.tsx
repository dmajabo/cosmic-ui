import React from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { ChartContainer, ChartHeader, ChartLabel, ChartWrapper } from '../../styles';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import { useGet } from 'lib/api/http/useAxiosHook';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { settingIcon } from 'app/components/SVGIcons/settingIcon';

interface Props {
  onOpenPanel: () => void;
}

export const FlowsOverviewComponent: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const { response, loading, error, onGet } = useGet<any>();

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
        {/* {!error && data && data.sankey && <SankeyChart data={data.sankey} onLinkClick={(netName: string, destName: string) => {}} />} */}
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
