import { IPanelBarLayoutTypes } from 'lib/models/general';
import styled, { css } from 'styled-components';

interface Props {
  type: IPanelBarLayoutTypes;
  show: boolean;
  height?: string;
  position?: 'absolute' | 'relative';
}

const layout = (props: Props) => {
  if (props.type === IPanelBarLayoutTypes.VERTICAL) {
    return css`
      width: 80vw;
      max-width: 450px;
      height: ${props.height || '100%'};
      border-top: 2px solid;
      border-top-color: var(--_appBg);
      margin-right: ${props.show ? '0' : '-450px'};
      overflow: hidden;
    `;
  }
  return css`
    width: 100%;
    min-width: 100%;
    height: 80px;
    flex-shrink: 0;
    margin-bottom: ${props.show ? '0' : '-80px'};
  `;
};
const PanelLayout = (props: Props) => layout(props);
export const PanelWrapperStyles = styled.div<Props>`
  border: none;
  ${PanelLayout};
  display: flex;
  z-index: 10;
  transition-property: all;
  transition: 0.8s ease-in;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--_primaryBg);
  padding: 30px;
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;
