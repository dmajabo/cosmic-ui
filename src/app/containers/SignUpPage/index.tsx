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
import { createApiClient } from './apiClient';
import { Redirect } from 'react-router';
import { ROUTE } from 'lib/Routes/model';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

enum PolicyVendor {
  Aws = 'AMAZON_AWS',
  Meraki = 'CISCO_MERAKI',
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
  const [awsRegionsOptions, setAwsRegionsOptions] = useState<Option[]>([]);
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

  const apiClient = createApiClient();

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

  useEffect(() => {
    const getAwsRegions = async () => {
      const responseData = await apiClient.getAwsRegions();
      const awsRegionsOptions: Option[] = responseData.awsRegions.map(item => ({
        label: item.name,
        value: item.code,
      }));
      setAwsRegionsOptions(awsRegionsOptions);
    };
    getAwsRegions();
  }, []);

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
            options={awsRegionsOptions}
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

  const clearAwsForm = () => {
    setAwsUsername('');
    setAwsAccessKey('');
    setAwsSecret('');
    setIsAwsFlowLogEnabled(FlowLogToggle.enabled);
  };

  const clearMerakiForm = () => {
    setMerakiName('');
    setMerakiDescription('');
    setMerakiApiKey('');
    setIsMerakiSysLogEnabled(FlowLogToggle.enabled);
  };

  const onAwsFormSubmit = async () => {
    try {
      const policyResponse = await apiClient.postPolicyController({
        controller: {
          name: PreDefinedEdges.Aws,
          vendor: PolicyVendor.Aws,
          awsPol: {
            username: awsUsername,
            accessKey: awsAccessKey,
            secret: awsSecret,
            regions: awsRegions,
          },
        },
      });
      toast.success('Connected Successfully!');
      if (progress < 100) {
        setProgress(progress + 50);
      } else {
        setIsAppReadyToUse(true);
      }
      setConnectLocation('');
      clearAwsForm();
      setIsFormFilled(false);
    } catch (error) {
      toast.error('Something went wrong. Please try Again!');
    }
  };

  const onMerakiFormSubmit = async () => {
    try {
      const policyResponse = await apiClient.postPolicyController({
        controller: {
          name: PreDefinedEdges.Meraki,
          vendor: PolicyVendor.Meraki,
          merakiPol: {
            apiKey: merakiApiKey,
          },
        },
      });
      toast.success('Connected Successfully!');
      if (progress < 100) {
        setProgress(progress + 50);
      } else {
        setIsAppReadyToUse(true);
      }
      setConnectLocation('');
      clearMerakiForm();
      setIsFormFilled(false);
    } catch (error) {
      toast.error('Something went wrong. Please try Again!');
    }
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
      <ToastContainer />
    </UnAuthLayout>
  );
};

export default SignUpPage;
