import React from 'react';
import { AnalyticsStyles } from '../AnalyticsStyles';
import Select from 'react-select';
import { SelectOptions } from './MetricsExplorer';

interface DataUnitDropdownProps {
  readonly dataUnit: SelectOptions;
  readonly handleDataUnitChange: (value: SelectOptions) => void;
}

const dataUnitOptions: SelectOptions[] = [
  {
    label: 'bits/s',
    value: 'bits/s',
  },
  {
    label: 'packets/s',
    value: 'packets/s',
  },
  {
    label: 'flows/s',
    value: 'flows/s',
  },
  {
    label: `Unique Src IP's`,
    value: 'unique_src_ip',
  },
  {
    label: `Unique Dest IP's`,
    value: 'unique_dest_ip',
  },
  {
    label: `Unique Src Prefixes`,
    value: 'unique_src_prefixes',
  },
  {
    label: `Unique Dest Prefixes`,
    value: 'unique_dest_prefixes',
  },
];

export const DataUnitDropdown: React.FC<DataUnitDropdownProps> = ({ dataUnit, handleDataUnitChange }) => {
  const classes = AnalyticsStyles();
  return (
    <div className={classes.lookbackContainer}>
      <Select className={classes.lookbackSelect} label="lookup select" value={dataUnit} options={dataUnitOptions} onChange={e => handleDataUnitChange(e)} />
    </div>
  );
};
