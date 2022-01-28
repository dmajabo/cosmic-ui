import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { IBuckets, ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { IAggregateRow, IGroupedData, IState } from './models';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';
import { IObject } from 'lib/models/general';

export const buildAggregatedData = (data: IBuckets[]): IAggregateRow[] => {
  if (!data || !data.length) return [];
  const _arr: IAggregateRow[] = [];
  data.forEach(sessionItem => {
    const _row: IAggregateRow = buildRow(sessionItem);
    _arr.push(_row);
  });
  return _arr;
};

const buildRow = (bucket: IBuckets): IAggregateRow => {
  const _groupData = getGroupedData(bucket);
  let _vendors: IState[] = _groupData && _groupData.vendors ? Object.keys(_groupData.vendors).map(key => getVendorObject(_groupData.vendors[key])) : [];
  const _topLevel: ISession = generateTopLevelSessionItem(bucket);
  const _row: IAggregateRow = { session: _topLevel, data: _groupData.groupData, vendors: _vendors };
  return _row;
};

const generateTopLevelSessionItem = (bucket: IBuckets): ISession => {
  if (!bucket.sessions || !bucket.sessions.length) {
    return {
      id: bucket.key,
      timestamp: '',
      sessionId: bucket.key,
      flowId: null,
      sourceIp: null,
      sourcePort: null,
      destIp: null,
      destPort: null,
      natSourceIp: null,
      natSourcePort: null,
      natDestIp: null,
      natDestPort: null,
      stitched: null,
      deviceName: null,
      deviceExtId: null,
      device: null,
      deviceVendor: null,
      bytes: null,
      packets: null,
      action: null,
      tcpFlags: null,
      trafficType: null,
      vnetworkExtId: null,
      vnetworkName: null,
      subnetExtId: null,
      subnetName: null,
      vmExtId: null,
      vmName: null,
      region: null,
      azId: null,
    };
  }
  return { ...bucket.sessions[0] };
};

const getGroupedData = (bucket: IBuckets) => {
  if (!bucket || !bucket.sessions || !bucket.sessions.length) return { groupData: null, vendors: null };
  const _obj: IGroupedData = {};
  const _vendors: IObject<AccountVendorTypes> = {};
  bucket.sessions.forEach((session, index) => {
    if (!_obj[session.deviceVendor]) {
      _vendors[session.deviceVendor] = session.deviceVendor;
      const _s = { ...session };
      if (!_s.id) {
        _s.id = `${bucket.key}${session.deviceVendor}${index}`;
      } else {
        _s.id = `${bucket.key}${session.id}${index}`;
      }
      _obj[session.deviceVendor] = [_s];
      return;
    }
    const _s = { ...session };
    if (!_s.id) {
      _s.id = `${bucket.key}${session.deviceVendor}${index}`;
    } else {
      _s.id = `${bucket.key}${session.id}${index}`;
    }
    _obj[session.deviceVendor].push(_s);
  });
  return { groupData: Object.keys(_obj).length ? _obj : null, vendors: Object.keys(_vendors).length ? _vendors : null };
};

export const getVendorObject = (label: AccountVendorTypes) => {
  if (label === AccountVendorTypes.CISCO_MERAKI) {
    return { icon: ciscoMerakiLogoIcon(28), label: 'Cisco Meraki' };
  }
  if (label === AccountVendorTypes.AMAZON_AWS) {
    return { icon: awsIcon(28), label: 'AWS' };
  }
  if (label === AccountVendorTypes.PALO_ALTO) {
    return { icon: poloAltoIcon(28, 22), label: 'Palo Alto' };
  }
  return { icon: null, label: label };
};
