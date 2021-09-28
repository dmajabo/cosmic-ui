import styled from 'styled-components';

export const GAttachement = styled.g`
  .attachmentIcon {
    transform: translate(10px, -6px);
  }
  .attachmentLabel {
    transform: translate(25px, 2px);
  }
  &.rightLabel {
    .attachmentIcon {
      transform: translate(75px, 6px) rotate(180deg);
    }
    .attachmentLabel {
      transform: translate(60px, -2px) rotate(180deg);
    }
  }
`;
