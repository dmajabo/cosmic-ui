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
  onLoadDetails: (netName: string, destName: string) => void;
}

const ChartComponent: React.FC<IProps> = (props: IProps) => {
  const [emptyMessage, setEmptyMessage] = React.useState<string>(null);

  React.useEffect(() => {
    if (props.loading && emptyMessage) {
      setEmptyMessage(null);
    }
  }, [props.loading]);

  React.useEffect(() => {
    if (props.data && (!props.data.sankey || !props.data.sankey.nodes || !props.data.sankey.nodes.length || !props.data.sankey.links || !props.data.sankey.links.length)) {
      setEmptyMessage('The data is empty');
    } else {
      setEmptyMessage(null);
    }
  }, [props.data]);
  return (
    <>
      <ChartWrapper height="660px" padding="0">
        {props.loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {props.errorMessage && !props.loading && (
          <ErrorMessage margin="auto" fontSize={18}>
            {props.errorMessage}
          </ErrorMessage>
        )}
        {emptyMessage && (
          <ErrorMessage color="var(--_primaryColor)" fontSize={20} margin="auto">
            {emptyMessage}
          </ErrorMessage>
        )}
        {!emptyMessage && props.data && props.data.sankey && <SankeyChart data={props.data.sankey} onLinkClick={props.onLoadDetails} />}
      </ChartWrapper>
    </>
  );
};

export default React.memo(ChartComponent);
