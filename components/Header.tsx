
import React from 'react';

const Header: React.FC = () => (
  <header className="text-center mb-8">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
      Generador de Prompts 3D
    </h1>
    <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
      Versión avanzada con visor en tiempo real, posición XYZ, rotación exacta y escalado/deformación porcentual.
    </p>
  </header>
);

export default Header;
