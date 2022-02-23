import React from 'react';
import { INetworkSession, INetworkVendorSessionSummary, ITesseractGetStitchedSessionResponse } from 'lib/api/ApiModels/Sessions/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TesseractApi } from 'lib/api/ApiModels/Services/tesseract';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { stitchSessionLogParamBuilder } from 'lib/api/ApiModels/paramBuilders';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { NestedTableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { Column } from 'primereact/column';
import VendorHeader from './VendorHeader';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import * as gridHelper from 'lib/helpers/gridHelper';
import { VendorTableWrapper } from './styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
// import Paging from 'app/components/Basic/Paging';

interface Props {
  dataItem: INetworkVendorSessionSummary;
  columns: IGridColumnField[];
}

const ExpandedTemplate: React.FC<Props> = (props: Props) => {
  const { sessions } = useSessionsDataContext();
  const { accessToken } = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<ITesseractGetStitchedSessionResponse>();
  const [rows, setRows] = React.useState<INetworkSession[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);

  React.useEffect(() => {
    onTryLoadData();
  }, []);

  React.useEffect(() => {
    if (response && response.sessions && response.sessions.vendorSessions && response.sessions.vendorSessions.length) {
      const _arr: INetworkSession[] = response.sessions.vendorSessions.filter(it => it.deviceVendor === props.dataItem.deviceVendor).reduce((data, it) => data.concat(it.session), []);
      console.log(_arr);
      setRows(_arr);
    } else {
      setRows([]);
    }
  }, [response]);

  const onSort = (e: DataTablePFSEvent) => {
    const _sortObject = gridHelper.singelSortHelper(sortObject, e);
    setSortObject(_sortObject);
  };

  const onTryLoadData = async () => {
    const _param = stitchSessionLogParamBuilder({
      size: pageSize,
      time_range: sessions.sessionsPeriod,
      currentPage: currentPage,
      vendor: props.dataItem.deviceVendor,
    });
    await onGet(TesseractApi.getStitchedSessionsById(props.dataItem.sessionId), accessToken!, _param);
  };
  return (
    <VendorTableWrapper>
      <VendorHeader label={props.dataItem.deviceVendor as AccountVendorTypes} />
      <NestedTableWrapper style={{ display: error ? 'flex' : null, height: rows && rows.length ? 'auto' : '300px', minHeight: rows && rows.length ? '100px' : '300px' }}>
        {!error && (
          <DataTable
            className="tableSM"
            emptyMessage={!error ? 'No data' : ' '}
            onSort={onSort}
            sortField={sortObject ? sortObject.field : null}
            sortOrder={sortObject ? sortObject.order : null}
            sortMode="single"
            dataKey="id"
            value={rows}
            responsiveLayout="scroll"
          >
            {props.columns.map(col => {
              if (col.hide) return null;
              return (
                <Column
                  key={col.id}
                  sortable={col.sortable}
                  field={col.field}
                  header={col.label}
                  style={{ width: col.width || null, minWidth: col.minWidth || null, maxWidth: col.maxWidth || null }}
                  body={col.body || null}
                ></Column>
              );
            })}
          </DataTable>
        )}
        {/* {!error && <Paging count={totalCount} disabled={!rows.length} pageSize={pageSize} currentPage={currentPage} onChangePage={onChangeCurrentPage} onChangePageSize={onChangePageSize} />} */}
        {error && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
            <ErrorMessage margin="auto">{error && error.message ? error.message : 'Something went wrong'}</ErrorMessage>
          </AbsLoaderWrapper>
        )}
        {loading && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </NestedTableWrapper>
    </VendorTableWrapper>
  );
};

export default React.memo(ExpandedTemplate);
