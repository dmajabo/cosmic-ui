import React from 'react';
import TextInput from 'app/components/Inputs/TextInput';
import { ButtonsGroup, GroupRow, GroupWrapper } from './styles';
import { ITopologySegmentFields } from './model';
import { onValidateGroup } from './helpers';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { ISegmentSegmentP, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import { jsonClone } from 'lib/helpers/cloneHelper';
import ColorPiker from 'app/components/Inputs/ColorPiker';

interface IProps {
  segment?: ISegmentSegmentP;
  onCancel: () => void;
  onSave: (_s: ISegmentSegmentP) => void;
  error?: string;
}

const EditSegmentView: React.FC<IProps> = (props: IProps) => {
  const [segment, setSegment] = React.useState<ISegmentSegmentP>({
    id: props.segment ? props.segment.id : '',
    name: props.segment ? props.segment.name : '',
    description: props.segment ? props.segment.description : '',
    segType: props.segment ? props.segment.segType : null,
    networkSegPol: props.segment ? props.segment.networkSegPol : null,
    appSegPol: props.segment ? props.segment.appSegPol : null,
    extSegPol: props.segment ? props.segment.extSegPol : null,
    serviceSegPol: props.segment ? props.segment.serviceSegPol : null,
    paasSegPol: props.segment ? props.segment.paasSegPol : null,
    siteSegPol: props.segment ? props.segment.siteSegPol : null,
    color: props.segment ? props.segment.color : '',
  });
  const [isSegmentValid, setIsSegmentValid] = React.useState<boolean>(onValidateGroup(props.segment));
  // const [possibleKeys, setPossibleKeys] = React.useState<ISelectedListItem<any>[] | null>(props.segment ? getPossibleKeys(props.segment.type) : null);
  // const [possibleOperators] = React.useState<ISelectedListItem<any>[] | null>(jsonClone(PossibleOperators));
  // const [possibleJoins] = React.useState<ISelectedListItem<any>[] | null>(jsonClone(PossibleJoins));
  const [error, setError] = React.useState<string | null>(props.error || null);

  React.useEffect(() => {
    if (props.error !== error) {
      setError(props.error);
    }
  }, [props.error]);

  const onChangeField = (_value: string | null, field: ITopologySegmentFields, err?: string) => {
    const _s: ISegmentSegmentP = jsonClone(segment);
    console.log(_value);
    _s[field] = _value;
    const isValid = onValidateGroup(_s) && !err;
    if (err) {
      setError(err);
    } else if (error && !err) {
      setError(null);
    }
    setIsSegmentValid(isValid);
    setSegment(_s);
  };

  const onChangeType = (_value: SegmentSegmentType) => {
    const _s: ISegmentSegmentP = jsonClone(segment);
    _s.segType = _value;
    const isValid = onValidateGroup(_s);
    setIsSegmentValid(isValid);
    setSegment(_s);
  };

  const onCancel = () => {
    props.onCancel();
  };

  const onCreate = () => {
    // if (!isGroupValid) {
    //   return;
    // }
    // if (!group.expr) {
    //   group.expr = "Name=='Office'";
    // }
    // if (!group.id) {
    //   delete group.id;
    // }
    // props.onSave(group);
  };

  return (
    <GroupWrapper>
      <GroupRow>
        <TextInput
          required
          id="segmentName"
          name="segmentName"
          value={segment.name}
          label="Segment Name"
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
      </GroupRow>
      <TextInput
        id="segmentDescription"
        name="segmentDescription"
        value={segment.description}
        label="Description"
        inputStyles={{ height: '50px' }}
        onChange={_value => onChangeField(_value, ITopologySegmentFields.DESCRIPTION)}
        type="textarea"
      />
      <MatSelect
        id="groupType"
        label="Type"
        value={segment.segType}
        options={[SegmentSegmentType.SITE, SegmentSegmentType.APPLICATION, SegmentSegmentType.NETWORK]}
        styles={{ height: '72px', minHeight: '72px', margin: '0 0 20px 0' }}
        selectStyles={{ height: '50px', width: '100%' }}
        required
        selectClaassName="withLabel"
        onChange={onChangeType}
        renderValue={(v: string) => <ValueLabel>{v}</ValueLabel>}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonsGroup>
        <SecondaryButton label="cancel" onClick={onCancel} />
        <PrimaryButton styles={{ margin: '0 0 0 12px' }} label={segment.id ? 'update' : 'create'} icon={segment.id ? null : addIcon} onClick={onCreate} disabled={!isSegmentValid} />
      </ButtonsGroup>
    </GroupWrapper>
  );
};
export default React.memo(EditSegmentView);
