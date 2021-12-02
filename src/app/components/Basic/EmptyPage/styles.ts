import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
`;

interface Props {
  margin?: string;
}
export const StepperRow = styled.div<Props>`
  margin: ${props => props.margin || '0'};
`;

interface TextProps {
  highLight?: boolean;
  margin?: string;
}
export const StepperText = styled.div<TextProps>`
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin || '0'};
  font-family: 'DMSans';
  font-style: normal;
  text-align: center;
  font-weight: ${props => (props.highLight ? '700' : 'normal')};
  font-size: ${props => (props.highLight ? '22px' : '16px')};
  line-height: ${props => (props.highLight ? '29px' : 'normal')};
  color: ${props => (props.highLight ? 'var(--_primaryColor)' : 'var(--_disabledTextColor)')};
  opacity: ${props => (props.highLight ? '1' : '0.8')};
`;

export const StepperImg = styled.img`
  width: 200px;
  height: 200px;
  margin: auto auto 0 auto;
`;

export const StepperSwgWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: auto auto 60px auto;
  svg {
    width: 100%;
    height: 100%;
  }
`;
