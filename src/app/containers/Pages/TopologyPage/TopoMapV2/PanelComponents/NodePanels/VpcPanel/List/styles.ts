import styled from 'styled-components';

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

export const VmWrapStyles = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 4px 0;
  border-radius: 6px;
  background: var(--_vmsContainerBg);
  height: 50px;
  padding: 15px 20px;
  align-items: center;
  flex-shrink: 0;
  color: var(--_primaryTextColor);
  cursor: pointer;
  .inheritFill {
    fill: var(--_defaultIconColor);
  }

  &:hover {
    background: var(--_hoverButtonBg);
    color: var(--_primaryWhiteColor);
    .inheritFill {
      fill: var(--_primaryWhiteColor);
    }
  }
`;

export const BalanceWrapStyles = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 4px 0;
  border-radius: 6px;
  background: var(--_vmsContainerBg);
  height: 50px;
  padding: 15px 20px;
  align-items: center;
  flex-shrink: 0;
  color: var(--_primaryTextColor);
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 4px 0;
  background: var(--_vmsContainerBg);
  min-height: 50px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  padding-bottom: 16px;
  ${VmWrapStyles} {
    background: var(--_primaryBg);
    margin: 0 auto 4px auto;
    max-width: calc(100% - 40px);
    .inheritFill {
      fill: var(--_primaryTextColor);
    }
    &:hover {
      background: var(--_hoverButtonBg);
      color: var(--_hoverButtonColor);
      .inheritFill {
        fill: var(--_hoverButtonColor);
      }
    }
  }
`;

export const GroupWrapStyles = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  background: transparent;
  height: 50px;
  padding: 15px 20px;
  border-radius: 6px;
  margin: 0 0 12px 0;
  align-items: center;
  flex-shrink: 0;
  color: var(--_primaryTextColor);
  cursor: pointer;
  ${Label} {
    max-width: calc(100% - 52px);
    margin-right: auto;
  }
  .arrow {
    transition: transform 0.5s linear;
    transform: rotate(0deg);
  }
  .arrowTop {
    transition: transform 0.5s linear;
    transform: rotate(-180deg);
  }
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

interface IIGARowProps {
  margin?: string;
}
export const InternetGetAwayRow = styled.div<IIGARowProps>`
  display: flex;
  flex-shrink: 0;
  margin: ${props => props.margin || '0 8px 0 0'};
  align-items: center;
  font-size: 16px;
  line-height: 20px;
`;
export const InternetGetAwayLabel = styled.span`
  color: var(--_primaryTextColor);
  display: inline-block;
  margin: auto 4px auto 0;
  flex-shrink: 0;
  font-weight: 500;
`;
export const InternetGetAwayValue = styled.div`
  color: var(--_disabledTextColor);
  display: inline-block;
  font-weight: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;
