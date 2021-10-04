import styled from 'styled-components';

export const GAttachement = styled.g`
  .attachmentVpcIcon {
    transform: translate(10px, -6px);
  }
  .attachmentVpnIcon {
    transform: translate(9px, -5.5px);
  }
  .attachmentLabel {
    transform: translate(25px, 2px);
  }
  &.rightLabel {
    .attachmentVpcIcon {
      transform: translate(75px, 6px) rotate(180deg);
    }
    .attachmentVpnIcon {
      transform: translate(76px, 6.5px) rotate(180deg);
    }
    .attachmentLabel {
      transform: translate(60px, -2px) rotate(180deg);
    }
  }
`;
