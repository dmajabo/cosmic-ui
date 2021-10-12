import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import { EdgeBox } from './EdgeBox';
import AwsIcon from '../icons/aws.svg';
import MerakiIcon from '../icons/meraki.svg';
import AddIcon from '../icons/add.svg';
import { Button, Typography } from '@material-ui/core';
import SkipIcon from '../icons/skip.svg';

interface EdgeBoxData {
  readonly Img: string;
  readonly title: string;
  readonly content: string;
  readonly onClick: () => void;
}

export const ConnectEdges: React.FC = () => {
  const classes = SignUpStyles();

  const edgeBoxArray: EdgeBoxData[] = [
    {
      Img: AwsIcon,
      title: 'AWS',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => {},
    },
    {
      Img: MerakiIcon,
      title: 'Cisco Meraki',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      onClick: () => {},
    },
  ];

  return (
    <div>
      <div className={classes.title}>Connect To Your Edges</div>
      <div className={classes.subTitle}>
        In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready.
      </div>
      <div className={classes.edgeBoxContainer}>
        {edgeBoxArray.map(edgeBox => (
          <EdgeBox Img={edgeBox.Img} title={edgeBox.title} content={edgeBox.content} onClick={edgeBox.onClick} />
        ))}
        <div className={classes.newEdgeButton}>
          ADD NEW EDGE
          <img className={classes.whiteArrow} src={AddIcon} alt="add new edge" />
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
        <div>
          <Button className={classes.startButton} color="primary" disabled={true} variant="contained" disableElevation>
            START WITH OKULIS
          </Button>
        </div>
      </div>
    </div>
  );
};
