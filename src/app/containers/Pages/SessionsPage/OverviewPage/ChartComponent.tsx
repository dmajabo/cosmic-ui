import React from 'react';
import { ChartWrapper } from '../../Shared/styles';
import SankeyChart from 'app/components/Charts/SankeyChart';
import { ISankeyRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
interface IProps {
  data: ISankeyRes;
  loading: boolean;
  errorMessage: string;
}

const ChartComponent: React.FC<IProps> = ({ loading, errorMessage, data }) => {
  const [emptyMessage, setEmptyMessage] = React.useState<string>(null);

  React.useEffect(() => {
    if (loading && emptyMessage) {
      setEmptyMessage(null);
    }
  }, [loading]);

  React.useEffect(() => {
    if (data && (!data.sankey || !data.sankey.nodes || !data.sankey.nodes.length || !data.sankey.links || !data.sankey.links.length)) {
      setEmptyMessage('The data is empty');
    } else {
      setEmptyMessage(null);
    }
  }, [data]);
  return (
    <>
      <ChartWrapper height="660px" padding="0">
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {errorMessage && !loading && (
          <ErrorMessage margin="auto" fontSize={18}>
            {errorMessage}
          </ErrorMessage>
        )}
        {emptyMessage && (
          <ErrorMessage color="var(--_primaryColor)" fontSize={20} margin="auto">
            {emptyMessage}
          </ErrorMessage>
        )}
        {!emptyMessage && data && data.sankey && <SankeyChart data={data.sankey} />}
      </ChartWrapper>
    </>
  );
};

export default React.memo(ChartComponent);
