import React from 'react';
// import { ISelectedListItem } from 'lib/models/general';

export interface AccountsContextType {
  dataReadyToShow: boolean;
  onSetData: (res: any) => void;
}
export function useAccountsContext(): AccountsContextType {
  const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);

  const onSetData = (res: any) => {
    if (!res) {
      setDataReadyToShow(true);
      return;
    }
    setDataReadyToShow(true);
  };

  return {
    dataReadyToShow,
    onSetData,
  };
}
