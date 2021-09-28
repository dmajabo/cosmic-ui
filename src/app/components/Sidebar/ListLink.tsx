import * as React from 'react';
import { HighlightBg, HighlightBorder, StyledListLink, WrapIcon, WrapText } from './styles';

interface ListLinkProps {
  isActive: boolean;
  icon: JSX.Element;
  label?: JSX.Element | string;
  onClick: () => void;
}
const ListLink: React.FC<ListLinkProps> = props => {
  return (
    <StyledListLink className={props.isActive ? 'active' : ''} onClick={props.onClick}>
      <HighlightBg />
      <HighlightBorder />
      <WrapIcon>{props.icon}</WrapIcon>
      {props.label && <WrapText>{props.label}</WrapText>}
    </StyledListLink>
  );
};
export default React.memo(ListLink);
