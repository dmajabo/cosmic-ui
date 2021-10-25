import React, { useEffect, useState } from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import { SignUpWrapper } from './styles';
import TryDemo from './ArticleComponents/TryDemo';
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
import { Redirect, useHistory } from 'react-router';
import { ROUTE } from 'lib/Routes/model';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PolicyController } from './SharedTypes';
import LoadingIndicator from 'app/components/Loading';
import { AddNewEdge } from './ArticleComponents/AddNewEdge';

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

export enum PreDefinedEdges {
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

interface EdgeData {
  readonly edgeName: string;
  readonly name: string;
  readonly accessKey?: string;
  readonly secret?: string;
  readonly apiKey?: string;
  readonly description?: string;
  readonly isLogEnabled: string;
  readonly regions?: string[];
  readonly vendor: string;
}

const SignUpPage: React.FC = () => {
  const [progress, setProgress] = useState<number>(50);
  const [connectLocation, setConnectLocation] = useState<string>('');
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const [isAppReadyToUse, setIsAppReadyToUse] = useState<boolean>(false);
  const [awsRegionsOptions, setAwsRegionsOptions] = useState<Option[]>([]);
  const [policyControllers, setPolicyControllers] = useState<PolicyController[]>([]);
  const [isEdgesConnected, setIsEdgesConnected] = useState<boolean>(false);
  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);
  const [isAddNewEdge, setIsAddNewEdge] = useState<boolean>(false);
  const [newEdgeLocation, setNewEdgeLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newEdgeName, setNewEdgeName] = useState<string>('');
  const [newEdgeDescription, setNewEdgeDescription] = useState<string>('');

  const classes = SignUpStyles();

  const [edgeData, setEdgeData] = useState<EdgeData[]>([]);
  const [edgesToConfigure, setEdgesToConfigure] = useState<EdgeBoxProps[]>([
    {
      img: AwsIcon,
      title: 'AWS',
      edgeName: PreDefinedEdges.Aws,
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onConnect: () => setConnectLocation(PreDefinedEdges.Aws),
      isConnected: edgeData.find(edge => edge.edgeName === PreDefinedEdges.Aws) ? true : false,
      onUpdate: () => {
        setEdgeDataToUpdate(PreDefinedEdges.Aws);
        setIsUpdateForm(true);
        setConnectLocation(PreDefinedEdges.Aws);
      },
    },
    {
      img: MerakiIcon,
      title: 'Cisco Meraki',
      edgeName: PreDefinedEdges.Meraki,
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onConnect: () => setConnectLocation(PreDefinedEdges.Meraki),
      isConnected: edgeData.find(edge => edge.edgeName === PreDefinedEdges.Meraki) ? true : false,
      onUpdate: () => {
        setEdgeDataToUpdate(PreDefinedEdges.Meraki);
        setIsUpdateForm(true);
        setConnectLocation(PreDefinedEdges.Meraki);
      },
    },
  ]);

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

  useEffect(() => {
    const getPolicyControllers = async () => {
      const responseData = await apiClient.getControllerList();
      setPolicyControllers(responseData.controllers);
    };
    getPolicyControllers();
  }, [isFormFilled]);

  useEffect(() => {
    if (!isAppReadyToUse) {
      const isAwsConnected = policyControllers.find(controller => controller.name === PreDefinedEdges.Aws);
      const isMerakiConnected = policyControllers.find(controller => controller.name === PreDefinedEdges.Meraki);
      const isBothConnected = isAwsConnected && isMerakiConnected ? true : false;
      if (isBothConnected) {
        setIsEdgesConnected(true);
      } else {
        setIsLoading(false);
      }
    }
  }, [policyControllers]);

  useEffect(() => {
    if (progress >= 100) {
      setIsAppReadyToUse(true);
    }
  }, [progress]);

