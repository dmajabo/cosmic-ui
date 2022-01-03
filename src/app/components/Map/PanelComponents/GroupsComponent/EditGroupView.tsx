import React from 'react';
import TextInput from 'app/components/Inputs/TextInput';
import { TopologyGroupTypesAsNumber } from 'lib/models/topology';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { ButtonsGroup, GroupWrapper } from './styles';
import { ISelectedListItem } from 'lib/models/general';
import { ITopologyGroupFields, PossibleJoins, PossibleOperators, SelectGroupTypes } from './model';
import ExpresionComponent from 'app/components/Inputs/ExpresionComponent';
import { getPossibleKeys, onValidateGroup } from './helpers';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ITopologyGroup, SelectorEvalType } from 'lib/api/ApiModels/Topology/apiModels';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import { getSelectedItem } from 'lib/helpers/selectionHelper';
interface IProps {
  group?: ITopologyGroup;
  onCancel: () => void;
  onSave: (_group: ITopologyGroup) => void;
  error?: string;
}

const EditGroupView: React.FC<IProps> = (props: IProps) => {
  const [group, setGroup] = React.useState<ITopologyGroup>({
    id: props.group ? props.group.id : '',
    name: props.group ? props.group.name : '',
    type: props.group ? props.group.type : null,
    expr: props.group ? props.group.expr : '',
    evalType: props.group ? props.group.evalType : SelectorEvalType.EXPR,
    extIds: [],
  });
  const [isGroupValid, setIsGroupValid] = React.useState<boolean>(onValidateGroup(props.group));
  const [possibleKeys, setPossibleKeys] = React.useState<ISelectedListItem<any>[] | null>(props.group ? getPossibleKeys(props.group.type) : null);
  const [possibleOperators] = React.useState<ISelectedListItem<any>[] | null>(jsonClone(PossibleOperators));
  const [possibleJoins] = React.useState<ISelectedListItem<any>[] | null>(jsonClone(PossibleJoins));
  const [error, setError] = React.useState<string | null>(props.error || null);
  const [selectedType, setSelectedType] = React.useState<ISelectedListItem<TopologyGroupTypesAsNumber>>(null);

  React.useEffect(() => {
    const _selectedItem = getSelectedItem(SelectGroupTypes, group.type, 'id');
    setSelectedType(_selectedItem);
  }, []);

  React.useEffect(() => {
    if (props.error !== error) {
      setError(props.error);
    }
  }, [props.error]);

  const onChangeField = (_value: string | null, field: ITopologyGroupFields, err?: string) => {
    const _group: ITopologyGroup = jsonClone(group);
    _group[field] = _value;
    const isValid = onValidateGroup(_group) && !err;
    if (err) {
      setError(err);
    } else if (error && !err) {
      setError(null);
    }
    setGroup(_group);
    setIsGroupValid(isValid);
  };

  const onChangeType = (_item: ISelectedListItem<TopologyGroupTypesAsNumber>) => {
    const _group: ITopologyGroup = jsonClone(group);
    _group.type = _item.value;
    const _possibleKeys: ISelectedListItem<any>[] | null = getPossibleKeys(_group.type);
    const isValid = onValidateGroup(_group);
    setGroup(_group);
    setSelectedType(_item);
    setIsGroupValid(isValid);
    setPossibleKeys(_possibleKeys);
  };

  const onCancel = () => {
    props.onCancel();
  };

  const onCreate = () => {
    if (!isGroupValid) {
      return;
    }
    if (!group.expr) {
      group.expr = "Name=='Office'";
    }
    if (!group.id) {
      delete group.id;
    }
    props.onSave(group);
  };

  return (
    <GroupWrapper>
      <TextInput
        required
        id="groupName"
        name="groupName"
        value={group.name}
        label="Group Name"
        inputStyles={{ height: '50px' }}
        onChange={_value => onChangeField(_value, ITopologyGroupFields.NAME)}
      />
      <MatSelect
        id="groupType"
        label="Type"
        value={selectedType}
        options={SelectGroupTypes}
        styles={{ height: '72px', minHeight: '72px', margin: '0 0 20px 0' }}
        selectStyles={{ height: '50px', width: '100%' }}
        required
        selectClaassName="withLabel"
        onChange={onChangeType}
        renderValue={(v: ISelectedListItem<TopologyGroupTypesAsNumber>) => <ValueLabel>{v.label}</ValueLabel>}
      />
      <ExpresionComponent
        disabled={!group.type}
        label="Expression"
        type={group.type}
        value={group.expr}
        possibleKeys={possibleKeys}
        possibleOperators={possibleOperators}
        possibleJoins={possibleJoins}
        className={error ? 'error' : null}
        onChange={(_value, err) => onChangeField(_value, ITopologyGroupFields.EXPRESION, err)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonsGroup>
        <SecondaryButton label="cancel" onClick={onCancel} />
        <PrimaryButton styles={{ margin: '0 0 0 12px' }} label={group.id ? 'update' : 'create'} icon={group.id ? null : addIcon} onClick={onCreate} disabled={!isGroupValid} />
      </ButtonsGroup>
    </GroupWrapper>
  );
};
export default React.memo(EditGroupView);
