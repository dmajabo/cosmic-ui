import React from 'react';

export interface EdgesContextType {
  dataReadyToShow: boolean;
  data: any;
  onSetData: (res: any) => void;
}
export function useEdgesContext(): EdgesContextType {
  const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);

  const onSetData = (res: any) => {
    if (!res) {
      setData(null);
      setDataReadyToShow(true);
      return;
    }
    setData(res);
    setDataReadyToShow(true);
  };
  return {
    dataReadyToShow,
    data,
    onSetData,
  };
}
