import styled from 'styled-components';

interface Props {
  highlight?: boolean;
}
export const BreadCrumbItemStyle = styled.span<Props>`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: ${props => (props.highlight ? 500 : 'normal')};
  font-size: 14px;
  line-height: 26px;
  text-align: right;
  cursor: ${props => (props.highlight ? 'pointer' : 'default')};
  color: ${props => (props.highlight ? 'var(--_primaryColor)' : 'var(--_disabledTextColor)')};
`;
