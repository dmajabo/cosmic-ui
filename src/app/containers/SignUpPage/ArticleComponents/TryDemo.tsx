import React, { useState } from 'react';
import { SignUpStyles } from '../SignUpStyles';
import { Wrapper } from './styles';
import WhiteArrow from '../icons/demoArrow.svg';
import BlackArrow from '../icons/demoBlackArrow.svg';

interface TryDemoProps {
  readonly onTryDemo: () => void;
}

const TryDemo: React.FC<TryDemoProps> = ({ onTryDemo }) => {
  const [isMouseHover, setIsMouseHover] = useState<boolean>(false);
  const classes = SignUpStyles();

  const onMouseHover = () => setIsMouseHover(true);

  const onMouseRemove = () => setIsMouseHover(false);

  return (
    <Wrapper>
      <div className={classes.tryDemoTitle}>Demo Environment</div>
      <div className={classes.tryDemoSubtitle}>Not ready to add your own data sources? Try out our fully functional demo environment.</div>
      <div className={classes.tryDemoButton} onClick={onTryDemo} onMouseOver={onMouseHover} onMouseOut={onMouseRemove}>
        TRY A DEMO
        <img className={classes.whiteArrow} src={isMouseHover ? BlackArrow : WhiteArrow} alt="right arrow" />
      </div>
    </Wrapper>
  );
};

export default TryDemo;
