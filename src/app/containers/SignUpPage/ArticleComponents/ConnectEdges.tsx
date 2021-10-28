import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import { EdgeBox } from './EdgeBox';
import AddIcon from '../icons/add.svg';
import { EdgeBoxProps } from 'types';

interface ConnectEdgesProps {
  readonly edgeBoxArray: EdgeBoxProps[];
  readonly isAppReadyToUse: boolean;
  readonly onAppReadyToUse: () => void;
  readonly onAddNewEdge: () => void;
  readonly onSkipSetup: () => void;
}

export const ConnectEdges: React.FC<ConnectEdgesProps> = ({ edgeBoxArray, isAppReadyToUse, onAppReadyToUse, onAddNewEdge }) => {
  const classes = SignUpStyles();

  return (
    <div className={classes.connectEdgesContainer}>
      <div className={classes.title}>Connect To Your Edges</div>
      <div className={classes.edgeBoxContainer}>
        {edgeBoxArray.map(edgeBox => (
          <EdgeBox
            edgeName={edgeBox.edgeName}
            title={edgeBox.title}
            key={edgeBox.edgeName}
            img={edgeBox.img}
            content={edgeBox.content}
            onUpdate={edgeBox.onUpdate}
            onConnect={edgeBox.onConnect}
            isConnected={edgeBox.isConnected}
          />
        ))}
        <div className={classes.newEdgeButton} onClick={onAddNewEdge}>
          ADD NEW EDGE
          <img className={classes.whiteArrow} src={AddIcon} alt="add new edge" />
        </div>
      </div>
      <div className={classes.flexContainer}>
        <div></div>
        <>
          <button className={isAppReadyToUse ? classes.connectSourceFormButton : classes.startButton} onClick={onAppReadyToUse} disabled={!isAppReadyToUse}>
            <span className={classes.buttonText}>START WITH OKULIS</span>
          </button>
        </>
      </div>
    </div>
  );
};
