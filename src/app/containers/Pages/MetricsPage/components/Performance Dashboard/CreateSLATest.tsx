import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';
import Select from 'react-select';
import { CreateSLATestRequest, Organization, SLATest, UpdateSLATestRequest, Vnet } from 'lib/api/http/SharedTypes';
import CreatableSelect from 'react-select/creatable';
import isEmpty from 'lodash/isEmpty';
import CloseIcon from '../../icons/performance dashboard/close';

interface CreateSLATestProps {
  readonly addSlaTest?: Function;
  readonly merakiOrganizations: Organization[];
  readonly networks: Vnet[];
  readonly popup?: boolean;
  readonly closeSlaTest?: Function;
  readonly isUpdateTest?: boolean;
  readonly slaTestDataToUpdate?: SLATest;
  readonly updateSlaTest?: (submitData: UpdateSLATestRequest) => void;
}

interface SelectOptions {
  readonly value: string;
  readonly label: string;
}

enum TestOperation {
  Update = 'Update',
  Create = 'Create',
}

export const CreateSLATest: React.FC<CreateSLATestProps> = ({ slaTestDataToUpdate, updateSlaTest, networks, merakiOrganizations, addSlaTest, closeSlaTest, popup }) => {
  const classes = PerformanceDashboardStyles();

  const [name, setName] = useState<string>('');
  const [sourceOrg, setSourceOrg] = useState<SelectOptions>({
    label: '',
    value: '',
  });
  const [sourceNetwork, setSourceNetwork] = useState<SelectOptions>({
    label: '',
    value: '',
  });
  const [destination, setDestination] = useState<SelectOptions>({
    label: '',
    value: '',
  });
  const [description, setDescription] = useState<string>('');

  const [selectedOrganizationVnets, setSelectedOrganizationVnets] = useState<Vnet[]>([]);

  const [sourceOrganizationOptions, setSourceOrganizationOptions] = useState<SelectOptions[]>([]);
  const [sourceNetworkOptions, setSourceNetworkOptions] = useState<SelectOptions[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    const organizationOptions = merakiOrganizations.map(organization => {
      return {
        value: `${organization.extId}`,
        label: `${organization.name}`,
      };
    });
    setSourceOrganizationOptions(organizationOptions);
  }, [merakiOrganizations]);

  useEffect(() => {
    if (!isEmpty(merakiOrganizations) && sourceOrg) {
      const orgVnets = networks.filter(network => network.ownerId === sourceOrg.value);
      setSelectedOrganizationVnets(orgVnets);
    }
  }, [sourceOrg]);

  useEffect(() => {
    const networkOptions: SelectOptions[] = selectedOrganizationVnets.map(vnet => {
      return {
        value: vnet.extId,
        label: vnet.name,
      };
    });
    setSourceNetworkOptions(networkOptions);
  }, [selectedOrganizationVnets]);

  const getSourceNetworkOptions = (sourceOrgId: string) => {
    const networkOptions: SelectOptions[] = networks
      .filter(network => network.ownerId === sourceOrgId)
      .map(vnet => ({
        value: vnet.extId,
        label: vnet.name,
      }));
    return networkOptions;
  };

  const populateFormFields = (testData: SLATest) => {
    setName(testData.name);
    const currentSourceOrg = sourceOrganizationOptions.find(item => item.value === testData.sourceOrgId) || { label: '', value: '' };
    setSourceOrg(currentSourceOrg);
    const currentSourceNetwork = getSourceNetworkOptions(testData.sourceOrgId).find(item => item.value === testData.sourceNwExtId) || { label: '', value: '' };
    setSourceNetwork(currentSourceNetwork);
    const currentDestination = destinationOptions.find(item => item.value === testData.destination) || { label: testData.destination, value: testData.destination };
    setDestination(currentDestination);
    setDescription(testData.description);
  };

  useEffect(() => {
    if (updateSlaTest) {
      populateFormFields(slaTestDataToUpdate);
    }
  }, [slaTestDataToUpdate]);

  const dropdownStyle = {
    option: provided => ({
      ...provided,
      padding: 20,
      color: 'black',
      fontSize: 16,
      fontWeight: 500,
    }),
    control: provided => ({
      ...provided,
      height: 60,
      marginBottom: 10,
      fontSize: 16,
      fontWeight: 500,
    }),
  };

  const clearFormFields = () => {
    setName('');
    setSourceOrg({
      label: '',
      value: '',
    });
    setSourceNetwork({
      label: '',
      value: '',
    });
    setDestination({
      label: '',
      value: '',
    });
    setDescription('');
  };

  const generateRequest = (testOperation: TestOperation) => {
    const testData: SLATest = {
      testId: testOperation === TestOperation.Update ? slaTestDataToUpdate.testId : '',
      name: name,
      sourceOrgId: sourceOrg.value,
      sourceNwExtId: sourceNetwork.value,
      destination: destination.value,
      interface: testOperation === TestOperation.Update ? slaTestDataToUpdate.interface : '',
      description: description,
    };
    const submitData: CreateSLATestRequest = {
      sla_test: testData,
    };
    return submitData;
  };

  const handleFormSubmit = () => {
    const submitData = generateRequest(TestOperation.Create);
    closeSlaTest();
    addSlaTest(submitData);
    clearFormFields();
  };

  const handleFormUpdate = () => {
    const submitData = generateRequest(TestOperation.Update);
    closeSlaTest();
    updateSlaTest(submitData);
    clearFormFields();
  };

  const shouldSubmitButtonEnable = () => (name && sourceOrg.label && sourceNetwork.label && destination.label ? false : true);

  return (
    <div className={classes.createSlaTestContainer}>
      <div className={classes.slaFormElementContainer}>
        <div className={classes.flexContainer}>
          <div>
            <span className={classes.itemTitle}>{updateSlaTest ? 'Edit SLA Test' : 'Create SLA Test'}</span>
          </div>
          {popup && (
            <div style={{ cursor: 'pointer' }} onClick={() => closeSlaTest()}>
              <CloseIcon />
            </div>
          )}
        </div>
        <div className={classes.formInputContainer}>
          <span className={classes.tableHeaderText}>NAME</span>
          <input className={classes.slaInput} type="text" value={name} onChange={e => setName(e.target.value)} />
          <span className={classes.tableHeaderText}>SOURCE ORGANIZATION</span>
          <Select styles={dropdownStyle} label="Single select" value={sourceOrg} options={sourceOrganizationOptions} onChange={e => setSourceOrg(e)} />
          <span className={classes.tableHeaderText}>SOURCE NETWORK</span>
          <Select styles={dropdownStyle} label="Single select" value={sourceNetwork} options={sourceNetworkOptions} onChange={e => setSourceNetwork(e)} />
          <span className={classes.tableHeaderText}>DESTINATION</span>
          <CreatableSelect isClearable styles={dropdownStyle} value={destination} onChange={e => setDestination(e)} options={destinationOptions} />
          <span className={classes.tableHeaderText}>DESCRIPTION</span>
          <input className={classes.slaInput} type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className={classes.slaTestButtonConatiner}>
          <Button
            className={classes.slaFormButton}
            disabled={shouldSubmitButtonEnable()}
            variant="contained"
            color="primary"
            fullWidth={true}
            size="large"
            onClick={updateSlaTest ? handleFormUpdate : handleFormSubmit}
            disableElevation
          >
            <span className={classes.slaTestButtonText}>{updateSlaTest ? 'EDIT SLA TEST' : 'CREATE SLA TEST'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
