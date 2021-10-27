import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import AddIcon from '../icons/add.svg';
import EditIcon from '../icons/edit.svg';
import ConnectedIcon from '../icons/connected.svg';
import { EdgeBoxProps } from 'types';

export const EdgeBox: React.FC<EdgeBoxProps> = ({ img, title, edgeName, content, isConnected, onConnect, onUpdate }) => {
  const classes = SignUpStyles();

  return (
    <div className={classes.edgeContainer}>
      <img className={classes.edgeBoxImage} src={img} alt={edgeName} />
      <div className={classes.edgeBoxTitle}>{title}</div>
      <div className={classes.edgeBoxContent}>{content}</div>
      {isConnected ? (
        <div className={classes.connectedContainer}>
          <span className={classes.edgeBoxConnectedText}>
            <img className={classes.connectedTick} src={ConnectedIcon} alt="connected" />
            CONNECTED
          </span>
          <div className={classes.editButton} onClick={onUpdate}>
            EDIT
            <img className={classes.whiteArrow} src={EditIcon} alt="edit" />
          </div>
        </div>
      ) : (
        <div className={classes.edgeConnectButton} onClick={onConnect}>
          CONNECT
          <img className={classes.whiteArrow} src={AddIcon} alt="connect" />
        </div>
      )}
    </div>
  );
};
