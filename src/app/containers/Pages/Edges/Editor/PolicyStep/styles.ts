import { DEFAULT_TRANSITION } from 'lib/constants/general';
import styled from 'styled-components';

export const PolicyItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
`;

interface RowProps {
  justifyContent?: 'flex-start' | 'flex-end';
}
export const FormRow = styled.div<RowProps>`
  flex-shrink: 0;
  display: flex;
  justify-content: ${props => props.justifyContent || 'flex-start'};
  margin-bottom: 20px;
`;

export const PolicyItemWrapper = styled.div`
  width: 100%;
  padding: 20px;
  height: 245px;
  background: var(--_appBg);
  border-radius: 6px;
  margin: 0 0 20px 0;
`;

export const PolicyName = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryColor);
  width: auto;
  max-width: calc(100% - 32px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 12px 0 0;
`;

interface RowProps {
  margin?: string;
}
export const PolicyActionRow = styled.div<RowProps>`
  display: flex;
  width: 100%;
  flex-shrink: 0;
  margin: ${props => props.margin || '0'};
  .visibleOnHover {
    opacity: 0;
    transition: opacity ${DEFAULT_TRANSITION};
  }
  &:hover {
    .visibleOnHover {
      opacity: 1;
    }
  }
`;
