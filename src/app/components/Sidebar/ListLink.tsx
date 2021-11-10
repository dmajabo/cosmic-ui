import * as React from 'react';
import { HighlightBg, HighlightBorder, StyledListLink, WrapIcon, WrapText } from './styles';

interface ListLinkProps {
  isActive: boolean;
  icon: JSX.Element;
  label?: JSX.Element | string;
  onClick: () => void;
}
const ListLink: React.FC<ListLinkProps> = ({ isActive, icon, label, onClick }) => {
  return (
    <StyledListLink className={isActive ? 'active' : ''} onClick={onClick}>
      <HighlightBg />
      <HighlightBorder />
      <WrapIcon>{icon}</WrapIcon>
      {label && <WrapText>{label}</WrapText>}
    </StyledListLink>
  );
};
export default React.memo(ListLink);
