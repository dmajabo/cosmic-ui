import React from 'react';
import { AdminFormProfileDataFields, IACCESS_SECTIONS_PERMISION } from '../model';
import { TableCell, TableRow } from '@material-ui/core';
import RadioButton from 'app/components/Inputs/RadioButton';
import { CellContent } from './styles';
import { ACCESS_SECTIONS_PERMISION_VALUE } from 'lib/api/ApiModels/Settings/apiModels';
import { useFormContext } from 'react-hook-form';

interface Props {
  dataItem: IACCESS_SECTIONS_PERMISION;
  selectedValue: ACCESS_SECTIONS_PERMISION_VALUE | null;
  rowStyles: any;
  cellStyles: any;
  onChangeField: (v: ACCESS_SECTIONS_PERMISION_VALUE, field: AdminFormProfileDataFields) => void;
}

const PermisionTableRow: React.FC<Props> = React.forwardRef(({ dataItem, selectedValue, rowStyles, cellStyles, onChangeField }, ref) => {
  const { register, setValue, trigger } = useFormContext();

  const onChange = (checked: boolean, value: ACCESS_SECTIONS_PERMISION_VALUE) => {
    const _v = checked ? value : null;
    setValue(dataItem.section, _v);
    onChangeField(_v, dataItem.section);
    trigger();
  };

  return (
    <TableRow tabIndex={-1} className={rowStyles} innerRef={ref}>
      <TableCell align="center" className={cellStyles}>
        {dataItem.label}
      </TableCell>
      <TableCell align="center" className={cellStyles}>
        <CellContent>
          <RadioButton
            {...register(dataItem.section)}
            checked={selectedValue === ACCESS_SECTIONS_PERMISION_VALUE.READ_WRITE}
            onValueChange={onChange}
            value={ACCESS_SECTIONS_PERMISION_VALUE.READ_WRITE}
            name={dataItem.section}
            wrapstyles={{ margin: 'auto' }}
            type="checkbox"
          />
        </CellContent>
      </TableCell>
      <TableCell align="center" className={cellStyles}>
        <CellContent>
          <RadioButton
            {...register(dataItem.section)}
            checked={selectedValue === ACCESS_SECTIONS_PERMISION_VALUE.READ}
            onValueChange={onChange}
            value={ACCESS_SECTIONS_PERMISION_VALUE.READ}
            name={dataItem.section}
            wrapstyles={{ margin: 'auto' }}
            type="checkbox"
          />
        </CellContent>
      </TableCell>
      <TableCell align="center" className={cellStyles}>
        <CellContent>
          <RadioButton
            {...register(dataItem.section)}
            checked={selectedValue === ACCESS_SECTIONS_PERMISION_VALUE.NONE}
            onValueChange={onChange}
            value={ACCESS_SECTIONS_PERMISION_VALUE.NONE}
            name={dataItem.section}
            wrapstyles={{ margin: 'auto' }}
            type="checkbox"
          />
        </CellContent>
      </TableCell>
    </TableRow>
  );
});

export default React.memo(PermisionTableRow);
