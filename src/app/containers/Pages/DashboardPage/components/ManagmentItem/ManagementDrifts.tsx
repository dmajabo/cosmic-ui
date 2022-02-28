import React from 'react';
import { ChartContent, ChartItem, ChartTitle, ChartValue, ChartValueLabel } from './styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { IToposvcGetCountResponse } from 'lib/api/ApiModels/Topology/apiModels';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';

interface Props {
  styles?: Object;
}

const ManagementDrifts: React.FC<Props> = (props: Props) => {
  const { accessToken } = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IToposvcGetCountResponse>();
  const [data, setData] = React.useState<number>(null);

  React.useEffect(() => {
    onTryLoadData();
  }, []);

  React.useEffect(() => {
    if (response) {
      setData(response.count);
    } else {
      setData(null);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      setData(null);
    }
  }, [error]);

  const onTryLoadData = async () => {
    await onGet(TopoApi.getConfigDrift(), accessToken!);
  };

  return (
    <ChartItem style={props.styles}>
      <ChartTitle>Config Drifts</ChartTitle>
      {!error && data !== null && (
        <ChartContent>
          <ChartValue color="var(--_orangeColor)">{data}</ChartValue>
          {/* <ChartValueLabel>from last week</ChartValueLabel> */}
        </ChartContent>
      )}
      {!error && data === null && (
        <ChartContent>
          <ChartValue style={{ fontSize: '18px', lineHeight: '20px', margin: 'auto' }} color="var(--_primaryTextColor)">
            No data
          </ChartValue>
        </ChartContent>
      )}
      {loading && (
        <AbsLoaderWrapper width="100%" height="100%" zIndex={10}>
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      {error && <ErrorMessage margin="auto">{error.message || 'Something went wrong'}</ErrorMessage>}
    </ChartItem>
  );
};

export default React.memo(ManagementDrifts);