  useEffect(() => {
    const addedEdge = edgeData.slice(-1);
    if (!isEmpty(addedEdge)) {
      const isNewEdge = edgesToConfigure.find(edge => edge.edgeName === addedEdge[0].edgeName) ? false : true;
      if (isNewEdge) {
        addedEdge[0].vendor === PolicyVendor.Aws
          ? setEdgesToConfigure(
              edgesToConfigure.concat({
                img: AwsIcon,
                title: newEdgeName,
                edgeName: newEdgeName.toLowerCase().replaceAll(' ', ''),
                content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                onConnect: () => setConnectLocation(PreDefinedEdges.Aws),
                isConnected: edgeData.find(edge => edge.edgeName === newEdgeName.toLowerCase().replaceAll(' ', '')) ? true : false,
                onUpdate: () => {
                  setEdgeDataToUpdate(newEdgeName.toLowerCase().replaceAll(' ', ''));
                  setIsUpdateForm(true);
                  setConnectLocation(PreDefinedEdges.Aws);
                },
              }),
            )
          : setEdgesToConfigure(
              edgesToConfigure.concat({
                img: MerakiIcon,
                title: newEdgeName,
                edgeName: newEdgeName.toLowerCase().replaceAll(' ', ''),
                content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                onConnect: () => setConnectLocation(PreDefinedEdges.Meraki),
                isConnected: edgeData.find(edge => edge.edgeName === newEdgeName.toLowerCase().replaceAll(' ', '')) ? true : false,
                onUpdate: () => {
                  setEdgeDataToUpdate(newEdgeName.toLowerCase().replaceAll(' ', ''));
                  setIsUpdateForm(true);
                  setConnectLocation(PreDefinedEdges.Meraki);
                },
              }),
            );
      } else {
        const filteredEdges = edgesToConfigure.filter(edge => edge.edgeName !== PreDefinedEdges.Aws && edge.edgeName !== PreDefinedEdges.Meraki);
        setEdgesToConfigure([
          {
            img: AwsIcon,
            title: 'AWS',
            edgeName: PreDefinedEdges.Aws,
            content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            onConnect: () => setConnectLocation(PreDefinedEdges.Aws),
            isConnected: edgeData.find(edge => edge.edgeName === PreDefinedEdges.Aws) ? true : false,
            onUpdate: () => {
              setEdgeDataToUpdate(PreDefinedEdges.Aws);
              setIsUpdateForm(true);
              setConnectLocation(PreDefinedEdges.Aws);
            },
          },
          {
            img: MerakiIcon,
            title: 'Cisco Meraki',
            edgeName: PreDefinedEdges.Meraki,
            content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            onConnect: () => setConnectLocation(PreDefinedEdges.Meraki),
            isConnected: edgeData.find(edge => edge.edgeName === PreDefinedEdges.Meraki) ? true : false,
            onUpdate: () => {
              setEdgeDataToUpdate(PreDefinedEdges.Meraki);
              setIsUpdateForm(true);
              setConnectLocation(PreDefinedEdges.Meraki);
            },
          },
          ...filteredEdges,
        ]);
      }
    }
  }, [edgeData]);

  const toggleAwsSecretVisibility = () => setShowAwsSecret(!showAwsSecret);

  const setEdgeDataToUpdate = (edgeName: string) => {
    const selectedEdge = edgeData.find(edge => edge.edgeName === edgeName);
    if (selectedEdge.vendor === PolicyVendor.Aws) {
      setAwsUsername(selectedEdge.name);
      setAwsAccessKey(selectedEdge.accessKey);
      setAwsRegions(selectedEdge.regions);
      setAwsSecret(selectedEdge.secret);
      setIsAwsFlowLogEnabled(selectedEdge.isLogEnabled);
    } else {
      setMerakiName(selectedEdge.name);
      setMerakiApiKey(selectedEdge.apiKey);
      setMerakiDescription(selectedEdge.description);
      setIsMerakiSysLogEnabled(selectedEdge.isLogEnabled);
    }
  };

