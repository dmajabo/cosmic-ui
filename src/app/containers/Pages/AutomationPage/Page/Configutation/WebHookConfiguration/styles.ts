import styled from 'styled-components';

interface PolicyProps {
  margin?: string;
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: string;
}
export const PolicyRow = styled.div<PolicyProps>`
  display: flex;
  flex-shrink: 0;
  margin: ${props => props.margin || 0};
`;

export const PolicyLabel = styled.span<PolicyProps>`
  flex-shrink: 0;
  display: inline-block;
  margin: ${props => props.margin || 0};
  color: ${props => props.color || 'var(--_primaryTextColor)'};
  font-size: ${props => props.fontSize || '18px'};
  line-height: ${props => props.lineHeight || '22px'};
  font-weight: ${props => props.fontWeight || 700};
`;
