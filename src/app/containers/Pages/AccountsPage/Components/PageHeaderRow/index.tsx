import React from 'react';
import PrimaryButtonWithPopup from 'app/components/Buttons/PrimaryButton/PrimaryButtonWithPopup';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { AccountTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { ActionRow } from '../../styles/styles';
import AddPopupItem from '../AddPopupItem';

interface Props {
  onCreateAccount: (type: AccountTypes) => void;
}

const PageHeaderRow: React.FC<Props> = (props: Props) => {
  const onCreateAccount = (type: AccountTypes) => {
    props.onCreateAccount(type);
  };
  return (
    <ActionRow>
      <PrimaryButtonWithPopup wrapStyles={{ margin: '0 0 0 auto' }} id="addAccounts" label="ADD account" icon={plusIcon} onClick={onCreateAccount}>
        <AddPopupItem id={AccountTypes.MERRAKI} label="Cisco Meraki" icon={ciscoMerakiLogoIcon(18)} onClick={onCreateAccount} />
        <AddPopupItem id={AccountTypes.AWS} label="AWS" icon={awsIcon(18)} onClick={onCreateAccount} />
      </PrimaryButtonWithPopup>
    </ActionRow>
  );
};

export default React.memo(PageHeaderRow);
