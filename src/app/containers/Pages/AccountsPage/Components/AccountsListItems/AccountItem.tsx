import React from 'react';
import { AccountStatus, IAccount } from 'lib/api/ApiModels/Accounts/apiModel';
import { AccountItemDescription, AccountItemFooter, AccountItemHeader, AccountItemTitle, AccountItemWrapper, StatusLabel, StatusWrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { getAccountIcon } from '../AccountForm/helper';
import { successCheckMarkIcon } from 'app/components/SVGIcons/statusIcons';
import { editIcon } from 'app/components/SVGIcons/edit';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';

interface Props {
  dataItem: IAccount;
  onEdit: (item: IAccount) => void;
}
const AccountItem: React.FC<Props> = (props: Props) => {
  const onEdit = () => {
    props.onEdit(props.dataItem);
  };
  return (
    <AccountItemWrapper>
      <AccountItemHeader>
        <IconWrapper styles={{ margin: '0 16px 0 0' }} width="48px" height="48px" icon={getAccountIcon(props.dataItem.type)} />
        <AccountItemTitle>{props.dataItem.name}</AccountItemTitle>
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
        <SecondaryButton
          label="Edit"
          icon={editIcon}
          styles={{ margin: '0 0 0 auto', height: '40px', width: '142px' }}
          // bgColor?: string;
          // hoverBg?: string;
          // color?: string;
          // hoverColor?: string;
          borderColor="var(--_borderColor)"
          // hoverBorderColor?: string;
          onClick={onEdit}
        />
      </AccountItemFooter>
    </AccountItemWrapper>
  );
};

export default React.memo(AccountItem);
