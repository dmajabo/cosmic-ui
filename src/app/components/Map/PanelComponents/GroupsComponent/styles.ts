import styled from 'styled-components';
import { TextInputWrapper } from 'app/components/Inputs/TextInput/styles';
import { DropdownWrapper, DropWrapper, SelectWrapper, Label as DropdownLabel, ListWrapper } from 'app/components/Inputs/Dropdown/styles';
import { SecondaryButtonStyles } from 'app/components/Buttons/SecondaryButton/styles';

export const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  ${SecondaryButtonStyles} {
    margin: 0 auto 12px auto;
  }
`;

interface Props {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  margin?: string;
}
export const Label = styled.div<Props>`
  font-style: normal;
  font-weight: ${props => props.fontWeight || '500'};
  font-size: ${props => props.fontSize || '16px'};
  color: ${props => props.color || 'var(--_primaryTextColor)'};
  margin: ${props => props.margin || '0'};
  text-align: center;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${TextInputWrapper} {
    margin: 0 0 20px 0;
  }
  ${DropdownWrapper} {
    display: block;
    width: 100%;
    text-align: left;
    margin: 0 0 20px 0;
  }
  ${DropWrapper} {
    width: 100%;
  }
  ${SelectWrapper} {
    border-color: var(--_disabledButtonColor);
  }
  ${DropdownLabel} {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: var(--_defaultInputColor);
    width: auto;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ${ListWrapper} {
    width: 100%;
    min-height: auto;
  }
`;

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  margin: auto 0 0 0;
  flex-shrink: 0;
  padding: 20px 0 0 0;
`;
