import React from 'react';
import { IAwsRegion, IAWS_Account, IAZURE_Account, IMeraki_Account } from 'lib/api/ApiModels/Accounts/apiModel';
import { ISelectedListItem } from 'lib/models/general';

export interface AccountsContextType {
  data: (IMeraki_Account | IAWS_Account | IAZURE_Account)[];
  regions: ISelectedListItem<string>[];
  onSetData: (res: (IMeraki_Account | IAWS_Account | IAZURE_Account)[]) => void;
  onAddAccount: (res: IMeraki_Account | IAWS_Account | IAZURE_Account) => void;
  onDeleteAccount: (id: string) => void;
  onSetRegions: (res: IAwsRegion[]) => void;
}
export function useAccountsContext(): AccountsContextType {
  const [data, setData] = React.useState<(IMeraki_Account | IAWS_Account | IAZURE_Account)[] | null>([]);
  const [regions, setRegions] = React.useState<ISelectedListItem<string>[]>([]);

  const onSetData = (items: (IMeraki_Account | IAWS_Account | IAZURE_Account)[]) => {
    if (!items) {
      setData([]);
      return;
    }
    setData(items);
  };

  const onAddAccount = (resItem: IMeraki_Account | IAWS_Account | IAZURE_Account) => {
    if (!data) {
      setData([resItem]);
      return;
    }
    const _index = data.findIndex(it => it.id === resItem.id);
    if (_index === -1) {
      setData([...data, resItem]);
      return;
    }
    const _items: (IMeraki_Account | IAWS_Account | IAZURE_Account)[] = [...data];
    _items.splice(_index, 1, resItem);
    setData(_items);
  };

  const onDeleteAccount = (id: string) => {
    const _items: (IMeraki_Account | IAWS_Account | IAZURE_Account)[] = data.filter(it => it.id !== id);
    setData(_items);
  };

  const onSetRegions = (res: IAwsRegion[]) => {
    if (!res || !res.length) {
      setRegions([]);
      return;
    }
    setRegions(res.map((it, index) => ({ id: it.code, value: it.code, label: `${it.city} (${it.code})`, data: it })));
  };

  return {
    data,
    regions,
    onSetData,
    onAddAccount,
    onDeleteAccount,
    onSetRegions,
  };
}
