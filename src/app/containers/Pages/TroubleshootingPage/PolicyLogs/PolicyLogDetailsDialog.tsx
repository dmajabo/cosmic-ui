import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import CloseIcon from '../../MetricsPage/icons/performance dashboard/close';
import { ConfigDiffData, PolicyLogsData } from '.';
import { OldConfigData } from './OldConfigData';
import { NewConfigData } from './NewConfigData';
import { isArray } from 'lodash';
import { IDestinationCidr, IRouteState } from 'lib/api/ApiModels/Metrics/apiModel';
import { INetworkRule } from 'lib/api/ApiModels/Topology/apiModels';
import { ConfigTemplate } from './ConfigTemplate';
import { NetworkDetails } from './NetworkDetails';

interface PolicyLogDetailsProps {
  readonly isOpen: boolean;
  readonly handleClose: () => void;
  readonly selectedPolicyLogData: PolicyLogsData;
}

export interface PolicyLogRoute {
  readonly destinationCidr: IDestinationCidr;
  readonly extId: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly state: IRouteState;
  readonly target: string;
}

export interface ConnectionResource {
  readonly extId: string;
  readonly name: string;
}

export interface Rule extends INetworkRule {}

export interface PolicyLogDetails {
  readonly CreatedAt: string;
  readonly CreatedBy: string;
  readonly Id: string;
  readonly TenantId: string;
  readonly UpdatedAt: string;
  readonly UpdatedBy: string;
  readonly ownerId: string;
  readonly ctrlrId: string;
  readonly extId: string;
  readonly name: string;
  readonly ctrlrName: string;
  readonly regionCode: string;
  readonly vendor: string;
  readonly rules: Rule[];
  readonly routes: PolicyLogRoute[];
  readonly vNetworks: ConnectionResource[];
  readonly clientVpnEndpoints: ConnectionResource[];
  readonly vms: ConnectionResource[];
  readonly nics: ConnectionResource[];
  readonly vpnLinks: ConnectionResource[];
  readonly networkLinks: ConnectionResource[];
  readonly subnets: ConnectionResource[];
  readonly wedges: ConnectionResource[];
  readonly wedgePeeringConnections: ConnectionResource[];
}

export interface PolicyLogDetailProperty {
  readonly label: string;
  readonly value: string;
}

export enum PolicyType {
  SecurityGroup = 'SecurityGroup',
  RouteTable = 'RouteTable',
  Network = 'Network',
}

const SHARED_POLICY_DETAILS: PolicyLogDetailProperty[] = [
  { value: 'name', label: 'Name' },
  { value: 'extId', label: 'Ext Id' },
  { value: 'ctrlrName', label: 'Controller Name' },
  { value: 'regionCode', label: 'Region Code' },
  { value: 'vendor', label: 'Vendor' },
];

const CONNECTION_ARRAY_POLICY_DETAILS: PolicyLogDetailProperty[] = [
  { value: 'vNetworks', label: 'VNetworks' },
  { value: 'clientVpnEndpoints', label: 'Client Vpn Endpoints' },
  { value: 'vms', label: 'VMs' },
  { value: 'nics', label: 'Nics' },
  { value: 'vpnLinks', label: 'VPN Links' },
  { value: 'networkLinks', label: 'Network Links' },
  { value: 'subnets', label: 'Subnets' },
  { value: 'wedges', label: 'Wedges' },
  { value: 'wedgePeeringConnections', label: 'Wedge Peering Connections' },
];

const getEmptyJSON = (json: PolicyLogDetails) => {
  Object.keys(json).forEach(key => (isArray(json[key]) ? (json[key] = []) : (json[key] = '')));
  return json;
};

const getPolicyLogJSON = (firstValue: string, secondValue: string, policyType: string) => {
  if (policyType === PolicyType.Network) {
    return {};
  } else {
    return firstValue ? JSON.parse(firstValue) : getEmptyJSON(JSON.parse(secondValue));
  }
};

const getConfigDiffJSON = (firstValue: string, secondValue: string, policyType: string) => {
  if (policyType === PolicyType.Network) {
    return firstValue ? JSON.parse(firstValue) : getEmptyJSON(JSON.parse(secondValue));
  } else {
    return {};
  }
};

export const PolicyLogDetailsDialog: React.FC<PolicyLogDetailsProps> = ({ isOpen, handleClose, selectedPolicyLogData }) => {
  const classes = TroubleshootingStyles();

  const oldPolicyLogDetails: PolicyLogDetails = getPolicyLogJSON(selectedPolicyLogData.oldValue, selectedPolicyLogData.newValue, selectedPolicyLogData.policyType);
  const newPolicyLogDetails: PolicyLogDetails = getPolicyLogJSON(selectedPolicyLogData.newValue, selectedPolicyLogData.oldValue, selectedPolicyLogData.policyType);

  const networkDetailsObject: ConfigDiffData = getConfigDiffJSON(selectedPolicyLogData.networkDetails, selectedPolicyLogData.configTemplateDetails, selectedPolicyLogData.policyType);
  const configTemplateDetailsObject: ConfigDiffData = getConfigDiffJSON(selectedPolicyLogData.configTemplateDetails, selectedPolicyLogData.networkDetails, selectedPolicyLogData.policyType);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <div className={classes.tabTitleContainer}>
          <div className={classes.dialogTitle}>Configuration Details</div>
          <div className={classes.closeIcon} onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
      </DialogTitle>
      {selectedPolicyLogData.policyType === PolicyType.Network ? (
        <DialogContent className={classes.gridContainer}>
          <div className={classes.gridItem}>
            <div className={`${classes.gridItemTitle} ${classes.templateHeader}`}>Configuration Template</div>
            <ConfigTemplate configTemplateDetails={configTemplateDetailsObject} />
          </div>
          <div className={classes.gridItem}>
            <div className={`${classes.gridItemTitle} ${classes.changesHeader}`}>Network Details</div>
            <NetworkDetails networkDetails={networkDetailsObject} configTemplateDetails={configTemplateDetailsObject} />
          </div>
        </DialogContent>
      ) : (
        <DialogContent className={classes.gridContainer}>
          <div className={classes.gridItem}>
            <div className={`${classes.gridItemTitle} ${classes.templateHeader}`}>Old</div>
            <OldConfigData oldData={oldPolicyLogDetails} sharedProperties={SHARED_POLICY_DETAILS} connectionProperties={CONNECTION_ARRAY_POLICY_DETAILS} vendorType={selectedPolicyLogData.vendor} />
          </div>
          <div className={classes.gridItem}>
            <div className={`${classes.gridItemTitle} ${classes.changesHeader}`}>New</div>
            <NewConfigData
              oldData={oldPolicyLogDetails}
              newData={newPolicyLogDetails}
              sharedProperties={SHARED_POLICY_DETAILS}
              connectionProperties={CONNECTION_ARRAY_POLICY_DETAILS}
              vendorType={selectedPolicyLogData.vendor}
            />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
