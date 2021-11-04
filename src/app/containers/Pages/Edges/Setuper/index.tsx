import React from 'react';
import imgBg from 'app/images/EdgesMap.png';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { StepperImg, StepperRow, StepperText, StteperWrapper } from '../styles';
interface Props {
  onGoToEditor: () => void;
}

const Setuper: React.FC<Props> = ({ onGoToEditor }) => {
  const onGoTo = () => {
    onGoToEditor();
  };
  return (
    <StteperWrapper>
      <StepperImg src={imgBg} alt="world" width="830" height="416" />
      <StepperRow margin="0 auto 40px auto">
        <StepperText highLight margin="0 auto 20px auto">
          There is no created edges yet
        </StepperText>
        <StepperText margin="0 auto">To create an edge click on the button below.</StepperText>
      </StepperRow>
      <StepperRow margin="0 auto">
        <PrimaryButton styles={{ width: '168px', height: '46px' }} label="Create Edge" icon={plusIcon} onClick={onGoTo} />
      </StepperRow>
    </StteperWrapper>
  );
};

export default React.memo(Setuper);
