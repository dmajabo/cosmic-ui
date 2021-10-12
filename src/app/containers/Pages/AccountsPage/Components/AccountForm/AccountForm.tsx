import React from 'react';
import { IAccount } from '../../models';
import { closeIcon } from 'app/components/SVGIcons/close';
import IconButton from 'app/components/Buttons/IconButton';
import { ModalContent, ModalFooter, ModalHeader, ModalOverflowContainer } from '../../styles/styles';
import { StepItemFormRow, Title } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { getAccountIcon } from './helper';
import StepItem from './StepItem';
import { StepperItemStateType } from 'app/components/Stepper/model';
import TextInput from 'app/components/Inputs/TextInput';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { jsonClone } from 'lib/helpers/cloneHelper';

interface Props {
  dataItem: IAccount;
  onClose: () => void;
}

const AccountForm: React.FC<Props> = (props: Props) => {
  const [dataItem, setDataItem] = React.useState<IAccount>(null);

  React.useEffect(() => {
    const _data: IAccount = jsonClone(props.dataItem);
    setDataItem(_data);
  }, []);

  const onClose = () => {
    props.onClose();
  };

  const onChangeField = (value: string | null, field: string) => {
    const _item: IAccount = { ...dataItem };
    _item[field] = value;
    setDataItem(_item);
  };

  const onSave = () => {};
  if (!dataItem) return null;
  return (
    <>
      <ModalHeader>
        <IconWrapper width="48px" height="48px" styles={{ margin: 'auto 16px auto 0' }} icon={getAccountIcon(props.dataItem.type)} />
        <Title>
          {props.dataItem.id ? 'Manage' : 'Create'} {props.dataItem.type} Account
        </Title>
        <IconButton styles={{ position: 'absolute', top: '-20px', right: '-20px', border: 'none', background: 'transparent', zIndex: 2 }} icon={closeIcon} onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalOverflowContainer>
          <StepItem index="1" state={StepperItemStateType.EMPTY} label="Step 1: Add name and description">
            <StepItemFormRow>
              <TextInput
                id="editorAccountName"
                name="name"
                value={props.dataItem.name}
                label="Name"
                onChange={v => onChangeField(v, 'name')}
                // styles?: Object;
                required
              />
            </StepItemFormRow>
            <StepItemFormRow margin="0 auto 0 0">
              <TextInput
                id="editorAccountDescription"
                name="description"
                value={props.dataItem.description}
                label="Description"
                onChange={v => onChangeField(v, 'description')}
                // styles?: Object;
                area
              />
            </StepItemFormRow>
          </StepItem>
          <StepItem wrapStyles={{ margin: '0 0 0 0' }} index="2" state={StepperItemStateType.EMPTY} label="Step 2: Sign in into your Cisco Meraki account">
            <StepItemFormRow margin="0 auto 0 0">No data</StepItemFormRow>
          </StepItem>
        </ModalOverflowContainer>
      </ModalContent>
      <ModalFooter>
        <PrimaryButton
          bgColor="var(--_hoverButtonBg)"
          hoverBg="var(--_primaryButtonBg)"
          color="var(--_hoverButtonColor)"
          hoverColor="var(--_hoverButtonBg)"
          hoverBorderColor="var(--_hoverButtonBg)"
          label="Create Account"
          onClick={onSave}
          disabled={!dataItem.name}
          styles={{ width: '100%', height: '60px' }}
        />
      </ModalFooter>
    </>
  );
};

export default React.memo(AccountForm);
