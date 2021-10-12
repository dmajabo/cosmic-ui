import React from 'react';
import PrimaryButtonWithPopup from 'app/components/Buttons/PrimaryButton/PrimaryButtonWithPopup';
import { PageWrapper, ActionRow } from './styles/styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import AddPopupItem from './Components/AddPopupItem';
import { AccountTypes, IAccount } from './models';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { IModal } from 'lib/models/general';
import ModalComponent from 'app/components/Modal';
import AccountForm from './Components/AccountForm/AccountForm';

interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const [showModal, setShowModal] = React.useState<IModal<IAccount>>({ show: false, dataItem: null });
  const onAddAccount = (type: AccountTypes) => {
    setShowModal({ show: true, dataItem: { id: null, type: type, name: '', description: '' } });
  };
  const handleClose = () => {
    setShowModal({ show: false, dataItem: null });
  };
  return (
    <>
      <PageWrapper>
        <ActionRow>
          <PrimaryButtonWithPopup
            bgColor="var(--_hoverButtonBg)"
            hoverBg="var(--_primaryButtonBg)"
            color="var(--_hoverButtonColor)"
            hoverColor="var(--_hoverButtonBg)"
            hoverBorderColor="var(--_hoverButtonBg)"
            wrapStyles={{ margin: '0 0 0 auto' }}
            id="addAccounts"
            label="ADD account"
            icon={plusIcon}
            onClick={onAddAccount}
          >
            <AddPopupItem id={AccountTypes.MERRAKI} label="Cisco Meraki" icon={ciscoMerakiLogoIcon(18)} onClick={onAddAccount} />
            <AddPopupItem id={AccountTypes.AWS} label="AWS" icon={awsIcon(18)} onClick={onAddAccount} />
          </PrimaryButtonWithPopup>
        </ActionRow>
      </PageWrapper>
      <ModalComponent id="accountEditor" open={showModal && showModal.show} onClose={handleClose}>
        {showModal.show && <AccountForm dataItem={showModal.dataItem} onClose={handleClose} />}
      </ModalComponent>
    </>
  );
};

export default React.memo(MainPage);
