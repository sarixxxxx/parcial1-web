import { Modal, Box } from '@mui/material'
import React from 'react'
import AuthorForms from './AuthorForms'
import { Author } from './AuthorsContext'

interface AuthorEditModalProps{
    isOpen: boolean,
    handleClose: () => void,
    author: Author
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2
};

const AuthorEditModal = ({isOpen, handleClose, author}:AuthorEditModalProps) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
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