import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTitle, FormContent, FormFooter, FormStyles, Header, Wrapper } from './styles';
import TextInputWithRegister from 'app/components/Inputs/TextInput/TextInputWithRegister';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { ACCESS_SECTIONS, AdminFormProfileDataFields, DEFAULT_ACCESS_PERMISION } from '../model';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import PermisionTableRow from './PermisionTableRow';
import { ACCESS_SECTIONS_PERMISION_VALUE, IPermision, IProfile } from 'lib/api/ApiModels/Settings/apiModels';
import { jsonClone } from 'lib/helpers/cloneHelper';

interface IProps {
  dataItem?: IProfile;
  onClose: () => void;
}

const EditProfileFormComponent: React.FC<IProps> = (props: IProps) => {
  const methods = useForm<IProfile>({
    mode: 'onChange',
    defaultValues: {
      name: props.dataItem ? props.dataItem.name : '',
      description: props.dataItem ? props.dataItem.description : '',
      permission:
        props.dataItem && props.dataItem.permission
          ? props.dataItem.permission
          : { dashboard: null, topology: null, network: null, performance_dashboard: null, sessions: null, automation: null, analytics: null, settings: null },
    },
  });
  // const {
  //   register,
  //   setValue,
  //   trigger,
  //   handleSubmit,
  //   formState: { isValid },
  // } = useForm<IProfile>();
  const [selectedSectionValues, setSelectedSectionValues] = React.useState<IPermision>(
    props.dataItem && props.dataItem.permission
      ? props.dataItem.permission
      : { dashboard: null, topology: null, network: null, performance_dashboard: null, sessions: null, automation: null, analytics: null, settings: null },
  );
  const classes = TableStyles();

  const onSubmit = v => {
    console.log(v);
  };

  const onCancel = () => {
    props.onClose();
  };

  const onSelectChange = (v: ACCESS_SECTIONS_PERMISION_VALUE | null, field: ACCESS_SECTIONS) => {
    const _obj: IPermision = jsonClone(selectedSectionValues);
    _obj[field] = v;
    setSelectedSectionValues(_obj);
  };

  return (
    <Wrapper>
      <Header>
        <FormTitle>{props.dataItem ? 'Edit' : 'Create'} Administrator</FormTitle>
        <IconWrapper styles={{ position: 'absolute', top: '20px', right: '20px' }} icon={closeSmallIcon} onClick={props.onClose} />
      </Header>
      <FormProvider {...methods}>
        <FormStyles onSubmit={methods.handleSubmit(onSubmit)}>
          <FormContent>
            <TextInputWithRegister
              id="profile"
              label="Profile Name"
              name={AdminFormProfileDataFields.Name}
              required
              {...methods.register(AdminFormProfileDataFields.Name, { required: true })}
              styles={{ margin: '0 0 20px 0', maxWidth: '450px' }}
            />
            <TextInputWithRegister
              id="description"
              label="Description"
              name={AdminFormProfileDataFields.Description}
              {...methods.register(AdminFormProfileDataFields.Description)}
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
                    <PermisionTableRow
                      onChangeField={onSelectChange}
                      selectedValue={selectedSectionValues[row.section]}
                      key={`permision${index}`}
                      dataItem={row}
                      rowStyles={classes.row}
                      cellStyles={classes.tableCell}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </FormContent>

          <FormFooter>
            <SecondaryButton label="Cancel" onClick={onCancel} />
            <PrimaryButton styles={{ margin: '0 0 0 10px' }} type="submit" onClick={methods.handleSubmit(onSubmit)} label="Save" disabled={!methods.formState.isValid} />
          </FormFooter>
        </FormStyles>
      </FormProvider>
    </Wrapper>
  );
};

export default React.memo(EditProfileFormComponent);
