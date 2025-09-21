import React from 'react';
import { GeneratedImage } from '../types';
import { ImageCard } from './ImageCard';
import { TECHNIQUE_CATEGORIES } from '../constants';

interface ImageGridProps {
  images: GeneratedImage[];
  onGenerate: (id: string) => void;
  onRequestDownload: (startDownload: () => void) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onGenerate, onRequestDownload }) => {
  const getImageState = (id: string) => images.find(img => img.id === id);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-4 text-brand-gray-200">Técnicas Fotográficas</h2>
      <p className="text-center text-brand-gray-400 mb-12 max-w-3xl mx-auto">
        Explora y aplica una variedad de técnicas fotográficas y cinematográficas a tu imagen. Haz clic en cualquier tarjeta para generar una nueva versión.
      </p>
      
      <div className="space-y-16">
        {TECHNIQUE_CATEGORIES.map(category => (
          <section key={category.title}>
            <h3 className="text-2xl font-semibold text-brand-blue/90 mb-6 border-b-2 border-brand-gray-700 pb-3">
              {category.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {category.techniques.map(technique => {
                const imageState = getImageState(technique.id);
                if (!imageState) return null;
                
                return (
                  <ImageCard 
                    key={imageState.id} 
                    image={imageState} 
                    onGenerate={onGenerate}
                    onRequestDownload={onRequestDownload}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
