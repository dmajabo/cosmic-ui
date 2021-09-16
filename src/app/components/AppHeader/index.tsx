import React from 'react';
import IconButton from 'app/components/Buttons/IconButton';
import { HeaderStyles, PageName, Side } from './styles';
import { infoIcon } from 'app/components/SVGIcons/info';
import { notificationIcon } from 'app/components/SVGIcons/notification';
import { useLocation } from 'react-router-dom';
import UserComponent from './UserComponent';

interface Props {
  isOpenSidebar?: boolean;
}
const AppHeader: React.FC<Props> = (props: Props) => {
  const [page, setPage] = React.useState<string>('');
  const location = useLocation();
  React.useEffect(() => {
    const arr = location.pathname.split('/');
    if (arr[2] !== page) {
      setPage(arr[2]);
    }
  }, [location]);
  const onInfoClick = () => {};
  const onShowNotification = () => {};
  return (
    <HeaderStyles isOpenSidebar={props.isOpenSidebar}>
      <Side margin="0 auto 0 0">
        <PageName>{page}</PageName>
      </Side>
      <Side margin="0 0 0 auto">
        <IconButton icon={infoIcon} onClick={onInfoClick} styles={{ margin: '0 0 0 20px' }} />
        <IconButton icon={notificationIcon} onClick={onShowNotification} styles={{ margin: '0 0 0 20px' }} />
        <UserComponent />
      </Side>
    </HeaderStyles>
  );
};

export default React.memo(AppHeader);
