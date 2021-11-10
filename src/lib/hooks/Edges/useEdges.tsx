import React from 'react';
import { IAwsRegion } from 'lib/api/ApiModels/Accounts/apiModel';

export interface EdgesContextType {
  dataReadyToShow: boolean;
  data: any;
  regions: IAwsRegion[];
  onSetData: (res: any) => void;
  onSetRegions: (res: IAwsRegion[]) => void;
}
export function useEdgesContext(): EdgesContextType {
  const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);
  const [regions, setRegions] = React.useState<IAwsRegion[]>([]);
  const onSetData = (res: any) => {
    if (!res) {
      setData(null);
      setDataReadyToShow(true);
      return;
    }
    setData(res);
    setDataReadyToShow(true);
  };

  const onSetRegions = (res: IAwsRegion[]) => {
    if (!res || !res.length) {
      setRegions([]);
      return;
    }
    setRegions(res.map((it, index) => ({ ...it, id: `region${it.lat}${it.long}` })));
  };
  return {
    dataReadyToShow,
    data,
    regions,
    onSetData,
    onSetRegions,
  };
}
