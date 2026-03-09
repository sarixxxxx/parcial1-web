This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```bash
npm i
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Reporte de cambios

Para la persistencia de datos entre las rutas, se decidió utilizar contexto, para que todos los componentes tuviesen acceso y la posibilidad de editar la lista de autores. Con el archivo `components/AuthorsContext.tsx`, se hace el llamado al API provisto para el parcial, y allí mismo se definen las funciones necesarias para el CRUD, para que estas puedan ser invocadas libremente en el listado de Autores y en el formulario de creación/edición de autores. 

Este envuelve todo el contexto de la aplicación, ya que se instancia en ` app/layout.tsx` y dentro comienza la aplicación. Para llamarse, al principio de la aplicación se utiliza el "use client";. Asimismo, se llama dentro del componente el estado de autores del contexto así:

const { authors, deleteAuthor} = useAuthors();

Con ello, ya estarían todos los componentes sincronizados con esta información.


Para el listado, se utilizó un hook de estado para el campo input de la búsqueda por nombre que hacía el usuario. Con un handleChange, por cada cambio en el texto de ese campo, se va cambiando el filtro que se establece. Finalmente, se renderizan los autores "filtrados", que se filtran mediante la función nativa de js .filter(), busccando la contenencia del parámetro de búsqueda dentro del nombre del autor. 
