import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageGrid } from './components/ImageGrid';
import { GeneratedImage } from './types';
import { ALL_TECHNIQUES } from './constants';
import { generateImageAngle } from './services/geminiService';
import { SubscriptionModal } from './components/SubscriptionModal';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<{ file: File; base64: string } | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<(() => void) | null>(null);


  const resetState = () => {
    // Revoke old blob URLs before resetting to prevent memory leaks
    generatedImages.forEach(image => {
      if (image.src && image.src.startsWith('blob:')) {
        URL.revokeObjectURL(image.src);
      }
    });
    setOriginalImage(null);
    setGeneratedImages([]);
    setError(null);
  };
  
  const handleImageUpload = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(',')[1];
      if (base64) {
        setOriginalImage({ file, base64: `data:${file.type};base64,${base64}` });
        setGeneratedImages(ALL_TECHNIQUES.map(technique => ({
          id: technique.id,
          title: technique.title,
          description: technique.description,
          src: null,
          status: 'pending',
        })));
        setError(null);
      } else {
        setError('No se pudo leer el archivo de imagen.');
      }
    };
    reader.onerror = () => {
      setError('Error al leer el archivo.');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateAngle = useCallback(async (angleId: string) => {
    if (!originalImage) return;

    const angleToGenerate = ALL_TECHNIQUES.find(a => a.id === angleId);
    if (!angleToGenerate) {
      return;
    }

    setGeneratedImages(prev => prev.map(img => 
        img.id === angleId ? { ...img, status: 'generating' } : img
    ));

    try {
        const originalImageBase64 = originalImage.base64.split(',')[1];
        const mimeType = originalImage.file.type;

        const newMediaUrl = await generateImageAngle(originalImageBase64, mimeType, angleToGenerate.prompt);
        
        setGeneratedImages(prev => prev.map(img => 
            img.id === angleId ? { ...img, src: newMediaUrl, status: 'success' } : img
        ));

    } catch (error) {
        console.error(`Fallo al generar el ángulo ${angleId}:`, error);
        setGeneratedImages(prev => prev.map(img => 
            img.id === angleId ? { ...img, status: 'error' } : img
        ));
    }
  }, [originalImage]);

  const handleSubscription = (email: string) => {
    console.log('Subscribed with email:', email); // For demo purposes
    setIsSubscribed(true);
    setShowSubscriptionModal(false);
    
    if (pendingDownload) {
      pendingDownload();
      setPendingDownload(null);
    }
  };

  const handleRequestDownload = (startDownload: () => void) => {
    if (isSubscribed) {
      startDownload();
    } else {
      setPendingDownload(() => startDownload);
      setShowSubscriptionModal(true);
    }
  };

  const isProcessing = generatedImages.some(img => img.status === 'generating');

  return (
    <div className="min-h-screen bg-brand-gray-900 text-brand-gray-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        
        {!originalImage && (
          <div className="mt-12 max-w-2xl mx-auto">
            <ImageUploader onImageUpload={handleImageUpload} isProcessing={isProcessing} />
          </div>
        )}

        {error && (
          <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg max-w-2xl mx-auto">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        {originalImage && (
          <div className="mt-12 animate-fade-in">
            <div className="flex flex-col items-center gap-8">
              <div className="w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-4 text-brand-gray-300">Imagen Original</h2>
                <img 
                  src={originalImage.base64} 
                  alt="Original" 
                  className="rounded-xl shadow-2xl shadow-black/50 border-2 border-brand-gray-700"
                />
              </div>
               <button 
                  onClick={resetState}
                  className="mt-4 px-6 py-2 bg-brand-blue/80 hover:bg-brand-blue text-white font-semibold rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isProcessing}
                >
                  Subir otra imagen
              </button>
            </div>
            
            <ImageGrid
              images={generatedImages}
              onGenerate={handleGenerateAngle}
              onRequestDownload={handleRequestDownload}
            />
          </div>
        )}
      </main>
      <footer className="text-center py-6 border-t border-brand-gray-800 mt-12">
        <p className="text-brand-gray-500">Creado con React, Tailwind CSS y Gemini API</p>
      </footer>
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => {
            setShowSubscriptionModal(false);
            setPendingDownload(null);
        }}
        onSubscribe={handleSubscription}
      />
    </div>
  );
};

export default App;
