import React from 'react';
import { Organization } from '../SharedTypes';

export const GetSelectedOrganization = (organizations: Organization[], orgName: string) => {
  const selectedOrganization = organizations.filter(organization => {
    return organization.name === orgName;
  });

  return selectedOrganization[0];
};

export const GetDevicesString = (organization: Organization) => {
  const orgDevices = organization.devices;

  const deviceExtIdList = orgDevices.map(device => {
    return device.extId;
  });

  const allDevices = deviceExtIdList.reduce((acc, newValue) => {
    return acc + ',' + newValue;
  });

  return allDevices;
};
