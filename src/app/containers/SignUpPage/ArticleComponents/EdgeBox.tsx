import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import AddIcon from '../icons/add.svg';

interface EdgeBoxProps {
  readonly Img: string;
  readonly title: string;
  readonly content: string;
  readonly onClick: () => void;
}

export const EdgeBox: React.FC<EdgeBoxProps> = ({ Img, title, content, onClick = () => {} }) => {
  const classes = SignUpStyles();

  return (
    <div className={classes.edgeContainer}>
      <img className={classes.edgeBoxImage} src={Img} alt={title} />
      <div className={classes.edgeBoxTitle}>{title}</div>
      <div className={classes.edgeBoxContent}>{content}</div>
      <div className={classes.edgeConnectButton} onClick={onClick}>
        CONNECT
        <img className={classes.whiteArrow} src={AddIcon} alt="connect" />
      </div>
    </div>
  );
};
