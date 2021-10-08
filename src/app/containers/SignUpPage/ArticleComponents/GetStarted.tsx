import React from 'react';
import { SignUpStyles } from '../SignUpStyles';
import { ConnectButton } from './ConnectButton';
import { Divider } from './Divider';
import GoogleIcon from '../icons/google.svg';
import OktaIcon from '../icons/okta.svg';
import EmailIcon from '../icons/email.png';

export const GetStarted: React.FC = () => {
  const classes = SignUpStyles();
  return (
    <div>
      <div className={classes.getStartedContainer}>
        <div className={classes.title}>Get Started</div>
        <div className={classes.subTitle}>Many variants have been employed since the early 1960ies, and quite likely since the sixteenth century</div>
        <ConnectButton text="CONNECT WITH GOOGLE" logoImg={GoogleIcon} />
        <ConnectButton text="CONNECT WITH OKTA" logoImg={OktaIcon} />
      </div>
      <Divider text="Or" />
      <div className={classes.getStartedContainer}>
        <ConnectButton text="CONNECT WITH EMAIL" logoImg={EmailIcon} />
      </div>
    </div>
  );
};
