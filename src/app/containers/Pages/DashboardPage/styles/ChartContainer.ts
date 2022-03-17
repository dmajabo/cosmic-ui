import styled from 'styled-components';
import { device_LL } from 'styles/global-styles';
interface DashboardStyleProps {
  margin?: string;
  width?: string;
  height?: string;
  padding?: string;
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  gridArea?: string;
  minResponciveHeight?: string;
}

export const GridContainer = styled.div`
  // https://cssgrid-generator.netlify.app/
  display: grid;
  grid-template-columns: calc(55% - 15px) calc(45% - 15px);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  width: 100%;
  height: calc(100vh - 81px);
  padding: 30px;

  @media (max-width: ${device_LL - 1 + 'px'}) {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: auto;
  }
  /* MERAKI DASHBOARD */
  /* .div1 {
    grid-area: 1 / 1 / 3 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .div3 {
    grid-area: 2 / 2 / 3 / 3;
  } */
`;

export const AWSGridContainer = styled.div`
  // https://cssgrid-generator.netlify.app/
  display: grid;
  grid-template-columns: calc(50% - 15px) calc(50% - 15px);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  width: 100%;
  height: calc(100vh - 81px);
  padding: 30px;

  @media (max-width: ${device_LL - 1 + 'px'}) {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: auto;
  }
  /* MERAKI DASHBOARD */
  /* .div1 {
    grid-area: 1 / 1 / 3 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .div3 {
    grid-area: 2 / 2 / 3 / 3;
  } */
`;

export const GridItemContainer = styled.div<DashboardStyleProps>`
  display: flex;
  grid-area: ${props => props.gridArea || '1 / 1 / 3 / 2'};
  @media (max-width: ${device_LL - 1 + 'px'}) {
    min-height: ${props => props.minResponciveHeight || '360px'};
  }
`;

export const DashboardItemContainer = styled.div<DashboardStyleProps>`
  display: inline-flex;
  flex-direction: column;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0'};
  background: var(--_primaryBg);
  border-radius: 6px;
  font-family: 'DMSans';
  padding: ${props => props.padding || '35px 30px 30px 30px'};
  flex-shrink: 0;
`;

export const DashboardItemLabel = styled.div`
  display: inline-block;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  color: var(--_primaryTextColor);
  margin: 0 12px 30px 0;
  flex-shrink: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 12px);
`;

export const DashboardItemContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: nowrap;
  flex-shrink: 0;
`;

export const DashboardItemHeaderTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

export const DashboardItemHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 26px;
  margin-bottom: 15px;
`;

export const MarkerCountContainer = styled.div`
  display: flex;
`;
export const MarkerIconContainer = styled.div`
  margin-left: 20px;
  margin-right: 10px;
`;
