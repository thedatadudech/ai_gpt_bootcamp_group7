import React, { useState } from 'react';
import { SendIcon } from '../components/icons';
import type { Character, Story } from '../types/Character';
import { generateStory } from '../utils/openai';

interface StoryGeneratorProps {
  characters: Character[];
}

export function StoryGenerator({ characters }: StoryGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateStory = async () => {
    if (!prompt || characters.length === 0) return;
    
    setLoading(true);
    try {
      const generatedStory = await generateStory(characters, prompt);
      setStory(generatedStory);
    } catch (error) {
      console.error('Failed to generate story:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Story Prompt
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt for your story..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={handleGenerateStory}
            disabled={loading || !prompt || characters.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Generating...' : <SendIcon />}
          </button>
        </div>
      </div>

      {story && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{story.content}</p>
        </div>
      )}
    </div>
  );
}