import styled from 'styled-components';
import { TextInputWrapper } from 'app/components/Inputs/TextInput/styles';
import { ToggleButtonWrapper, Wrapper } from 'app/components/Inputs/Toogle/styles';
import { PrimaryButtonStyles } from 'app/components/Buttons/PrimaryButton/styles';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface FieldRowProps {
  direction?: 'row' | 'column';
}
export const FieldRow = styled.div<FieldRowProps>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  margin: 0 0 20px 0;
  ${Wrapper} {
    display: inline-flex;
    height: 34px;
  }
  ${ToggleButtonWrapper} {
    min-width: 150px;
  }
  ${TextInputWrapper} {
    width: 100%;
    max-width: 500px;
    min-width: 180px;
    label {
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.1em;
    }
    input {
      height: 60px;
    }
  }
  ${PrimaryButtonStyles} {
    border: 1px solid;
    border-color: var(--_primaryButtonBorder);
    &:hover {
      border-color: var(--_hoverButtonBg);
    }
  }
`;
