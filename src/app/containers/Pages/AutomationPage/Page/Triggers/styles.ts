import styled from 'styled-components';

export const ChannelsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`;

export const ChannelLabel = styled.span`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: var(--_primaryTextColor);
  margin: auto 4px auto 0;
  z-index: 2;
`;
