import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import RightArrowIcon from '../icons/rightArrow.svg';

interface ButtonProps {
  readonly Img: string;
  readonly text: string;
  readonly onClick?: () => void;
}

export const ConnectButton: React.FC<ButtonProps> = ({ Img, text, onClick = () => {} }) => {
  const classes = SignUpStyles();
  return (
    <div className={classes.buttonContainer}>
      <div className={classes.connectButton} onClick={onClick}>
        <img className={classes.logoImage} src={Img} alt={text} />
        <span className={classes.connectButtonText}>{text}</span>
        <img className={classes.arrow} src={RightArrowIcon} alt="Right Arrow" />
      </div>
    </div>
  );
};
