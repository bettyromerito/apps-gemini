
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { Spinner } from './Spinner';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | null | undefined) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-300 ease-in-out cursor-pointer group ${
        isDragging ? 'border-brand-blue bg-brand-blue/10' : 'border-brand-gray-600 hover:border-brand-blue hover:bg-brand-gray-800'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        disabled={isProcessing}
      />
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Spinner />
          <p className="text-lg text-brand-gray-300">Procesando imagen...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 text-brand-gray-400">
          <UploadIcon className={`w-12 h-12 transition-colors ${isDragging ? 'text-brand-blue' : 'text-brand-gray-500 group-hover:text-brand-blue'}`} />
          <p className="text-lg font-semibold text-brand-gray-300">
            Arrastra y suelta una imagen aquí
          </p>
          <p>o <span className="text-brand-blue font-semibold">haz clic para seleccionar</span></p>
          <p className="text-sm text-brand-gray-500">Soporta: PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};
