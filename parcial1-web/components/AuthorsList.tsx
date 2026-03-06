import { useEffect, useState } from "react";
import AuthorsService from "../services/AuthorsService";
export interface Editorial {
    id: number;
    name: string;
}

export interface Book{
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

export default function AuthorsList(){
    const [authors, setAuthors] = useState([]);

    useEffect(
        () =>{
            AuthorsService.getAuthors()
            .then(data => setAuthors(data))
        }, []
    )
}