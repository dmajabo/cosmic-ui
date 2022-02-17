import React from 'react';
import { IRouteState } from 'lib/api/ApiModels/Metrics/apiModel';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { successIcon } from 'app/components/SVGIcons/statusIcons';
import { CellStatusValue } from './PrimeTableStyles';
import { CellCheckMarkValue } from 'app/components/Grid/styles';
import { checkMark } from 'app/components/SVGIcons/checkMark';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';

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

export { cellValueTemplate, cellStatusTemplate, cellValueFromArrayTemplate, cellClassNameTemplate, cellCheckMarkTemplate, cellCheckboxTemplate, cellValueFromObjectTemplate };
