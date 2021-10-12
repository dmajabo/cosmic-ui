import React from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import { SignUpWrapper } from './styles';
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
