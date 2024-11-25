import { pipeline } from '@xenova/transformers';
import type { Character, Story } from '../types/Character';

export async function generateStory(characters: Character[], prompt: string): Promise<Story> {
  const generator = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');
  
  const characterDescriptions = characters
    .map(char => `${char.name}: ${char.description} (${char.personality})`)
    .join('\n');

  const storyPrompt = `Using these characters:
  ${characterDescriptions}
  
  Create a story based on this prompt: ${prompt}`;

  const result = await generator(storyPrompt, {
    max_length: 1024,
    temperature: 0.8,
  });

  return {
    title: prompt,
    content: result[0].generated_text,
    characters,
  };
}