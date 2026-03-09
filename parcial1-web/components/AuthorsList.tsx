"use client";
import { useAuthors } from './AuthorsContext'
interface CardProps{
    image: string,
    name: string,
    description: string
}
function Card({image, name, description}: CardProps){
    return(
        <div className="card">
            <img src={image} alt="imagen del autor" />
            <h2> {name}</h2>
            <p> {description}</p>
        </div>  
    )
}

export default function AuthorsList(){

    const { authors, editAuthor } = useAuthors();

    const listAuthors = authors.map(
        author => (
            <Card
                key={author.id}
                image={author.image}
                name={author.name}
                description={author.description}
            />
        )
    );

    return <div className="cards-container">{listAuthors}</div>
}