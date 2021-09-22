import { Organization } from '../SharedTypes';

export const GetSelectedOrganization = (organizations: Organization[], orgId: string) => {
  if (orgId !== '') {
    //TODO: Remove on addition of delete SLA Test
    if (isNaN(Number(orgId))) {
      //TODO: Remove on addition of delete SLA Test
      const selectedOrganization = organizations.filter(organization => {
        return organization.name === orgId;
      });
      return selectedOrganization[0];
    } else {
      const selectedOrganization = organizations.filter(organization => {
        return organization.extId === orgId;
      });
      return selectedOrganization[0];
    }
  }
  return organizations[0]; //TODO: Remove on addition of delete SLA Test
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
