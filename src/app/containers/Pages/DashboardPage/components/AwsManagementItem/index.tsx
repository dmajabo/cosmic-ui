import { PieDataItem } from 'app/components/Charts/DonutChart';
import { AxiosError } from 'axios';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { INetworkwEdge, IToposvcListRouteTableResponse, IToposvcListSecurityGroupResponse } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useEffect, useMemo } from 'react';
import { GatewayDonutChart } from './GatewayDonutChart';
import { ManagementCount } from './ManagementCount';
import { ManagementItemContainer } from './styles';
interface AwsManagementItemProps {
  readonly wedges: INetworkwEdge[];
  readonly loading: boolean;
  readonly error: AxiosError;
}

export const AWSManagementItem: React.FC<AwsManagementItemProps> = ({ wedges, loading, error }) => {
  const userContext = useContext<UserContextState>(UserContext);
  const { response: routeTableResponse, loading: routeTableLoading, error: routeTableError, onGet: getRouteTable } = useGet<IToposvcListRouteTableResponse>();
  const { response: securityGroupResponse, loading: securityGroupLoading, error: securityGroupError, onGet: getSecurityGroup } = useGet<IToposvcListSecurityGroupResponse>();
  const pieChartData: PieDataItem[] = [{ id: 'Transit Gateways', name: 'Transit Gateways', hide: false, value: wedges?.length || 0, color: '#F69442' }];

  useEffect(() => {
    getRouteTable(TopoApi.getRouteTables(), userContext.accessToken!, { page_size: 0 });
    getSecurityGroup(TopoApi.getSecurityGroups(), userContext.accessToken!, { page_size: 0, vendorType: AccountVendorTypes.AMAZON_AWS });
  }, []);

  const routeTableCount = useMemo(() => routeTableResponse?.totalCount || 0, [routeTableResponse]);
  const securityGroupCount = useMemo(() => securityGroupResponse?.totalCount || 0, [securityGroupResponse]);

  return (
    <ManagementItemContainer>
      <GatewayDonutChart data={pieChartData} loading={loading} error={error} />
      <ManagementCount title="Security Groups" count={routeTableCount} loading={routeTableLoading} error={routeTableError} color="#F9BA55" />
      <ManagementCount title="Routing Tables" count={securityGroupCount} loading={securityGroupLoading} error={securityGroupError} color="#673AB7" />
    </ManagementItemContainer>
  );
};
