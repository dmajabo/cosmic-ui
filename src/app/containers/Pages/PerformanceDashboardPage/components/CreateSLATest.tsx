import { Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import Select from 'react-select';
import { CreateSLATestRequest, Organization, SLATest } from '../SharedTypes';
import CloseIcon from '../icons/close.svg';
import { GetSelectedOrganization } from './filterFunctions';
import CreatableSelect from 'react-select/creatable';

interface CreateSLATestProps {
  readonly addSlaTest: Function;
  readonly merakiOrganizations: Organization[];
  readonly awsOrganizations: Organization[];
  readonly popup?: boolean;
  readonly closeSlaTest?: Function;
}

interface SelectOptions {
  readonly value: string;
  readonly label: string;
}

export const CreateSLATest: React.FC<CreateSLATestProps> = ({ awsOrganizations, merakiOrganizations, addSlaTest, closeSlaTest, popup }) => {
  const classes = PerformanceDashboardStyles();

  const [name, setName] = useState<string>('');
  const [sourceOrg, setSourceOrg] = useState<string>('');
  const [sourceNetwork, setSourceNetwork] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [selectedOrganizationVnets, setSelectedOrganizationVnets] = useState([]);

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
    const destinationOptions: SelectOptions[] = [];
    awsOrganizations.forEach(organization => {
      organization.vnets.forEach(vnet => {
        vnet.vms.forEach(vm => {
          vm.nic.forEach(nic => {
            const ipAddress = nic.publicIp ? nic.publicIp : nic.privateIp;
            destinationOptions.push({
              label: `${vm.name}(${ipAddress})`,
              value: ipAddress,
            });
          });
        });
      });
    });
    setDestinationOptions(destinationOptions);
  }, [awsOrganizations]);

  useEffect(() => {
    if (merakiOrganizations.length > 0 && sourceOrg) {
      const selectedOrganization = GetSelectedOrganization(merakiOrganizations, sourceOrg);
      setSelectedOrganizationVnets(selectedOrganization.vnets);
    }
  }, [sourceOrg]);

  useEffect(() => {
    const networkOptions: SelectOptions[] = selectedOrganizationVnets.map(vnet => {
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

  const handleFormSubmit = () => {
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
    closeSlaTest();
    addSlaTest(submitData);
    clearFormFields();
  };

  const getButtonEnable = () => {
    return name ? (sourceOrg ? (sourceNetwork ? (destination ? false : true) : true) : true) : true;
  };

  return (
    <div className={classes.createSlaTestContainer}>
      <div className={classes.slaFormElementContainer}>
        <div className={classes.flexContainer}>
          <div>
            <Typography className={classes.itemTitle}>Create SLA Test</Typography>
          </div>
          {popup ? (
            <div style={{ cursor: 'pointer' }} onClick={() => closeSlaTest()}>
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
          <Select styles={dropdownStyle} label="Single select" options={sourceOrganizationOptions} onChange={e => setSourceOrg(e.value)} />
          <span className={classes.tableHeaderText}>SOURCE NETWORK</span>
          <Select styles={dropdownStyle} label="Single select" options={sourceNetworkOptions} onChange={e => setSourceNetwork(e.value)} />
          <span className={classes.tableHeaderText}>DESTINATION</span>
          <CreatableSelect isClearable styles={dropdownStyle} onChange={e => setDestination(e.value)} options={destinationOptions} />
          <span className={classes.tableHeaderText}>DESCRIPTION</span>
          <input className={classes.slaInput} type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className={classes.slaTestButtonConatiner}>
          <Button className={classes.slaFormButton} disabled={getButtonEnable()} variant="contained" color="primary" fullWidth={true} size="large" onClick={handleFormSubmit} disableElevation>
            <Typography className={classes.slaTestButtonText} noWrap>
              CREATE SLA TEST
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
