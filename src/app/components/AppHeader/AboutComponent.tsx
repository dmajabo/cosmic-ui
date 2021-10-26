import React from 'react';
import { Container, ItemContainer, ItemTitle, ItemLink, ItemValue } from './AboutStyles';
import { APP_GENERAL_CONST } from 'lib/constants/general';

interface Props {}

const AboutComponent: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <ItemContainer>
        <ItemTitle>Support:</ItemTitle>
        <ItemLink>
          <a href={`mailto:${APP_GENERAL_CONST.support}`}>{APP_GENERAL_CONST.support}</a>
        </ItemLink>
      </ItemContainer>
      <ItemContainer>
        <ItemTitle>Feedback:</ItemTitle>
        <ItemLink>
          <a href={`mailto:${APP_GENERAL_CONST.feedback}`}>{APP_GENERAL_CONST.feedback}</a>
        </ItemLink>
      </ItemContainer>
      <ItemContainer>
        <ItemTitle>Version:</ItemTitle>
        <ItemValue>1.1.1.1</ItemValue>
      </ItemContainer>
    </Container>
  );
};

export default React.memo(AboutComponent);
