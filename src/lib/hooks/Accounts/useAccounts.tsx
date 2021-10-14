import React from 'react';
import { IAWS_Account, IMeraki_Account } from 'lib/api/ApiModels/Accounts/apiModel';

export interface AccountsContextType {
  data: (IMeraki_Account | IAWS_Account)[];
  onSetData: (res: (IMeraki_Account | IAWS_Account)[]) => void;
  onCreateAccount: (res: IMeraki_Account | IAWS_Account) => void;
  onUpdateAccount: (res: IMeraki_Account | IAWS_Account) => void;
}
export function useAccountsContext(): AccountsContextType {
  const [data, setData] = React.useState<(IMeraki_Account | IAWS_Account)[] | null>([]);

  const onSetData = (items: (IMeraki_Account | IAWS_Account)[]) => {
    if (!items) {
      setData([]);
      return;
    }
    setData(items);
  };

  const onCreateAccount = (resItem: IMeraki_Account | IAWS_Account) => {
    if (!data) {
      setData([resItem]);
      return;
    }
    setData([...data, resItem]);
  };

  const onUpdateAccount = (resItem: IMeraki_Account | IAWS_Account) => {
    const _index = data.findIndex(it => it.id === resItem.id);
    if (_index === -1) {
      setData([...data, resItem]);
      return;
    }
    const _items: (IMeraki_Account | IAWS_Account)[] = [...data];
    _items.splice(_index, 1, resItem);
    setData(_items);
  };

  return {
    data,
    onSetData,
    onCreateAccount,
    onUpdateAccount,
  };
}
