import React from 'react';
import AppLogoComponent from 'app/components/Basic/AppLogoComponent';
import ImgComponent from 'app/components/Basic/ImgComponent';
import { ArticleContent, LeftBlock, PageLayout, RightBlock } from './styles';
import articleBg from 'app/images/articleBg.svg';
interface Props {
  article?: React.ReactNode;
  children?: React.ReactNode;
}

const UnAuthLayout: React.FC<Props> = (props: Props) => {
  return (
    <PageLayout>
      <RightBlock>
        <ImgComponent styles={{ position: 'absolute', top: 0, left: '-3%' }} src={articleBg} alt="World map" width="103%" />
        <AppLogoComponent />
        <ArticleContent>{props.article}</ArticleContent>
      </RightBlock>
      <LeftBlock>{props.children}</LeftBlock>
    </PageLayout>
  );
};

export default React.memo(UnAuthLayout);
