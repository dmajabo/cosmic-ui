import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { IAggregateRow } from './models';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';

export const buildAggregatedData = (data: ISession[]): IAggregateRow[] => {
  if (!data || !data.length) return [];
  const _arr = new Map();
  data.forEach(sessionItem => {
    if (!_arr.has(sessionItem.sessionId)) {
      const _row = buildRow(sessionItem);
      _arr.set(sessionItem.sessionId, _row);
      return;
    }
    const _row = _arr.get(sessionItem.sessionId);
    updateRow(_row, sessionItem);
    _arr.set(sessionItem.sessionId, _row);
  });
  return Array.from(_arr, ([name, value]) => value);
};

const buildRow = (item: ISession): IAggregateRow => {
  const _v = getNestedTableHeader(item.deviceVendor);
  const _row: IAggregateRow = { ...item, data: {}, vendors: [_v] };
  _row.data[item.deviceVendor] = [item];
  return _row;
};

const updateRow = (row: IAggregateRow, item: ISession) => {
  const _v = getNestedTableHeader(item.deviceVendor);
  if (!row.vendors.find(it => it.label === _v.label)) {
    row.vendors.push(_v);
  }
  if (row.data[item.deviceVendor]) {
    row.data[item.deviceVendor].push(item);
    return;
  }
  row.data[item.deviceVendor] = [item];
};

export const getNestedTableHeader = (label: AccountVendorTypes) => {
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
