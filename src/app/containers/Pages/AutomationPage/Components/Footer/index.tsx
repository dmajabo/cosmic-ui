import IconWrapper from 'app/components/Buttons/IconWrapper';
import { prevArrow, nextArrow } from 'app/components/SVGIcons/arrows';
import React from 'react';
import { Button } from './styles';

interface IProps {
  canGoPrev: boolean;
  canGoNext: boolean;
  disabledNext?: boolean;
  saveLabel?: string;
  onGoNext: () => void;
  onGoPrev: () => void;
  onSave: () => void;
}

const Footer: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      {props.canGoPrev && (
        <Button margin="0 20px 0 0" onClick={props.onGoPrev}>
          <IconWrapper styles={{ margin: '0 12px 0 0' }} icon={prevArrow} />
          <span>Prev</span>
        </Button>
      )}
      {props.canGoNext ? (
        <Button margin="0 0 0 auto" primary disabled={props.disabledNext} onClick={props.onGoNext}>
          <span>Next</span>
          <IconWrapper styles={{ margin: '0 0 0 12px' }} icon={nextArrow} />
        </Button>
      ) : (
        <Button margin="0 0 0 auto" primary disabled={props.disabledNext} onClick={props.onSave}>
          <span>{props.saveLabel || 'Save'}</span>
        </Button>
      )}
    </>
  );
};

export default React.memo(Footer);
