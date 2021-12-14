import React from 'react';
import { IMeraki_Account, IAWS_Account, AccountVendorTypes, IAZURE_Account } from 'lib/api/ApiModels/Accounts/apiModel';
import NewAwsAccountForm from './NewAwsAccountForm';
import NewCiscoMerakiAccountForm from './NewCiscoMerakiAccountForm';
import { ISelectedListItem } from 'lib/models/general';
interface Props {
  isEditMode: boolean;
  dataItem: IMeraki_Account | IAWS_Account | IAZURE_Account;
  regions: ISelectedListItem<string>[];
  onClose: () => void;
}

const AccountForm: React.FC<Props> = ({ isEditMode, dataItem, regions, onClose }) => {
  if (!dataItem) return null;
  if (dataItem.vendor === AccountVendorTypes.CISCO_MERAKI) {
    return <NewCiscoMerakiAccountForm isEditMode={isEditMode} dataItem={dataItem as IMeraki_Account} onClose={onClose} />;
  }
  if (dataItem.vendor === AccountVendorTypes.AMAZON_AWS) {
    return <NewAwsAccountForm regions={regions} isEditMode={isEditMode} dataItem={dataItem as IAWS_Account} onClose={onClose} />;
  }
  return null;
};

export default React.memo(AccountForm);
