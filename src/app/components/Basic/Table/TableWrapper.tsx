import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { TableWrapperStyles } from './styles';
import TableComponent from './TableComponent';
import { ITableColumn } from './model';
import { useGet } from 'lib/api/http/useAxiosHook';

interface Props {
  columns: ITableColumn[];
  url: string;
  param: any;
  responseKey: string;
  tableDataKey: string;
  styles?: Object;
}

const TableWrapper: React.FC<Props> = (props: Props) => {
  const { response, loading, error, onGet } = useGet<any>();
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    getDataAsync(props.url, props.param);
  }, [props.param]);

  React.useEffect(() => {
    if (response !== null && response[props.responseKey] !== undefined) {
      const _d = response[props.responseKey].length ? response[props.responseKey] : null;
      setData(_d);
    }
  }, [response]);

  const getDataAsync = async (url: string, params: any) => {
    if (!url || !params) {
      return;
    }
    await onGet(url, params);
  };

  return (
    <TableWrapperStyles style={props.styles}>
      <TableComponent columns={props.columns} data={data} error={error ? error.message : null} />
      {loading && (
        <AbsLoaderWrapper size={40} width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </TableWrapperStyles>
  );
};

export default React.memo(TableWrapper);
