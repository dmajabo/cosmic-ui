import React from 'react';
import { useForm } from 'react-hook-form';
import { FormTitle, FormContent, FormFooter, FormStyles, Header, Wrapper } from './styles';
import TextInputWithRegister from 'app/components/Inputs/TextInput/TextInputWithRegister';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import Dropdown from 'app/components/Inputs/Dropdown';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { AdminFormDataFields, PROFILE_VALUES, ACCESS_VALUES } from '../model';
import { IAdminsUser, IProfile } from 'lib/api/ApiModels/Settings/apiModels';

interface IProps {
  dataItem?: IAdminsUser;
  isEdit: boolean;
  onClose: () => void;
}

const EditFormComponent: React.FC<IProps> = (props: IProps) => {
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { isValid },
  } = useForm<IAdminsUser>({
    mode: 'onChange',
    defaultValues: {
      name: props.dataItem ? props.dataItem.name : '',
      description: props.dataItem ? props.dataItem.description : '',
      profile: props.dataItem
        ? props.dataItem.profile
        : { name: '', description: '', permission: { dashboard: null, topology: null, network: null, performance_dashboard: null, sessions: null, automation: null, analytics: null, settings: null } },
      apiAccess: props.dataItem ? props.dataItem.apiAccess : '',
    },
  });

  const [profile, setProfile] = React.useState<IProfile>(
    props.dataItem
      ? props.dataItem.profile
      : { name: '', description: '', permission: { dashboard: null, topology: null, network: null, performance_dashboard: null, sessions: null, automation: null, analytics: null, settings: null } },
  );
  const [apiAccess, setApiAccess] = React.useState<string>(props.dataItem ? props.dataItem.apiAccess : '');

  const hanleProfileChange = v => {
    setValue('profile.name', v as never);
    setProfile(v);
    trigger();
  };

  const hanleAccessChange = v => {
    setValue(AdminFormDataFields.ApiAccess, v as never);
    setApiAccess(v);
    trigger();
  };

  React.useEffect(() => {
    register(AdminFormDataFields.Profile, { required: true });
    register(AdminFormDataFields.ApiAccess, { required: true });
  }, [register]);

  const onSubmit = handleSubmit(v => {
    console.log(v);
  });

  const onCancel = () => {
    props.onClose();
  };
  return (
    <Wrapper>
      <Header>
        <FormTitle>{props.isEdit ? 'Edit' : 'Create'} Administrator</FormTitle>
        <IconWrapper styles={{ position: 'absolute', top: '20px', right: '20px' }} icon={closeSmallIcon} onClick={props.onClose} />
      </Header>
      <FormStyles onSubmit={onSubmit}>
        <FormContent>
          <TextInputWithRegister
            id="userName"
            label="User Name"
            name={AdminFormDataFields.Name}
            required
            {...register(AdminFormDataFields.Name, { required: true })}
            styles={{ margin: '0 0 20px 0', maxWidth: '450px' }}
          />
          <TextInputWithRegister
            id="description"
            label="Description"
            name={AdminFormDataFields.Description}
            {...register(AdminFormDataFields.Description)}
            area
            styles={{ margin: '0 0 20px 0', maxWidth: '450px' }}
          />
          <Dropdown
            className="profile"
            dropWrapStyles={{ flexDirection: 'column', width: '100%', alignItems: 'flex-start', margin: '0 0 20px 0', maxWidth: '450px' }}
            label="Admin profile"
            selectedValue={profile.name}
            values={PROFILE_VALUES}
            onSelectValue={hanleProfileChange}
            required
          />
          <Dropdown
            className="apiAccess"
            dropWrapStyles={{ flexDirection: 'column', width: '100%', alignItems: 'flex-start', maxWidth: '450px' }}
            label="JSON API Access"
            selectedValue={apiAccess}
            values={ACCESS_VALUES}
            onSelectValue={hanleAccessChange}
            required
          />
        </FormContent>

        <FormFooter>
          <SecondaryButton label="Cancel" onClick={onCancel} />
          <PrimaryButton styles={{ margin: '0 0 0 10px' }} type="submit" label="Save" onClick={onSubmit} disabled={!isValid} />
        </FormFooter>
      </FormStyles>
    </Wrapper>
  );
};

export default React.memo(EditFormComponent);
