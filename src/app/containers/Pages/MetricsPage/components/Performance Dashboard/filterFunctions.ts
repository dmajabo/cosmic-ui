import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { Device, Organization, Vnet } from 'lib/api/http/SharedTypes';
import isEmpty from 'lodash/isEmpty';
import { MetricKeyValue } from './PacketLoss';

export const GetSelectedOrganizationName = (organizations: Organization[], orgId: string) => {
  const selectedOrganization = organizations.find(organization => organization.extId === orgId);
  return selectedOrganization?.name || orgId;
};

export const GetSelectedNetworkName = (networks: Vnet[], networkId: string) => {
  const selectedNetwork = networks.find(network => network.extId === networkId);
  return selectedNetwork?.name || networkId;
};

export const GetDevicesString = (devices: Device[], sourceNetworkExtId: string) => {
  if (!isEmpty(devices)) {
    return devices
      .filter(device => device.networkId === sourceNetworkExtId)
      .map(device => device.extId)
      .join(',');
  } else {
    return '';
  }
};

export const getTestSegments = (devices: Device[], sourceNetworkExtId: string, sites: ISegmentSegmentP[]) => {
  if (isEmpty(devices)) {
    return [];
  } else {
    const deviceSegmentIds = devices.filter(device => device.networkId === sourceNetworkExtId).map(device => device.segmentId);
    return sites.filter(site => deviceSegmentIds.includes(site.id));
  }
};

export const getNetworkTags = (sourceNetworkExtId: string, networks: Vnet[]) => networks.find(network => network.extId === sourceNetworkExtId)?.tags || [];

export const checkforNoData = (metricsObject: MetricKeyValue) => Object.keys(metricsObject).every(key => isEmpty(metricsObject[key]));
