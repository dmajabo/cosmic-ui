import React from 'react';
import { useForm } from 'react-hook-form';
import { Wrapper, Header, FormTitle, FormStyles, FormContent, FormFooter, CellContent } from '../../Components/FormStyles/FormStyles';
import TextInputWithRegister from 'app/components/Inputs/TextInput/TextInputWithRegister';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { AdminFormProfileDataFields, DEFAULT_ACCESS_PERMISION } from '../model';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import RadioButton from 'app/components/Inputs/RadioButton';
import { ACCESS_SECTIONS_PERMISION_VALUE, IProfile } from 'lib/api/ApiModels/Settings/apiModels';
import { jsonClone } from 'lib/helpers/cloneHelper';

interface IProps {
  dataItem?: IProfile;
  onClose: () => void;
}

const EditProfileFormComponent: React.FC<IProps> = (props: IProps) => {
  const classes = TableStyles();
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { isValid },
  } = useForm<IProfile>({
    mode: 'onChange',
    defaultValues: {
      name: props.dataItem ? props.dataItem.name : '',
      description: props.dataItem ? props.dataItem.description : '',
      dashboard: props.dataItem ? props.dataItem.dashboard : null,
      topology: props.dataItem ? props.dataItem.topology : null,
      network: props.dataItem ? props.dataItem.network : null,
      performance_dashboard: props.dataItem ? props.dataItem.performance_dashboard : null,
      sessions: props.dataItem ? props.dataItem.sessions : null,
      automation: props.dataItem ? props.dataItem.automation : null,
      analytics: props.dataItem ? props.dataItem.analytics : null,
      settings: props.dataItem ? props.dataItem.settings : null,
    },
  });

  // const {
  //   register,
  //   setValue,
  //   trigger,
  //   handleSubmit,
  //   formState: { isValid },
  // } = useForm<IProfile>();

  const [dataItem, setDataItem] = React.useState<IProfile>({
    name: props.dataItem ? props.dataItem.name : '',
    description: props.dataItem ? props.dataItem.description : '',
    dashboard: props.dataItem ? props.dataItem.dashboard : null,
    topology: props.dataItem ? props.dataItem.topology : null,
    network: props.dataItem ? props.dataItem.network : null,
    performance_dashboard: props.dataItem ? props.dataItem.performance_dashboard : null,
    sessions: props.dataItem ? props.dataItem.sessions : null,
    automation: props.dataItem ? props.dataItem.automation : null,
    analytics: props.dataItem ? props.dataItem.analytics : null,
    settings: props.dataItem ? props.dataItem.settings : null,
  });

  const onSubmit = v => {
    console.log(v);
  };

  const onCancel = () => {
    props.onClose();
  };

  const onSelectChange = (checked: boolean, value: ACCESS_SECTIONS_PERMISION_VALUE, field: AdminFormProfileDataFields) => {
    const _v = checked ? value : null;
    const _obj: IProfile = jsonClone(dataItem);
    _obj[field] = _v;
    setValue(field, _v as never);
    setDataItem(_obj);
    trigger();
  };

  return (
    <Wrapper>
      <Header>
        <FormTitle>{props.dataItem ? 'Edit' : 'Create'} Administrator</FormTitle>
        <IconWrapper styles={{ position: 'absolute', top: '20px', right: '20px' }} icon={closeSmallIcon} onClick={props.onClose} />
      </Header>
      <FormStyles onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <TextInputWithRegister
            id="profile"
            label="Profile Name"
            name={AdminFormProfileDataFields.Name}
            required
            {...register(AdminFormProfileDataFields.Name, { required: true })}
            styles={{ margin: '0 0 20px 0', maxWidth: '450px' }}
          />
          <TextInputWithRegister
            id="description"
            label="Description"
            name={AdminFormProfileDataFields.Description}
            {...register(AdminFormProfileDataFields.Description)}
            area
            styles={{ margin: '0 0 20px 0', maxWidth: '450px' }}
          />
          <TableContainer className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell} />
                  <TableCell style={{ width: 128, textAlign: 'center' }} className={classes.tableHeadCell}>
                    READ-WRITE
                  </TableCell>
                  <TableCell style={{ width: 128, textAlign: 'center' }} className={classes.tableHeadCell}>
                    READ
                  </TableCell>
                  <TableCell style={{ width: 128, textAlign: 'center' }} className={classes.tableHeadCell}>
                    NONE
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DEFAULT_ACCESS_PERMISION.map((row, index) => (
                  <TableRow key={`permisionTable${row.section}`} tabIndex={-1} className={classes.row}>
                    <TableCell align="center" className={classes.tableCell}>
                      {row.label}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <CellContent>
                        <RadioButton
                          checked={dataItem[row.section] === ACCESS_SECTIONS_PERMISION_VALUE.READ_WRITE}
                          onValueChange={(checked: boolean, v: ACCESS_SECTIONS_PERMISION_VALUE) => onSelectChange(checked, v, row.section)}
                          value={ACCESS_SECTIONS_PERMISION_VALUE.READ_WRITE}
                          name={row.section}
                          wrapstyles={{ margin: 'auto' }}
                          type="checkbox"
                          {...register(row.section, { required: true })}
                        />
                      </CellContent>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <CellContent>
                        <RadioButton
                          checked={dataItem[row.section] === ACCESS_SECTIONS_PERMISION_VALUE.READ}
                          onValueChange={(checked: boolean, v: ACCESS_SECTIONS_PERMISION_VALUE) => onSelectChange(checked, v, row.section)}
                          value={ACCESS_SECTIONS_PERMISION_VALUE.READ}
                          name={row.section}
                          wrapstyles={{ margin: 'auto' }}
                          type="checkbox"
                          {...register(row.section, { required: true })}
                        />
                      </CellContent>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <CellContent>
                        <RadioButton
                          checked={dataItem[row.section] === ACCESS_SECTIONS_PERMISION_VALUE.NONE}
                          onValueChange={(checked: boolean, v: ACCESS_SECTIONS_PERMISION_VALUE) => onSelectChange(checked, v, row.section)}
                          value={ACCESS_SECTIONS_PERMISION_VALUE.NONE}
                          name={row.section}
                          wrapstyles={{ margin: 'auto' }}
                          type="checkbox"
                          {...register(row.section, { required: true })}
                        />
                      </CellContent>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </FormContent>

        <FormFooter>
          <SecondaryButton label="Cancel" onClick={onCancel} />
          <PrimaryButton styles={{ margin: '0 0 0 10px' }} type="submit" onClick={handleSubmit(onSubmit)} label="Save" disabled={!isValid} />
        </FormFooter>
      </FormStyles>
    </Wrapper>
  );
};

export default React.memo(EditProfileFormComponent);
