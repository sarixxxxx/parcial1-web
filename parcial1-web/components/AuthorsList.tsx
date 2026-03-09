"use client";
import { use, useState } from 'react';
import { Author, useAuthors } from './AuthorsContext'
import { Trash2 , Pencil} from 'lucide-react';
import AuthorEditModal from './AuthorEditModal';

interface CardProps{
    image: string,
    name: string,
    description: string,
    onDelete: () => void,
    handleOpen: () => void
}
function Card({image, name, description, onDelete, handleOpen}: CardProps){
    return(
        <div className="card">
            <img src={image} alt="imagen del autor" />
            <h2> {name}</h2>
            <p> {description}</p>
            <div className="flex justify-end pt-2 space-x-2">
                    <button
                        onClick={() => {
                    if(confirm("¿Eliminar autor?")){
                        onDelete()
                    }
                }} className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        <Trash2 size={18}/>
                    </button>
                    <button
                        onClick={handleOpen } 
                        className="p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition"
                    >
                        <Pencil size={18}/>
                    </button>
                </div>
        </div>  
    )
}

export default function AuthorsList(){

    const { authors, editAuthor , deleteAuthor} = useAuthors();
    const [open, setOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<Author|null>(null);

    const handleClose = () => {
        setOpen(false);
        setSelectedAuthor(null)
    }

    const handleOpen=(author:Author) =>{
        setOpen(true);
        setSelectedAuthor(author); 
        console.log("id autor", selectedAuthor);
    }

    const listAuthors = authors.map(
        author => (
            <Card
                key={author.id}
                image={author.image}
                name={author.name}
                description={author.description}
                onDelete={() => deleteAuthor(author.id)}
                handleOpen={() => handleOpen(author)}
            />
        )
    );

    return (
        <div>
            <div className="cards-container">{listAuthors}</div>
            {open && selectedAuthor !== null && (
                <AuthorEditModal
                    isOpen={open}
                    handleClose={handleClose}
                    author={selectedAuthor}
                />
            )}
        </div>
    )
}