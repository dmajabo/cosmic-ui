import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { IBuckets, INetworkSession } from 'lib/api/ApiModels/Sessions/apiModel';
import { IAggregateRow, IGroupedData, IState } from './models';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';
import { IObject } from 'lib/models/general';
import _ from 'lodash';

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
  const _topLevel: INetworkSession = generateTopLevelSessionItem(bucket);
  const _row: IAggregateRow = { session: _topLevel, data: _groupData.groupData, vendors: _vendors };
  return _row;
};

const generateTopLevelSessionItem = (bucket: IBuckets): INetworkSession => {
  if (!bucket.sessions || !bucket.sessions.length) {
    const _item = _.cloneDeep(bucket.sessions[0]);
    _item.id = bucket.key;
    _item.timestamp = '';
    _item.sessionId = bucket.key;
    return _item;
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
