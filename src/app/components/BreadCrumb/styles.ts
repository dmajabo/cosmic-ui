import styled from 'styled-components';

export const BreadcrumbsWrapper = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  margin: auto 20px;
  padding-top: 8px;
  & .MuiBreadcrumbs-root {
    font-family: 'DMSans';
    line-height: normal;
    color: var(--_primaryColor);
  }
`;

interface Props {
  highlight?: boolean;
}
export const BreadCrumbItemStyle = styled.span<Props>`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: ${props => (props.highlight ? 500 : 'normal')};
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  cursor: ${props => (props.highlight ? 'pointer' : 'default')};
  color: ${props => (props.highlight ? 'var(--_primaryColor)' : 'var(--_disabledTextColor)')};
`;
