import React, { useState } from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import StartComponent from './ArticleComponents/StartComponent';
import { SignUpWrapper } from './styles';
import { GetStarted } from './ArticleComponents/GetStarted';

interface Props {}

const SignUpPage: React.FC<Props> = (props: Props) => {
  return (
    <UnAuthLayout article={<StartComponent />}>
      <SignUpWrapper>
        <GetStarted />
      </SignUpWrapper>
    </UnAuthLayout>
  );
};

export default React.memo(SignUpPage);
