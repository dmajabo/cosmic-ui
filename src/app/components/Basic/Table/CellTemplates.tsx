import React from 'react';
import { IRouteState } from 'lib/api/ApiModels/Metrics/apiModel';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { successIcon } from 'app/components/SVGIcons/statusIcons';
import { CellSegment, CellStatusValue } from './PrimeTableStyles';
import { CellCheckMarkValue } from 'app/components/Grid/styles';
import { checkMark } from 'app/components/SVGIcons/checkMark';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';

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
};
