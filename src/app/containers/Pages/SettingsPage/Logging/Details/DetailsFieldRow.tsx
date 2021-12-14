import React from 'react';
import { DetailsRow, DetailsCell } from '../../Components/styles';

interface IProps {
  label: string;
  value: string;
  format?: (v: any, param?: any) => string;
  customValue?: React.ReactNode;
  valueCellStyles?: Object;
}

const DetailsFieldRow: React.FC<IProps> = ({ label, value, format, customValue, valueCellStyles }) => {
  return (
    <DetailsRow>
      <DetailsCell width="40%" maxWidth="220px" margin="0 12px 0 0" highLight>
        {label}
      </DetailsCell>
      {!customValue && <DetailsCell style={valueCellStyles}>{format ? format(value) : value}</DetailsCell>}
      {customValue && <DetailsCell style={valueCellStyles}>{customValue}</DetailsCell>}
    </DetailsRow>
  );
};

export default React.memo(DetailsFieldRow);
