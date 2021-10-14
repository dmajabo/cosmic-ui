import { AccountVendorTypes, IAccountsRes, IAWS_Account, IMeraki_Account } from './apiModel';

export const getPreparedAccountsRes = (res: IAccountsRes) => {
  if (!res || !res.controllers) return [];
  if (!res.controllers.length) return res.controllers;
  return res.controllers.map(it => {
    if (it.vendor === AccountVendorTypes.CISCO_MERAKI) {
      const _item = it as IMeraki_Account;
      if (_item.merakiPol && !_item.merakiPol.flowlogPol) {
        _item.merakiPol.flowlogPol = {
          enableSyslog: false,
        };
        return _item;
      }
      return it;
    }
    if (it.vendor === AccountVendorTypes.AMAZON_AWS) {
      const _item = it as IAWS_Account;
      if (_item.awsPol && !_item.awsPol.flowlogPol) {
        _item.awsPol.flowlogPol = {
          enable: false,
        };
        return _item;
      }
      return it;
    }
    return it;
  });
};
