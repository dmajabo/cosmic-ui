import React from 'react';
import { AccountVendorTypes, IAwsRegion, IAWS_Account, IMeraki_Account } from 'lib/api/ApiModels/Accounts/apiModel';
import { IEdgeModel, PolicySources } from 'lib/api/ApiModels/Edges/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';

export interface EdgesContextType {
  dataReadyToShow: boolean;
  data: any;
  searchQuery: string;
  regions: IAwsRegion[];
  awsAccounts: string[];
  onSetData: (res: IEdgeModel[]) => void;
  onSearchChange: (v: string | null) => void;
  onUpdateEdges: (res: IEdgeModel) => void;
  onDeleteEdge: (id: string) => void;
  onSetRegions: (res: IAwsRegion[]) => void;
  onSetAccounts: (res: (IMeraki_Account | IAWS_Account)[]) => void;
}
export function useEdgesContext(): EdgesContextType {
  const [dataReadyToShow, setDataReadyToShow] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IEdgeModel[]>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [regions, setRegions] = React.useState<IAwsRegion[]>([]);
  const [awsAccounts, setAwsAccounts] = React.useState<string[]>([]);

  const onSetData = (res: IEdgeModel[]) => {
    const _arr: IEdgeModel[] = [
      {
        id: '1',
        name: 'asfaf',
        description: '',
        deployment: {
          controller_name: 'acc_test_1',
          region_code: ['us_west_1'],
        },
        connection: [],
        tags: ['test_tag 1', 'test_tag 24', 'test_tag 25235252', 'test_tag 25235252', 'test_tag 25235252', 'test_tag 1', 'test_tag 24', 'test_tag 25235252', 'test_tag 25235252', 'test_tag 25235252'],
        firewall: true,
        firewallRegion: 'Polo',
        sites: [
          {
            name: 'test meraki 1',
            type: PolicySources.MERAKI,
            items: ['test 1', 'test 2'],
          },
          {
            name: 'test meraki 2',
            type: PolicySources.MERAKI,
            items: ['test mer 1', 'test mer 2'],
          },
        ],
        apps: [
          {
            name: 'test aws 1',
            type: PolicySources.AWS,
            items: ['aws 1', 'aws 2'],
          },
          {
            name: 'test aws 2',
            type: PolicySources.AWS,
            items: ['aws mer 1', 'aws mer 2'],
          },
        ],
        policies: null,
      },
      {
        id: '2',
        name: 'btlas',
        description: '',
        deployment: {
          controller_name: 'acc_test_1',
          region_code: ['us_west_1'],
        },
        connection: [],
        tags: ['test_tag'],
        firewall: true,
        firewallRegion: 'Polo',
        sites: [
          {
            name: 'test meraki 1',
            type: PolicySources.MERAKI,
            items: ['test 1', 'test 2'],
          },
          {
            name: 'test meraki 2',
            type: PolicySources.MERAKI,
            items: ['test mer 1', 'test mer 2'],
          },
        ],
        apps: [
          {
            name: 'test aws 1',
            type: PolicySources.AWS,
            items: ['aws 1', 'aws 2'],
          },
          {
            name: 'test aws 2',
            type: PolicySources.AWS,
            items: ['aws mer 1', 'aws mer 2'],
          },
        ],
        policies: null,
      },
      {
        id: '3',
        name: 'tags',
        description: '',
        deployment: {
          controller_name: 'acc_test_1',
          region_code: ['us_west_1'],
        },
        connection: [],
        tags: ['test_tag'],
        firewall: true,
        firewallRegion: 'Polo',
        sites: [
          {
            name: 'test meraki 1',
            type: PolicySources.MERAKI,
            items: ['test 1', 'test 2'],
          },
          {
            name: 'test meraki 2',
            type: PolicySources.MERAKI,
            items: ['test mer 1', 'test mer 2'],
          },
        ],
        apps: [
          {
            name: 'test aws 1',
            type: PolicySources.AWS,
            items: ['aws 1', 'aws 2'],
          },
          {
            name: 'test aws 2',
            type: PolicySources.AWS,
            items: ['aws mer 1', 'aws mer 2'],
          },
        ],
        policies: null,
      },
      {
        id: '4',
        name: 'fkghj',
        description: '',
        deployment: {
          controller_name: 'acc_test_1',
          region_code: ['us_west_1'],
        },
        connection: [],
        tags: [],
        firewall: true,
        firewallRegion: 'Polo',
        sites: [
          {
            name: 'test meraki 1',
            type: PolicySources.MERAKI,
            items: ['test 1', 'test 2'],
          },
          {
            name: 'test meraki 2',
            type: PolicySources.MERAKI,
            items: ['test mer 1', 'test mer 2'],
          },
        ],
        apps: [
          {
            name: 'test aws 1',
            type: PolicySources.AWS,
            items: ['aws 1', 'aws 2'],
          },
          {
            name: 'test aws 2',
            type: PolicySources.AWS,
            items: ['aws mer 1', 'aws mer 2'],
          },
        ],
        policies: null,
      },
    ];
    if (!res) {
      // TO DO
      setData(_arr);
      //setData(null);
      setDataReadyToShow(true);
      return;
    }

    // TO DO
    setData(res);
    // setData(res);
    setDataReadyToShow(true);
  };

  const onSearchChange = (v: string | null) => {
    setSearchQuery(v);
  };

  const onUpdateEdges = (res: IEdgeModel) => {
    const _arr: IEdgeModel[] = data !== null ? jsonClone(data) : [];
    const _i = _arr.findIndex(it => it.id === res.id);
    if (_i === -1) {
      _arr.push(res);
    } else {
      _arr.splice(_i, 1, res);
    }
    setData(_arr);
  };

  const onDeleteEdge = (id: string) => {
    let _arr: IEdgeModel[] = data !== null ? jsonClone(data) : [];
    _arr = data.filter(it => it.id !== id);
    setData(_arr);
  };

  const onSetRegions = (res: IAwsRegion[]) => {
    if (!res || !res.length) {
      setRegions([]);
      return;
    }
    setRegions(res.map((it, index) => ({ ...it, id: `region${it.code}` })));
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
    searchQuery,
    regions,
    awsAccounts,
    onSetData,
    onSearchChange,
    onSetRegions,
    onSetAccounts,
    onUpdateEdges,
    onDeleteEdge,
  };
}
