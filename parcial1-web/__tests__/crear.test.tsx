import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CrearAuthor from '@/app/crear/page';

// Mock del router de Next.js
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

// Mock del contexto
jest.mock('../components/AuthorsContext', () => ({
    useAuthors: () => ({
        authors: [],
        addAuthor: jest.fn(),
        editAuthor: jest.fn(),
    }),
}));

const setup = () => {
    const user = userEvent.setup();
    render(<CrearAuthor />);

    const nameInput = screen.getByLabelText(/nombre/i) as HTMLInputElement;
    const birthDateInput = screen.getByLabelText(/fecha de nacimiento/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/descripción/i) as HTMLInputElement;
    const imageInput = screen.getByLabelText(/imagen \(url\)/i) as HTMLInputElement;
    const saveBtn = screen.getByRole('button', { name: /guardar/i });

    return { user, nameInput, birthDateInput, descriptionInput, imageInput, saveBtn };
};

describe('AuthorForms', () => {

    test('botón guardar deshabilitado al inicio', () => {
        const { saveBtn } = setup();
        expect(saveBtn).toBeDisabled();
    });

    test('muestra error si nombre tiene menos de 8 caracteres', async () => {
        const { user, nameInput } = setup();
        await user.type(nameInput, 'Ana');
        await user.tab(); // dispara onBlur
        expect(screen.getByText(/mínimo 8 caracteres/i)).toBeInTheDocument();
    });

    test('muestra error si nombre está vacío al salir del campo', async () => {
        const { user, nameInput } = setup();
        await user.click(nameInput);
        await user.tab();
        expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
    });

    test('muestra error si URL de imagen no tiene http', async () => {
        const { user, imageInput } = setup();
        await user.type(imageInput, 'imagen.jpg');
        await user.tab();
        expect(screen.getByText(/http/i)).toBeInTheDocument();
    });

    test('botón se habilita con todos los campos válidos', async () => {
        const { user, nameInput, birthDateInput, descriptionInput, imageInput, saveBtn } = setup();

        await user.type(nameInput, 'Gabriel García Márquez');
        await user.type(birthDateInput, '1927-03-06');
        await user.type(descriptionInput, 'Escritor colombiano ganador del Nobel');
        await user.type(imageInput, 'https://ejemplo.com/foto.jpg');

        expect(saveBtn).not.toBeDisabled();
    });

});