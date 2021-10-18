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
import { SubStepComponent } from './ArticleComponents/StepSubTitle';
import { IntlProvider } from 'react-intl';

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
  readonly stepTitle: string;
  readonly stepContent: JSX.Element;
}

export interface Options {
  readonly value: string;
  readonly label: string;
}

const AWS = 'aws';
const MERAKI = 'meraki';

const SignUpPage: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [connectLocation, setConnectLocation] = useState<string>('');
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [startWithOkulis, setStartWithOkulis] = useState<boolean>(false);
  const classes = SignUpStyles();

  const [awsEnableFlowLog, setAwsEnableFlowLog] = useState<string>('enabled');
  const [awsRegion, setAwsRegion] = useState<string[]>([]);

  const [merakiUsername, setMerakiUsername] = useState<string>('');
  const [merakiPassword, setMerakiPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => (awsEnableFlowLog && !isEmpty(awsRegion) ? setIsFormFilled(true) : setIsFormFilled(false)), [awsRegion, awsEnableFlowLog]);

  useEffect(() => (merakiUsername && merakiPassword ? setIsFormFilled(true) : setIsFormFilled(false)), [merakiPassword, merakiUsername]);

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

  const regionOptions: Options[] = [
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

  const flowLogRadioOptions: Options[] = [
    {
      value: 'enabled',
      label: 'enabled',
    },
    {
      value: 'disabled',
      label: 'disabled',
    },
  ];

  const awsSteps: StepData[] = [
    {
      stepTitle: 'Step 1: Select your region(s)',
      stepContent: (
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
            onChange={e => setAwsRegion(e.map(item => item.value))}
          />
        </>
      ),
    },
    {
      stepTitle: 'Step 2: Select options',
      stepContent: (
        <>
          <div className={classes.radioTitle}>Enable flow logs</div>
          <CustomRadio radioOptions={flowLogRadioOptions} setRadioValue={setAwsEnableFlowLog} defaultValue={flowLogRadioOptions[0]} />
        </>
      ),
    },
  ];

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const merakiSteps: StepData[] = [
    {
      stepTitle: 'Step 1: Sign in into your Cisco Meraki account',
      stepContent: (
        <>
          <span className={classes.dropdownLabel}>EMAIL</span>
          <input className={classes.formInput} type="text" value={merakiUsername} onChange={e => setMerakiUsername(e.target.value)} />
          <span className={classes.dropdownLabel}>PASSWORD</span>
          <input className={classes.formInput} type={showPassword ? 'text' : 'password'} value={merakiPassword} onChange={e => setMerakiPassword(e.target.value)} />
          <div className={classes.showPassword} onClick={togglePasswordVisibility}>
            <img className={classes.showPasswordIcon} src={EyeIcon} alt="show password" />
          </div>
        </>
      ),
    },
    {
      stepTitle: 'Step 2: Configure syslogs',
      stepContent: (
        <>
          <SubStepComponent subStepCount={2.1}>
            Open the <b className={classes.bold}>syslog servers</b> in your Cisco Meraki account <span className={classes.focusText}>Network-wide/General/Reporting</span>
          </SubStepComponent>
          <SubStepComponent subStepCount={2.2}>
            Click on <b className={classes.bold}>Add a syslog server</b> button
          </SubStepComponent>
          <SubStepComponent subStepCount={2.3}>
            Add this ID <span className={classes.focusText}>192.164.2.14</span> to<b className={classes.bold}> Server IP</b> column
          </SubStepComponent>
          <SubStepComponent subStepCount={2.4}>
            Add this port number <span className={classes.focusText}>340</span> to <b className={classes.bold}>Port</b> column
          </SubStepComponent>
          <SubStepComponent subStepCount={2.5}>
            Add roles to <b className={classes.bold}>Roles</b> column
          </SubStepComponent>
        </>
      ),
    },
    {
      stepTitle: 'Step 3: Configure NetFlow',
      stepContent: (
        <>
          <SubStepComponent subStepCount={3.1}>
            Open the <b className={classes.bold}>Reporting</b> in your Cisco Meraki account <span className={classes.focusText}>Network-wide/General/Reporting</span>
          </SubStepComponent>
          <SubStepComponent subStepCount={3.2}>
            Select <span className={classes.focusText}>Enable: send netflow traffic statistics</span> option in <b className={classes.bold}>NetFlow traffic reporting</b> input
          </SubStepComponent>
          <SubStepComponent subStepCount={3.3}>
            Add this IP <span className={classes.focusText}>208.145.12.323</span> to the <b className={classes.bold}>NetFlow collector IP</b> input
          </SubStepComponent>
          <SubStepComponent subStepCount={3.4}>
            Add this port <span className={classes.focusText}>30020</span> to the <b className={classes.bold}>NetFlow collector port</b> input
          </SubStepComponent>
        </>
      ),
    },
  ];

  const edgesToConfigure: EdgeBoxProps[] = [
    {
      img: AwsIcon,
      title: 'AWS',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => setConnectLocation(AWS),
      isConnected: !isEmpty(awsRegion) && awsEnableFlowLog ? true : false,
    },
    {
      img: MerakiIcon,
      title: 'Cisco Meraki',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => setConnectLocation(MERAKI),
      isConnected: merakiUsername && merakiPassword ? true : false,
    },
  ];

  const onAwsFormSubmit = () => {
    setProgress(progress + 50);
    setConnectLocation(MERAKI);
    setIsFormFilled(false);
  };

  const onMerakiFormSubmit = () => {
    setProgress(progress + 50);
    setConnectLocation('');
    setIsFormFilled(false);
    setStartWithOkulis(true);
  };

  const onStartWithOkulis = () => {
    //TODO: Add Operation for on start with Okulis
  };

  return (
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
        connectLocation === AWS ? (
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
          <ConnectEdges edgeBoxArray={edgesToConfigure} startWithOkulis={startWithOkulis} onStartWithOkulis={onStartWithOkulis} />
        </SignUpWrapper>
      )}
    </UnAuthLayout>
  );
};

export default SignUpPage;
