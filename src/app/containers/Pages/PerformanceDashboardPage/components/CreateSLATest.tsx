import { Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import Select from 'react-select';
import { CreateSLATestRequest, Organization, SLATest } from '../SharedTypes';
import { createApiClient } from '../apiClient';
import CloseIcon from '../icons/close.svg';
import { GetSelectedOrganization } from './filterFunctions';

interface CreateSLATestProps {
  readonly addSlaTest: Function;
  readonly organizations: Organization[];
  readonly popup?: boolean;
  readonly closeSlaTest?: Function;
}

export const CreateSLATest: React.FC<CreateSLATestProps> = ({ organizations, addSlaTest, closeSlaTest, popup }) => {
  const classes = PerformanceDashboardStyles();

  const apiClient = createApiClient();

  const [name, setName] = useState<string>('');
  const [sourceOrg, setSourceOrg] = useState<string>('');
  const [sourceNetwork, setSourceNetwork] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [selectedOrganizationVnets, setSelectedOrganizationVnets] = useState([]);

  const [sourceOrganizationOptions, setSourceOrganizationOptions] = useState([]);
  const [sourceNetworkOptions, setSourceNetworkOptions] = useState([]);

  useEffect(() => {
    const organizationOptions = organizations.map(organization => {
      return {
        value: `${organization.extId}`,
        label: `${organization.name}`,
      };
    });
    setSourceOrganizationOptions(organizationOptions);
  }, [organizations]);

  useEffect(() => {
    if (organizations.length > 0 && sourceOrg !== '') {
      const selectedOrganization = GetSelectedOrganization(organizations, sourceOrg);
      setSelectedOrganizationVnets(selectedOrganization.vnets);
    }
  }, [sourceOrg]);

  useEffect(() => {
    const networkOptions = selectedOrganizationVnets.map(vnet => {
      return {
        value: vnet.extId,
        label: vnet.extId,
      };
    });
    setSourceNetworkOptions(networkOptions);
  }, [selectedOrganizationVnets]);

  const dropdownStyle = {
    option: provided => ({
      ...provided,
      padding: 20,
      color: 'black',
    }),
    control: provided => ({
      ...provided,
      height: 60,
      marginBottom: 10,
    }),
  };

  const clearFormFields = () => {
    setName('');
    setSourceOrg('');
    setSourceNetwork('');
    setDestination('');
    setDescription('');
  };

  const handleFormSubmit = async () => {
    const testData: SLATest = {
      testId: '',
      name: name,
      sourceOrgId: sourceOrg,
      sourceNwExtId: sourceNetwork,
      destination: destination,
      interface: '',
      description: description,
    };
    const submitData: CreateSLATestRequest = {
      sla_test: testData,
    };
    await apiClient.createSLATest(submitData);
    clearFormFields();
    addSlaTest(1);
  };

  return (
    <div className={classes.createSlaTestContainer}>
      <div className={classes.slaFormElementContainer}>
        <div className={classes.flexContainer}>
          <div>
            <Typography className={classes.itemTitle}>Create SLA Test</Typography>
          </div>
          {popup ? (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                closeSlaTest();
              }}
            >
              <img src={CloseIcon} alt="close" />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className={classes.formInputContainer}>
          <span className={classes.tableHeaderText}>NAME</span>
          <input className={classes.slaInput} type="text" value={name} onChange={e => setName(e.target.value)} />
          <span className={classes.tableHeaderText}>SOURCE ORGANIZATION</span>
          <Select
            styles={dropdownStyle}
            label="Single select"
            options={sourceOrganizationOptions}
            onChange={e => {
              setSourceOrg(e.value);
            }}
          />
          <span className={classes.tableHeaderText}>SOURCE NETWORK</span>
          <Select
            styles={dropdownStyle}
            label="Single select"
            options={sourceNetworkOptions}
            onChange={e => {
              setSourceNetwork(e.value);
            }}
          />
          <span className={classes.tableHeaderText}>DESTINATION</span>
          <input className={classes.slaInput} type="text" value={destination} onChange={e => setDestination(e.target.value)} />
          <span className={classes.tableHeaderText}>DESCRIPTION</span>
          <input className={classes.slaInput} type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className={classes.slaTestButtonConatiner}>
          <Button className={classes.slaFormButton} variant="contained" color="primary" fullWidth={true} size="large" onClick={handleFormSubmit} disableElevation>
            <Typography className={classes.slaTestButtonText} noWrap>
              CREATE SLA TEST
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
