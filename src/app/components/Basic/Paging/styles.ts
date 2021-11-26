import styled from 'styled-components';

export const PagingWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 20px 0 0 0;
  height: 80px;
  align-items: center;
  width: 100%;
`;

export const DisplayRangeStyles = styled.span`
  display: inline-block;
  white-space: nowrap;
  flex-shrink: 0;
  margin: auto 0 auto 12px;
  font-size: 14px;
  font-family: 'DMSans';
  font-weight: normal;
  font-style: normal;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin: 0 auto;
  height: 100%;
  max-width: 300px;
`;

interface LabelProps {
  margin?: string;
}
export const SelectLabel = styled.div<LabelProps>`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  flex-shrink: 0;
  margin: ${props => props.margin || '0'};
  color: var(--_disabledTextColor);
`;
