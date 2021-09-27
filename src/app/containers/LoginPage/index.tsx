import React from 'react';
import { Form, Submit, Wrapper } from './styles';
import landingBg from 'app/images/landingBg.svg';
import ImgComponent from 'app/components/Basic/ImgComponent';
import { useForm } from 'react-hook-form';
// import { useAuthDataContext } from 'lib/Routes/useAuth';
//import { UserRole } from 'lib/api/ApiModels/Account/account';
import FormTextInput from 'app/components/Inputs/FormTextInput';

interface ILoginForm {
  login: string;
  password: string;
}
enum LoginFieldsEnum {
  login = 'login',
  password = 'password',
}
interface IProps {}

const LoginPage: React.FC<IProps> = (props: IProps) => {
  //const { authData } = useAuthDataContext();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: { login: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false,
  });

  const onChange = (e: any, field: LoginFieldsEnum) => {
    setValue(field, e.target.value as never);
    trigger(field);
  };

  const onSubmit = data => {
    const item: ILoginForm = {
      login: data.login,
      password: data.password,
    };
    if (item.login === 'admin' && item.password === '+') {
      //authData?.onLogin({ token: 'testToken', user: { id: 1, firstName: 'Admin', lastName: 'Administrator', email: 'admin@admin.com', role: UserRole.ADMIN } });
    }
  };

  return (
    <Wrapper>
      <ImgComponent styles={{ position: 'absolute', top: 0, left: 0 }} src={landingBg} alt="Okulis" />

      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="new-password">
        <FormTextInput
          id="login"
          label="Login"
          placeholder="Enter your login (for test user press 'admin')"
          {...register(LoginFieldsEnum.login, { required: true })}
          onChange={e => onChange(e, LoginFieldsEnum.login)}
        >
          {errors.login && errors.login.type === 'required' ? "Login field is required and can't be empty" : null}
        </FormTextInput>
        <FormTextInput
          type="password"
          label="Password"
          placeholder="Enter your password (for test user press '+')"
          {...register(LoginFieldsEnum.password, {
            required: true,
            validate: {
              passLength: value => {
                if (!value) {
                  return true;
                }
                const _v = value as any;
                return _v.trim().length >= 1;
              },
            },
          })}
          onChange={e => onChange(e, LoginFieldsEnum.password)}
        >
          {errors.password && errors.password.type === 'required' ? "Password field is required and can't be empty" : null}
          {errors.password && errors.password.type === 'passLength' ? 'Min length 1' : null}
        </FormTextInput>
        <Submit type="submit">Login</Submit>
      </Form>
    </Wrapper>
  );
};

export default React.memo(LoginPage);
