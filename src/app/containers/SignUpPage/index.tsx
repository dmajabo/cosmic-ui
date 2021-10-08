import React, { useState } from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import StartComponent from './ArticleComponents/StartComponent';
import { SignUpWrapper } from './styles';
import { ConnectEdges } from './ArticleComponents/ConnectEdges';
import { GetStarted } from './ArticleComponents/GetStarted';

interface Props {}

const SignUpPage: React.FC<Props> = (props: Props) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  return (
    <UnAuthLayout article={<StartComponent />}>
      <SignUpWrapper>{isConnected ? <ConnectEdges /> : <GetStarted />}</SignUpWrapper>
    </UnAuthLayout>
  );
};

export default React.memo(SignUpPage);
