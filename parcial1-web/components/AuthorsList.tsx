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

    const { authors, deleteAuthor} = useAuthors();
    const [open, setOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<Author|null>(null);
    const [searchedName, setSearchedName]= useState("");
    const handleClose = () => {
        setOpen(false);
        setSelectedAuthor(null)
    }

    const handleOpen=(author:Author) =>{
        setOpen(true);
        setSelectedAuthor(author); 
        console.log("id autor", selectedAuthor);
    }

    const filteredAuthors= authors.filter( 
        author=> author.name.toLowerCase().includes(searchedName.toLowerCase())
    )

    const listAuthors = filteredAuthors.map(
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

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value}=e.target;
        setSearchedName(value);
    }

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="buscar" className="block text-sm font-medium text-slate-700"> Buscar autor por nombre</label>
                    <input
                        id="buscar"
                        name="buscar"
                        type="text"
                        value={searchedName}
                        onChange= {handleChange}
                        placeholder='Busque los autores por nombre'
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 bg-transparent"
                        />
                </div>
            </div>
            { filteredAuthors.length>0 &&
            <div className="cards-container">{listAuthors}</div>
            
            }
            {filteredAuthors.length===0 &&
                <h1 id="filter-error" role="alert" className="text-sm text-red-500 mt-1" style={{color: '#dc2626'}}> No hay autores que coincidan con tu búsqueda :(</h1>
            }
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