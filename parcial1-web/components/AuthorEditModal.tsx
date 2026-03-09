import { Modal, Box } from '@mui/material'
import React from 'react'
import AuthorForms from './AuthorForms'
import { Author } from './AuthorsContext'

interface AuthorEditModalProps{
    isOpen: boolean,
    handleClose: () => void,
    author: Author
}

const modalSx = {
  display: 'flex' as const,
  alignItems: 'center',
  justifyContent: 'center',
};

const style = {
  width: 700,
  height: 500,
  display: 'flex' as const,
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  overflow: 'auto'
};

const AuthorEditModal = ({isOpen, handleClose, author}:AuthorEditModalProps) => {
  return (
    <Modal open={isOpen} onClose={handleClose} sx={modalSx}>
      <Box sx={style}>
        <AuthorForms
          authorToEdit={author}
          handleClose={handleClose}
        />
      </Box>
    </Modal>
  )
}

export default AuthorEditModal;