import styled from 'styled-components';
import { TextInputWrapper } from 'app/components/Inputs/TextInput/styles';
import { ToggleButtonWrapper, Wrapper } from 'app/components/Inputs/Toogle/styles';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldRow = styled.div`
  display: flex;
  ${Wrapper} {
    display: inline-flex;
    margin: 0 0 24px 0;
    height: 34px;
  }
  ${ToggleButtonWrapper} {
    min-width: 150px;
  }
  ${TextInputWrapper} {
    width: 100%;
    max-width: 500px;
    min-width: 180px;
    margin: 0 0 32px 0;
    label {
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.1em;
    }
    input {
      height: 60px;
    }
  }
`;
