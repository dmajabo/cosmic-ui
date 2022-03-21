import directConnectGatewayIcon from 'app/components/SVGIcons/dashboardIcons/directConnectGatewayIcon';
import transitGatewayIcon from 'app/components/SVGIcons/dashboardIcons/transitGatewayIcon';
import React from 'react';
import { AWSManagementItem } from '../components/AwsManagementItem';
import { AWSMap } from '../components/AWSMap';
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

  return (
    <AWSGridContainer>
      <GridItemContainer gridArea="1 / 1 / 2 / 2">
        <DashboardItemContainer>
          <DashboardItemHeaderContainer>
            <DashboardItemHeaderTitle>Transit</DashboardItemHeaderTitle>
            <MarkerCountContainer>
              <MarkerIconContainer>{transitGatewayIcon}</MarkerIconContainer>
              <div>Transit Gateways</div>
              <div className={classes.pillContainer}>
                <span className={classes.pillText}>{0}</span>
              </div>
              <MarkerIconContainer>{directConnectGatewayIcon}</MarkerIconContainer>
              <div>Direct Connect Gateway</div>
              <div className={classes.pillContainer}>
                <span className={classes.pillText}>{0}</span>
              </div>
            </MarkerCountContainer>
          </DashboardItemHeaderContainer>
          <div className={classes.mapContainerMain}>
            <AWSMap features={[]} />
          </div>
        </DashboardItemContainer>
      </GridItemContainer>
      <GridItemContainer gridArea="1 / 2 / 2 / 2">
        <DashboardItemContainer>
          <DashboardItemLabel>Management</DashboardItemLabel>
          <AWSManagementItem />
        </DashboardItemContainer>
      </GridItemContainer>
      <GridItemContainer gridArea="2 / 1 / 2 / 2">
        <DashboardItemContainer>
          <DashboardItemLabel>Segments</DashboardItemLabel>
        </DashboardItemContainer>
      </GridItemContainer>
      <GridItemContainer gridArea="2 / 2 / 2 / 2">
        <DashboardItemContainer>
          <DashboardItemLabel>Investigations</DashboardItemLabel>
        </DashboardItemContainer>
      </GridItemContainer>
    </AWSGridContainer>
  );
};
