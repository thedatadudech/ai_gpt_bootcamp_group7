import OpenAI from 'openai';
import type { Character, Story } from '../types/Character';
import { chunkText } from './textChunker';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function extractCharacters(text: string): Promise<Character[]> {
  const chunks = chunkText(text);
  const allCharacters: Character[] = [];
  
  for (const chunk of chunks) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing text and extracting character information. Extract all characters and return them in this exact JSON format: {\"characters\": [{\"name\": \"...\", \"description\": \"...\", \"personality\": \"...\"}]}"
        },
        {
          role: "user",
          content: `Extract all characters from this text, providing their name, description, and personality traits:\n\n${chunk}`
        }
      ]
    });

    try {
      const content = response.choices[0].message.content;
      if (!content) continue;
      
      // Extract JSON from the response content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) continue;
      
      const parsed = JSON.parse(jsonMatch[0]);
      const characters = parsed.characters || [];
      
      // Merge characters, avoiding duplicates by name
      for (const character of characters) {
        if (!allCharacters.some(c => c.name.toLowerCase() === character.name.toLowerCase())) {
          allCharacters.push(character);
        }
      }
    } catch (error) {
      console.error('Failed to parse character data:', error);
    }
  }

  return allCharacters;
}

export async function generateStory(characters: Character[], prompt: string): Promise<Story> {
  const characterDescriptions = characters
    .map(char => `${char.name}: ${char.description} (${char.personality})`)
    .join('\n');

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a creative storyteller that creates engaging stories using provided characters."
      },
      {
        role: "user",
        content: `Using these characters:\n${characterDescriptions}\n\nCreate a story based on this prompt: ${prompt}`
      }
    ]
  });

  return {
    title: prompt,
    content: response.choices[0].message.content || "",
    characters
  };
}