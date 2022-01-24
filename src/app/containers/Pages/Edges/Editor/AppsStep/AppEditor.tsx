import React from 'react';
import { EditGroupItem } from '../../model';
import TextInput from 'app/components/Inputs/TextInput';
import { Input, InputWrapper, TextInputWrapper } from 'app/components/Inputs/TextInput/styles';
import { InputLabel } from 'app/components/Inputs/styles/Label';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { INetworkVM, ITopologyGroup, IVmsRes, SelectorEvalType } from 'lib/api/ApiModels/Topology/apiModels';
import RadioButton from 'app/components/Inputs/RadioButton';
import ExpresionWrapper from '../Components/ExpresionWrapper';
import { ModalContent, ModalFooter, ModalRow } from '../Components/styles';
import { useGet, usePost, usePut } from 'lib/api/http/useAxiosHook';
import { IBaseEntity, IObject } from 'lib/models/general';
import AppsGridWrapper from '../Components/AppsGridWrapper';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';

interface Props {
  data: EditGroupItem;
  onAddGroup: (group: ITopologyGroup) => void;
}

const AppEditor: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const [dataItem, setDataItem] = React.useState<ITopologyGroup>(props.data.group);
  const [radioGroupValue, setRadioGroupValue] = React.useState<SelectorEvalType>(props.data.group.evalType || SelectorEvalType.SPECIFIC);
  const { response: loadGroupRes, loading, onGet: onLoadGroup } = useGet<ITopologyGroup>();
  const { response: postRes, error: postError, loading: postLoading, onPost } = usePost<ITopologyGroup, IBaseEntity<string>>();
  const { response: postUpdateRes, error: putError, loading: postUpdateLoading, onPut: onUpdate } = usePut<ITopologyGroup, ITopologyGroup>();
  const { loading: loadingDev, error: errorDev, response: responseApps, onGet: onLoadApps } = useGet<IVmsRes>();
  const [exprError, setExprError] = React.useState<string | null>(null);
  const [devices, setDevices] = React.useState<INetworkVM[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [resError, setResError] = React.useState<IObject<string>>({});

  React.useEffect(() => {
    onTryLoadApps(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (responseApps && responseApps.vms) {
      setDevices(responseApps.vms);
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
      props.onAddGroup(loadGroupRes);
    }
  }, [loadGroupRes]);

  React.useEffect(() => {
    if (postError) {
      if (postError.code && postError.code.toString() === '2') {
        const _obj: IObject<string> = resError ? { ...resError } : {};
        setResError({ ..._obj, name: postError.message });
      }
    }
  }, [postError]);

  React.useEffect(() => {
    if (putError) {
      if (putError.code && putError.code.toString() === '2') {
        const _obj: IObject<string> = resError ? { ...resError } : {};
        setResError({ ..._obj, name: putError.message });
      }
    }
  }, [putError]);

  const onChangeName = (v: any) => {
    const _item: ITopologyGroup = { ...dataItem };
    _item.name = v;
    setDataItem(_item);
    if (resError && resError['name']) {
      const _err = { ...resError };
      delete _err.name;
      setResError(_err);
    }
  };

  const onSelectRowChange = (item: INetworkVM) => {
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

  const handleChange = (checked: boolean, value: SelectorEvalType) => {
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

  const onSelectAll = (items: INetworkVM[]) => {
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
    await onUpdate(PolicyApi.postUpdateGroup(_data.id), { group: _data }, userContext.accessToken!);
  };

  const onCreateGroup = async (_data: ITopologyGroup) => {
    await onPost(PolicyApi.postCreateGroup(), { group: _data }, userContext.accessToken!);
  };

  const onGetGroup = async (id: string) => {
    await onLoadGroup(PolicyApi.getGroupById(id), userContext.accessToken!);
  };

  const onTryLoadApps = async (pageSize: number, currentPage: number) => {
    const _param = paramBuilder(pageSize, currentPage);
    await onLoadApps(TopoApi.getVms(), userContext.accessToken!, _param);
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
        <TextInput
          error={resError && resError['name'] ? resError['name'] : null}
          id="networkName"
          name="name"
          value={dataItem.name}
          label="Name"
          onChange={onChangeName}
          styles={{ margin: '0 0 20px 0' }}
          required
          inputStyles={{ height: '50px' }}
        />
        <ModalRow>
          <RadioButton
            wrapstyles={{ margin: '0 30px 0 0' }}
            checked={radioGroupValue === SelectorEvalType.SPECIFIC}
            onValueChange={handleChange}
            value={SelectorEvalType.SPECIFIC}
            label="Use Specific Apps"
            name="radio-buttons"
          />
          <RadioButton checked={radioGroupValue === SelectorEvalType.EXPR} onValueChange={handleChange} value={SelectorEvalType.EXPR} name="radio-buttons" label="Use Expression" />
        </ModalRow>
        {radioGroupValue === SelectorEvalType.EXPR && <ExpresionWrapper error={exprError} value={dataItem.expr} type={dataItem.type} onChangeField={onChangeExpresion} />}

        {radioGroupValue === SelectorEvalType.SPECIFIC && (
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
          label={!dataItem.id ? 'Add group' : 'Update Group'}
          onClick={onSaveChanges}
        />
      </ModalFooter>
    </>
  );
};

export default React.memo(AppEditor);
