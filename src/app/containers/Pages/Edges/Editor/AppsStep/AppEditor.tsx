import React from 'react';
import { EditGroupItem } from '../../model';
import TextInput from 'app/components/Inputs/TextInput';
import { Input, InputWrapper, TextInputWrapper } from 'app/components/Inputs/TextInput/styles';
import { InputLabel } from 'app/components/Inputs/styles/Label';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { ITopologyGroup, SelectorEvalType, TopologyGroupApi } from 'lib/api/ApiModels/Topology/endpoints';
import RadioButton from 'app/components/Inputs/RadioButton';
import { GroupSelectFieldTypes } from '../model';
import ExpresionWrapper from '../Components/ExpresionWrapper';
import { ModalContent, ModalFooter, ModalRow } from '../Components/styles';
import { useGet, usePost, usePut } from 'lib/api/http/useAxiosHook';
import { IBaseEntity } from 'lib/models/general';
import AppsGridWrapper from '../Components/AppsGridWrapper';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { buildPagingParam, EdgesApi } from 'lib/api/ApiModels/Edges/edpoints';
import { IVm } from 'lib/models/topology';
import { IAppsRes } from 'lib/api/ApiModels/Edges/apiModel';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';

interface Props {
  data: EditGroupItem;
  onAddGroup: (group: ITopologyGroup, index: number | null) => void;
}

