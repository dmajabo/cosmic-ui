import React from 'react';
import { ModalHeader, ModalTitle, ModalWrapper } from './styles';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Zoom from '@mui/material/Zoom';
import Fade from '@mui/material/Fade';
import IconWrapper from '../Buttons/IconWrapper';
import { closeIcon } from '../SVGIcons/close';
interface Props {
  id: string;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  useFadeAnimation?: boolean;
  isCustom?: boolean;
  modalStyles?: Object;
  showHeader?: boolean;
  title?: string;
  showCloseButton?: boolean;
}

const ModalComponent: React.FC<Props> = ({ open, id, children, onClose, useFadeAnimation, isCustom, modalStyles, showHeader, title, showCloseButton }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <Modal
      aria-labelledby={`transition-modal-title${id}`}
      aria-describedby={`transition-modal-description${id}`}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          background: 'var(--_primaryColor)',
          opacity: '0.5 !important',
          zIndex: 1,
        },
      }}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
      }}
    >
      <>
        {!useFadeAnimation && !isCustom && (
          <Zoom timeout={300} in={open}>
            <ModalWrapper style={modalStyles}>
              {showHeader && (
                <ModalHeader>
                  <ModalTitle>{title}</ModalTitle>
                  {showCloseButton && <IconWrapper styles={{ position: 'absolute', top: '-20px', right: '-20px', zIndex: 1 }} onClick={onClose} icon={closeIcon} />}
                </ModalHeader>
              )}
              {children}
            </ModalWrapper>
          </Zoom>
        )}
        {useFadeAnimation && !isCustom && (
          <Fade timeout={300} in={open}>
            <ModalWrapper style={modalStyles}>
              {showHeader && (
                <ModalHeader>
                  <ModalTitle>{title}</ModalTitle>
                  {showCloseButton && <IconWrapper styles={{ position: 'absolute', top: '-20px', right: '-20px', zIndex: 1 }} onClick={onClose} icon={closeIcon} />}
                </ModalHeader>
              )}
              {children}
            </ModalWrapper>
          </Fade>
        )}
        {isCustom && (
          <ModalWrapper style={modalStyles}>
            {showHeader && (
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                {showCloseButton && <IconWrapper styles={{ position: 'absolute', top: '-20px', right: '-20px', zIndex: 1 }} onClick={onClose} icon={closeIcon} />}
              </ModalHeader>
            )}
            {children}
          </ModalWrapper>
        )}
      </>
    </Modal>
  );
};

export default React.memo(ModalComponent);
