import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import AddIcon from '../icons/add.svg';
import { EdgeBoxProps } from 'types';

export const EdgeBox: React.FC<EdgeBoxProps> = ({ img, title, content, onClick }) => {
  const classes = SignUpStyles();

  return (
    <div className={classes.edgeContainer}>
      <img className={classes.edgeBoxImage} src={img} alt={title} />
      <div className={classes.edgeBoxTitle}>{title}</div>
      <div className={classes.edgeBoxContent}>{content}</div>
      <div className={classes.edgeConnectButton} onClick={onClick}>
        CONNECT
        <img className={classes.whiteArrow} src={AddIcon} alt="connect" />
      </div>
    </div>
  );
};
