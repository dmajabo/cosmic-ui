import React from 'react';
import { ModalRow } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { INetworkTag, INetworkTagsRes, INetworkVNetwork, IVnetworksRes } from 'lib/api/ApiModels/Topology/apiModels';
import { IUiPagingData } from 'lib/api/ApiModels/generalApiModel';
import { ISegmentNetworkSegMatchRuleP, SegmentNetworkSegMatchKey, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { paramBuilder, TAGS_RESOURCE_TYPE } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import VnetsTableComponent from './VnetsTableComponent';
import TagsTableComponent from './TagsTableComponent';

interface Props {
  matchRules: ISegmentNetworkSegMatchRuleP[];
  onSelectChange: (type: SegmentSegmentType, item: ISegmentNetworkSegMatchRuleP) => void;
  onSelectAll: (type: SegmentSegmentType, item: ISegmentNetworkSegMatchRuleP[]) => void;
}

const VnetsTable: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading: vnetsLoading, response: vnetsRes, error: vnetsError, onGet: onGetVnets } = useGet<IVnetworksRes>();
  const { loading: tagsLoading, response: tagsRes, error: tagsError, onGet: onGetTags } = useGet<INetworkTagsRes>();
  const [vnets, setVnets] = React.useState<INetworkVNetwork[]>([]);
  const [tags, setTags] = React.useState<INetworkTag[]>([]);
  const [vnetsPagingData, setVnetsPagingData] = React.useState<IUiPagingData>({
    totalCount: 0,
    pageOffset: 1,
    pageSize: 50,
  });
  const [tagsPagingData, setTagsPagingData] = React.useState<IUiPagingData>({
    totalCount: 0,
    pageOffset: 1,
    pageSize: 50,
  });

  const [selectedVnetworkMatchKey, setSelectedVnetworkMatchKey] = React.useState<SegmentNetworkSegMatchKey>(SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID);

  React.useEffect(() => {
    if (selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) {
      onTryLoadVnets(vnetsPagingData);
    } else {
      onTryLoadTags(tagsPagingData);
    }
  }, [selectedVnetworkMatchKey]);

  React.useEffect(() => {
    if (vnetsRes) {
      if (vnetsRes.vnets && vnetsRes.vnets.length) {
        setVnetsPagingData({ ...vnetsPagingData, totalCount: vnetsRes.totalCount });
        setVnets(vnetsRes.vnets);
      } else {
        setVnets([]);
      }
    }
  }, [vnetsRes]);

  React.useEffect(() => {
    if (tagsRes) {
      if (tagsRes.tags && tagsRes.tags.length) {
        setTagsPagingData({ ...tagsPagingData, totalCount: tagsRes.totalCount });
        setTags(tagsRes.tags);
      } else {
        setTags([]);
      }
    }
  }, [tagsRes]);

  const onSelectChange = (type: SegmentNetworkSegMatchKey, item: INetworkTag | INetworkVNetwork) => {
    if (type === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) {
      const _item = item as INetworkTag;
      const rule: ISegmentNetworkSegMatchRuleP = {
        matchKey: selectedVnetworkMatchKey,
        matchValuePrimary: _item.key,
        matchValueSecondary: _item.value,
      };
      props.onSelectChange(SegmentSegmentType.NETWORK, rule);
      return;
    }
    const _item = item as INetworkVNetwork;
    const rule: ISegmentNetworkSegMatchRuleP = {
      matchKey: selectedVnetworkMatchKey,
      matchValuePrimary: _item.extId,
      matchValueSecondary: null,
    };
    props.onSelectChange(SegmentSegmentType.NETWORK, rule);
  };

  const onSelectAll = (type: SegmentNetworkSegMatchKey, items: INetworkTag[] | INetworkVNetwork[]) => {
    const _items: ISegmentNetworkSegMatchRuleP[] = [];
    if (type === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) {
      items.forEach(it => {
        let _tag = it as INetworkTag;
        const rule: ISegmentNetworkSegMatchRuleP = {
          matchKey: selectedVnetworkMatchKey,
          matchValuePrimary: _tag.key,
          matchValueSecondary: _tag.value,
        };
        _items.push(rule);
      });
    }
    if (type === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) {
      items.forEach(it => {
        let _item = it as INetworkVNetwork;
        const rule: ISegmentNetworkSegMatchRuleP = {
          matchKey: selectedVnetworkMatchKey,
          matchValuePrimary: _item.extId,
          matchValueSecondary: null,
        };
        _items.push(rule);
      });
    }
    props.onSelectAll(SegmentSegmentType.NETWORK, _items);
  };

  const onChangePage = (type: SegmentNetworkSegMatchKey, page: number) => {
    if (type === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) {
      const _obj: IUiPagingData = { ...tagsPagingData, pageOffset: page };
      setTagsPagingData(_obj);
      onTryLoadTags(_obj);
      return;
    }
    const _obj: IUiPagingData = { ...vnetsPagingData, pageOffset: page };
    setVnetsPagingData(_obj);
    onTryLoadVnets(_obj);
  };
  const onChangePageSize = (type: SegmentNetworkSegMatchKey, size: number, page?: number) => {
    if (type === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) {
      const _obj: IUiPagingData = { ...tagsPagingData, pageSize: size };
      if (page) {
        _obj.pageOffset = page;
      }
      setTagsPagingData(_obj);
      onTryLoadTags(_obj);
      return;
    }
    const _obj: IUiPagingData = { ...vnetsPagingData, pageSize: size };
    if (page) {
      _obj.pageOffset = page;
    }
    setVnetsPagingData(_obj);
    onTryLoadVnets(_obj);
  };

  const onChangeMatchKey = (v: SegmentNetworkSegMatchKey) => {
    setSelectedVnetworkMatchKey(v);
  };

  const onTryLoadVnets = async (pageData: IUiPagingData) => {
    const _param = paramBuilder(pageData.pageSize, pageData.pageOffset);
    await onGetVnets(TopoApi.getVnetworks(), userContext.accessToken!, _param);
  };

  const onTryLoadTags = async (pageData: IUiPagingData) => {
    const _param = paramBuilder(pageData.pageSize, pageData.pageOffset, null, TAGS_RESOURCE_TYPE.VNetwork);
    await onGetTags(TopoApi.getTags(), userContext.accessToken!, _param);
  };

  return (
    <>
      <ModalRow margin="0 0 20px 0">
        <MatSelect
          id="networkMatchKeyType"
          label="Key"
          value={selectedVnetworkMatchKey}
          options={[SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID, SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG]}
          styles={{ height: '72px', minHeight: '72px', margin: '0' }}
          selectStyles={{ height: '50px', width: '100%' }}
          selectClaassName="withLabel"
          onChange={onChangeMatchKey}
          renderValue={(v: SegmentNetworkSegMatchKey) => {
            if (v === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) return <ValueLabel>VPC</ValueLabel>;
            if (v === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) return <ValueLabel>Tag</ValueLabel>;
            return <ValueLabel>{v}</ValueLabel>;
          }}
          renderOption={(v: SegmentNetworkSegMatchKey) => {
            if (v === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) return 'VPC';
            if (v === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) return 'Tag';
            return v;
          }}
        />
      </ModalRow>
      {selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID && (
        <VnetsTableComponent
          data={vnets}
          matchRules={props.matchRules}
          pagingData={vnetsPagingData}
          onSelectChange={onSelectChange}
          onSelectAll={onSelectAll}
          onChangePage={onChangePage}
          onChangePageSize={onChangePageSize}
          error={vnetsError ? vnetsError.message : null}
          loading={vnetsLoading}
        />
      )}
      {selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG && (
        <TagsTableComponent
          data={tags}
          matchRules={props.matchRules}
          pagingData={tagsPagingData}
          onSelectChange={onSelectChange}
          onSelectAll={onSelectAll}
          onChangePage={onChangePage}
          onChangePageSize={onChangePageSize}
          error={tagsError ? tagsError.message : null}
          loading={tagsLoading}
        />
      )}
    </>
  );
};

export default React.memo(VnetsTable);
