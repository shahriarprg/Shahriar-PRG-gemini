// components/GeneratedImageViewer.tsx
import React from 'react';

interface GeneratedImageViewerProps {
  generatedImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const GeneratedImageViewer: React.FC<GeneratedImageViewerProps> = ({ generatedImageUrl, isLoading, error }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Generating image...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center px-4 py-2 bg-red-100 dark:bg-red-900 rounded-md">
          <p className="font-semibold">Generation Failed:</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : generatedImageUrl ? (
        <img src={generatedImageUrl} alt="Generated Visualization" className="object-contain max-h-full max-w-full rounded-md" />
      ) : (
        <div className="text-gray-500 dark:text-gray-400 text-center">
          <p>Your generated product visualization will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default GeneratedImageViewer;
