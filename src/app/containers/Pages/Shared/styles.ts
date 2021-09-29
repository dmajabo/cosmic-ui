import styled from 'styled-components';

export const PageWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding: 20px;
`;

export const TabsWrapperStyles = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid;
  border-bottom-color: rgba(132, 141, 163, 0.1);
`;

export const ActionRowStyles = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  margin-bottom: 20px;
`;

interface IPageActionPart {
  margin?: string;
}
export const ActionPart = styled.div<IPageActionPart>`
  display: flex;
  width: auto;
  max-width: 100%;
  height: 40px;
  flex-shrink: 0;
  margin: ${props => props.margin || 0};
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-bottom: 20px;
`;

export const ContentWrapper = styled.div`
  background: var(--_primaryBg);
  border-radius: 6px;
  padding: 30px;
`;

export const ChartWrapper = styled.div`
  background: var(--_chartBg);
  border: 1px solid;
  border-color: var(--_primaryButtonBorder);
  border-radius: 6px;
  margin-bottom: 30px;
`;

export const TableWrapper = styled.div`
  display: flex;
  min-height: 200px;
`;
