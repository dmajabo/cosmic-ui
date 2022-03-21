import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext } from 'react';
import { AwsDashboard } from './Page/AwsDashboard';
import { MerakiDashboard } from './Page/MerakiDashboard';

const DashboardPage: React.FC = () => {
  const userContext = useContext<UserContextState>(UserContext);
  return userContext.vendors.hasOwnProperty(AccountVendorTypes.AMAZON_AWS) ? <AwsDashboard /> : <MerakiDashboard />;
};

export default React.memo(DashboardPage);
