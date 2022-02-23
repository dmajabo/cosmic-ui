import React from 'react';
import RouteTableComponent from './Tables/RouteTableComponent';
import SecurityGroupTableComponent from './Tables/SecurityGroupTableComponent';
import { TablesWrapper } from '../styles';
import { InventoryPanelDataItem, InventoryPanelTypes } from 'lib/hooks/Policy/models';
import { INetworkRouteTable, INetworkSecurityGroup } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  dataItems: InventoryPanelDataItem[];
}
const PanelItemsWrapper: React.FC<Props> = (props: Props) => {
  if (!props.dataItems || !props.dataItems.length) return null;
  return (
    <TablesWrapper>
      {props.dataItems.map((table: InventoryPanelDataItem) => {
        if (table.type === InventoryPanelTypes.Routes) {
          return <RouteTableComponent key={`routeTable${table.dataItem.extId}`} dataItem={table.dataItem as INetworkRouteTable} />;
        }
        if (table.type === InventoryPanelTypes.SecurityGroups) {
          return <SecurityGroupTableComponent key={`securityGroupTable${table.dataItem.extId}`} dataItem={table.dataItem as INetworkSecurityGroup} />;
        }
        return null;
      })}
    </TablesWrapper>
  );
};
export default React.memo(PanelItemsWrapper);
