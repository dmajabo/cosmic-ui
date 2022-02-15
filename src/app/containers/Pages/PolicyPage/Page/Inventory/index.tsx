import React from 'react';
import { PageWithPanelWrapperStyles } from 'app/containers/Pages/Shared/styles';
import Layer3 from './Layer3';
import Layer7 from './Layer7';
import RoutesTable from './RoutesTable';
import SecurityGroupsTable from './SecurityGroupsTable';
import { ContentPanelWrapper } from 'app/components/Basic/PanelBar/styles';
import PanelBar from 'app/components/Basic/PanelBar';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import { usePolicyDataContext } from 'lib/hooks/Policy/usePolicyDataContext';
import { InventoryPanelTypes } from 'lib/hooks/Policy/models';
import RoutesPanel from './Panels/RoutesPanel';
import Header from './Header';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';

interface Props {}

const Inventory: React.FC<Props> = (props: Props) => {
  const { policy } = usePolicyDataContext();
  const { vendors } = React.useContext<UserContextState>(UserContext);

  const onHidePanel = () => {
    policy.onClosePanel();
  };
  return (
    <ContentPanelWrapper>
      <PageWithPanelWrapperStyles width={policy && policy.panel && policy.panel.show ? 'calc(100% - 520px)' : '100%'} bgColor="var(--_primaryBg)" padding="40px">
        <Header />
        {vendors && vendors[AccountVendorTypes.AMAZON_AWS] && <RoutesTable />}
        {vendors && vendors[AccountVendorTypes.AMAZON_AWS] && <SecurityGroupsTable />}
        {vendors && vendors[AccountVendorTypes.CISCO_MERAKI] && <Layer3 />}
        {vendors && vendors[AccountVendorTypes.CISCO_MERAKI] && <Layer7 />}
      </PageWithPanelWrapperStyles>
      <PanelBar
        styles={{ position: 'fixed', top: APP_HEADER_HEIGHT, right: '0', maxHeight: `calc(100% - ${APP_HEADER_HEIGHT})`, zIndex: 11 }}
        maxWidth="520px"
        show={policy && policy.panel && policy.panel.show}
        onHidePanel={onHidePanel}
        type={IPanelBarLayoutTypes.VERTICAL}
      >
        {policy && policy.panel && policy.panel.type === InventoryPanelTypes.Routes && <RoutesPanel />}
      </PanelBar>
    </ContentPanelWrapper>
  );
};

export default React.memo(Inventory);
