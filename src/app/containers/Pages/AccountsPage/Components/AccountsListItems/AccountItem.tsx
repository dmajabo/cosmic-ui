import React from 'react';
import { AccountStatus, IAWS_Account, IAZURE_Account, IMeraki_Account } from 'lib/api/ApiModels/Accounts/apiModel';
import { AccountItemDescription, AccountItemFooter, AccountItemHeader, AccountItemTitle, AccountItemWrapper, StatusLabel, StatusWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { getAccountIcon } from '../AccountForm/helper';
import { successCheckMarkIcon } from 'app/components/SVGIcons/statusIcons';
import { editIcon } from 'app/components/SVGIcons/edit';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { deleteIcon } from 'app/components/SVGIcons/delete';

interface Props {
  dataItem: IMeraki_Account | IAWS_Account | IAZURE_Account;
  onEdit: (item: IMeraki_Account | IAWS_Account | IAZURE_Account) => void;
  onDelete: (id: string) => void;
}
const AccountItem: React.FC<Props> = (props: Props) => {
  const onEdit = () => {
    props.onEdit(props.dataItem);
  };
  const onDelete = () => {
    props.onDelete(props.dataItem.id);
  };
  return (
    <AccountItemWrapper>
      <AccountItemHeader>
        <IconWrapper styles={{ margin: '0 16px 0 0' }} width="48px" height="48px" icon={getAccountIcon(props.dataItem.vendor)} />
        <AccountItemTitle>{props.dataItem.name}</AccountItemTitle>
        <IconWrapper classes="visibleOnHover" onClick={onDelete} styles={{ position: 'absolute', top: '-5px', right: '0' }} width="20px" height="20px" icon={deleteIcon()} />
      </AccountItemHeader>
      <AccountItemDescription>{props.dataItem.description}</AccountItemDescription>
      <AccountItemFooter>
        {props.dataItem.status && (
          <StatusWrapper state={props.dataItem.status}>
            {props.dataItem.status === AccountStatus.CONNECTED && <IconWrapper styles={{ margin: '0 12px 0 0' }} width="16px" height="16px" icon={successCheckMarkIcon} />}
            {props.dataItem.status === AccountStatus.DISCONNECTED && <IconWrapper styles={{ margin: '0 12px 0 0' }} width="16px" height="16px" icon={successCheckMarkIcon} />}
            <StatusLabel>{props.dataItem.status}</StatusLabel>
          </StatusWrapper>
        )}
        <SecondaryButton label="Edit" icon={editIcon} styles={{ margin: '0 0 0 auto', height: '40px', width: '142px' }} onClick={onEdit} />
      </AccountItemFooter>
    </AccountItemWrapper>
  );
};

export default React.memo(AccountItem);
