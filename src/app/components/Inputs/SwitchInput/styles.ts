import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  width: auto;
  margin: auto 0;
`;

interface Props {
  active: boolean;
  margin?: string;
}
export const Label = styled.span<Props>`
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  margin: ${props => props.margin || 0};
  color: ${props => (!props.active ? 'var(--_disabledTextColor)' : 'var(--_primaryColor)')};
`;
