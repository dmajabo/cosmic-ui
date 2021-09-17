import { Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import Select from 'react-select';
import { Organization } from '../SharedTypes';
import { createApiClient } from '../apiClient';
import CloseIcon from '../icons/close.svg';

interface AverageQOE {
  readonly packetLoss: number;
  readonly latency: number;
}

interface RawData {
  readonly id?: string;
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly interface?: string;
  readonly description: string;
  readonly averageQoe: AverageQOE;
}

interface CreateSLATestProps {
  readonly addSlaTest: Function;
  readonly popup?: boolean;
  readonly closeSlaTest?: Function;
}

export const CreateSLATest: React.FC<CreateSLATestProps> = ({ addSlaTest, closeSlaTest, popup }) => {
  const classes = PerformanceDashboardStyles();

  const apiClient = createApiClient();

  const [name, setName] = useState<string>('');
  const [sourceOrg, setSourceOrg] = useState<string>('');
  const [sourceNetwork, setSourceNetwork] = useState<string>('');
  const [sourceDevice, setSourceDevice] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization>(null);
  const [selectedOrganizationVnets, setSelectedOrganizationVnets] = useState([]);

  const [sourceOrganizationOptions, setSourceOrganizationOptions] = useState([]);
  const [sourceNetworkOptions, setSourceNetworkOptions] = useState([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const responseData = await apiClient.getOrganizations();
      const MerakiOrganizations = responseData.organizations.filter(organization => {
        return organization.vendorType === 'MERAKI';
      });
      setOrganizations(MerakiOrganizations);
    };
    getOrganizations();
  }, []);

  useEffect(() => {
    const organizationOptions = organizations.map(organization => {
      return {
        value: `${organization.name} ${organization.id}`,
        label: `${organization.name} ${organization.id}`,
      };
    });
    setSourceOrganizationOptions(organizationOptions);
  }, [organizations]);

  useEffect(() => {
    const selectedOrganization = organizations.filter(organization => {
      return `${organization.name} ${organization.id}` === sourceOrg;
    });

    if (selectedOrganization.length > 0) {
      setSelectedOrganization(selectedOrganization[0]);
      setSelectedOrganizationVnets(selectedOrganization[0].vnets);
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
    if (selectedOrganization) {
      const orgDevices = selectedOrganization.devices;
      //console.log(orgDevices);
      const deviceExtIdList = orgDevices.map(device => {
        return device.extId;
      });
      const allDevices = deviceExtIdList.reduce((acc, newValue) => {
        return acc + ',' + newValue;
      });
      setSourceDevice(allDevices);
    }
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

  const handleFormSubmit = () => {
    const testData: RawData = {
      name: name,
      sourceOrg: sourceOrg,
      sourceNetwork: sourceNetwork,
      sourceDevice: sourceDevice,
      destination: destination,
      description: description,
      averageQoe: {
        packetLoss: 0,
        latency: 0,
      },
    };
    addSlaTest(testData);
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
