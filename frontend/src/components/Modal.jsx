import React from 'react';
import { Modal as MUIModal, Box } from '@mui/material';

const Modal = ({ open, onClose, children }) => {
  return (
    <MUIModal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // bgcolor: 'background.paper',
          // boxShadow: 24,
          // p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
    </MUIModal>
  );
};

export default Modal;
