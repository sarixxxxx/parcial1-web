import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import AuthorsPage from '@/app/authors/page';
import AuthorsProvider from '@/components/AuthorsContext';


const setup = () =>{
    const user = userEvent.setup();
    render( <AuthorsProvider><AuthorsPage /></AuthorsProvider>);

    const searchField = screen.getByLabelText(/buscar/i) as HTMLInputElement;

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
        expect(screen.getByText(/no hay autores que coincidan con tu busqueda/i)).toBeInTheDocument();
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
