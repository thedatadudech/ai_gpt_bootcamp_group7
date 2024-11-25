import { pipeline } from '@xenova/transformers';

export async function extractCharacters(text: string): Promise<Character[]> {
  const extractor = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');
  
  const prompt = `Extract characters from the following text. For each character, provide their name, description, and personality traits. Format as JSON array:
  
  ${text}`;

  const result = await extractor(prompt, {
    max_length: 8192,
    temperature: 0.7,
  });

  try {
    return JSON.parse(result[0].generated_text);
  } catch (error) {
    console.error('Failed to parse character data:', error);
    return [];
  }
}