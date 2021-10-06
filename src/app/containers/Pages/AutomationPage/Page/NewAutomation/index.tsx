import React from 'react';
import { ContentStyles, MainStyles, PanelStyles } from '../../styles/styles';
interface Props {}

const NewAutomation: React.FC<Props> = (props: Props) => {
  return (
    <>
      <MainStyles>
        <ContentStyles></ContentStyles>
      </MainStyles>
      <PanelStyles></PanelStyles>
    </>
  );
};

export default React.memo(NewAutomation);
