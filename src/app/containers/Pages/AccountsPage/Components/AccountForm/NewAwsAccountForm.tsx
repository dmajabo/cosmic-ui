import React from 'react';
import { IAWS_Account } from 'lib/api/ApiModels/Accounts/apiModel';
import { ModalContent, ModalFooter, ModalOverflowContainer } from '../../styles/styles';
import { StepItemFormRow } from './styles';
import StepItem from './StepItem';
import { StepperItemStateType } from 'app/components/Stepper/model';
import TextInput from 'app/components/Inputs/TextInput';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { jsonClone } from 'lib/helpers/cloneHelper';
import AccountFormHeader from './AccountFormHeader';
import CheckBox from 'app/components/Inputs/Checkbox/CheckBox';
import MultipleDropdown from 'app/components/Inputs/MultipleDropdown';
import { useAccountsDataContext } from 'lib/hooks/Accounts/useAccountsDataContext';
import { usePost, usePut } from 'lib/api/http/useAxiosHook';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { AccountsApi } from 'lib/api/ApiModels/Accounts/endpoints';

interface Props {
  isEditMode: boolean;
  dataItem: IAWS_Account;
  onClose: () => void;
}

const regions = ['region 1', 'region 2', 'region 3', 'region 4', 'region 5'];
const NewAwsAccountForm: React.FC<Props> = (props: Props) => {
  const { accounts } = useAccountsDataContext();
  const { response: postRes, loading: postLoading, onPost } = usePost<IAWS_Account, IAWS_Account>();
  const { response: postUpdateRes, loading: postUpdateLoading, onPut: onUpdate } = usePut<IAWS_Account, IAWS_Account>();
  const [dataItem, setDataItem] = React.useState<IAWS_Account>(null);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    const _dataItem: IAWS_Account = jsonClone(props.dataItem);
    setIsValid(onValidate(_dataItem));
    setDataItem(_dataItem);
  }, []);

  React.useEffect(() => {
    if (postRes) {
      accounts.onCreateAccount(postRes);
    }
  }, [postRes]);

  React.useEffect(() => {
    if (postUpdateRes) {
      accounts.onUpdateAccount(postUpdateRes);
    }
  }, [postUpdateRes]);

  const onClose = () => {
    props.onClose();
  };

  const onChangeField = (value: string | null, field: string) => {
    const _item: IAWS_Account = { ...dataItem };
    _item[field] = value;
    setIsValid(onValidate(_item));
    setDataItem(_item);
  };

  const onChangePolicyField = (value: string | null, field: string) => {
    const _item: IAWS_Account = { ...dataItem };
    _item.awsPol[field] = value;
    setIsValid(onValidate(_item));
    setDataItem(_item);
  };

  const onEnabledPolicyChange = (checked: boolean) => {
    const _item: IAWS_Account = { ...dataItem };
    _item.awsPol.flowlogPol.enable = checked;
    setDataItem(_item);
  };

  const onRegionsChange = (_items: string[]) => {
    const _item: IAWS_Account = { ...dataItem };
    _item.awsPol.regions = _items;
    setIsValid(onValidate(_item));
    setDataItem(_item);
  };

  const onValidate = (_item: IAWS_Account): boolean => {
    if (!_item) return false;
    if (!_item.name) return false;
    if (!_item.awsPol.accessKey) return false;
    if (!_item.awsPol.secret) return false;
    if (!_item.awsPol.username) return false;
    if (!_item.awsPol.regions.length) return false;
    return true;
  };

  const onSave = () => {
    if (!props.isEditMode) {
      onCreateGroup();
      return;
    }
    onUpdateGroup();
  };

  const onUpdateGroup = async () => {
    await onUpdate(AccountsApi.putUpdateAccount(dataItem.name), dataItem);
  };

  const onCreateGroup = async () => {
    await onPost(AccountsApi.postCreateAccount(), dataItem);
  };
  if (!dataItem) return null;
  return (
    <>
      <AccountFormHeader vendor={dataItem.vendor} isEditMode={props.isEditMode} onClose={onClose} />
      <ModalContent>
        <ModalOverflowContainer>
          <StepItem index="1" state={StepperItemStateType.EMPTY} label="Step 1: Add name and description">
            <StepItemFormRow>
              <TextInput
                id="editorAccountName"
                name="name"
                value={dataItem.name}
                label="Name"
                onChange={v => onChangeField(v, 'name')}
                // styles?: Object;
                required
              />
            </StepItemFormRow>
            <StepItemFormRow>
              <TextInput
                id="editorAccountDescription"
                name="description"
                value={dataItem.description}
                label="Description"
                onChange={v => onChangeField(v, 'description')}
                // styles?: Object;
                area
              />
            </StepItemFormRow>
            <StepItemFormRow>
              <TextInput
                id="editorAccountUsername"
                name="username"
                value={dataItem.awsPol.username}
                label="User name"
                onChange={v => onChangePolicyField(v, 'username')}
                // styles?: Object;
                required
              />
            </StepItemFormRow>
            <StepItemFormRow>
              <TextInput
                id="editorAccountAccessKey"
                name="accessKey"
                value={dataItem.awsPol.accessKey}
                label="Access key"
                onChange={v => onChangePolicyField(v, 'accessKey')}
                // styles?: Object;
                required
              />
            </StepItemFormRow>
            <StepItemFormRow>
              <TextInput
                id="editorAccountSecretKey"
                name="secret"
                value={dataItem.awsPol.secret}
                label="Secret key"
                onChange={v => onChangePolicyField(v, 'secret')}
                // styles?: Object;
                required
              />
            </StepItemFormRow>
            <StepItemFormRow>
              <MultipleDropdown
                onChange={onRegionsChange}
                items={regions}
                value={dataItem.awsPol.regions}
                // styles?: Object;
                label="Regions"
                required
              />
            </StepItemFormRow>
            <StepItemFormRow margin="0">
              <CheckBox label="Enable Flowlog Collection" isChecked={dataItem.awsPol.flowlogPol.enable} toggleCheckboxChange={onEnabledPolicyChange} />
            </StepItemFormRow>
          </StepItem>
        </ModalOverflowContainer>
        {(postLoading || postUpdateLoading) && (
          <AbsLoaderWrapper>
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </ModalContent>
      <ModalFooter>
        <PrimaryButton label={props.isEditMode ? 'Update Account' : 'Create Account'} onClick={onSave} disabled={!isValid} styles={{ width: '100%', height: '60px' }} />
      </ModalFooter>
    </>
  );
};

export default React.memo(NewAwsAccountForm);