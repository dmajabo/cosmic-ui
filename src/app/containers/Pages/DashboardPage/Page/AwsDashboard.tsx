import transitGatewayIcon from 'app/components/SVGIcons/dashboardIcons/transitGatewayIcon';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { INetworkwEdge, IWEdgesRes } from 'lib/api/ApiModels/Topology/apiModels';
import { useGet } from 'lib/api/http/useAxiosHook';
import { useSessionsActions, SessionsProvider } from 'lib/hooks/Sessions/useSessionsDataContext';
import { TrafficProvider, useTrafficActions } from 'lib/hooks/Traffic/useTrafficDataCont';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useCallback, useContext, useEffect } from 'react';
import { AWSManagementItem } from '../components/AwsManagementItem';
import { AWSMap } from '../components/AWSMap';
import { Feature } from '../components/Map/Map';
import { Segments } from '../components/Segments';
import { DashboardStyles } from '../DashboardStyles';
import {
  AWSGridContainer,
  DashboardItemContainer,
  DashboardItemHeaderContainer,
  DashboardItemHeaderTitle,
  DashboardItemLabel,
  GridItemContainer,
  MarkerCountContainer,
  MarkerIconContainer,
} from '../styles/ChartContainer';

export const AwsDashboard: React.FC = () => {
  const classes = DashboardStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const trafficActions = useTrafficActions();
  const { response, loading, error, onGet } = useGet<IWEdgesRes>();

  useEffect(() => {
    onGet(TopoApi.getWedges(), userContext.accessToken!);
  }, []);

  const convertWedgestoFeatures = useCallback(
    (wedges: INetworkwEdge[] = []): Feature[] =>
      wedges.map(wedge => ({
        type: 'Feature',
        properties: { title: wedge.regionDetail.name, id: wedge.extId || '', ownerId: wedge.ownerId || '', name: wedge.name || '' },
        geometry: { coordinates: [wedge.regionDetail.long, wedge.regionDetail.lat], type: 'Point', name: wedge.regionDetail.id },
      })),
    [response],
  );

  return (
    <TrafficProvider actions={trafficActions}>
      <AWSGridContainer>
        <GridItemContainer gridArea="1 / 1 / 2 / 2">
          <DashboardItemContainer>
            <DashboardItemHeaderContainer>
              <DashboardItemHeaderTitle>Transit</DashboardItemHeaderTitle>
              <MarkerCountContainer>
                <MarkerIconContainer>{transitGatewayIcon}</MarkerIconContainer>
                <div>Transit Gateways</div>
                <div className={classes.pillContainer}>
                  <span className={classes.pillText}>{response?.totalCount || 0}</span>
                </div>
              </MarkerCountContainer>
            </DashboardItemHeaderContainer>
            <div className={classes.mapContainerMain}>
              <AWSMap features={convertWedgestoFeatures(response?.wEdges)} />
            </div>
          </DashboardItemContainer>
        </GridItemContainer>
        <GridItemContainer gridArea="1 / 2 / 2 / 2">
          <DashboardItemContainer>
            <DashboardItemLabel>Management</DashboardItemLabel>
            <AWSManagementItem wedges={response?.wEdges} loading={loading} error={error} />
          </DashboardItemContainer>
        </GridItemContainer>
        <GridItemContainer gridArea="2 / 1 / 2 / 2">
          <DashboardItemContainer>
            <DashboardItemLabel>Segments</DashboardItemLabel>
            <Segments />
          </DashboardItemContainer>
        </GridItemContainer>
        <GridItemContainer gridArea="2 / 2 / 2 / 2">
          <DashboardItemContainer>
            <DashboardItemLabel>Investigations</DashboardItemLabel>
          </DashboardItemContainer>
        </GridItemContainer>
      </AWSGridContainer>
    </TrafficProvider>
  );
};
