import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CrearAuthor from '@/app/crear/page';
import test, { describe} from 'node:test';
import { expect} from '@jest/globals';

const setup= () =>{
    const user = userEvent.setup();
    render(<CrearAuthor />);

    const nameInput = screen.getByLabelText(/nombre/i) as HTMLInputElement;
    const birthDateInput = screen.getByLabelText(/fecha de nacimiento/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/descripción/i) as HTMLInputElement;
    const imageInput = screen.getByLabelText(/imagen (url)/i) as HTMLInputElement;

    const saveBtn =screen.getByRole('button', {name: /guardar/i});

    return {user,nameInput, birthDateInput, descriptionInput,imageInput, saveBtn}
    

}

describe('Render de /crear', () =>{
    test('renderiza heading, campos y ayuda; botón deshabilitado al inicio', () =>{
        const {saveBtn} =setup();
        expect(screen.getByLabelText(/nombre/i)).toBeInDocument();
        expect(saveBtn).toBeDisabled();

    }

    )
})