import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: var(--_primaryBg);
  border-radius: 6px;
  width: 100%;
  min-height: 160px;
  flex-shrink: 0;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  color: var(--_primaryColor);
`;
export const InputWrapper = styled.div`
  width: 100%;
  height: 40px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid;
  border-color: var(--_primaryButtonBorder);
  border-radius: 6px;
  color: var(--_primaryColor);
  background: var(--_primaryBg);
  outline: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  padding: 8px 20px;
  &::placeholder {
    color: var(--_disabledTextColor);
  }
`;

export const StyledTag = styled.div``;

export const Listbox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: auto;
  max-height: 200px;
`;

export const ListItem = styled.li`
  padding: 0;
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  flex-shrink: 0;
`;
