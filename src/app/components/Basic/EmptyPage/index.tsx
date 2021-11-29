import React from 'react';
import { PageWrapper, StepperImg, StepperRow } from './styles';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';

interface Props {
  icon?: string;
  buttonLabel?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  hideButtonRow?: boolean;
}

const EmptyPage: React.FC<Props> = ({ icon, buttonLabel, children, hideButtonRow, onClick }) => {
  return (
    <PageWrapper>
      {icon && <StepperImg src={icon} alt="world" width="830" height="416" />}
      <StepperRow margin="0 auto 40px auto">{children}</StepperRow>
      {!hideButtonRow && (
        <StepperRow margin="0 auto auto auto">
          <PrimaryButton styles={{ width: '168px', height: '46px' }} label={buttonLabel} icon={plusIcon} onClick={onClick} />
        </StepperRow>
      )}
    </PageWrapper>
  );
};

export default React.memo(EmptyPage);
