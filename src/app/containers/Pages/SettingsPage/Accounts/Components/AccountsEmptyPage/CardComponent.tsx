import React from 'react';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { getAccountIcon } from '../AccountForm/helper';
import { AccountItemWrapper, AccountItemHeader, AccountItemTitle, AccountItemDescription, AccountItemFooter } from '../AccountsListItems/styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';

interface Props {
  title: string;
  vendor: AccountVendorTypes;
  description: string;
  onConnect: (type: AccountVendorTypes) => void;
  styles?: Object;
}

const CardComponent: React.FC<Props> = ({ title, onConnect, vendor, description, styles }) => {
  const onClick = () => {
    onConnect(vendor);
  };

  return (
    <AccountItemWrapper style={styles}>
      <AccountItemHeader>
        <IconWrapper styles={{ margin: '0 16px 0 0' }} width="48px" height="48px" icon={getAccountIcon(vendor)} />
        <AccountItemTitle>{title}</AccountItemTitle>
      </AccountItemHeader>
      <AccountItemDescription>{description}</AccountItemDescription>
      <AccountItemFooter>
        <SecondaryButton label="CONNECT" icon={plusIcon} styles={{ margin: '0 0 0 auto', height: '40px', width: '142px' }} onClick={onClick} />
      </AccountItemFooter>
    </AccountItemWrapper>
  );
};

export default React.memo(CardComponent);
