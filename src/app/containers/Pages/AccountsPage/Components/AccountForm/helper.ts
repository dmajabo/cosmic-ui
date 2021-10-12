import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { AccountTypes } from '../../models';

export const getAccountIcon = (_type: AccountTypes) => {
  if (_type === AccountTypes.MERRAKI) return ciscoMerakiLogoIcon(48);
  if (_type === AccountTypes.AWS) return awsIcon(48);
  return null;
};
