import React from 'react';
import { ChartItem, ChartTitle } from './styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { IToposvcGetCountResponse } from 'lib/api/ApiModels/Topology/apiModels';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';

interface Props {
  title: string;
  styles?: Object;
  url: string;
  valueColor?: string;
}

const ManagmentItem: React.FC<Props> = (props: Props) => {
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
      setData(0);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      setData(null);
    }
  }, [error]);

  const onTryLoadData = async () => {
    await onGet(props.url, accessToken!);
  };

  return (
    <ChartItem style={props.styles}>
      <ChartTitle>{props.title}</ChartTitle>
      {!error && data !== null ? (
        <>
          <>{data}</>
        </>
      ) : null}
      {loading && (
        <AbsLoaderWrapper width="100%" height="100%" zIndex={10}>
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      {error && <ErrorMessage margin="auto">{error.message || 'Something went wrong'}</ErrorMessage>}
    </ChartItem>
  );
};

export default React.memo(ManagmentItem);
