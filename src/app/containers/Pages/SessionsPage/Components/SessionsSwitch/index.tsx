import React from 'react';
import SwitchInput from 'app/components/Inputs/SwitchInput';
import { StitchStyles, StitchTmStyles, Wrap, Wrapper } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';

interface Props {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SessionsSwitch: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Wrapper>
      <Wrap>
        <IconWrapper styles={{ margin: '0 6px 0 0' }} width="30px" height="30px" icon={logoIcon()} />
        <StitchStyles>Stitch</StitchStyles>
        <StitchTmStyles>TM</StitchTmStyles>
      </Wrap>
      <SwitchInput showLabels checked={checked} onChange={handleChange} />
    </Wrapper>
  );
};

export default React.memo(SessionsSwitch);
