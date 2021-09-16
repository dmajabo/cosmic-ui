import styled from 'styled-components';
import { InputWrapper, InputSearch } from 'app/components/Inputs/Search/styles';
import { PrimaryButtonStyles } from 'app/components/Buttons/PrimaryButton/styles';

export const PanelTabWrapper = styled.div<Props>`
  display: flex;
  white-space: nowrap;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
`;

interface Props {
  direction?: 'row' | 'column';
  align?: 'center' | 'unset';
}
export const PanelHeader = styled.div<Props>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  white-space: nowrap;
  width: 100%;
  margin-bottom: 20px;
  align-items: ${props => props.align || 'center'};
  ${InputSearch} {
    border-color: var(--_disabledButtonColor);
    width: 100%;
    min-width: unset;
    max-width: 100%;
    flex-shrink: 0;
  }
  ${InputWrapper} {
    margin-top: 20px;
  }
  ${PrimaryButtonStyles} {
    border-color: var(--_disabledButtonColor);
    margin: 0 auto 0 30px;
    flex-shrink: 0;
    &:hover:not(:disabled) {
      .inheritFill {
        fill: var(--_hoverButtonBg);
      }
      border-color: var(--_hoverButtonBg);
      color: var(--_hoverButtonBg);
      background-color: var(--_primaryBg);
    }
  }
`;

export const PanelTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  color: var(--_primaryColor);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  max-width: 100%;
`;

export const SubPanelTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: var(--_disabledTextColor);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  max-width: 100%;
`;

export const PanelBarContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  .VMChart > div {
    width: 100%;
  }
`;
