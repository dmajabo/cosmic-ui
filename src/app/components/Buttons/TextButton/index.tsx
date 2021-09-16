import React from 'react';
import { TextButtonStyles } from './style';

interface IProps {
  onClick: () => void;
  label: JSX.Element | string;
  disabled?: boolean;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
}
const TextButton: React.FC<IProps> = (props: IProps) => {
  const onClick = () => {
    if (props.disabled) {
      return;
    }
    props.onClick();
  };
  return (
    <TextButtonStyles width={props.width} height={props.height} bgColor={props.bgColor} textColor={props.textColor} onClick={onClick} disabled={props.disabled}>
      {props.label}
    </TextButtonStyles>
  );
};

export default React.memo(TextButton);
