import React, { useState } from 'react';
import ArrowIcon from '../icons/rightArrow.svg';
import AwsIcon from '../icons/aws.svg';
import MerakiIcon from '../icons/meraki.svg';
import { SignUpStyles } from '../SignUpStyles';
import { PreDefinedEdges } from '..';

interface AddNewEdgeProps {
  readonly onNewEdgeSelected: (edgeLocation: string) => void;
  readonly onCancelNewEdge: () => void;
}

export const AddNewEdge: React.FC<AddNewEdgeProps> = ({ onNewEdgeSelected, onCancelNewEdge }) => {
  const classes = SignUpStyles();

  const [edgeLocation, setEdgeLocation] = useState<string>('');

  const onEdgeSelect = () => onNewEdgeSelected(edgeLocation);

  const onLocationSelect = (edgeLocation: PreDefinedEdges) => setEdgeLocation(edgeLocation);

  return (
    <div>
      <div className={classes.title}>Select New Edge</div>
      <div className={classes.edgeBoxContainer}>
        <div className={classes.newEdgePadding}>
          <div className={edgeLocation === PreDefinedEdges.Aws ? classes.newEdgeHighlightedBox : classes.newEdgeBox} onClick={() => onLocationSelect(PreDefinedEdges.Aws)}>
            <img className={classes.newEdgeIcon} src={AwsIcon} alt="aws" />
            <span className={classes.newEdgeTitleText}>AWS</span>
          </div>
          <div className={edgeLocation === PreDefinedEdges.Meraki ? classes.newEdgeHighlightedBox : classes.newEdgeBox} onClick={() => onLocationSelect(PreDefinedEdges.Meraki)}>
            <img className={classes.titleImg} src={MerakiIcon} alt="meraki" />
            <span className={classes.newEdgeTitleText}>Cisco Meraki</span>
          </div>
        </div>
      </div>
      <div className={classes.flexContainer}>
        <div>
          <div className={classes.skipSetupButton} onClick={onCancelNewEdge}>
            CANCEL
          </div>
        </div>
        <div className={classes.endFlexContainer}>
          <button className={edgeLocation ? classes.connectSourceFormButton : classes.startButton} onClick={onEdgeSelect} disabled={edgeLocation ? false : true}>
            <span className={classes.buttonText}>NEXT</span>
            <img className={classes.whiteArrow} src={ArrowIcon} alt="next arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};
