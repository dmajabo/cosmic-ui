import { Organization } from '../SharedTypes';

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

export const GetDevicesString = (organization: Organization) => {
  if (typeof organization !== 'undefined') {
    const orgDevices = organization.devices;

    if (orgDevices.length > 0) {
      const deviceExtIdList = orgDevices.map(device => {
        return device.extId;
      });

      const allDevices = deviceExtIdList.reduce((acc, newValue) => {
        return acc + ',' + newValue;
      });

      return allDevices;
    } else {
      return '';
    }
  } else {
    return '';
  }
};
