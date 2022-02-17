import React from 'react';
import { INetworkSecurityGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { TablesWrapper } from '../styles';
import SecurityGroupTableComponent from './Tables/SecurityGroupTableComponent';

interface Props {
  dataItem: INetworkSecurityGroup[];
}
const SecurityGroupsPanel: React.FC<Props> = (props: Props) => {
  if (!props.dataItem || !props.dataItem.length) return null;
  return (
    <TablesWrapper>
      {props.dataItem.map(table => (
        <SecurityGroupTableComponent key={`securityGroupTable${table.extId}`} dataItem={table} />
      ))}
    </TablesWrapper>
  );
};
export default React.memo(SecurityGroupsPanel);
