import React from 'react';
import { PageWrapper, StepperImg, StepperRow, StepperSwgWrapper } from './styles';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';

interface Props {
  icon?: JSX.Element;
  iconAsString?: string;
  buttonLabel?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  hideButtonRow?: boolean;
  iconStyles?: Object;
}

const EmptyPage: React.FC<Props> = ({ iconAsString, iconStyles, icon, buttonLabel, children, hideButtonRow, onClick }) => {
  return (
    <PageWrapper>
      {icon && <StepperSwgWrapper style={iconStyles}>{icon}</StepperSwgWrapper>}
      {iconAsString && <StepperImg style={iconStyles} src={iconAsString} width="200" height="200" />}
      <StepperRow margin="0 auto 40px auto">{children}</StepperRow>
      {!hideButtonRow && (
        <StepperRow margin="0 auto auto auto">
          <PrimaryButton styles={{ minWidth: '168px', height: '46px' }} label={buttonLabel} icon={plusIcon} onClick={onClick} />
        </StepperRow>
      )}
    </PageWrapper>
  );
};

export default React.memo(EmptyPage);
