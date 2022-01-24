import styled from 'styled-components';

export const SectionHeaderWrapper = styled.div`
  display: flex;
  min-height: 50px;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

export const SectionName = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryTextColor);
  margin: auto 24px auto 0;
  flex-shrink: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
`;

export const EmptyContainer = styled.div`
  margin: auto;
  text-align: center;
  font-family: 'DMSans';
  font-style: normal;
`;

export const EmptyMessagePrimary = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: var(--_primaryTextColor);
  margin-bottom: 20px;
`;

export const EmptyMessageSecondary = styled.div`
  font-family: 'DMSans';
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: var(--_disabledTextColor);
  opacity: 0.8;
`;

export const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const RuleWrapper = styled.div`
  background: var(--_appBg);
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 6px;
  flex-shrink: 0;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const RuleInputsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  flex-shrink: 0;
`;
