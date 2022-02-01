import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import CloseIcon from '../../MetricsPage/icons/performance dashboard/close';
import { PolicyLogsData } from '.';
import { OldConfigData } from './OldConfigData';
import { NewConfigData } from './NewConfigData';
import { isArray } from 'lodash';
import { IDestinationCidr, IRouteState, IVmRule } from 'lib/api/ApiModels/Metrics/apiModel';

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
  readonly resourceType: string;
}

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
  readonly rules: IVmRule[];
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

export const PolicyLogDetailsDialog: React.FC<PolicyLogDetailsProps> = ({ isOpen, handleClose, selectedPolicyLogData }) => {
  const classes = TroubleshootingStyles();

  const oldPolicyLogDetails: PolicyLogDetails = selectedPolicyLogData.oldValue ? JSON.parse(selectedPolicyLogData.oldValue) : getEmptyJSON(JSON.parse(selectedPolicyLogData.newValue));
  const newPolicyLogDetails: PolicyLogDetails = selectedPolicyLogData.newValue ? JSON.parse(selectedPolicyLogData.newValue) : getEmptyJSON(JSON.parse(selectedPolicyLogData.oldValue));

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
    </Dialog>
  );
};
