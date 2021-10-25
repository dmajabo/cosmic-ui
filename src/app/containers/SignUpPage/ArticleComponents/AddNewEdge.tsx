import React, { useEffect, useState } from 'react';
import SkipIcon from '../icons/skip.svg';
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

  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [edgeLocation, setEdgeLocation] = useState<string>('');

  useEffect(() => {
    const isButtonEnabled = edgeLocation ? true : false;
    setIsButtonEnabled(isButtonEnabled);
  }, [edgeLocation]);

  const onEdgeSelect = () => onNewEdgeSelected(edgeLocation);

  const onLocationSelect = (edgeLocation: string) => setEdgeLocation(edgeLocation);

  return (
    <div>
      <div className={classes.title}>Select New Edge</div>
      <div className={classes.subTitle}>
        In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready.
      </div>
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
          <div className={classes.skipSetupButton}>
            SKIP SETUP
            <img className={classes.whiteArrow} src={SkipIcon} alt="skip setup" />
          </div>
          <div className={classes.skipSetupText}>You can finish it in any time.</div>
        </div>
        <div className={classes.endFlexContainer}>
          <div className={classes.skipSetupButton} onClick={onCancelNewEdge}>
            CANCEL
          </div>
          <button className={isButtonEnabled ? classes.connectSourceFormButton : classes.startButton} onClick={onEdgeSelect} disabled={!isButtonEnabled}>
            <span className={classes.buttonText}>NEXT</span>
            <img className={classes.whiteArrow} src={ArrowIcon} alt="next arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};
