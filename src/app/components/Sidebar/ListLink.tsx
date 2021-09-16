import * as React from 'react';
import history from 'utils/history';
import { HighlightBg, HighlightBorder, StyledListLink, WrapIcon, WrapText } from './styles';

interface ListLinkProps {
  path: string;
  icon: JSX.Element;
  label?: JSX.Element | string;
  onClick: () => void;
}
const ListLink: React.FC<ListLinkProps> = props => {
  const isActivePath = (expectedLocation, actualLocation) => {
    return actualLocation.indexOf(expectedLocation) >= 0;
  };
  return (
    <StyledListLink className={isActivePath(props.path, history.location.pathname) ? 'active' : ''} onClick={props.onClick}>
      <HighlightBg />
      <HighlightBorder />
      <WrapIcon>{props.icon}</WrapIcon>
      {props.label && <WrapText>{props.label}</WrapText>}
    </StyledListLink>
  );
};
export default React.memo(ListLink);
