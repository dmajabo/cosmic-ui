import React from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import StartComponent from './ArticleComponents/StartComponent';
import { SignUpWrapper } from './styles';
import { GetStarted } from './ArticleComponents/GetStarted';
import TryDemoComponent from './ArticleComponents/TryDemoComponent';
import { ConnectEdges } from './ArticleComponents/ConnectEdges';

interface Props {}

const SignUpPage: React.FC<Props> = (props: Props) => {
  return (
    <UnAuthLayout article={<TryDemoComponent />}>
      <SignUpWrapper>
        <ConnectEdges />
      </SignUpWrapper>
    </UnAuthLayout>
  );
};

export default React.memo(SignUpPage);
