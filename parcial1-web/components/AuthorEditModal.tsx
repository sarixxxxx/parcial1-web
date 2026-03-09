import { Modal } from '@mui/material'
import React from 'react'
import AuthorForms from './AuthorForms'
import { Author } from './AuthorsContext'

interface AuthorEditModalProps{
    isOpen: boolean,
    handleClose: () => void,
    author: Author
}
const AuthorEditModal = ({isOpen, handleClose, author}:AuthorEditModalProps) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
        <AuthorForms authorToEdit={author}/>

    </Modal>
  )
}

export default AuthorEditModal;