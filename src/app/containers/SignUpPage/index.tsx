import React, { useEffect, useState } from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import { SignUpWrapper } from './styles';
import TryDemoComponent from './ArticleComponents/TryDemoComponent';
import { ConnectEdges } from './ArticleComponents/ConnectEdges';
import { EdgeBoxProps } from 'types';
import AwsIcon from './icons/aws.svg';
import MerakiIcon from './icons/meraki.svg';
import CopyIcon from './icons/copy.svg';
import { SignUpStyles } from './SignUpStyles';
import { CircularProgressWithLabel } from './ArticleComponents/CircularProgressWithLabel';
import { ConnectSourceForm } from './ArticleComponents/ConnectSourceForm';
import ReactSelect, { components } from 'react-select';
import { CustomRadio } from './ArticleComponents/CustomRadio';
import { isEmpty } from 'lodash';

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
  //TODO: use setProgress on connecting AWS and Meraki
  const [connectLocation, setConnectLocation] = useState<string>('');
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const classes = SignUpStyles();

  const [awsEnableFlowLog, setAwsEnableFlowLog] = useState<string>('');
  const [awsLogBucket, setAwsLogBucket] = useState<string>('');
  const [awsRegion, setAwsRegion] = useState<string[]>([]);

  useEffect(() => {
    awsEnableFlowLog && awsLogBucket && !isEmpty(awsRegion) ? setIsFormFilled(true) : setIsFormFilled(false);
  }, [awsRegion, awsEnableFlowLog, awsLogBucket]);

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
      value: 'For all VPCs in the selected region(s)',
      label: 'For all VPCs in the selected region(s)',
    },
    {
      value: 'For selected VPCs in the selected region(s)',
      label: 'For selected VPCs in the selected region(s)',
    },
  ];

  const bucketLogRadioOptions: Options[] = [
    {
      value: 'Every minute (recommended)',
      label: 'Every minute (recommended)',
    },
    {
      value: 'Every 10 minutes (AWS default)',
      label: 'Every 10 minutes (AWS default)',
    },
  ];

  const terraformCommands: string[] = ['terraform init', 'terraform validate', 'terraform plan', 'terraform apply'];

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
          <CustomRadio radioOptions={flowLogRadioOptions} setRadioValue={setAwsEnableFlowLog} />
          <div className={classes.radioTitle}>Write logs to bucket</div>
          <CustomRadio radioOptions={bucketLogRadioOptions} setRadioValue={setAwsLogBucket} />
        </>
      ),
    },
    {
      stepTitle: 'Step 3: Generate Terraform Configuration',
      stepContent: (
        <>
          <div className={classes.stepSubtitleContainer}>
            <span className={classes.stepSubtitleText}>Copy the generated Terraform configuration and save to a file named</span>
            <code className={classes.codeText}>main.tf</code>
            <span className={classes.stepSubtitleText}>in an empty directory</span>
          </div>
          <div className={classes.codeBox}>
            <div className={classes.copyIcon}>
              <img src={CopyIcon} alt="copy" />
            </div>
            <pre className={classes.terraformCodeText}>
              {`
              terraform { 
                required_version = ">= 0.12.0" 
              
              }

              provider "aws" { 
                region = "`}
              <span className={classes.terraformHighlightedCodeText} />
              {`" 
              }

              `}
              <span className={classes.terraformHighlightedCodeText} />
              {`

              module "kentik_aws_integration" {
                source = "github.com/kentik/config-snippets-cloud/cloud_AWS/terraform/module"
                region = "`}
              <span className={classes.terraformHighlightedCodeText} />
              {`"
                rw_s3_access = true
                multiple_buckets = false
                vpc_id_list = `}
              <span className={classes.terraformHighlightedCodeText} />
              {`
                store_logs_more_frequently = `}
              <span className={classes.terraformHighlightedCodeText} />
              {`
                create_role = `}
              <span className={classes.terraformHighlightedCodeText} />
              {`
                external_id = 99701


              }
              `}
            </pre>
          </div>
        </>
      ),
    },
    {
      stepTitle: 'Step 4: Review and Apply Terraform Configuration',
      stepContent: (
        <>
          <div className={classes.stepSubtitleContainer}>
            <span className={classes.stepSubtitleText}>After you've reviewed the configuration in the main.tf file, apply it in the environment where you run Terraform.</span>
          </div>
          {terraformCommands.map(command => (
            <div key={command} className={classes.codeBox}>
              <div className={classes.copyIcon}>
                <img src={CopyIcon} alt="copy" />
              </div>
              <div className={classes.terraformCodeText}>{command}</div>
            </div>
          ))}
        </>
      ),
    },
  ];

  const edgeBoxArray: EdgeBoxProps[] = [
    {
      img: AwsIcon,
      title: 'AWS',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => {
        setConnectLocation(AWS);
      },
      isConnected: !isEmpty(awsRegion) && awsLogBucket && awsEnableFlowLog ? true : false,
    },
    {
      img: MerakiIcon,
      title: 'Cisco Meraki',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => {
        setConnectLocation(MERAKI);
      },
      isConnected: false,
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
  };

  return (
    <UnAuthLayout article={<TryDemoComponent />}>
      <div className={classes.topBar}>
        <div className={classes.topBarText}>Connect To Your Edges</div>
        <div className={classes.topBarflexContainer}>
          <div className={classes.topBarText}>Progress: </div>
          <CircularProgressWithLabel value={progress} />
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
          <ConnectEdges edgeBoxArray={edgeBoxArray} />
        </SignUpWrapper>
      )}
    </UnAuthLayout>
  );
};

export default SignUpPage;
