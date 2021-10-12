import { IAccount } from 'lib/api/ApiModels/Accounts/apiModel';
import React from 'react';
// import { ISelectedListItem } from 'lib/models/general';

export interface AccountsContextType {
  data: IAccount[];
  onSetData: (res: any) => void;
}
export function useAccountsContext(): AccountsContextType {
  const [data, setData] = React.useState<IAccount[] | null>(null);

  const onSetData = (res: IAccount[]) => {
    if (!res) {
      setData(null);
      return;
    }
    setData(res);
  };

  return {
    data,
    onSetData,
  };
}
