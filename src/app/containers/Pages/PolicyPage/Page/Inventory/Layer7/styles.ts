import styled from 'styled-components';

export const ValueCell = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-wrap: wrap;
`;

export const ValueType = styled.span`
  display: inline-block;
  margin: auto 12px auto 0;
  flex-shrink: 0;
  text-transform: capitalize;
`;

export const ValuesStyle = styled.span`
  border-radius: 30px;
  padding: 5px 20px;
  background: var(--_appBg);
  margin: 0 6px 5px 0;
  white-space: nowrap;
  display: inline-block;
`;

export const VpcIconStyled = styled.span`
  margin-right: 12px;
`;
