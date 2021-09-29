import React, { useContext } from 'react';
import { User, UserName, UserRole, UserWrapper } from './styles';
import ImgComponent from 'app/components/Basic/ImgComponent';
import PopupContainer from 'app/components/PopupContainer';
import { PopupLinkItem } from 'app/components/PopupContainer/styles';
import { ClickAwayListener } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { UserRole as UserRoleData } from 'lib/api/ApiModels/Account/account';
interface Props {}

export const UserComponent: React.FC<Props> = (props: Props) => {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const { logout } = useAuth0();
  const userContext = useContext<UserContextState>(UserContext);

  const onLogOut = () => {
    logout({ returnTo: window.location.origin });
  };

  const onShowPopup = () => {
    setShowPopup(true);
  };

  const onClosePopup = () => {
    setShowPopup(false);
  };

  if (!userContext || !userContext.idToken) {
    return null;
  }
  return (
    <UserWrapper>
      <ImgComponent width="40px" height="40px" src={userContext.idToken.picture} styles={{ borderRadius: '6px', flexShrink: 0 }} />
      <User onClick={onShowPopup}>
        <>
          <UserName>{userContext.idToken.name}</UserName>
          <UserRole>{UserRoleData.ADMIN}</UserRole>
        </>
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
