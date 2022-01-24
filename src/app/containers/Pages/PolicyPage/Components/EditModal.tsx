import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import {
  ISegmentApplicationSegMatchRuleP,
  ISegmentExternalSegMatchRuleP,
  ISegmentNetworkSegMatchRuleP,
  ISegmentSegmentP,
  ISegmentSiteSegmentMatchRuleP,
  SegmentApplicationSegMatchKey,
  SegmentNetworkSegMatchKey,
  SegmentSegmentType,
  SegmentSiteSegmentMatchKey,
} from 'lib/api/ApiModels/Policy/Segment';
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
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { ModalContent, ModalFooter } from '../../Edges/Editor/Components/styles';
import VmsTable from './SegmentTypeComponents/VmStep/VmsTable';
import VnetsTable from './SegmentTypeComponents/NetworkStep/VnetsTable';
import DevicesTable from './SegmentTypeComponents/SitesStep/DevicesTable';

import { DEFAULT_SEGMENTS_COLORS_SCHEMA, FORM_STEPS, ISegmentComplete } from './models';

import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { IBaseEntity } from 'lib/models/general';
import _ from 'lodash';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import ModalStepper from 'app/components/Stepper/ModalStepper';
import ExternalStep from './SegmentTypeComponents/ExternalStep/ExternalStep';

interface IProps {
  data: ISegmentSegmentP;
  onSaveSegmnet: (item: ISegmentSegmentP) => void;
}

const EditModal: React.FC<IProps> = (props: IProps) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const [segment, setSegment] = React.useState<ISegmentSegmentP>(helper.updateSegmentDataToEdit(props.data));
  const { response: postRes, loading: postLoading, error: postError, onPost } = usePost<ISegmentSegmentP, IBaseEntity<string>>();
  const { response: putRes, loading: putLoading, error: putError, onPut } = usePut<ISegmentSegmentP, IBaseEntity<string>>();
  const { loading: getLoading, response: getRes, error: getError, onGet: onGetSegment } = useGet<ISegmentSegmentP>();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [completed, setCompleted] = React.useState<ISegmentComplete>({ step_1: false, step_2: false });
  const [hasChanges, setHasChanges] = React.useState<boolean>(false);
  const [selectedVnetworkMatchKey, setSelectedVnetworkMatchKey] = React.useState<SegmentNetworkSegMatchKey>(SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID);
  const [selectedSiteMatchKey, setSelectedSiteMatchKey] = React.useState<SegmentSiteSegmentMatchKey>(SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK);
  const [selectedAppMatchKey, setSelectedAppMatchKey] = React.useState<SegmentApplicationSegMatchKey>(SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG);
  React.useEffect(() => {
    const completed: ISegmentComplete = helper.onValidateSegment(segment);
    setCompleted(completed);
  }, []);

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

  const onUpdateExtRule = (rule: ISegmentExternalSegMatchRuleP, index?: number) => {
    const _s: ISegmentSegmentP = helper.updateMatchRule(segment, rule, index);
    const completed: ISegmentComplete = helper.onValidateSegment(_s);
    setSegment(_s);
    setCompleted(completed);
    if (_.isEqual(_s, props.data)) {
      setHasChanges(false);
    } else {
      setHasChanges(true);
    }
  };

  const onRemoveExtRule = (rule: ISegmentExternalSegMatchRuleP, index: number) => {
    const _s: ISegmentSegmentP = helper.removeMatchRule(segment, index, rule);
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
    const _s: ISegmentSegmentP = helper.prepareNewSegmentForSave(segment);
    onTryCreateSegment(_s);
  };

  const handlerStepChange = (step: number) => {
    setActiveStep(step);
  };

  const onChangeMatchKey = (type: SegmentSegmentType, v: any) => {
    if (type === SegmentSegmentType.NETWORK) {
      setSelectedVnetworkMatchKey(v);
      return;
    }
    if (type === SegmentSegmentType.SITE) {
      setSelectedSiteMatchKey(v);
      return;
    }
    if (type === SegmentSegmentType.APPLICATION) {
      setSelectedAppMatchKey(v);
      return;
    }
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
                options={[SegmentSegmentType.NETWORK, SegmentSegmentType.SITE, SegmentSegmentType.APPLICATION, SegmentSegmentType.EXTERNAL]}
                styles={{ height: '72px', minHeight: '72px', margin: '0' }}
                selectStyles={{ height: '50px', width: '100%' }}
                required
                selectClaassName="withLabel"
                onChange={onChangeType}
                readOnly={!!segment.id}
                renderValue={(v: string) => {
                  if (v === SegmentSegmentType.NETWORK) return <ValueLabel>VPC</ValueLabel>;
                  if (v === SegmentSegmentType.SITE) return <ValueLabel>Site</ValueLabel>;
                  if (v === SegmentSegmentType.APPLICATION) return <ValueLabel>VM</ValueLabel>;
                  if (v === SegmentSegmentType.EXTERNAL) return <ValueLabel>External</ValueLabel>;
                  return <ValueLabel>{v}</ValueLabel>;
                }}
                renderOption={(v: string) => {
                  if (v === SegmentSegmentType.NETWORK) return <ValueLabel>VPC</ValueLabel>;
                  if (v === SegmentSegmentType.SITE) return <ValueLabel>Site</ValueLabel>;
                  if (v === SegmentSegmentType.APPLICATION) return <ValueLabel>VM</ValueLabel>;
                  if (v === SegmentSegmentType.EXTERNAL) return <ValueLabel>External</ValueLabel>;
                  return <ValueLabel>{v}</ValueLabel>;
                }}
              />
            </ModalRow>
          </>
        )}
        {activeStep === 1 && (
          <>
            {segment.segType === SegmentSegmentType.APPLICATION && (
              <VmsTable
                matchRules={segment.appSegPol && segment.appSegPol.matchRules ? segment.appSegPol.matchRules : []}
                selectedMatchKey={selectedAppMatchKey}
                onChangeMatchKey={onChangeMatchKey}
                onSelectChange={onSelectItem}
                onSelectAll={onSelectAllItems}
              />
            )}
            {segment.segType === SegmentSegmentType.NETWORK && (
              <VnetsTable
                matchRules={segment.networkSegPol && segment.networkSegPol.matchRules ? segment.networkSegPol.matchRules : []}
                selectedMatchKey={selectedVnetworkMatchKey}
                onChangeMatchKey={onChangeMatchKey}
                onSelectChange={onSelectItem}
                onSelectAll={onSelectAllItems}
              />
            )}
            {segment.segType === SegmentSegmentType.SITE && (
              <DevicesTable
                matchRules={segment.siteSegPol && segment.siteSegPol.matchRules ? segment.siteSegPol.matchRules : []}
                selectedMatchKey={selectedSiteMatchKey}
                onChangeMatchKey={onChangeMatchKey}
                onSelectChange={onSelectItem}
                onSelectAll={onSelectAllItems}
              />
            )}
            {segment.segType === SegmentSegmentType.EXTERNAL && (
              <ExternalStep matchRules={segment.extSegPol && segment.extSegPol.matchRules ? segment.extSegPol.matchRules : []} onUpdateExtRule={onUpdateExtRule} onRemoveExtRule={onRemoveExtRule} />
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
