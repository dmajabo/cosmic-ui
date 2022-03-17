import React from 'react';
import { GatewayDonutChart } from './GatewayDonutChart';
import { ManagementCount } from './ManagementCount';
import { ManagementItemContainer } from './styles';

export const AWSManagementItem: React.FC = () => {
  return (
    <ManagementItemContainer>
      <GatewayDonutChart />
      <ManagementCount title="Security Groups" count={0} color="#F9BA55" />
      <ManagementCount title="Routing Tables" count={0} color="#673AB7" />
    </ManagementItemContainer>
  );
};
