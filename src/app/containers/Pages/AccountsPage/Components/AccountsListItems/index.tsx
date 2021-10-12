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

  if (!accounts.data) return null;
  if (accounts.data && !accounts.data.length) {
    return <>No data</>;
  }
  return (
    <>
      {accounts.data.map(it => (
        <AccountItem key={`accountDataItem${it.id}`} onEdit={onEdit} dataItem={it} />
      ))}
    </>
  );
};

export default React.memo(AccountsListItems);
