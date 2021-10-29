import { DropWrapper, SelectWrapper } from 'app/components/Inputs/Dropdown/styles';
import { InputLabel } from 'app/components/Inputs/styles/Label';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--_primaryBg);
  width: 80vw;
  max-width: 750px;
  height: 100vh;
  font-family: 'DMSans';
`;

export const Header = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  margin-bottom: 20px;
  padding: 30px 30px 0 30px;
`;

export const FormTitle = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryColor);
`;

export const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
`;

export const FormFooter = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 30px;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid;
  border-top-color: var(--_borderColor);
  margin-top: auto;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: calc(100% - 100px);
  padding: 0 30px 30px 30px;
  overflow-y: auto;
  overflow-x: hidden;
  ${InputLabel} {
    margin-bottom: 6px;
  }
  ${DropWrapper} {
    width: 100%;
  }
  ${SelectWrapper} {
    width: 100%;
    height: 40px;
    border: 1px solid;
    border-color: var(--_borderColor);
    border-radius: 6px;
  }
`;

export const CellContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
