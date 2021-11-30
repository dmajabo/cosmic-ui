import React from 'react';
import { IconStyles } from 'app/components/Modal/styles';
import { DeleteWrapper, DialogHeader, DialogText } from './styles';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { deployImage } from 'app/components/SVGIcons/edges/deployImage';

interface IProps {
  dataItemId: string;
  onClose: () => void;
}

const DeployGroupComponent: React.FC<IProps> = (props: IProps) => {
  const onClose = () => {
    props.onClose();
  };
  return (
    <DeleteWrapper>
      <DialogHeader style={{ marginBottom: '40px' }}>
        <IconStyles style={{ background: 'transparent', borderRadius: 'unset', marginTop: '24px' }} width="100%" height="160px">
          {deployImage}
        </IconStyles>
        <IconWrapper styles={{ position: 'absolute', top: '-10px', right: '-10px' }} icon={closeSmallIcon} onClick={onClose} />
      </DialogHeader>

      <DialogText fontSize="34px" lineHeight="134.7%" margin="0 15px 14px 15px">
        Well Done!
      </DialogText>
    </DeleteWrapper>
  );
};

export default React.memo(DeployGroupComponent);
