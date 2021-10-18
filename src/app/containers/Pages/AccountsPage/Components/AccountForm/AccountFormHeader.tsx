import React from 'react';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { ModalHeader } from '../../styles/styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { getAccountIcon, preparedString } from './helper';
import IconButton from 'app/components/Buttons/IconButton';
import { closeIcon } from 'app/components/SVGIcons/close';
import { Title } from './styles';
interface Props {
  vendor: AccountVendorTypes;
  isEditMode: boolean;
  onClose: () => void;
}

const AccountFormHeader: React.FC<Props> = ({ vendor, isEditMode, onClose }) => {
  const [ttile, setTitle] = React.useState<string>('');
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    const _icon = getAccountIcon(vendor);
    const _title = preparedString(vendor, isEditMode);
    setIcon(_icon);
    setTitle(_title);
  }, [vendor]);

  return (
    <ModalHeader>
      <IconWrapper width="48px" height="48px" styles={{ margin: 'auto 16px auto 0' }} icon={icon} />
      <Title>{ttile}</Title>
      <IconButton styles={{ position: 'absolute', top: '-20px', right: '-20px', border: 'none', background: 'transparent', zIndex: 2 }} icon={closeIcon} onClick={onClose} />
    </ModalHeader>
  );
};

export default React.memo(AccountFormHeader);
