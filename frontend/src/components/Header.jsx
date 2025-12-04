import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            MinhasSkins
          </Link>
        </div>
        
        <nav className="flex-1 mx-10">
          <ul className="flex space-x-6 justify-center">
            <li>
              <Link to="/" className="hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/novo-anuncio" className="hover:text-orange-400 transition-colors">
                Anunciar Skin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;