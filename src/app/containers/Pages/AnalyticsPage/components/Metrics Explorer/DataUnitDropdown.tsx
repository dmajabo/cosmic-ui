import React from 'react';
import { AnalyticsStyles } from '../../AnalyticsStyles';
import Select from 'react-select';

interface DataUnitDropdownProps {
  readonly dataUnit: DataUnitSelectOption;
  readonly handleDataUnitChange: (value: DataUnitSelectOption) => void;
}

export interface DataUnitSelectOption {
  readonly label: DataUnitLabel;
  readonly value: DataUnitValue;
}

export enum DataUnitLabel {
  bits = 'bits/s',
  packets = 'packets/s',
  flows = 'flows/s',
  uniqueSrcIp = `Unique Src IP's`,
  uniqueDstIp = `Unique Dst IP's`,
  uniqueSrcPrefixes = 'Unique Src Prefixes',
  uniqueDstPrefixes = 'Unique Dst Prefixes',
}

export enum DataUnitValue {
  bits = 'bits/s',
  packets = 'packets/s',
  flows = 'flows/s',
  uniqueSrcIp = 'unique_src_ip',
  uniqueDstIp = 'unique_dst_ip',
  uniqueSrcPrefixes = 'unique_src_prefixes',
  uniqueDstPrefixes = 'unique_dst_prefixes',
}

const DATA_UNIT_OPTIONS: DataUnitSelectOption[] = [
  {
    label: DataUnitLabel.bits,
    value: DataUnitValue.bits,
  },
  {
    label: DataUnitLabel.packets,
    value: DataUnitValue.packets,
  },
  {
    label: DataUnitLabel.flows,
    value: DataUnitValue.flows,
  },
  {
    label: DataUnitLabel.uniqueSrcIp,
    value: DataUnitValue.uniqueSrcIp,
  },
  {
    label: DataUnitLabel.uniqueDstIp,
    value: DataUnitValue.uniqueDstIp,
  },
  {
    label: DataUnitLabel.uniqueSrcPrefixes,
    value: DataUnitValue.uniqueSrcPrefixes,
  },
  {
    label: DataUnitLabel.uniqueDstPrefixes,
    value: DataUnitValue.uniqueDstPrefixes,
  },
];

export const DataUnitDropdown: React.FC<DataUnitDropdownProps> = ({ dataUnit, handleDataUnitChange }) => {
  const classes = AnalyticsStyles();
  return (
    <div className={classes.lookbackContainer}>
      <Select className={classes.lookbackSelect} label="lookup select" value={dataUnit} options={DATA_UNIT_OPTIONS} onChange={handleDataUnitChange} />
    </div>
  );
};
