import React, { useState } from 'react';
import UnAuthLayout from 'app/components/Basic/UnAuthLayout';
import { SignUpWrapper } from './styles';
import TryDemoComponent from './ArticleComponents/TryDemoComponent';
import { ConnectEdges } from './ArticleComponents/ConnectEdges';
import { EdgeBoxProps } from 'types';
import AwsIcon from './icons/aws.svg';
import MerakiIcon from './icons/meraki.svg';
import { SignUpStyles } from './SignUpStyles';
import { CircularProgressWithLabel } from './ArticleComponents/CircularProgressWithLabel';

const SignUpPage: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  //TODO: use setProgress on connecting AWS and Meraki
  const classes = SignUpStyles();

  const edgeBoxArray: EdgeBoxProps[] = [
    {
      img: AwsIcon,
      title: 'AWS',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => {},
    },
    {
      img: MerakiIcon,
      title: 'Cisco Meraki',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => {},
    },
  ];
  return (
    <UnAuthLayout article={<TryDemoComponent />}>
      <div className={classes.topBar}>
        <div className={classes.topBarText}>Connect To Your Edges</div>
        <div className={classes.topBarflexContainer}>
          <div className={classes.topBarText}>Progress: </div>
          <CircularProgressWithLabel value={progress} />
        </div>
      </div>
      <SignUpWrapper>
        <ConnectEdges edgeBoxArray={edgeBoxArray} />
      </SignUpWrapper>
    </UnAuthLayout>
  );
};

export default SignUpPage;
