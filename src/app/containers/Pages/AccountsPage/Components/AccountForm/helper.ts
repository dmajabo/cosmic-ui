import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';

export const getAccountIcon = (_type: AccountVendorTypes) => {
  if (_type === AccountVendorTypes.CISCO_MERAKI) return ciscoMerakiLogoIcon(48);
  if (_type === AccountVendorTypes.AMAZON_AWS) return awsIcon(48);
  return null;
};

export const preparedString = (_type: AccountVendorTypes, isEdit: boolean) => {
  const prefix = isEdit ? 'Manage' : 'Create';
  let _name = '';
  if (_type === AccountVendorTypes.CISCO_MERAKI) {
    _name = 'Cisco Meraki';
  }
  if (_type === AccountVendorTypes.AMAZON_AWS) {
    _name = 'AWS';
  }
  return `${prefix} ${_name} Account`;
};
