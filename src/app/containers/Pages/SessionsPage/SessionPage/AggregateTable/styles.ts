import styled from 'styled-components';

interface Props {
  margin?: string;
}
export const VendorTableWrapper = styled.div<Props>`
  padding: 25px 20px;
  margin: ${props => props.margin || '0'};
`;
export const VendorHeaderStyles = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const VendorLabel = styled.span`
  font-family: 'DMSans';
  display: inline-block;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryTextColor);
`;

export const VendorTdWrapper = styled.span`
  font-family: 'DMSans';
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  margin-right: 16px;
  &:last-child {
    margin-right: 0px;
  }
`;
