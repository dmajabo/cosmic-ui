import React from 'react';
import { IRouteState } from 'lib/api/ApiModels/Metrics/apiModel';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { successIcon } from 'app/components/SVGIcons/statusIcons';
import { CellSegment, CellStatusValue, VendorTdWrapper } from './PrimeTableStyles';
import { CellCheckMarkValue } from 'app/components/Grid/styles';
import { checkMark } from 'app/components/SVGIcons/checkMark';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';
import { parseFieldAsDate } from 'lib/helpers/general';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';

const cellValueTemplate = (value: any) => {
  return <>{value}</>;
};

const cellStatusTemplate = (value: any) => {
  return (
    <CellStatusValue color={value === IRouteState.Active ? 'var(--_successColor)' : null}>
      {value === IRouteState.Active && <IconWrapper width="16px" height="16px" icon={successIcon} styles={{ marginRight: ' 10px' }} />}
      <>{value}</>
    </CellStatusValue>
  );
};

const cellValueFromArrayTemplate = (arr: any[], field: string, index: number = 0) => {
  if (!arr || !arr.length) return null;
  return <>{arr[index][field]}</>;
};

const cellValueFromArrayFilledFieldTemplate = (arr: any[], field: string[], index: number = 0) => {
  if (!arr || !arr.length) return null;
  const key = Object.keys(arr[index]).find(key => arr[index][key]);
  if (!key) return <>{arr[index][field[0]]}</>;
  return <>{arr[index][key]}</>;
};

const cellValueSourceNetworkRuleTemplate = (d: INetworkRule) => {
  if (!d) return null;
  if (!d.cidrs || !d.cidrs.length) return <>{d.refSGroup}</>;
  return <>{d.cidrs[0].name}</>;
};

const cellValueFromObjectTemplate = (obj: Object, field: string) => {
  if (!obj) return null;
  return <>{obj[field]}</>;
};

const cellClassNameTemplate = (value: any, className: string) => {
  return <span className={className}>{value}</span>;
};

const cellCheckMarkTemplate = (checked: boolean) => {
  if (checked) return <CellCheckMarkValue>{checkMark}</CellCheckMarkValue>;
  return null;
};

const cellCheckboxTemplate = (isChecked: boolean, onChangeValueCallback: (event: React.ChangeEvent<HTMLInputElement>) => void) => {
  return <SimpleCheckbox wrapStyles={{ width: '20px', margin: '0 auto' }} isChecked={isChecked} toggleCheckboxChange={onChangeValueCallback} />;
};

const celltimeStampTemplate = (value: string) => {
  if (value) return parseFieldAsDate(value, `EEE',' LLL d',' yyyy HH:mm aa`);
  return null;
};

const cellFrom_ToTemplate = (from: any, to: any) => {
  if (!from && !to) return null;
  if (!from && to) return <>{to}</>;
  if (from && !to) return <>{from}</>;
  if (from && to && from === to) return <>{from}</>;
  return (
    <>
      {from} - {to}
    </>
  );
};

const cellSegmentTemplate = (segment: ISegmentSegmentP) => {
  if (!segment) return null;
  return (
    <CellSegment color={segment.color}>
      <span className="color" />
      <span>{segment.name}</span>
    </CellSegment>
  );
};

const cellSessionVendorTemplate = (vendor: string) => {
  if (!vendor) return null;
  const _obj = getVendorObject(vendor as AccountVendorTypes);
  return (
    <VendorTdWrapper>
      {_obj.icon && <IconWrapper customIcon={_obj.icon} width="20px" height="20px" styles={{ margin: '0 8px 0 0' }} />}
      <span>{_obj.label}</span>
    </VendorTdWrapper>
  );
};

const getVendorObject = (label: AccountVendorTypes) => {
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

export {
  cellValueTemplate,
  cellStatusTemplate,
  cellValueFromArrayTemplate,
  cellClassNameTemplate,
  cellCheckMarkTemplate,
  cellCheckboxTemplate,
  cellValueFromObjectTemplate,
  cellFrom_ToTemplate,
  cellSegmentTemplate,
  cellValueFromArrayFilledFieldTemplate,
  cellValueSourceNetworkRuleTemplate,
  celltimeStampTemplate,
  cellSessionVendorTemplate,
  getVendorObject,
};
