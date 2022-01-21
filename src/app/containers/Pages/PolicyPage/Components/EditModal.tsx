import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { ISegmentApplicationSegMatchRuleP, ISegmentNetworkSegMatchRuleP, ISegmentSegmentP, ISegmentSiteSegmentMatchRuleP, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import * as helper from './helper';
import { ModalRow } from '../../Edges/Editor/Components/styles';
import TextInput from 'app/components/Inputs/TextInput';
import { ITopologySegmentFields } from '../Page/Segments/models';
import { jsonClone } from 'lib/helpers/cloneHelper';
import MatSelect from 'app/components/Inputs/MatSelect';
import ColorPiker from 'app/components/Inputs/ColorPiker';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { useGet, usePost, usePut } from 'lib/api/http/useAxiosHook';
import { INetworkDevice, INetworkVM, INetworkVNetwork, ISitesRes, IVmsRes, IVnetworksRes } from 'lib/api/ApiModels/Topology/apiModels';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { ModalContent, ModalFooter } from '../../Edges/Editor/Components/styles';
import VmsTable from './SegmentTypeComponents/VmsTable';
import { IUiPagingData } from 'lib/api/ApiModels/generalApiModel';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import VnetsTable from './SegmentTypeComponents/VnetsTable';
import DevicesTable from './SegmentTypeComponents/DevicesTable';

import { DEFAULT_SEGMENTS_COLORS_SCHEMA, FORM_STEPS, ISegmentComplete } from './models';

import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { IBaseEntity } from 'lib/models/general';
import _ from 'lodash';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import ModalStepper from 'app/components/Stepper/ModalStepper';

interface IProps {
  data: ISegmentSegmentP;
  onSaveSegmnet: (item: ISegmentSegmentP) => void;
}

const EditModal: React.FC<IProps> = (props: IProps) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const [segment, setSegment] = React.useState<ISegmentSegmentP>(props.data);
  const { loading: vnetsLoading, response: vnetsRes, error: vnetsError, onGet: onGetVnets } = useGet<IVnetworksRes>();
  const { loading: vmsLoading, response: vmsRes, error: vmsError, onGet: onGetVms } = useGet<IVmsRes>();
  const { loading: deviceLoading, response: deviceRes, error: deviceError, onGet: onGetDevices } = useGet<ISitesRes>();
  const { response: postRes, loading: postLoading, error: postError, onPost } = usePost<ISegmentSegmentP, IBaseEntity<string>>();
  const { response: putRes, loading: putLoading, error: putError, onPut } = usePut<ISegmentSegmentP, IBaseEntity<string>>();
  const { loading: getLoading, response: getRes, error: getError, onGet: onGetSegment } = useGet<ISegmentSegmentP>();
  const [vnets, setVnets] = React.useState<INetworkVNetwork[]>([]);
  const [vms, setVms] = React.useState<INetworkVM[]>([]);
  const [devices, setDevices] = React.useState<INetworkDevice[]>([]);
  const [vnetsPagingData, setVnetsPagingData] = React.useState<IUiPagingData>({
    totalCount: 0,
    pageOffset: 1,
    pageSize: 10,
  });
  const [vmsPagingData, setVmsPagingData] = React.useState<IUiPagingData>({
    totalCount: 0,
    pageOffset: 1,
    pageSize: 10,
  });
  const [devicesPagingData, setDevicesPagingData] = React.useState<IUiPagingData>({
    totalCount: 0,
    pageOffset: 1,
    pageSize: 10,
  });
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [completed, setCompleted] = React.useState<ISegmentComplete>({ step_1: false, step_2: false });
  const [hasChanges, setHasChanges] = React.useState<boolean>(false);

  React.useEffect(() => {
    const completed: ISegmentComplete = helper.onValidateSegment(segment);
    setCompleted(completed);
    if (segment && segment.segType) {
      if (segment.segType === SegmentSegmentType.NETWORK) {
        onTryLoadVnets(vnetsPagingData);
      }
      if (segment.segType === SegmentSegmentType.APPLICATION) {
        onTryLoadVms(vmsPagingData);
      }
      if (segment.segType === SegmentSegmentType.SITE) {
        onTryLoadDevices(devicesPagingData);
      }
    }
  }, []);

  React.useEffect(() => {
    if (vnetsRes) {
      if (vnetsRes.vnets && vnetsRes.vnets.length) {
        setVnets(vnetsRes.vnets);
      } else {
        setVnets([]);
      }
    }
  }, [vnetsRes]);

  React.useEffect(() => {
    if (vmsRes) {
      if (vmsRes.vms && vmsRes.vms.length) {
        setVms(vmsRes.vms);
      } else {
        setVms([]);
      }
    }
  }, [vmsRes]);

  React.useEffect(() => {
    if (deviceRes) {
      if (deviceRes.devices && deviceRes.devices.length) {
        setDevices(deviceRes.devices);
      } else {
        setDevices([]);
      }
    }
  }, [deviceRes]);

  React.useEffect(() => {
    if (postRes && postRes.id) {
      onTryLoadSegment(postRes.id);
    }
  }, [postRes]);

  React.useEffect(() => {
    if (putRes && putRes.id) {
      onTryLoadSegment(putRes.id);
    }
  }, [putRes]);

  React.useEffect(() => {
    if (getRes && getRes.id) {
      props.onSaveSegmnet(getRes);
    }
  }, [getRes]);

  const onChangeField = (_value: string | null, field: ITopologySegmentFields, err?: string) => {
    const _s: ISegmentSegmentP = jsonClone(segment);
    _s[field] = _value;
    const completed: ISegmentComplete = helper.onValidateSegment(_s);
    setCompleted(completed);
    setSegment(_s);
    if (_.isEqual(_s, props.data)) {
      setHasChanges(false);
    } else {
      setHasChanges(true);
    }
  };

  const onChangeType = (_value: SegmentSegmentType) => {
    const _s: ISegmentSegmentP = helper.changeSegmentType(segment, _value);
    const completed: ISegmentComplete = helper.onValidateSegment(_s);
    setSegment(_s);
    setCompleted(completed);
    if (_.isEqual(_s, props.data)) {
      setHasChanges(false);
    } else {
      setHasChanges(true);
    }
    if (completed.step_1) {
      setActiveStep(1);
    }
    if (_s.segType === SegmentSegmentType.NETWORK && (!vnets || !vnets.length)) {
      onTryLoadVnets(vnetsPagingData);
    }
    if (_s.segType === SegmentSegmentType.APPLICATION && (!vms || !vms.length)) {
      onTryLoadVms(vmsPagingData);
    }
    if (_s.segType === SegmentSegmentType.SITE && (!devices || !devices.length)) {
      onTryLoadDevices(devicesPagingData);
    }
  };

  const onChangeCurrentPage = (type: SegmentSegmentType, _page: number) => {
    if (type === SegmentSegmentType.SITE) {
      const _obj: IUiPagingData = jsonClone(devicesPagingData);
      _obj.pageOffset = _page;
      setDevicesPagingData(_obj);
      onTryLoadDevices(_obj);
      return;
    }
    if (type === SegmentSegmentType.APPLICATION) {
      const _obj: IUiPagingData = jsonClone(vmsPagingData);
      _obj.pageOffset = _page;
      setVmsPagingData(_obj);
      onTryLoadVms(_obj);
      return;
    }
    if (type === SegmentSegmentType.NETWORK) {
      const _obj: IUiPagingData = jsonClone(vnetsPagingData);
      _obj.pageOffset = _page;
      setVnetsPagingData(_obj);
      onTryLoadVnets(_obj);
    }
  };

  const onChangePageSize = (type: SegmentSegmentType, _size: number, _page?: number) => {
    if (type === SegmentSegmentType.SITE) {
      const _obj: IUiPagingData = jsonClone(devicesPagingData);
      if (_page) {
        _obj.pageOffset = _page;
      }
      _obj.pageSize = _size;
      setDevicesPagingData(_obj);
      onTryLoadDevices(_obj);
      return;
    }
    if (type === SegmentSegmentType.APPLICATION) {
      const _obj: IUiPagingData = jsonClone(vmsPagingData);
      if (_page) {
        _obj.pageOffset = _page;
      }
      _obj.pageSize = _size;
      setVmsPagingData(_obj);
      onTryLoadVms(_obj);
      return;
    }
    if (type === SegmentSegmentType.NETWORK) {
      const _obj: IUiPagingData = jsonClone(vnetsPagingData);
      if (_page) {
        _obj.pageOffset = _page;
      }
      _obj.pageSize = _size;
      setVnetsPagingData(_obj);
      onTryLoadVnets(_obj);
    }
  };

  const onSelectItem = (type: SegmentSegmentType, rule: ISegmentSiteSegmentMatchRuleP | ISegmentApplicationSegMatchRuleP | ISegmentNetworkSegMatchRuleP) => {
    const _s: ISegmentSegmentP = helper.updateMatchRule(segment, rule);
    const completed: ISegmentComplete = helper.onValidateSegment(_s);
    setSegment(_s);
    setCompleted(completed);
    if (_.isEqual(_s, props.data)) {
      setHasChanges(false);
    } else {
      setHasChanges(true);
    }
  };

  const onSelectAllItems = (type: SegmentSegmentType, rules: (ISegmentSiteSegmentMatchRuleP | ISegmentApplicationSegMatchRuleP | ISegmentNetworkSegMatchRuleP)[]) => {
    const _s: ISegmentSegmentP = helper.updateMatchRules(segment, rules);
    const completed: ISegmentComplete = helper.onValidateSegment(_s);
    setSegment(_s);
    setCompleted(completed);
    if (_.isEqual(_s, props.data)) {
      setHasChanges(false);
    } else {
      setHasChanges(true);
    }
  };

  const onSave = () => {
    if (segment.id) {
      onTryUpdateSegment(segment);
      return;
    }
    const _s: ISegmentSegmentP = helper.prepareNewSegment(segment);
    onTryCreateSegment(_s);
  };

  const handlerStepChange = (step: number) => {
    setActiveStep(step);
  };

  const onTryLoadVnets = async (pageData: IUiPagingData) => {
    const _param = paramBuilder(pageData.pageSize, pageData.pageOffset);
    await onGetVnets(TopoApi.getVnetworks(), userContext.accessToken!, _param);
  };

  const onTryLoadVms = async (pageData: IUiPagingData) => {
    const _param = paramBuilder(pageData.pageSize, pageData.pageOffset);
    await onGetVms(TopoApi.getVms(), userContext.accessToken!, _param);
  };

  const onTryLoadDevices = async (pageData: IUiPagingData) => {
    const _param = paramBuilder(pageData.pageSize, pageData.pageOffset);
    await onGetDevices(TopoApi.getSites(), userContext.accessToken!, _param);
  };

  const onTryCreateSegment = async (item: ISegmentSegmentP) => {
    await onPost(PolicyApi.postSegments(), { segment: item }, userContext.accessToken!);
  };

  const onTryUpdateSegment = async (item: ISegmentSegmentP) => {
    await onPut(PolicyApi.putSegmentsById(item.id), { segment: item, segmentId: item.id }, userContext.accessToken!);
  };

  const onTryLoadSegment = async (id: string) => {
    await onGetSegment(PolicyApi.getSegmentsById(id), userContext.accessToken!);
  };

  return (
    <>
      <ModalContent style={{ height: 'calc(100% - 112px)', display: 'flex', flexDirection: 'column' }}>
        <ModalRow margin="0 0 20px 0">
          <ModalStepper activeStep={activeStep} steps={FORM_STEPS} completed={completed} onChange={handlerStepChange} />
        </ModalRow>

        {activeStep === 0 && (
          <>
            <ModalRow margin="0">
              <TextInput
                required
                id="segmentName"
                name="segmentName"
                value={segment.name}
                label="Name"
                styles={{ width: 'calc(100% - 60px)', margin: '0 auto 20px 0' }}
                inputStyles={{ height: '50px' }}
                onChange={_value => onChangeField(_value, ITopologySegmentFields.NAME)}
              />
              <ColorPiker
                label=" "
                styles={{ width: '50px', margin: '0 auto 0 10px' }}
                id="segmentColorPiker"
                color={segment.color}
                colorSchema={DEFAULT_SEGMENTS_COLORS_SCHEMA}
                onChange={_value => onChangeField(_value, ITopologySegmentFields.COLOR)}
              />
            </ModalRow>
            <ModalRow margin="0 0 20px 0">
              <TextInput
                id="segmentDescription"
                name="segmentDescription"
                value={segment.description}
                label="Description"
                onChange={_value => onChangeField(_value, ITopologySegmentFields.DESCRIPTION)}
                type="textarea"
              />
            </ModalRow>
            <ModalRow margin="0 0 20px 0">
              <MatSelect
                id="groupType"
                label="Type"
                value={segment.segType}
                options={[SegmentSegmentType.NETWORK, SegmentSegmentType.SITE, SegmentSegmentType.APPLICATION]}
                styles={{ height: '72px', minHeight: '72px', margin: '0' }}
                selectStyles={{ height: '50px', width: '100%' }}
                required
                selectClaassName="withLabel"
                onChange={onChangeType}
                readOnly={!!segment.id}
                renderValue={(v: string) => <ValueLabel>{v}</ValueLabel>}
              />
            </ModalRow>
          </>
        )}
        {activeStep === 1 && (
          <>
            {segment.segType === SegmentSegmentType.APPLICATION && (
              <VmsTable
                data={vms}
                pageData={vmsPagingData}
                matchRules={segment.appSegPol && segment.appSegPol.matchRules ? segment.appSegPol.matchRules : []}
                onSelectChange={onSelectItem}
                onSelectAll={onSelectAllItems}
                onChangeCurrentPage={onChangeCurrentPage}
                onChangePageSize={onChangePageSize}
                loading={vmsLoading}
                error={vmsError && vmsError.message ? vmsError.message : null}
              />
            )}
            {segment.segType === SegmentSegmentType.NETWORK && (
              <VnetsTable
                data={vnets}
                pageData={vnetsPagingData}
                matchRules={segment.networkSegPol && segment.networkSegPol.matchRules ? segment.networkSegPol.matchRules : []}
                onSelectChange={onSelectItem}
                onSelectAll={onSelectAllItems}
                onChangeCurrentPage={onChangeCurrentPage}
                onChangePageSize={onChangePageSize}
                loading={vnetsLoading}
                error={vnetsError && vnetsError.message ? vnetsError.message : null}
              />
            )}
            {segment.segType === SegmentSegmentType.SITE && (
              <DevicesTable
                data={devices}
                pageData={devicesPagingData}
                matchRules={segment.siteSegPol && segment.siteSegPol.matchRules ? segment.siteSegPol.matchRules : []}
                onSelectChange={onSelectItem}
                onSelectAll={onSelectAllItems}
                onChangeCurrentPage={onChangeCurrentPage}
                onChangePageSize={onChangePageSize}
                loading={deviceLoading}
                error={deviceError && deviceError.message ? deviceError.message : null}
              />
            )}
          </>
        )}
        {postError && postError.message && (
          <ErrorMessage margin="auto 0 0 0" padding="20px 0 0 0">
            {postError.message}
          </ErrorMessage>
        )}
        {putError && putError.message && (
          <ErrorMessage margin="auto 0 0 0" padding="20px 0 0 0">
            {putError.message}
          </ErrorMessage>
        )}
        {getError && getError.message && (
          <ErrorMessage margin="auto 0 0 0" padding="20px 0 0 0">
            {getError.message}
          </ErrorMessage>
        )}
      </ModalContent>
      <ModalFooter style={{ height: '60px' }}>
        {activeStep === 0 && <PrimaryButton disabled={!completed.step_1} styles={{ width: '100%', height: '100%' }} label="Next" onClick={() => setActiveStep(1)} />}
        {activeStep === 1 && (
          <>
            <SecondaryButton styles={{ width: 'calc(50% - 10px)', height: '100%', margin: '0 10px 0 0' }} label="Back" onClick={() => setActiveStep(0)} />
            <PrimaryButton
              styles={{ width: 'calc(50% - 10px)', height: '100%', margin: '0 0px 0 10px' }}
              label={segment.id ? 'Update segment' : 'Add segment'}
              onClick={onSave}
              disabled={!hasChanges || !completed.step_1 || !completed.step_2}
            />
          </>
        )}
      </ModalFooter>
      {(postLoading || putLoading || getLoading) && (
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </>
  );
};

export default React.memo(EditModal);
