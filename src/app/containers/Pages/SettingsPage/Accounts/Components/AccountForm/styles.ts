import styled from 'styled-components';

export const Title = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryTextColor);
  margin: auto;
  width: auto;
  max-width: 100%;
  margin: auto 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const StepItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  flex-shrink: 0;
  border: 1px solid;
  border-color: var(--_borderColor);
  background: var(--_chartBg);
  border-radius: 6px;
  padding: 40px 30px;
  margin: 0 0 20px 0;
`;

export const StepItemHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  align-items: center;
  margin: 0 0 20px 0;
`;
export const StepItemLabel = styled.span`
  max-width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: var(--_primaryTextColor);
  margin: auto 0;
`;

export const StepItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  padding: 0 0 0 60px;
`;

interface RowProps {
  margin?: string;
}
export const StepItemFormRow = styled.div<RowProps>`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  max-width: 500px;
  margin: ${props => props.margin || '0 auto 20px 0'};
`;
