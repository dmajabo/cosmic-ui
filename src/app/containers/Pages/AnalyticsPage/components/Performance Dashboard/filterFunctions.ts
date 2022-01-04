import { Organization } from 'lib/api/http/SharedTypes';
import isEmpty from 'lodash/isEmpty';

export const GetSelectedOrganization = (organizations: Organization[], orgId: string) => {
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
        vnets: [],
        wedges: [],
        devices: [],
        vendorType: '',
      };
};

export const GetDevicesString = (organization: Organization, sourceNetworkExtId: string) => {
  if (typeof organization !== 'undefined') {
    const orgDevices = organization.devices;

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
