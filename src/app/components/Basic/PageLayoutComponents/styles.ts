import { APP_HEADER_HEIGHT } from 'lib/constants/general';
import styled from 'styled-components';

interface PageProps {
  direction?: 'row' | 'column';
  padding?: string;
}
export const PageWrapper = styled.div<PageProps>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  width: 100%;
  height: ${`calc(100vh - ${APP_HEADER_HEIGHT})`};
  overflow: hidden;
`;

export const ChildrenContainer = styled.div<PageProps>`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
  width: auto;
  height: auto;
  max-width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${props => props.padding || '40px'};
`;
