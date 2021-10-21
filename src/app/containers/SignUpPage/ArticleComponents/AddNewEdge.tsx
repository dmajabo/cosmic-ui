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

  const [isAwsSelected, setIsAwsSelected] = useState<boolean>(false);
  const [isMerakiSelected, setIsMerakiSelected] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [edgeLocation, setEdgeLocation] = useState<string>('');

  useEffect(() => {
    const isButtonEnabled = isAwsSelected || isMerakiSelected;
    setIsButtonEnabled(isButtonEnabled);
  }, [isAwsSelected, isMerakiSelected]);

  const onEdgeSelect = () => {
    onNewEdgeSelected(edgeLocation);
  };

  const onAwsSelect = () => {
    setIsAwsSelected(true);
    setIsMerakiSelected(false);
    setEdgeLocation(PreDefinedEdges.Aws);
  };

  const onMerakiSelect = () => {
    setIsAwsSelected(false);
    setIsMerakiSelected(true);
    setEdgeLocation(PreDefinedEdges.Meraki);
  };

  return (
    <div>
      <div className={classes.title}>Select New Edge</div>
      <div className={classes.subTitle}>
        In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready.
      </div>
      <div className={classes.edgeBoxContainer}>
        <div className={classes.newEdgePadding}>
          <div className={isAwsSelected ? classes.newEdgeHighlightedBox : classes.newEdgeBox} onClick={onAwsSelect}>
            <img className={classes.newEdgeIcon} src={AwsIcon} alt="aws" />
            <span className={classes.newEdgeTitleText}>AWS</span>
          </div>
          <div className={isMerakiSelected ? classes.newEdgeHighlightedBox : classes.newEdgeBox} onClick={onMerakiSelect}>
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
