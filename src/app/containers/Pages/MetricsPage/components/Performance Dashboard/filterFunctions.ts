import { INetworkOrg } from 'lib/api/ApiModels/Topology/apiModels';
import { Organization } from 'lib/api/http/SharedTypes';
import isEmpty from 'lodash/isEmpty';

export const GetSelectedOrganization = (organizations: INetworkOrg[], orgId: string) => {
  const selectedOrganization = organizations.find(organization => organization.extId === orgId);
  return selectedOrganization
    ? selectedOrganization
    : {
        id: '',
        name: '',
        description: '',
        extId: '',
        extType: '',
        extUrl: '',
        ctrlrName: '',
        ctrlrId: '',
        vendorType: '',
        regions: [],
      };
};

export const GetDevicesString = (organization: INetworkOrg, sourceNetworkExtId: string) => {
  if (typeof organization !== 'undefined') {
    const orgDevices = organization.regions.reduce((acc, nextValue) => acc.concat(nextValue.devices), []);

    if (!isEmpty(orgDevices)) {
      return orgDevices
        .filter(device => device.networkId === sourceNetworkExtId)
        .map(device => device.extId)
        .join(',');
    } else {
      return '';
    }
  } else {
    return '';
  }
};
