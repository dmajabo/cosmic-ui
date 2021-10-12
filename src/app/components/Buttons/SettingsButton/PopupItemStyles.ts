import styled from 'styled-components';

export const PopupItemStyles = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid;
  padding: 16px;
  cursor: pointer;
  border-bottom-color: var(--_defaultIconColor);
  &:last-child {
    border-bottom-color: transparent;
  }
`;

interface LabelProps {
  color?: string;
}
export const PopupLabel = styled.div<LabelProps>`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-transform: capitalize;
  color: ${props => props.color || 'var(--_defaultIconColor)'};
  max-width: 100%;
  margin: auto 0 auto 12px;
`;

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  min-width: 120px;
  max-width: 240px;
  border-radius: 6px;
`;
