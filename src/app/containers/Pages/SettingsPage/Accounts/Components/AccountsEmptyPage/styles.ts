import styled from 'styled-components';

export const PageWrapper = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
`;

export const Title = styled.div`
  margin: 0 auto 60px auto;
  font-weight: bold;
  font-size: 40px;
  line-height: 52px;
  text-align: center;
  color: var(--_primaryColor);
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  margin: 0 auto;
`;
