import React from 'react';
import { DetailsRow, DetailsCell } from '../../Components/styles';

interface IProps {
  label: string;
  value: string;
  format?: any;
}

const DetailsFieldRow: React.FC<IProps> = ({ label, value, format }) => {
  return (
    <DetailsRow>
      <DetailsCell width="40%" maxWidth="220px" margin="0 12px 0 0" highLight>
        {label}
      </DetailsCell>
      <DetailsCell>{format ? format(value) : value}</DetailsCell>
    </DetailsRow>
  );
};

export default React.memo(DetailsFieldRow);
