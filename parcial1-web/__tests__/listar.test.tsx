import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import AuthorsPage from '@/app/authors/page';
import AuthorsProvider from '@/components/AuthorsContext';
import React from 'react';

// Mock del contexto con autores iniciales
const mockAuthors = [
    { id: '1', name: 'J.K. Rowling', birthDate: '1965-07-31', description: 'Autora de Harry Potter', image: 'https://ejemplo.com/jk.jpg' },
    { id: '2', name: 'Stephen King', birthDate: '1947-09-21', description: 'Escritor de terror', image: 'https://ejemplo.com/sk.jpg' },
];
jest.mock('@/components/AuthorsContext', () => {
    return {
        __esModule: true,
        useAuthors: () => ({
            authors: mockAuthors,
            addAuthor: jest.fn(),
            deleteAuthor: jest.fn(),
            editAuthor: jest.fn(),
        }),
        default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    };
});

// Mock de lucide-react
jest.mock('lucide-react', () => ({
    Trash2: () => <div data-testid="trash-icon">Trash</div>,
    Pencil: () => <div data-testid="pencil-icon">Edit</div>,
    Search: () => <div data-testid="search-icon">Search</div>,
}));


const setup = () =>{
    const user = userEvent.setup();
    render( <AuthorsProvider><AuthorsPage /></AuthorsProvider>);

    const searchField = screen.getByPlaceholderText(/busque los autores por nombre/i) as HTMLInputElement;

    return { user, searchField };
}

describe('AuthorPageFilter', () =>{

    test('Prueba de Filtrado Dinámico de la Lista', async ()=>{
        const {user, searchField}= setup();
        await user.type(searchField, 'J.K');
        expect(screen.getByText(/j.k/i)).toBeInTheDocument();
    })
    
    test('Prueba de Notificación de "Sin Coincidencias"', async ()=>{
        const {user, searchField}= setup();
        await user.type(searchField, 'djsfskjdnfkasndlka');
        expect(screen.getByText(/no hay autores que coincidan con tu búsqueda/i)).toBeInTheDocument();
    })


    test('Prueba de Sensibilidad a Mayúsculas y Minúsculas"', async ()=>{
        const {user, searchField}= setup();
        await user.type(searchField, 'j.k');
        expect(screen.getByText(/j.k/i)).toBeInTheDocument();
        await user.clear(searchField);
        await user.type(searchField, 'J.K');
        expect(screen.getByText(/j.k/i)).toBeInTheDocument();
    })


})
