import React from 'react';
import { GeneratedImage } from '../types';
import { Spinner } from './Spinner';
import { ErrorIcon } from './icons/ErrorIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageCardProps {
  image: GeneratedImage;
  onGenerate: (id: string) => void;
  onRequestDownload: (startDownload: () => void) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onGenerate, onRequestDownload }) => {

  const handleGenerateClick = () => {
    if (image.status === 'pending' || image.status === 'error') {
      onGenerate(image.id);
    }
  };

  const startDownload = () => {
    if (!image.src) return;
    const link = document.createElement('a');
    link.href = image.src;
    const filename = `${image.title.toLowerCase().replace(/[\s/]/g, '-')}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRequestDownload(startDownload);
  };

  const renderContent = () => {
    switch (image.status) {
      case 'pending':
        return (
          <button 
            onClick={handleGenerateClick} 
            className="w-full h-full flex flex-col items-center justify-center bg-brand-gray-900/50 hover:bg-brand-blue/10 text-brand-gray-400 hover:text-brand-blue transition-all duration-300 p-2"
            aria-label={`Generar ${image.title}`}
          >
            <SparklesIcon className="w-8 h-8" />
            <span className="mt-2 font-semibold text-center text-brand-gray-200">{image.title}</span>
            <span className="text-xs opacity-80">Generar</span>
          </button>
        );
      case 'generating':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
            <Spinner className="w-10 h-10" />
            <span className="mt-3 font-semibold text-brand-gray-300">{image.title}</span>
            <p className="text-xs text-brand-gray-400 mt-1 animate-pulse-slow">
              Generando imagen...
            </p>
          </div>
        );
      case 'success':
        if (!image.src) return null;

        return (
          <div className="relative w-full h-full group">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleDownloadClick}
              className="absolute bottom-2 right-2 p-2 rounded-full bg-black/60 text-white/90 opacity-0 group-hover:opacity-100 hover:bg-brand-blue focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-blue transition-all duration-300"
              aria-label={`Descargar ${image.title}`}
              title={`Descargar ${image.title}`}
            >
              <DownloadIcon className="w-5 h-5" />
            </button>
          </div>
        );
      case 'error':
        return (
          <button 
            onClick={handleGenerateClick} 
            className="w-full h-full flex flex-col items-center justify-center text-red-400 bg-red-900/20 hover:bg-red-900/40 transition-colors p-2"
            aria-label={`Reintentar ${image.title}`}
          >
            <ErrorIcon className="w-8 h-8" />
            <span className="mt-2 font-semibold text-center text-red-300">{image.title}</span>
            <span className="text-xs opacity-80">Reintentar</span>
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-brand-gray-800 border border-brand-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-brand-blue/20 hover:border-brand-blue/50 animate-fade-in">
      <div className="relative aspect-w-16 aspect-h-9 bg-brand-gray-900">
        {renderContent()}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-brand-gray-100">{image.title}</h3>
        <p className="text-sm text-brand-gray-400">{image.description}</p>
      </div>
    </div>
  );
};
