import React from 'react';
import { INetworkRouteTable } from 'lib/api/ApiModels/Topology/apiModels';
import RouteTableComponent from './Tables/RouteTableComponent';
import { TablesWrapper } from '../styles';

interface Props {
  dataItem: INetworkRouteTable[];
}
const RoutesPanel: React.FC<Props> = (props: Props) => {
  if (!props.dataItem || !props.dataItem.length) return null;
  return (
    <TablesWrapper>
      {props.dataItem.map(table => (
        <RouteTableComponent key={`routeTable${table.extId}`} dataItem={table} />
      ))}
    </TablesWrapper>
  );
};
export default React.memo(RoutesPanel);
