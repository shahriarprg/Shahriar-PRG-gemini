// components/ImageUploadCard.tsx
import React from 'react';
import Button from './Button';

interface ImageUploadCardProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
  isLoading?: boolean;
}

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({ onImageUpload, previewUrl, isLoading }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center w-full min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isLoading}
      />
      {previewUrl ? (
        <div className="relative w-full h-48 sm:h-64 lg:h-72 overflow-hidden rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
          <img src={previewUrl} alt="Product Preview" className="object-contain max-h-full max-w-full" />
          <Button
            onClick={handleButtonClick}
            variant="secondary"
            className="absolute bottom-2 right-2 text-sm bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm"
            disabled={isLoading}
          >
            Change Image
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L36 32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Drag and drop or
            <Button onClick={handleButtonClick} variant="outline" className="ml-1 text-sm py-1 px-2" disabled={isLoading}>
              Upload a file
            </Button>
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadCard;
