import React from 'react';
import { ModalWrapper } from './styles';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Zoom from '@mui/material/Zoom';

interface Props {
  id: string;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalComponent: React.FC<Props> = ({ open, id, children, onClose }) => {
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
      <Zoom timeout={300} in={open}>
        <ModalWrapper>{children}</ModalWrapper>
      </Zoom>
    </Modal>
  );
};

export default React.memo(ModalComponent);