  const awsSteps: StepData[] = [
    {
      title: `Sign in into your AWS account`,
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
      title: 'Select your region(s)',
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
            value={awsRegions.map(region => awsRegionsOptions.find(option => option.value === region))}
            options={awsRegionsOptions}
            allowSelectAll={true}
            onChange={values => setAwsRegions(values.map(item => item.value))}
          />
        </>
      ),
    },
    {
      title: 'Select options',
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
      title: 'Sign in into your Cisco Meraki account',
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
      title: 'Configure syslogs',
      content: (
        <>
          <div className={classes.radioTitle}>Enable sys logs</div>
          <CustomRadio radioOptions={FlowLog_Options} setRadioValue={setIsMerakiSysLogEnabled} defaultValue={FlowLog_Options[0]} />
        </>
      ),
    },
  ];

  const newAwsEdgeSteps: StepData[] = [
    {
      title: 'Add name and description',
      content: (
        <>
          <span className={classes.dropdownLabel}>NAME</span>
          <input className={classes.formInput} type="text" value={newEdgeName} onChange={e => setNewEdgeName(e.target.value)} />
          <span className={classes.dropdownLabel}>DESCRIPTION</span>
          <textarea className={classes.formTextBox} value={newEdgeDescription} onChange={e => setNewEdgeDescription(e.target.value)} />
        </>
      ),
    },
    ...awsSteps,
  ];

  const newMerakiEdgeSteps: StepData[] = [
    {
      title: 'Add name and description',
      content: (
        <>
          <span className={classes.dropdownLabel}>NAME</span>
          <input className={classes.formInput} type="text" value={newEdgeName} onChange={e => setNewEdgeName(e.target.value)} />
          <span className={classes.dropdownLabel}>DESCRIPTION</span>
          <textarea className={classes.formTextBox} value={newEdgeDescription} onChange={e => setNewEdgeDescription(e.target.value)} />
        </>
      ),
    },
    ...merakiSteps,
  ];

  const clearAwsForm = () => {
    setAwsUsername('');
    setAwsAccessKey('');
    setAwsSecret('');
    setAwsRegions([]);
    setNewEdgeName('');
    setNewEdgeDescription('');
    setIsAwsFlowLogEnabled(FlowLogToggle.enabled);
  };

  const clearMerakiForm = () => {
    setMerakiName('');
    setMerakiDescription('');
    setMerakiApiKey('');
    setNewEdgeName('');
    setNewEdgeDescription('');
    setIsMerakiSysLogEnabled(FlowLogToggle.enabled);
  };

  const onAwsFormSubmit = async (edgeName: string) => {
    setEdgeData(
      edgeData.concat({
        edgeName: edgeName,
        name: awsUsername,
        accessKey: awsAccessKey,
        secret: awsSecret,
        regions: awsRegions,
        isLogEnabled: isAwsFlowLogEnabled,
        vendor: PolicyVendor.Aws,
      }),
    );

    try {
      const policyResponse = await apiClient.postPolicyController({
        controller: {
          name: edgeName,
          vendor: PolicyVendor.Aws,
          awsPol: {
            username: awsUsername,
            accessKey: awsAccessKey,
            secret: awsSecret,
            regions: awsRegions,
            flowlog_pol: {
              enable: isAwsFlowLogEnabled === FlowLogToggle.enabled ? true : false,
            },
          },
        },
      });
      clearAwsForm();
      toast.success('Connected Successfully!');
      if (progress < 100) {
        setProgress(progress + 50);
      }
      setConnectLocation('');
      setNewEdgeLocation('');
      setIsAddNewEdge(false);
      setIsFormFilled(false);
    } catch (error) {
      toast.error('Something went wrong. Please try Again!');
    }
  };

  const onMerakiFormSubmit = async (edgeName: string) => {
    setEdgeData(
      edgeData.concat({
        edgeName: edgeName,
        name: merakiName,
        apiKey: merakiApiKey,
        description: merakiDescription,
        isLogEnabled: isMerakiSysLogEnabled,
        vendor: PolicyVendor.Meraki,
      }),
    );
    try {
      const policyResponse = await apiClient.postPolicyController({
        controller: {
          name: edgeName,
          vendor: PolicyVendor.Meraki,
          merakiPol: {
            apiKey: merakiApiKey,
            flowlog_pol: {
              enable_syslog: isMerakiSysLogEnabled === FlowLogToggle.enabled ? true : false,
            },
          },
        },
      });
      clearMerakiForm();
      toast.success('Connected Successfully!');
      if (progress < 100) {
        setProgress(progress + 50);
      }
      setConnectLocation('');
      setNewEdgeLocation('');
      setIsAddNewEdge(false);
      setIsFormFilled(false);
    } catch (error) {
      toast.error('Something went wrong. Please try Again!');
    }
  };

  const onAwsFormUpdate = async (edgeName: string) => {
    const awsEdge = policyControllers.find(controller => controller.name === edgeName);
    const awsEdgeId = awsEdge?.id || '';
    try {
      const updatedPolicyResponse = await apiClient.updatePolicyController(awsEdgeId, {
        controller: {
          name: edgeName,
          vendor: PolicyVendor.Aws,
          awsPol: {
            username: awsUsername,
            accessKey: awsAccessKey,
            secret: awsSecret,
            regions: awsRegions,
            flowlog_pol: {
              enable: isAwsFlowLogEnabled === FlowLogToggle.enabled ? true : false,
            },
          },
        },
      });
      clearAwsForm();
      toast.success('Updated Successfully!');
      setConnectLocation('');
      setNewEdgeLocation('');
      setIsAddNewEdge(false);
      setIsFormFilled(false);
    } catch (error) {
      toast.error('Something went wrong. Please try Again!');
    }
  };

  const onMerakiFormUpdate = async (edgeName: string) => {
    const merakiEdge = policyControllers.find(controller => controller.name === edgeName);
    const merakiEdgeId = merakiEdge?.id || '';
    try {
      const updatedPolicyResponse = await apiClient.updatePolicyController(merakiEdgeId, {
        controller: {
          name: edgeName,
          vendor: PolicyVendor.Meraki,
          merakiPol: {
            apiKey: merakiApiKey,
            flowlog_pol: {
              enable_syslog: isMerakiSysLogEnabled === FlowLogToggle.enabled ? true : false,
            },
          },
        },
      });
      clearMerakiForm();
      toast.success('Updated Successfully!');
      if (progress < 100) {
        setProgress(progress + 50);
      }
      setConnectLocation('');
      setNewEdgeLocation('');
      setIsAddNewEdge(false);
      setIsFormFilled(false);
    } catch (error) {
      toast.error('Something went wrong. Please try Again!');
    }
  };

  const onAppReadyToUse = () => {
    setIsEdgesConnected(true);
  };

  const onAddNewEdge = () => setIsAddNewEdge(true);

  const onCancelNewEdge = () => setIsAddNewEdge(false);

  const onNewEdgeSelected = (edgeLocation: string) => setNewEdgeLocation(edgeLocation);

  const history = useHistory();
  const onTryDemo = () =>
    history.push({
      pathname: ROUTE.app + ROUTE.dashboard,
      state: {
        isDemoEnviornment: true,
      },
    });

  return isLoading ? (
    <div style={{ marginTop: '50vh' }}>
      <LoadingIndicator />
    </div>
  ) : isEdgesConnected ? (
    <Redirect to={ROUTE.app} />
  ) : (
    <UnAuthLayout article={<TryDemo onTryDemo={onTryDemo} />}>
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
            edgeName={PreDefinedEdges.Aws}
            subtitle="Configure your AWS integration to enable topology maps and annotate your agent data with important cloud context like regions, availability zones, account, VPC IDs, scaling groups and more."
            steps={awsSteps}
            isFormFilled={isFormFilled}
            isUpdateForm={isUpdateForm}
            onFormSubmit={onAwsFormSubmit}
            onFormUpdate={onAwsFormUpdate}
          />
        ) : (
          <ConnectSourceForm
            title="Connect To Cisco Meraki"
            img={MerakiIcon}
            edgeName={PreDefinedEdges.Meraki}
            subtitle="Configure your Cisco Meraki integration to enable topology maps and annotate your agent data with important cloud context like regions, availability zones, account, VPC IDs, scaling groups and more."
            steps={merakiSteps}
            isFormFilled={isFormFilled}
            isUpdateForm={isUpdateForm}
            onFormSubmit={onMerakiFormSubmit}
            onFormUpdate={onMerakiFormUpdate}
          />
        )
      ) : isAddNewEdge ? (
        newEdgeLocation ? (
          newEdgeLocation === PreDefinedEdges.Aws ? (
            <ConnectSourceForm
              title="Connect To AWS"
              img={AwsIcon}
              edgeName={newEdgeName.toLowerCase().replaceAll(' ', '')}
              subtitle="Configure your AWS integration to enable topology maps and annotate your agent data with important cloud context like regions, availability zones, account, VPC IDs, scaling groups and more."
              steps={newAwsEdgeSteps}
              isFormFilled={isFormFilled}
              isUpdateForm={isUpdateForm}
              onFormSubmit={onAwsFormSubmit}
              onFormUpdate={onAwsFormUpdate}
            />
          ) : (
            <ConnectSourceForm
              title="Connect To Cisco Meraki"
              img={MerakiIcon}
              edgeName={newEdgeName.toLowerCase().replaceAll(' ', '')}
              subtitle="Configure your Cisco Meraki integration to enable topology maps and annotate your agent data with important cloud context like regions, availability zones, account, VPC IDs, scaling groups and more."
              steps={newMerakiEdgeSteps}
              isFormFilled={isFormFilled}
              isUpdateForm={isUpdateForm}
              onFormSubmit={onMerakiFormSubmit}
              onFormUpdate={onMerakiFormUpdate}
            />
          )
        ) : (
          <SignUpWrapper>
            <AddNewEdge onNewEdgeSelected={onNewEdgeSelected} onCancelNewEdge={onCancelNewEdge} />
          </SignUpWrapper>
        )
      ) : (
        <SignUpWrapper>
          <ConnectEdges onSkipSetup={onTryDemo} edgeBoxArray={edgesToConfigure} isAppReadyToUse={isAppReadyToUse} onAppReadyToUse={onAppReadyToUse} onAddNewEdge={onAddNewEdge} />
        </SignUpWrapper>
      )}

      <ToastContainer />
    </UnAuthLayout>
  );
};

export default SignUpPage;
