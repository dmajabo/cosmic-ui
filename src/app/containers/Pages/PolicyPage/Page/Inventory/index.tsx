import React, { useEffect, useState } from 'react';
import { PageWrapperStyles } from 'app/containers/Pages/Shared/styles';
import Layer3 from './Layer3';
import Layer7 from './Layer7';
import RoutesTable from './RoutesTable';
import SecurityGroupsTable from './SecurityGroupsTable';
import Header from './Header';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { IPolicysvcListSegmentPsResponse, ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';

interface Props {}

const Inventory: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { vendors } = React.useContext<UserContextState>(UserContext);
  const { onGet, loading, error, response } = useGet<IPolicysvcListSegmentPsResponse>();
  const [segments, setSegments] = useState<ISegmentSegmentP[]>(null);

  useEffect(() => {
    onGet(PolicyApi.getSegments(), userContext.accessToken!);
  }, []);

  useEffect(() => {
    if (response && response.segments) {
      setSegments(response.segments || []);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      setSegments([]);
    }
  }, [error]);

  return (
    <PageWrapperStyles bgColor="var(--_primaryBg)" padding="40px">
      <Header />
      {loading && !segments ? (
        <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      ) : (
        <>
          {vendors && vendors[AccountVendorTypes.AMAZON_AWS] && <RoutesTable segments={segments} />}
          {vendors && vendors[AccountVendorTypes.AMAZON_AWS] && <SecurityGroupsTable segments={segments} />}
          {vendors && vendors[AccountVendorTypes.CISCO_MERAKI] && <Layer3 />}
          {vendors && vendors[AccountVendorTypes.CISCO_MERAKI] && <Layer7 />}
        </>
      )}
    </PageWrapperStyles>
  );
};

export default React.memo(Inventory);
