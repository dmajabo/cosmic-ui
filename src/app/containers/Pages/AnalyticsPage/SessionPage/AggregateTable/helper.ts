import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { IBuckets, ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { IAggregateRow, IGroupedData, IState } from './models';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';
import { IObject } from 'lib/models/general';

export const buildAggregatedData = (data: ISession[], buckets: IBuckets[]): IAggregateRow[] => {
  if (!data || !data.length) return [];
  const _arr: IAggregateRow[] = [];
  data.forEach(sessionItem => {
    const _row: IAggregateRow = buildRow(sessionItem, buckets);
    _arr.push(_row);
  });
  return _arr;
};

const buildRow = (item: ISession, buckets: IBuckets[]): IAggregateRow => {
  const _buckects: IBuckets[] = buckets && buckets.length ? buckets.filter(it => it.key === item.sessionId) : [];
  const _groupData = getGroupedData(_buckects);
  let _vendors: IState[] = _groupData && _groupData.vendors ? Object.keys(_groupData.vendors).map(key => getVendorObject(_groupData.vendors[key])) : [];
  if (!_vendors || !_vendors.length) {
    const _item = getVendorObject(item.deviceVendor);
    _vendors = [_item];
  }
  const _row: IAggregateRow = { session: item, data: _groupData.groupData, vendors: _vendors };
  return _row;
};

const getGroupedData = (data: IBuckets[]) => {
  if (!data || !data.length) return { groupData: null, vendors: null };
  const _obj: IGroupedData = {};
  const _vendors: IObject<AccountVendorTypes> = {};
  data.forEach((bucket, i) => {
    if (!bucket.sessions || !bucket.sessions.length) return;
    bucket.sessions.forEach((session, index) => {
      if (!_obj[session.deviceVendor]) {
        _vendors[session.deviceVendor] = session.deviceVendor;
        const _s = { ...session };
        if (!_s.id) {
          _s.id = `${i}${bucket.key}${session.deviceVendor}${index}`;
        } else {
          _s.id = `${i}${bucket.key}${session.id}${index}`;
        }
        _obj[session.deviceVendor] = [_s];
        return;
      }
      const _s = { ...session };
      if (!_s.id) {
        _s.id = `${i}${bucket.key}${session.deviceVendor}${index}`;
      } else {
        _s.id = `${i}${bucket.key}${session.id}${index}`;
      }
      _obj[session.deviceVendor].push(_s);
    });
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
