import styled from 'styled-components';

export const StepTitle = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: var(--_primaryColor);
  flex-shrink: 0;
  margin: auto 12px auto 0;
  width: 30%;
  max-width: 300px;
  min-width: 180px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const StepStaus = styled.div`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 23px;
  padding-left: 12px;
  margin: auto 30px auto auto;
  color: var(--_successColor);
  flex-shrink: 0;
  text-transform: capitalize;
`;
