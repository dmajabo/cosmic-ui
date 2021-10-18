import React from 'react';
import { IAccount } from 'lib/api/ApiModels/Accounts/apiModel';
import { useAccountsDataContext } from 'lib/hooks/Accounts/useAccountsDataContext';
import AccountItem from './AccountItem';

interface Props {
  onEditAccount: (item: IAccount) => void;
}
const AccountsListItems: React.FC<Props> = (props: Props) => {
  const { accounts } = useAccountsDataContext();

  const onEdit = (item: IAccount) => {
    props.onEditAccount(item);
  };

  return (
    <>
      {accounts.data.map((it, index) => (
        <AccountItem key={`accountDataItem${it.vendor}${it.id}${index}`} onEdit={onEdit} dataItem={it} />
      ))}
    </>
  );
};

export default React.memo(AccountsListItems);