const AppEditor: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const [dataItemIndex] = React.useState<number | null>(props.data.index);
  const [dataItem, setDataItem] = React.useState<ITopologyGroup>(props.data.group);
  const [radioGroupValue, setRadioGroupValue] = React.useState<GroupSelectFieldTypes>(GroupSelectFieldTypes.EXT_IDS);
  const { response: loadGroupRes, loading, onGet: onLoadGroup } = useGet<ITopologyGroup>();
  const { response: postRes, loading: postLoading, onPost } = usePost<ITopologyGroup, IBaseEntity<string>>();
  const { response: postUpdateRes, loading: postUpdateLoading, onPut: onUpdate } = usePut<ITopologyGroup, ITopologyGroup>();
  const { loading: loadingDev, error: errorDev, response: responseApps, onGet: onLoadApps } = useGet<IAppsRes>();
  const [exprError, setExprError] = React.useState<string | null>(null);
  const [devices, setDevices] = React.useState<IVm[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  React.useEffect(() => {
    onTryLoadApps(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (responseApps && responseApps.apps) {
      setDevices(responseApps.apps);
      setTotalCount(responseApps.totalCount);
    }
  }, [responseApps]);

  React.useEffect(() => {
    if (postRes && postRes.id) {
      onGetGroup(postRes.id);
    }
  }, [postRes]);

  React.useEffect(() => {
    if (postUpdateRes && postUpdateRes.id) {
      onGetGroup(postUpdateRes.id);
    }
  }, [postUpdateRes]);

  React.useEffect(() => {
    if (loadGroupRes) {
      console.log(loadGroupRes, dataItemIndex);
      props.onAddGroup(loadGroupRes, dataItemIndex);
    }
  }, [loadGroupRes]);

  const onChangeName = (v: any) => {
    const _item: ITopologyGroup = { ...dataItem };
    _item.name = v;
    setDataItem(_item);
  };

  const onSelectRowChange = (item: IVm) => {
    const _item: ITopologyGroup = { ...dataItem };
    if (_item.evalType !== SelectorEvalType.SPECIFIC) {
      _item.evalType = SelectorEvalType.SPECIFIC;
    }
    const _arr = Array.isArray(_item.extIds) ? new Set<string>(_item.extIds) : new Set<string>();
    if (_arr.has(item.extId)) {
      _arr.delete(item.extId);
    } else {
      _arr.add(item.extId);
    }
    _item.extIds = Array.from(_arr);
    setDataItem(_item);
  };

  const handleChange = (checked: boolean, value: GroupSelectFieldTypes) => {
    if (value === radioGroupValue) return;
    setRadioGroupValue(value);
  };

  const onChangeExpresion = (_value: string | null, err?: string) => {
    const _item: ITopologyGroup = { ...dataItem };
    if (_item.evalType !== SelectorEvalType.EXPR) {
      _item.evalType = SelectorEvalType.EXPR;
    }
    _item.expr = _value;
    setExprError(err);
    setDataItem(_item);
  };

  const onSelectAll = (items: IVm[]) => {
    const _item: ITopologyGroup = { ...dataItem };
    if (_item.evalType !== SelectorEvalType.SPECIFIC) {
      _item.evalType = SelectorEvalType.SPECIFIC;
    }
    const _arr = Array.isArray(_item.extIds) ? new Set<string>(_item.extIds) : new Set<string>();
    const idsArr = _item.extIds.filter(id => items.find(item => item.extId === id));
    if (idsArr.length === items.length) {
      items.forEach(it => {
        _arr.delete(it.extId);
      });
    }
    if (idsArr.length !== items.length) {
      items.forEach(it => {
        _arr.add(it.extId);
      });
    }
    _item.extIds = Array.from(_arr);
    setDataItem(_item);
  };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    onTryLoadApps(pageSize, _page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      onTryLoadApps(size, page);
      return;
    }
    setPageSize(size);
    onTryLoadApps(size, currentPage);
  };

  const onSaveChanges = () => {
    if (!dataItem.id) {
      onCreateGroup(dataItem);
      return;
    }
    onUpdateGroup(dataItem);
  };

  const onUpdateGroup = async (_data: ITopologyGroup) => {
    await onUpdate(TopologyGroupApi.postUpdateGroup(_data.id), { group: _data }, userContext.accessToken!);
    // await postUpdateGroupAsync(TopologyGroupApi.postUpdateGroup(_data.id), { groupPol: _data });
  };

  const onCreateGroup = async (_data: ITopologyGroup) => {
    await onPost(TopologyGroupApi.postCreateGroup(), { group: _data }, userContext.accessToken!);
  };

  const onGetGroup = async (id: string) => {
    await onLoadGroup(TopologyGroupApi.getGroupById(id), userContext.accessToken!);
  };

  const onTryLoadApps = async (pageSize: number, currentPage: number) => {
    const _param = buildPagingParam(pageSize, currentPage);
    await onLoadApps(EdgesApi.getApps(), userContext.accessToken!, _param);
  };

  return (
    <>
      <ModalContent>
        <TextInputWrapper style={{ margin: '0 0 20px 0' }}>
          <InputLabel htmlFor="connectors">Connectors</InputLabel>
          <InputWrapper>
            <Input id="connectors" name="connectors" type="text" value="AWS" onChange={() => {}} readOnly height="50px" padding="8px 24px 8px 56px" />
            <IconWrapper width="24px" height="24px" styles={{ position: 'absolute', top: 'calc(50% - 12px)', left: '20px', pointerEvents: 'none' }} icon={awsIcon(24)} />
          </InputWrapper>
        </TextInputWrapper>
        <TextInput id="networkName" name="name" value={dataItem.name} label="Name" onChange={onChangeName} styles={{ margin: '0 0 20px 0' }} required inputStyles={{ height: '50px' }} />
        <ModalRow>
          <RadioButton
            checked={radioGroupValue === GroupSelectFieldTypes.EXT_IDS}
            onValueChange={handleChange}
            value={GroupSelectFieldTypes.EXT_IDS}
            label="Use List With Apps"
            name="radio-buttons"
            wrapstyles={{ margin: '0 30px 0 0' }}
          />
          <RadioButton
            checked={radioGroupValue === GroupSelectFieldTypes.EXPR}
            onValueChange={handleChange}
            value={GroupSelectFieldTypes.EXPR}
            name="radio-buttons"
            label="Use Expression"
            // wrapstyles={{ margin: selectedValue === TriggersTypes.NEW_TRIGGER ? '0 auto 12px 0' : '0 auto 20px 0' }}
          />
        </ModalRow>
        {radioGroupValue === GroupSelectFieldTypes.EXPR && <ExpresionWrapper error={exprError} value={dataItem.expr} type={dataItem.type} onChangeField={onChangeExpresion} />}

        {radioGroupValue === GroupSelectFieldTypes.EXT_IDS && (
          <AppsGridWrapper
            pageSize={pageSize}
            currentPage={currentPage}
            onSelectChange={onSelectRowChange}
            onSelectAll={onSelectAll}
            onChangeCurrentPage={onChangeCurrentPage}
            onChangePageSize={onChangePageSize}
            data={devices}
            totalCount={totalCount}
            selectedIds={dataItem.extIds}
            loading={loadingDev}
            error={errorDev && errorDev.message ? errorDev.message : null}
          />
        )}
        {(postLoading || postUpdateLoading || loading) && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </ModalContent>
      <ModalFooter>
        <PrimaryButton
          styles={{ width: '100%', height: '100%' }}
          disabled={!dataItem.name || (!dataItem.extIds.length && !dataItem.expr) || !!(!dataItem.extIds.length && dataItem.expr && exprError)}
          label="Add group"
          onClick={onSaveChanges}
        />
      </ModalFooter>
    </>
  );
};

export default React.memo(AppEditor);
