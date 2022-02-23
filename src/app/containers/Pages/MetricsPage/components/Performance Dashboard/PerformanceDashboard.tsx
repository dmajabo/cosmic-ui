import React, { useContext, useEffect, useState } from 'react';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import { SLATestList } from './SLATestList';
import { CreateSLATestRequest, Device, FinalTableData, Organization, UpdateSLATestRequest, Vnet } from 'lib/api/http/SharedTypes';
import LoadingIndicator from 'app/components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import isEmpty from 'lodash/isEmpty';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { createApiClient } from 'lib/api/http/apiClient';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { GetDevicesString, GetSelectedNetworkName, GetSelectedOrganizationName } from './filterFunctions';
import { CreateSLATest } from './CreateSLATest';
import './Toastify.css';
import { VendorTypes } from 'lib/api/ApiModels/Topology/apiModels';
import { AxiosError } from 'axios';
import { TabName } from '../..';
import noop from 'lodash/noop';

interface PerformanceDashboardProps {
  readonly organizations: Organization[];
  readonly networks: Vnet[];
  readonly devices: Device[];
  readonly orgLoading: boolean;
  readonly orgError: AxiosError;
  readonly selectedTabName: TabName;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ networks, organizations, devices, orgLoading, orgError, selectedTabName }) => {
  const classes = PerformanceDashboardStyles();

  const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient(userContext.accessToken!);
  const [finalTableData, setFinalTableData] = useState<FinalTableData[]>([]);
  const [merakiOrganizations, setMerakiOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(organizations) && selectedTabName === TabName.Performance) {
      const merakiOrganizations = organizations.filter(organization => organization.vendorType === VendorTypes.MERAKI);
      setMerakiOrganizations(merakiOrganizations);
    }
  }, [organizations, selectedTabName]);

  const getSLATests = async () => {
    setIsLoading(true);
    const responseData = await apiClient.getSLATests();
    if (!isEmpty(responseData)) {
      if (Array.isArray(responseData.slaTests) && !isEmpty(responseData.slaTests)) {
        const testData: FinalTableData[] = responseData.slaTests.map(test => {
          const selectedOrganizationName = GetSelectedOrganizationName(merakiOrganizations, test.sourceOrgId);
          const allDevices: string = GetDevicesString(devices, test.sourceNwExtId);
          const selectedNetworkName = GetSelectedNetworkName(networks, test.sourceNwExtId);
          return {
            id: test.testId,
            name: test.name,
            sourceOrg: selectedOrganizationName,
            sourceNetwork: selectedNetworkName,
            sourceDevice: allDevices,
            destination: test.destination,
            interface: test.interface,
            description: test.description,
            averageQoe: {
              packetLoss: test.metrics.avgPacketLoss.value,
              latency: test.metrics.avgLatency.value,
            },
          };
        });
        setFinalTableData(testData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      // setIsError(true);
    }
  };

  useEffect(() => {
    if (!isEmpty(merakiOrganizations)) {
      getSLATests();
    }
  }, [merakiOrganizations]);

  const addSlaTest = async (submitData: CreateSLATestRequest) => {
    const responseData = await apiClient.createSLATest(submitData);
    if (!isEmpty(responseData)) {
      toast.success('Test Added Successfully!');
      getSLATests();
    } else {
      toast.error('Something went wrong. Please try Again!');
    }
  };

  const deleteSlaTest = async (testId: string) => {
    const responseData = await apiClient.deleteSLATest(testId);
    if (isEmpty(responseData)) {
      toast.success('Test Deleted Successfully!');
      getSLATests();
    } else {
      toast.error('Something went wrong. Please try Again!');
    }
  };

  const updateSlaTest = async (submitData: UpdateSLATestRequest) => {
    const responseData = await apiClient.updateSLATest(submitData);
    if (!isEmpty(responseData)) {
      toast.success('Test Updated Successfully!');
      getSLATests();
    } else {
      toast.error('Something went wrong. Please try Again!');
    }
  };

  return (
    <>
      {orgLoading ? (
        <div className={classes.pageCenter}>
          <LoadingIndicator />
        </div>
      ) : orgError ? (
        <AbsLoaderWrapper width="100%" height="100%">
          <ErrorMessage fontSize={28} margin="auto">
            {orgError.message}
          </ErrorMessage>
        </AbsLoaderWrapper>
      ) : isLoading ? (
        <div className={classes.pageCenter}>
          <LoadingIndicator />
        </div>
      ) : /*
         : isError ? (
        // <AbsLoaderWrapper width="100%" height="100%">
        //   <ErrorMessage fontSize={28} margin="auto">
        //     Something went wrong. Please refresh page
        //   </ErrorMessage>
        // </AbsLoaderWrapper>
      )
        
        */
      !isEmpty(merakiOrganizations) && !isEmpty(finalTableData) ? (
        <SLATestList
          updateSlaTest={updateSlaTest}
          deleteSlaTest={deleteSlaTest}
          networks={networks}
          merakiOrganizations={merakiOrganizations}
          finalTableData={finalTableData}
          addSlaTest={addSlaTest}
        />
      ) : (
        <CreateSLATest networks={networks} merakiOrganizations={merakiOrganizations} addSlaTest={addSlaTest} popup={false} closeSlaTest={noop} />
      )}
      <ToastContainer />
    </>
  );
};
