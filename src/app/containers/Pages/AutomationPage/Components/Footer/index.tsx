import React from 'react';
import { Button } from './styles';

interface IProps {
  saveDisabled: boolean;
  saveLabel?: string;
  onSave: () => void;
}

const Footer: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Button margin="0 0 0 auto" primary disabled={props.saveDisabled} onClick={props.onSave}>
        <span>{props.saveLabel || 'Save'}</span>
      </Button>
    </>
  );
};

export default React.memo(Footer);
