
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Generador de Ángulos de Cámara
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-gray-400">
        Sube una imagen para generar automáticamente una serie de planos y movimientos de cámara, simulando una cobertura fotográfica completa.
      </p>
    </header>
  );
};
