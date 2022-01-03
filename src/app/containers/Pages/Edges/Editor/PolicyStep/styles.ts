import { DEFAULT_TRANSITION } from 'lib/constants/general';
import styled from 'styled-components';

export const PolicyItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
`;

interface RowProps {
  margin?: string;
  justifyContent?: 'flex-start' | 'flex-end' | 'space-between';
}
export const FormRow = styled.div<RowProps>`
  flex-shrink: 0;
  display: flex;
  justify-content: ${props => props.justifyContent || 'flex-start'};
  margin: ${props => props.margin || '0 0 20px 0'};
`;

export const PolicyName = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryTextColor);
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

export const AccordionRuleHeader = styled.div`
  display: flex;
  width: calc(100% - 24px);
  flex-shrink: 0;
  overflow: hidden;
  margin: 12px 24px 0 0;
`;

export const RuleLabel = styled.span`
  display: inline-block;
  color: var(--_primaryTextColor);
  margin: auto 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: auto;
  max-width: calc(100% - 32px);
  flex-shrink: 1;
  overflow: hidden;
`;
