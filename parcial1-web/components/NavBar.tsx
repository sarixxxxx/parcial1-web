import Link from "next/link";
import { BookMarked, House, UserPlus } from "lucide-react";
const NavBar = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <House size={20} />
          <span>Bookstore</span>
        </h1>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            <House size={18} />
            <span>Inicio</span>
          </Link>

          <Link
            href="/authors"
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            <BookMarked size={18} />
            <span>Autores</span>
          </Link>

          <Link
            href="/crear"
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            <UserPlus size={18} />
            <span>Crear Autor</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;