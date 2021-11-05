import styled from 'styled-components';

export const TagItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  height: 22px;
  padding: 2px 10px;
  margin: 3px 6px 3px 0 !important;
  background: var(--_vmBg);
`;

export const Tag = styled.span`
  color: var(--_primaryColor);
  font-size: 11px;
  line-height: 10px;
  font-style: normal;
  font-family: 'DMSans';
  font-weight: 500;
  margin: auto 6px auto 0;
`;
