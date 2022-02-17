import React from 'react';
import { PageWrapperStyles } from 'app/containers/Pages/Shared/styles';
import Layer3 from './Layer3';
import Layer7 from './Layer7';
import RoutesTable from './RoutesTable';
import SecurityGroupsTable from './SecurityGroupsTable';
import Header from './Header';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';

interface Props {}

const Inventory: React.FC<Props> = (props: Props) => {
  const { vendors } = React.useContext<UserContextState>(UserContext);

  return (
    <PageWrapperStyles bgColor="var(--_primaryBg)" padding="40px">
      <Header />
      {vendors && vendors[AccountVendorTypes.AMAZON_AWS] && <RoutesTable />}
      {vendors && vendors[AccountVendorTypes.AMAZON_AWS] && <SecurityGroupsTable />}
      {vendors && vendors[AccountVendorTypes.CISCO_MERAKI] && <Layer3 />}
      {vendors && vendors[AccountVendorTypes.CISCO_MERAKI] && <Layer7 />}
    </PageWrapperStyles>
  );
};

export default React.memo(Inventory);
