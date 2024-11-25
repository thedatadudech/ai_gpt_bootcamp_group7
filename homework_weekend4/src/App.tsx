import React, { useState } from 'react';
import { BookOpenIcon, UploadIcon } from './components/icons';
import type { Character } from './types/Character';
import { extractCharacters } from './utils/openai';
import { CharacterTable } from './components/CharacterTable';
import { StoryGenerator } from './components/StoryGenerator';

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setProgress('Reading file...');
    try {
      const text = await file.text();
      setProgress('Extracting characters...');
      const extractedCharacters = await extractCharacters(text);
      setCharacters(extractedCharacters);
    } catch (error) {
      console.error('Failed to process file:', error);
    } finally {
      setProgress('');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center">
            <BookOpenIcon />
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              AI Story Creator
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Upload a text file to extract characters and create new stories
            </p>
          </div>

          <div className="flex justify-center">
            <label className="relative cursor-pointer bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <UploadIcon />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Upload a .txt file
              </span>
              <input
                type="file"
                className="sr-only"
                accept=".txt"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
          </div>

          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="mt-2 text-sm text-gray-500">{progress || 'Processing...'}</p>
            </div>
          )}

          {characters.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Extracted Characters</h2>
              <CharacterTable characters={characters} />
            </div>
          )}

          {characters.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Create a New Story</h2>
              <StoryGenerator characters={characters} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;