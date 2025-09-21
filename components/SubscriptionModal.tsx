import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (email: string) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }
    setError('');
    onSubscribe(email);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-brand-gray-800 rounded-2xl shadow-2xl p-8 m-4 max-w-md w-full relative border border-brand-gray-700 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in"
        style={{ animationName: 'fadeInScale', animationDuration: '0.3s', animationFillMode: 'forwards' }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fadeInScale {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-gray-500 hover:text-white transition-colors"
          aria-label="Cerrar modal"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Desbloquea las Descargas
          </h2>
          <p className="text-brand-gray-400 mb-6">
            Suscríbete para descargar tus imágenes y recibir novedades.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className="w-full px-4 py-3 bg-brand-gray-900 border border-brand-gray-600 rounded-lg text-brand-gray-100 placeholder-brand-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all"
                required
              />
               {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suscribirse y Descargar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
