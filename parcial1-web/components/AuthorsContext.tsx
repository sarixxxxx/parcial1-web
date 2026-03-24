"use client";
import { useContext, useState, ReactNode, useEffect} from "react";
import { createContext } from "react";
 interface Editorial {
    id: number;
    name: string;
}

 interface Book{
    id: number;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string;
    description: string;
    editorial: Editorial;
}

export interface Author{
    id: number;
    birthDate: string;
    name: string;  
    description:string;
    image: string;
    books: Book[];
}

interface AuthorsProviderProps {
    children: ReactNode;
}

interface AuthorContextType {
    authors: Author[];
    addAuthor: (
        id_new: number,
        birthdate_new: string,
        name_new: string,
        description_new: string,
        image_new: string
    ) => void;
    editAuthor: (
        indexAuthor: number,
        birthdate_new: string,
        name_new: string,
        description_new: string,
        image_new: string
    ) => void;
    deleteAuthor: (authorId: number) => void;
}



const AuthorContext = createContext<AuthorContextType | undefined>(undefined);

const AuthorsProvider =({ children }: AuthorsProviderProps) =>{
    const [authors, setAuthors]= useState<Author[]>([]);

    useEffect(() =>{
        fetch("http://127.0.0.1:8080/api/authors")
            .then(response => response.json()).then(
            (data)=> {
                console.log("tamaño",authors.length)
                setAuthors(data);
            }
        );
    }, []);

    const addAuthor = (id_new: number, birthdate_new: string, name_new: string, description_new: string, image_new: string) =>{
        const newAuthor: Author = {
                    id: id_new,
                    birthDate: birthdate_new,
                    name: name_new,
                    description: description_new,
                    image: image_new,
                    books:[]
                    };
        setAuthors([...authors, newAuthor]);
    }

    const editAuthor = (indexAuthor:number, birthdate_new: string, name_new: string, description_new: string, image_new: string) =>{
        const replacedAuthors = authors.map( (author) =>{
            if (indexAuthor ===author.id){
                return {
                ...author,
                birthDate: birthdate_new,
                name: name_new,
                description: description_new,
                image: image_new
                };
            } else{
                return author;
            }

        })
        setAuthors(replacedAuthors);
    }
    const deleteAuthor = (authorId:number) =>{
        const updatedAuthors = authors.filter(author => author.id !== authorId);
        setAuthors(updatedAuthors);
    }
    return  (
        <AuthorContext.Provider value={{authors, addAuthor, editAuthor, deleteAuthor}}>
            {children}
        </AuthorContext.Provider>
    )
    }

export const useAuthors = () => {
    const context = useContext(AuthorContext);

    if (!context) {
        throw new Error("useAuthors must be used inside AuthorsProvider");
    }

    return context;
};

export default AuthorsProvider;