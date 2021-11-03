import React from 'react';

export interface EdgesContextType {
  data: any;
  onSetData: (res: any) => void;
}
export function useEdgesContext(): EdgesContextType {
  const [data, setData] = React.useState<any>(null);

  const onSetData = (res: any) => {
    if (!res) {
      setData(null);
    }
    setData(res);
  };
  return {
    data,
    onSetData,
  };
}
