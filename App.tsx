// App.tsx
import React, { useState, useCallback, useEffect } from 'react';
import ImageUploadCard from './components/ImageUploadCard';
import MediumCard from './components/MediumCard';
import GeneratedImageViewer from './components/GeneratedImageViewer';
import Button from './components/Button';
import { fileToBase64 } from './utils/imageUtils';
import { generateImageWithPrompt } from './services/geminiService';
import {
  MARKETING_MEDIUMS,
  GENERAL_EDIT_PROMPT,
  INITIAL_APP_STATE_MESSAGE,
  SELECT_MEDIUM_MESSAGE,
  GENERATING_IMAGE_MESSAGE,
  ERROR_MESSAGE_PREFIX,
  API_KEY_ERROR_MESSAGE,
} from './constants';
import { MarketingMedium } from './types';

function App() {
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImageBase64, setProductImageBase64] = useState<string | null>(null);
  const [productImageMimeType, setProductImageMimeType] = useState<string | null>(null);
  const [selectedMedium, setSelectedMedium] = useState<MarketingMedium>(MarketingMedium.NONE);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appMessage, setAppMessage] = useState<string>(INITIAL_APP_STATE_MESSAGE);

  useEffect(() => {
    if (productImageFile) {
      setAppMessage(SELECT_MEDIUM_MESSAGE);
      setGeneratedImageUrl(null); // Clear previous generated image
      setError(null); // Clear previous errors
    } else {
      setAppMessage(INITIAL_APP_STATE_MESSAGE);
    }
  }, [productImageFile]);

  const handleImageUpload = useCallback(async (file: File) => {
    setProductImageFile(file);
    setProductImageMimeType(file.type);
    try {
      const base64 = await fileToBase64(file);
      setProductImageBase64(base64);
      setGeneratedImageUrl(null); // Clear any previous generated image
      setError(null);
    } catch (err) {
      setError(ERROR_MESSAGE_PREFIX + 'Failed to read image file.');
      setProductImageBase64(null);
      setProductImageFile(null);
      setProductImageMimeType(null);
    }
  }, []);

  const handleSelectMedium = useCallback((mediumId: MarketingMedium) => {
    setSelectedMedium(mediumId);
    setCustomPrompt(''); // Clear custom prompt when medium changes
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!productImageBase64 || !productImageMimeType) {
      setError(ERROR_MESSAGE_PREFIX + 'Please upload a product image first.');
      return;
    }

    setLoading(true);
    setGeneratedImageUrl(null);
    setError(null);
    setAppMessage(GENERATING_IMAGE_MESSAGE);

    let prompt = '';
    const selectedMediumOption = MARKETING_MEDIUMS.find(m => m.id === selectedMedium);

    if (selectedMediumOption && selectedMedium !== MarketingMedium.NONE) {
      prompt = selectedMediumOption.prompt;
      if (customPrompt.trim()) {
        prompt += ` Additionally, ${customPrompt.trim()}.`;
      }
    } else if (customPrompt.trim()) {
      prompt = GENERAL_EDIT_PROMPT + customPrompt.trim();
    } else {
      setError(ERROR_MESSAGE_PREFIX + 'Please select a marketing medium or enter a custom prompt.');
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await generateImageWithPrompt(
        productImageBase64,
        productImageMimeType,
        prompt,
      );
      setGeneratedImageUrl(imageUrl);
      setAppMessage('Image generated successfully!');
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      let errorMessage = 'An unexpected error occurred during image generation.';
      if (err.message.includes(API_KEY_ERROR_MESSAGE)) {
        errorMessage = API_KEY_ERROR_MESSAGE;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(ERROR_MESSAGE_PREFIX + errorMessage);
      setAppMessage('Image generation failed.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productImageBase64, productImageMimeType, selectedMedium, customPrompt]);

  const isGenerateButtonEnabled = !!productImageBase64 && (selectedMedium !== MarketingMedium.NONE || customPrompt.trim() !== '');

  return (
    <div className="flex flex-col flex-grow min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          <span className="text-indigo-600 dark:text-indigo-400">Nano Banana</span> Visualizer
        </h1>
        <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
          Turn your product image into marketing magic with AI!
        </p>
      </header>

      <main className="flex flex-col lg:flex-row flex-grow gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: Input and Controls */}
        <section className="lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Upload Your Product</h2>
          <ImageUploadCard
            onImageUpload={handleImageUpload}
            previewUrl={productImageFile ? URL.createObjectURL(productImageFile) : null}
            isLoading={loading}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">2. Select Medium or Custom Edit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MARKETING_MEDIUMS.map((medium) => (
              <MediumCard
                key={medium.id}
                medium={medium}
                isSelected={selectedMedium === medium.id}
                onSelect={(id) => handleSelectMedium(id as MarketingMedium)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <label htmlFor="custom-prompt" className="block text-md font-medium text-gray-700 dark:text-gray-200">
              Or, enter a custom prompt:
            </label>
            <textarea
              id="custom-prompt"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="e.g., 'add a retro filter', 'place it in a cyberpunk city', 'change background to a beach'"
              value={customPrompt}
              onChange={(e) => {
                setCustomPrompt(e.target.value);
                setSelectedMedium(MarketingMedium.NONE); // Deselect medium if custom prompt is typed
              }}
              disabled={loading}
            ></textarea>
          </div>
        </section>

        {/* Right Column: Output and Status */}
        <section className="lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Generated Visualization</h2>
          <GeneratedImageViewer
            generatedImageUrl={generatedImageUrl}
            isLoading={loading}
            error={error}
          />
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            {appMessage}
          </div>
        </section>
      </main>

      {/* Sticky Generate Button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center shadow-lg mt-8">
        <Button
          onClick={handleGenerate}
          loading={loading}
          disabled={!isGenerateButtonEnabled}
          className="w-full max-w-xs"
        >
          Generate Visualization
        </Button>
      </div>
    </div>
  );
}

export default App;