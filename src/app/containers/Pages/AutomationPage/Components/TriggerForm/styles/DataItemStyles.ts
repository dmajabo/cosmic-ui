import styled from 'styled-components';

export const DataItemWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 60px;
  padding: 10px 50px 10px 20px;
  background: var(--_interfaceBg);
  border-radius: 6px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;
