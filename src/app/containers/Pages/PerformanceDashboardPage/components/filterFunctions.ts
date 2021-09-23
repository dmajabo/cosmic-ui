import { Organization } from '../SharedTypes';

export const GetSelectedOrganization = (organizations: Organization[], orgId: string) => {
  const selectedOrganization = organizations.filter(organization => {
    return organization.extId === orgId;
  });
  return selectedOrganization[0];
};

export const GetDevicesString = (organization: Organization) => {
  if (typeof organization !== 'undefined') {
    const orgDevices = organization.devices;

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
};
