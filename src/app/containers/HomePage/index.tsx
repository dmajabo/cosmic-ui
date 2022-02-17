import React from 'react';
import BaseRouting from './BaseRouting';
import LayoutWithHeaderFooterSidebar from 'app/components/LayoutWithHeadeSidebar';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { BreadCrumbProvider, useBreadCrumbActions } from 'lib/hooks/Breadcrumb/useBreadcrumbDataContext';
import LoadingIndicator from 'app/components/Loading';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { GetControllerVendorResponse } from 'lib/api/http/SharedTypes';
import { useGet } from 'lib/api/http/useAxiosHook';

export const HomePage: React.FC = () => {
  const { getIdTokenClaims, getAccessTokenSilently, user } = useAuth0();
  const { response: vendorResponse, onGet: onGetVendors } = useGet<GetControllerVendorResponse>();
  const breadcrumbActions = useBreadCrumbActions();
  const userContext = React.useContext<UserContextState>(UserContext);
  React.useEffect(() => {
    getIdTokenClaims().then(idtoken => {
      userContext.setIdToken(idtoken);
    });
    getAccessTokenSilently().then(accesstoken => {
      userContext.setAccessToken(accesstoken);
      if (!userContext.vendors) {
        onTryLoadVendors(accesstoken);
      }
    });
    userContext.setUser(user);
  }, []);

  React.useEffect(() => {
    if (vendorResponse && vendorResponse.vendors) {
      userContext.setUserVendors(vendorResponse.vendors);
    }
  }, [vendorResponse]);

  const onTryLoadVendors = async _accesstoken => {
    await onGetVendors(PolicyApi.getControllerVendors(), _accesstoken!);
  };
  return userContext.idToken && userContext.accessToken && userContext.vendors !== null ? (
    <BreadCrumbProvider actions={breadcrumbActions}>
      <LayoutWithHeaderFooterSidebar>
        <BaseRouting />
      </LayoutWithHeaderFooterSidebar>
    </BreadCrumbProvider>
  ) : (
    <div style={{ marginTop: '50vh' }}>
      <LoadingIndicator />
    </div>
  );
};
