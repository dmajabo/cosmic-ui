import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 260px;
  height: 100%;
  background: var(--_primaryBg);
  border-radius: 6px;
  padding: 10px 20px;
`;

export const Wrap = styled.div`
  display: flex;
  width: auto;
  margin: auto 20px auto 0;
  align-items: center;
`;

export const StitchStyles = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  margin: auto 2px auto 0;
  color: var(--_primaryColor);
`;

export const StitchTmStyles = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 13px;
  margin: 5px 0 auto 0;
  color: var(--_primaryColor);
`;
