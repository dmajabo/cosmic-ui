import React, { useEffect, useState } from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import { SignUpWrapper } from './styles';
import TryDemoComponent from './ArticleComponents/TryDemoComponent';
import { ConnectEdges } from './ArticleComponents/ConnectEdges';
import { EdgeBoxProps } from 'types';
import AwsIcon from './icons/aws.svg';
import MerakiIcon from './icons/meraki.svg';
import EyeIcon from './icons/eye.svg';
import { SignUpStyles } from './SignUpStyles';
import { CircularProgressWithLabel } from './ArticleComponents/CircularProgressWithLabel';
import { ConnectSourceForm } from './ArticleComponents/ConnectSourceForm';
import ReactSelect, { components } from 'react-select';
import { CustomRadio } from './ArticleComponents/CustomRadio';
import { isEmpty } from 'lodash';
import { IntlProvider } from 'react-intl';
import { Redirect } from 'react-router';
import { ROUTE } from 'lib/Routes/model';

const Option = props => {
  const classes = SignUpStyles();
  return (
    <div>
      <components.Option {...props}>
        <input className={classes.checkbox} type="checkbox" checked={props.isSelected} onChange={() => null} /> <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export interface StepData {
  readonly title: string;
  readonly content: JSX.Element;
}

export interface Option {
  readonly value: string;
  readonly label: string;
}

enum PreDefinedEdges {
  Aws = 'aws',
  Meraki = 'meraki',
}

enum FlowLogToggle {
  enabled = 'enabled',
  disabled = 'disabled',
}

const FlowLog_Options: Option[] = [
  {
    value: FlowLogToggle.enabled,
    label: 'Yes',
  },
  {
    value: FlowLogToggle.disabled,
    label: 'No',
  },
];

const SignUpPage: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [connectLocation, setConnectLocation] = useState<string>('');
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [isAppReadyToUSe, setIsAppReadyToUse] = useState<boolean>(false);
  const [isEdgesConnected, setIsEdgesConnected] = useState<boolean>(false);
  const classes = SignUpStyles();

  const [awsUsername, setAwsUsername] = useState<string>('');
  const [awsAccessKey, setAwsAccessKey] = useState<string>('');
  const [awsSecret, setAwsSecret] = useState<string>('');
  const [isAwsFlowLogEnabled, setIsAwsFlowLogEnabled] = useState<string>(FlowLogToggle.enabled);
  const [awsRegions, setAwsRegions] = useState<string[]>([]);
  const [showAwsSecret, setShowAwsSecret] = useState<boolean>(false);

  const [merakiName, setMerakiName] = useState<string>('');
  const [merakiDescription, setMerakiDescription] = useState<string>('');
  const [merakiApiKey, setMerakiApiKey] = useState<string>('');
  const [isMerakiSysLogEnabled, setIsMerakiSysLogEnabled] = useState<string>(FlowLogToggle.enabled);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const isFormFilled = awsUsername && awsAccessKey && awsSecret && isAwsFlowLogEnabled && !isEmpty(awsRegions) ? true : false;
    setIsFormFilled(isFormFilled);
  }, [awsRegions, awsUsername, awsAccessKey, awsSecret, isAwsFlowLogEnabled]);

  useEffect(() => {
    const isFormFilled = merakiName && merakiDescription && merakiApiKey && isMerakiSysLogEnabled ? true : false;
    setIsFormFilled(isFormFilled);
  }, [merakiName, merakiDescription, merakiApiKey, isMerakiSysLogEnabled]);

  const dropdownStyle = {
    option: provided => ({
      ...provided,
      padding: 20,
      color: 'black',
    }),
    control: provided => ({
      ...provided,
      height: 60,
      width: 500,
      marginTop: 5,
    }),
  };

  const regionOptions: Option[] = [
    {
      label: 'USA WEST (Oregon)',
      value: 'USA WEST (Oregon)',
    },
    {
      label: 'US West (N. California)',
      value: 'US West (N. California)',
    },
    {
      label: 'US East (Ohio)',
      value: 'US East (Ohio)',
    },
    {
      label: 'US East (N. Virginia)',
      value: 'US East (N. Virginia)',
    },

    {
      label: 'Asia Pacific (Mumbai)',
      value: 'Asia Pacific (Mumbai)',
    },
  ];

  const toggleAwsSecretVisibility = () => setShowAwsSecret(!showAwsSecret);

  const awsSteps: StepData[] = [
    {
      title: 'Step 1: Sign in into your AWS account',
      content: (
        <>
          <span className={classes.dropdownLabel}>USERNAME</span>
          <input className={classes.formInput} type="text" value={awsUsername} onChange={e => setAwsUsername(e.target.value)} />
          <span className={classes.dropdownLabel}>ACCESS KEY</span>
          <input className={classes.formInput} type="text" value={awsAccessKey} onChange={e => setAwsAccessKey(e.target.value)} />
          <span className={classes.dropdownLabel}>SECRET</span>
          <input className={classes.formInput} type={showAwsSecret ? 'text' : 'password'} value={awsSecret} onChange={e => setAwsSecret(e.target.value)} />
          <div className={classes.showPassword} onClick={toggleAwsSecretVisibility}>
            <img className={classes.showPasswordIcon} src={EyeIcon} alt="show password" />
          </div>
        </>
      ),
    },
    {
      title: 'Step 2: Select your region(s)',
      content: (
        <>
          <div className={classes.dropdownLabel}>REGION</div>
          <ReactSelect
            isMulti
            components={{
              Option,
            }}
            menuPortalTarget={document.body}
            styles={dropdownStyle}
            options={regionOptions}
            allowSelectAll={true}
            onChange={values => setAwsRegions(values.map(item => item.value))}
          />
        </>
      ),
    },
    {
      title: 'Step 3: Select options',
      content: (
        <>
          <div className={classes.radioTitle}>Enable flow logs</div>
          <CustomRadio radioOptions={FlowLog_Options} setRadioValue={setIsAwsFlowLogEnabled} defaultValue={FlowLog_Options[0]} />
        </>
      ),
    },
  ];

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const merakiSteps: StepData[] = [
    {
      title: 'Step 1: Sign in into your Cisco Meraki account',
      content: (
        <>
          <span className={classes.dropdownLabel}>NAME</span>
          <input className={classes.formInput} type="text" value={merakiName} onChange={e => setMerakiName(e.target.value)} />
          <span className={classes.dropdownLabel}>DESCRIPTION</span>
          <input className={classes.formInput} type="text" value={merakiDescription} onChange={e => setMerakiDescription(e.target.value)} />
          <span className={classes.dropdownLabel}>API KEY</span>
          <input className={classes.formInput} type={showPassword ? 'text' : 'password'} value={merakiApiKey} onChange={e => setMerakiApiKey(e.target.value)} />
          <div className={classes.showPassword} onClick={togglePasswordVisibility}>
            <img className={classes.showPasswordIcon} src={EyeIcon} alt="show password" />
          </div>
        </>
      ),
    },
    {
      title: 'Step 2: Configure syslogs',
      content: (
        <>
          <div className={classes.radioTitle}>Enable sys logs</div>
          <CustomRadio radioOptions={FlowLog_Options} setRadioValue={setIsMerakiSysLogEnabled} defaultValue={FlowLog_Options[0]} />
        </>
      ),
    },
  ];

  const edgesToConfigure: EdgeBoxProps[] = [
    {
      img: AwsIcon,
      title: 'AWS',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => setConnectLocation(PreDefinedEdges.Aws),
      isConnected: !isEmpty(awsRegions) && awsUsername && awsAccessKey && awsSecret && isAwsFlowLogEnabled ? true : false,
    },
    {
      img: MerakiIcon,
      title: 'Cisco Meraki',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => setConnectLocation(PreDefinedEdges.Meraki),
      isConnected: merakiName && merakiDescription && merakiApiKey ? true : false,
    },
  ];

  const onAwsFormSubmit = () => {
    setProgress(progress + 50);
    setConnectLocation('');
    setIsFormFilled(false);
  };

  const onMerakiFormSubmit = () => {
    setProgress(progress + 50);
    setConnectLocation('');
    setIsFormFilled(false);
    setIsAppReadyToUse(true);
  };

  const onAppReadyToUse = () => {
    setIsEdgesConnected(true);
    //TODO: Add Operation for on start with Okulis
  };

  return isEdgesConnected ? (
    <Redirect to={ROUTE.app} />
  ) : (
    <UnAuthLayout article={<TryDemoComponent />}>
      <div className={classes.topBar}>
        <div className={classes.topBarText}>Connect To Your Edges</div>
        <div className={classes.topBarflexContainer}>
          <div className={classes.topBarText}>Progress: </div>
          <IntlProvider locale="en">
            <CircularProgressWithLabel value={progress} />
          </IntlProvider>
        </div>
      </div>
      {connectLocation ? (
        connectLocation === PreDefinedEdges.Aws ? (
          <ConnectSourceForm
            title="Connect To AWS"
            img={AwsIcon}
            subtitle="Configure your AWS integration to enable topology maps and annotate your agent data with important cloud context like regions, availability zones, account, VPC IDs, scaling groups and more."
            steps={awsSteps}
            isFormFilled={isFormFilled}
            onFormSubmit={onAwsFormSubmit}
          />
        ) : (
          <ConnectSourceForm
            title="Connect To Cisco Meraki"
            img={MerakiIcon}
            subtitle="Configure your Cisco Meraki integration to enable topology maps and annotate your agent data with important cloud context like regions, availability zones, account, VPC IDs, scaling groups and more."
            steps={merakiSteps}
            isFormFilled={isFormFilled}
            onFormSubmit={onMerakiFormSubmit}
          />
        )
      ) : (
        <SignUpWrapper>
          <ConnectEdges edgeBoxArray={edgesToConfigure} isAppReadyToUse={isAppReadyToUSe} onAppReadyToUse={onAppReadyToUse} />
        </SignUpWrapper>
      )}
    </UnAuthLayout>
  );
};

export default SignUpPage;
