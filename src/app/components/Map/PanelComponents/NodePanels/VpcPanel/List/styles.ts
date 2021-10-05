import styled from 'styled-components';

export const VmWrapStyles = styled.div`
  display: flex;
  margin: 0 0 4px 0;
  border-radius: 6px;
  background: var(--_vmsContainerBg);
  height: 50px;
  padding: 15px 20px;
  align-items: center;
  flex-shrink: 0;
  color: var(--_primaryColor);
  cursor: pointer;
  .inheritFill {
    fill: var(--_defaultIconColor);
  }

  &:hover {
    background: var(--_hoverButtonBg);
    color: var(--_hoverButtonColor);
    .inheritFill {
      fill: var(--_hoverButtonColor);
    }
  }
`;

export const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 32px);
`;
