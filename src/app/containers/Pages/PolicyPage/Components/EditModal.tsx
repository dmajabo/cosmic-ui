import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { ISegmentSegmentP, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import * as helper from './helper';
import { ModalRow } from '../../Edges/Editor/Components/styles';
import TextInput from 'app/components/Inputs/TextInput';
import { ITopologySegmentFields } from '../Page/Segments/models';
import { jsonClone } from 'lib/helpers/cloneHelper';
import MatSelect from 'app/components/Inputs/MatSelect';
import ColorPiker from 'app/components/Inputs/ColorPiker';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ICloudVNetworkP, IVnetworksRes } from 'lib/api/ApiModels/Topology/apiModels';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { ModalContent, ModalFooter } from '../../Edges/Editor/Components/styles';
interface IProps {
  data?: ISegmentSegmentP;
  loading: boolean;
  error: string;
  onCreate: (item: ISegmentSegmentP) => void;
  onUpdate: (item: ISegmentSegmentP) => void;
}

const EditModal: React.FC<IProps> = (props: IProps) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const [segment, setSegment] = React.useState<ISegmentSegmentP>(props.data ? { ...props.data } : helper.createNewSegment());
  const { loading: vnetsLading, response: vnetsRes, error: vnetsError, onGet: onGetVnets } = useGet<IVnetworksRes>();
  const [isSegmentValid, setIsSegmentValid] = React.useState<boolean>(helper.onValidateGroup(segment));
  const [validationError, setError] = React.useState<string | null>(props.error || null);
  const [vnets, setVnets] = React.useState<ICloudVNetworkP[]>([]);

  React.useEffect(() => {
    if (props.error !== validationError) {
      setError(props.error);
    }
  }, [props.error]);

  React.useEffect(() => {
    if (vnetsRes) {
      if (vnetsRes.vnets && vnetsRes.vnets.length) {
        setVnets(vnetsRes.vnets);
      } else {
        setVnets([]);
      }
    }
  }, [vnetsRes]);

  const onChangeField = (_value: string | null, field: ITopologySegmentFields, err?: string) => {
    const _s: ISegmentSegmentP = jsonClone(segment);
    _s[field] = _value;
    const isValid = helper.onValidateGroup(_s) && !err;
    if (err) {
      setError(err);
    } else if (validationError && !err) {
      setError(null);
    }
    setIsSegmentValid(isValid);
    setSegment(_s);
  };

  const onChangeType = (_value: SegmentSegmentType) => {
    const _s: ISegmentSegmentP = helper.changeSegmentType(segment, _value);
    const isValid = helper.onValidateGroup(_s);
    setIsSegmentValid(isValid);
    setSegment(_s);
    if (_s.segType === SegmentSegmentType.NETWORK && (!vnets || !vnets.length)) {
      onTryLoadVnets();
    }
  };

  const onSave = () => {
    if (segment.id) {
      props.onUpdate(segment);
    }
    props.onCreate(segment);
  };

  const onTryLoadVnets = async () => {
    await onGetVnets(TopoApi.getVnetworks(), userContext.accessToken!);
  };

  return (
    <>
      <ModalContent style={{ height: 'calc(100% - 112px)', display: 'flex', flexDirection: 'column' }}>
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
            styles={{ height: '72px', minHeight: '72px', margin: '0 0 20px 0' }}
            selectStyles={{ height: '50px', width: '100%' }}
            required
            selectClaassName="withLabel"
            onChange={onChangeType}
            readOnly={!!segment.id}
            renderValue={(v: string) => <ValueLabel>{v}</ValueLabel>}
          />
        </ModalRow>
        <ModalRow margin="0 0 20px 0">
          {segment.segType === SegmentSegmentType.NETWORK && (
            <MatSelect
              id="vnetsList"
              label="Source"
              value={null}
              options={[SegmentSegmentType.NETWORK, SegmentSegmentType.SITE, SegmentSegmentType.APPLICATION]}
              styles={{ height: '72px', minHeight: '72px', margin: '0 0 20px 0' }}
              selectStyles={{ height: '50px', width: '100%' }}
              required
              selectClaassName="withLabel"
              onChange={onChangeType}
              readOnly={!!segment.id}
              renderValue={(v: string) => <ValueLabel>{v}</ValueLabel>}
            />
          )}
        </ModalRow>

        {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
        {vnetsError && vnetsError.message ? <ErrorMessage>{vnetsError.message}</ErrorMessage> : null}
      </ModalContent>
      <ModalFooter style={{ height: '60px' }}>
        <PrimaryButton styles={{ width: '100%', height: '100%' }} label={segment.id ? 'Update segment' : 'Add segment'} onClick={onSave} disabled={!isSegmentValid} />
      </ModalFooter>
      {(props.loading || vnetsLading) && (
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </>
  );
};

export default React.memo(EditModal);
