import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { TroubleshootingStyles } from '../TroubleshootingStyles';
import CloseIcon from '../../MetricsPage/icons/performance dashboard/close';
import { PolicyLogsData } from '.';
import { OldConfigData } from './OldConfigData';
import { NewConfigData } from './NewConfigData';
import { isArray } from 'lodash';

interface PolicyLogDetailsProps {
  readonly isOpen: boolean;
  readonly handleClose: () => void;
  readonly selectedPolicyLogData: PolicyLogsData;
}

interface RouteDestCidr {
  readonly extId: string;
  readonly name: string;
  readonly ownerId: string;
  readonly regionCode: string;
}

interface PolicyLogRoute {
  readonly destinationCidr: RouteDestCidr;
  readonly extId: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly state: string;
  readonly target: string;
}
interface Rule {
  readonly fromPort: string;
  readonly ipProtocol: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly ruleType: string;
  readonly toPort: string;
}

interface Vnetwork {
  readonly extId: string;
  readonly name: string;
}

export interface PolicyLogDetails {
  readonly CreatedAt: string;
  readonly CreatedBy: string;
  readonly Id: string;
  readonly TenantId: string;
  readonly UpdatedAt: string;
  readonly UpdatedBy: string;
  readonly extId: string;
  readonly name: string;
  readonly ownerId: string;
  readonly ctrlrId: string;
  readonly ctrlrName: string;
  readonly regionCode: string;
  readonly vendor: string;
  readonly rules: Rule[];
  readonly routes: PolicyLogRoute[];
  readonly vNetworks: Vnetwork[];
  readonly clientVpnEndpoints: Vnetwork[];
}

const EMPTY_POLICY_LOG_DETAILS: PolicyLogDetails = {
  CreatedAt: undefined,
  CreatedBy: undefined,
  Id: undefined,
  TenantId: undefined,
  UpdatedAt: undefined,
  UpdatedBy: undefined,
  extId: undefined,
  name: undefined,
  ownerId: undefined,
  ctrlrId: undefined,
  ctrlrName: undefined,
  regionCode: undefined,
  vendor: undefined,
  routes: [],
  rules: [],
  vNetworks: [],
  clientVpnEndpoints: [],
};

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
          <div className={`${classes.gridItemTitle} ${classes.templateHeader}`}>Configuration Template</div>
          <OldConfigData oldData={oldPolicyLogDetails} />
        </div>
        <div className={classes.gridItem}>
          <div className={`${classes.gridItemTitle} ${classes.changesHeader}`}>Configuration Changes</div>
          <NewConfigData oldData={oldPolicyLogDetails} newData={newPolicyLogDetails} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
