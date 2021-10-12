import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import { Wrapper } from './styles';
import WhiteArrow from '../icons/demoArrow.svg';

const TryDemoComponent: React.FC = () => {
  const classes = SignUpStyles();
  return (
    <Wrapper>
      <div className={classes.tryDemoTitle}>Demo Environment</div>
      <div className={classes.tryDemoSubtitle}>Not ready to add your own data sources? Try out our fully functional demo environment.</div>
      <div className={classes.tryDemoButton}>
        TRY A DEMO
        <img className={classes.whiteArrow} src={WhiteArrow} alt="right arrow" />
      </div>
    </Wrapper>
  );
};

export default TryDemoComponent;
