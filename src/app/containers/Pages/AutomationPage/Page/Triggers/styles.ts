import styled from 'styled-components';

export const ChannelsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`;

export const ChannelIcon = styled.span`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: inline-flex;
  margin: auto 10px auto 0;
  svg {
    width: 100%;
    height: 100%;
    margin: auto;
    vertical-align: top;
  }
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
`;
