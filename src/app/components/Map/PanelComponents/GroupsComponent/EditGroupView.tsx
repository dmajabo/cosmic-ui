import React from 'react';
import TextInput from 'app/components/Inputs/TextInput';
import { ITopologyGroup, TopologyGroupTypesAsNumber } from 'lib/models/topology';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { ButtonsGroup, GroupWrapper } from './styles';
import Dropdown from 'app/components/Inputs/Dropdown';
import { ISelectedListItem } from 'lib/models/general';
import { ITopologyGroupFields, PossibleJoins, PossibleOperators, SelectGroupTypes } from './model';
import ExpresionComponent from 'app/components/Inputs/ExpresionComponent';
import { getPossibleKeys, onValidateGroup } from './helpers';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
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
  });
  const [isGroupValid, setIsGroupValid] = React.useState<boolean>(onValidateGroup(props.group));
  const [possibleKeys, setPossibleKeys] = React.useState<ISelectedListItem<any>[] | null>(props.group ? getPossibleKeys(props.group.type) : null);
  const [possibleOperators] = React.useState<ISelectedListItem<any>[] | null>(jsonClone(PossibleOperators));
  const [possibleJoins] = React.useState<ISelectedListItem<any>[] | null>(jsonClone(PossibleJoins));
  const [error, setError] = React.useState<string | null>(props.error || null);

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
      <TextInput id="groupName" name="groupName" value={group.name} label="Group Name" onChange={_value => onChangeField(_value, ITopologyGroupFields.NAME)} />
      <Dropdown wrapStyles={{ flexDirection: 'column', width: '100%' }} label="Type" selectedValue={group.type} values={SelectGroupTypes} onSelectValue={onChangeType} />
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
