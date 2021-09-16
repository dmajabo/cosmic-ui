import React from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import { TempMessage } from './styles';
import StartComponent from './ArticleComponents/StartComponent';

interface Props {}

const SignUpPage: React.FC<Props> = (props: Props) => {
  return (
    <UnAuthLayout article={<StartComponent />}>
      <TempMessage>This page is currently unavailable</TempMessage>
    </UnAuthLayout>
  );
};

export default React.memo(SignUpPage);
