import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © 2025 MinhasSkins - Marketplace de Skins de CS
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              <span className="text-orange-400 font-semibold">Matheus Vinicius Mariussi</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;