import styled from 'styled-components';

interface HProps {
  margin?: string;
}
const H2Label = styled.h2<HProps>`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  margin: ${props => props.margin || '0'};
  padding: 0;
  color: var(--_primaryTextColor);
`;

export default H2Label;
