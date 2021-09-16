import React from 'react';
import { MainLabel, SecondaryLabel, Wrapper } from './styles';

interface Props {}

const StartComponent: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper>
      <MainLabel>Made a Couple of Clicks to Protect Your Data</MainLabel>
      <SecondaryLabel>Protect your data in a minute</SecondaryLabel>
    </Wrapper>
  );
};

export default React.memo(StartComponent);
