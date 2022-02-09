import styled from 'styled-components';

interface WrapProps {
  margin?: string;
}
export const ChannelItemWrapper = styled.div<WrapProps>`
  width: 100%;
  border-radius: 6px;
  padding: 40px;
  background: var(--_primaryBg);
  flex-shrink: 0;
  margin: ${props => props.margin || '0 0 20px 0'};
`;

export const ChannelHeaderRow = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  position: relative;
`;

export const LabelsWrapper = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  margin: 0 0 0 20px;
  overflow: hidden;
  width: auto;
  flex-grow: 1;
  max-width: 100%;
  display: flex;
`;
export const ConfigurationTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryTextColor);
  margin: auto 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;
export const ConfigurationSubTitle = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: var(--_disabledTextColor);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

export const ChannelContent = styled.div`
  margin: 30px 0 0 0;
`;

export const TagStatus = styled.div`
  font-size: 12px;
  color: var(--_primaryTextColor);
  line-height: 16px;
  font-weight: normal;
`;

export const StatusRow = styled.div`
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
  width: 100%;
  .label {
    display: inline-flex;
    flex-shrink: 0;
    font-size: 12px;
    margin: 0 8px 0 0;
  }
  .value {
    max-width: 100%;
    display: inline-block;
    white-space: normal;
    word-break: break-all;
  }
`;
