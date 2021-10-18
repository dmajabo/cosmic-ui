import React, { useEffect, useState } from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import { SignUpWrapper } from './styles';
import TryDemoComponent from './ArticleComponents/TryDemoComponent';
import { ConnectEdges } from './ArticleComponents/ConnectEdges';
import { EdgeBoxProps } from 'types';
import AwsIcon from './icons/aws.svg';
import MerakiIcon from './icons/meraki.svg';
import { SignUpStyles } from './SignUpStyles';
import { CircularProgressWithLabel } from './ArticleComponents/CircularProgressWithLabel';
import { ConnectSourceForm } from './ArticleComponents/ConnectSourceForm';
import ReactSelect, { components } from 'react-select';
import { CustomRadio } from './ArticleComponents/CustomRadio';
import { isEmpty } from 'lodash';
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
  const classes = SignUpStyles();

  const [awsEnableFlowLog, setAwsEnableFlowLog] = useState<string>('enabled');
  const [awsRegion, setAwsRegion] = useState<string[]>([]);

  useEffect(() => {
    awsEnableFlowLog && !isEmpty(awsRegion) ? setIsFormFilled(true) : setIsFormFilled(false);
  }, [awsRegion, awsEnableFlowLog]);

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
      isConnected: false,
    },
  ];

  const onAwsFormSubmit = () => {
    setProgress(progress + 50);
    setConnectLocation('');
    setIsFormFilled(false);
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
          <div>Connect To Cisco Meraki</div>
        )
      ) : (
        <SignUpWrapper>
          <ConnectEdges edgeBoxArray={edgesToConfigure} />
        </SignUpWrapper>
      )}
    </UnAuthLayout>
  );
};

export default SignUpPage;
