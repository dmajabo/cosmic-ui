import React from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { INetworkRoute, INetworkRouteTable, IToposvcGetRouteTableByExtIdResponse } from 'lib/api/ApiModels/Topology/apiModels';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import * as gridHelper from 'lib/helpers/gridHelper';
import { RouteTableColumns } from '../models';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import * as cellTemplates from 'app/components/Basic/Table/CellTemplates';
import { ActionPart, ActionRowStyles } from 'app/containers/Pages/Shared/styles';
import { GridCount, GridLabel } from 'app/containers/Pages/TrafficPage/SessionPage/Table/styles';
import { PanelTableWrapper } from '../../styles';
interface Props {
  dataItem: INetworkRouteTable;
}
const RouteTableComponent: React.FC<Props> = (props: Props) => {
  const { accessToken } = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IToposvcGetRouteTableByExtIdResponse>();
  const [data, setData] = React.useState<INetworkRouteTable>(null);
  const [columns] = React.useState<IGridColumnField[]>([
    { ...RouteTableColumns.destination, body: (d: INetworkRoute) => (d.destinationCidr ? cellTemplates.cellValueTemplate(d.destinationCidr.name || d.destinationCidr.extId) : null) },
    { ...RouteTableColumns.target },
    { ...RouteTableColumns.status, body: (d: INetworkRoute) => cellTemplates.cellStatusTemplate(d.state) },
    // { ...RouteTableColumns.propagated, body: d => defaultBodyTemplate(d) },
  ]);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);

  React.useEffect(() => {
    getDataAsync();
  }, []);

  React.useEffect(() => {
    if (response && response.routeTable) {
      setData(response.routeTable);
    } else {
      setData(null);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      setData(null);
    }
  }, [error]);

  const onSort = (e: DataTablePFSEvent) => {
    const _sortObject = gridHelper.singelSortHelper(sortObject, e);
    setSortObject(_sortObject);
  };

  const getDataAsync = async () => {
    await onGet(TopoApi.getRouteTableByExtId(props.dataItem.extId), accessToken!);
  };
  return (
    <PanelTableWrapper>
      <ActionRowStyles height="30px" margin="0 0 10px 0" zIndex="unset">
        <ActionPart>
          <GridLabel className="textOverflowEllips" style={{ width: 'auto', maxWidth: 'calc(100% - 12px)' }}>
            {props.dataItem.name || props.dataItem.extId}
          </GridLabel>
          {!props.dataItem.numberOfRoutes ? null : <GridCount>{props.dataItem.numberOfRoutes}</GridCount>}
        </ActionPart>
      </ActionRowStyles>
      <TableWrapper style={{ minHeight: !data || !data.routes || !data.routes.length ? '200px' : 'auto', flexGrow: '0', flexShrink: 0 }}>
        <DataTable
          className="tableSM"
          emptyMessage={!error ? 'No data' : ' '}
          value={data && data.routes ? data.routes : []}
          responsiveLayout="scroll"
          onSort={onSort}
          sortField={sortObject ? sortObject.field : null}
          sortOrder={sortObject ? sortObject.order : null}
          sortMode="single"
        >
          {columns.map(col => {
            if (col.hide) return null;
            return (
              <Column
                key={`route${col.field}${props.dataItem.extId}`}
                style={{ width: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth }}
                field={col.field}
                header={col.label}
                sortable={col.sortable}
                body={col.body || null}
              />
            );
          })}
        </DataTable>
        {loading && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}

        {error && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
            <ErrorMessage margin="auto" fontSize={20}>
              {error ? error.message : 'Something went wrong'}
            </ErrorMessage>
          </AbsLoaderWrapper>
        )}
      </TableWrapper>
    </PanelTableWrapper>
  );
};
export default React.memo(RouteTableComponent);
