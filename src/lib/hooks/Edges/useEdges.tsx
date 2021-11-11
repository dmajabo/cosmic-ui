import React from 'react';
import { AccountVendorTypes, IAwsRegion, IAWS_Account, IMeraki_Account } from 'lib/api/ApiModels/Accounts/apiModel';

export interface EdgesContextType {
  dataReadyToShow: boolean;
  data: any;
  regions: IAwsRegion[];
  awsAccounts: string[];
  onSetData: (res: any) => void;
  onSetRegions: (res: IAwsRegion[]) => void;
  onSetAccounts: (res: (IMeraki_Account | IAWS_Account)[]) => void;
}
export function useEdgesContext(): EdgesContextType {
  const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);
  const [regions, setRegions] = React.useState<IAwsRegion[]>([]);
  const [awsAccounts, setAwsAccounts] = React.useState<string[]>([]);
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

  const onSetAccounts = (res: (IMeraki_Account | IAWS_Account)[]) => {
    if (!res || !res.length) {
      setAwsAccounts([]);
      return;
    }
    const _data: IAWS_Account[] = res.filter((it, index) => it.vendor === AccountVendorTypes.AMAZON_AWS) as IAWS_Account[];
    setAwsAccounts(_data.map(it => it.name));
  };
  return {
    dataReadyToShow,
    data,
    regions,
    awsAccounts,
    onSetData,
    onSetRegions,
    onSetAccounts,
  };
}
