import IconWrapper from 'app/components/Buttons/IconWrapper';
import { SecondaryButtonStyles } from 'app/components/Buttons/SecondaryButton/styles';
import { Label } from 'app/components/Buttons/styles/styles';
import React from 'react';

interface SecondaryButtonProps {
  readonly label: JSX.Element | string;
  readonly icon?: JSX.Element;
  readonly onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  readonly disabled?: boolean;
  readonly styles?: Object;
  readonly withoutBorder?: boolean;
  readonly active?: boolean;
  readonly iconWidth?: string;
  readonly iconHeight?: string;
  readonly width?: string;
  readonly height?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = props => {
  return (
    <SecondaryButtonStyles
      className={props.active ? 'active' : ''}
      width={props.width}
      height={props.height}
      withoutBorder={props.withoutBorder}
      style={props.styles}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Label margin={props.icon ? '0 12px 0 0' : '0'}>{props.label}</Label>
      {props.icon && <IconWrapper width={props.iconWidth || '16px'} height={props.iconHeight || '16px'} icon={props.icon} />}
    </SecondaryButtonStyles>
  );
};

export default React.memo(SecondaryButton);
