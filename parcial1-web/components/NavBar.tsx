import Link from "next/link";
const NavBar= () =>{
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className= "container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Bookstore</h1>
                <nav>
                    <Link href="/" className="px-3 hover:text-gray-300"> Inicio</Link>
                    <Link href="/authors" className="px-3 hover:text-gray-300"> Autores</Link>
                    <Link href="/crear" className="px-3 hover:text-gray-300"> Crear Autor</Link>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;