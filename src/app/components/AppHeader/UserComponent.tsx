import React from 'react';
import { User, UserName, UserRole, UserWrapper } from './styles';
import ImgComponent from 'app/components/Basic/ImgComponent';
import Demo_Photo from 'app/images/Demo_Photo.jpg';
import { useAuthDataContext } from 'lib/Routes/useAuth';
import PopupContainer from 'app/components/PopupContainer';
import { PopupLinkItem } from 'app/components/PopupContainer/styles';
import { ClickAwayListener } from '@material-ui/core';
interface Props {}

export const UserComponent: React.FC<Props> = (props: Props) => {
  const { authData } = useAuthDataContext();
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  const onLogOut = () => {
    authData?.onLogout();
  };

  const onShowPopup = () => {
    setShowPopup(true);
  };

  const onClosePopup = () => {
    setShowPopup(false);
  };

  if (!authData || !authData.authData) {
    return null;
  }
  return (
    <UserWrapper>
      <ImgComponent width="40px" height="40px" src={Demo_Photo} styles={{ borderRadius: '6px', flexShrink: 0 }} />
      <User onClick={onShowPopup}>
        {authData.authData.user && (
          <>
            <UserName>
              {authData.authData.user.firstName} {authData.authData.user.lastName}
            </UserName>
            <UserRole>{authData.authData.user.role}</UserRole>
          </>
        )}
      </User>
      {showPopup && (
        <ClickAwayListener onClickAway={onClosePopup}>
          <span>
            <PopupContainer styles={{ position: 'absolute', top: 'calc(100% + 20px)', left: '0' }}>
              <PopupLinkItem onClick={onLogOut}>Logout</PopupLinkItem>
            </PopupContainer>
          </span>
        </ClickAwayListener>
      )}
    </UserWrapper>
  );
};

export default React.memo(UserComponent);
