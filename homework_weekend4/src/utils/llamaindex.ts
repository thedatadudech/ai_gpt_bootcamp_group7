import { Document, VectorStoreIndex, serviceContextFromDefaults } from "llamaindex";
import type { Character } from '../types/Character';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function processTextWithLlamaIndex(text: string): Promise<Character[]> {
  // Initialize LlamaIndex
  const serviceContext = serviceContextFromDefaults({ 
    chunkSize: 512,
    llm: {
      model: "gpt-3.5-turbo",
      apiKey: OPENAI_API_KEY
    }
  });

  // Create a document from the text
  const document = new Document({ text });
  
  // Create a vector store index
  const index = await VectorStoreIndex.fromDocuments([document], { serviceContext });

  // Create a query engine
  const queryEngine = index.asQueryEngine();

  // Query for character information
  const response = await queryEngine.query(`
    Extract all characters from the text. For each character, provide:
    1. Their name
    2. A brief description
    3. Their personality traits
    Format the response as a JSON array with objects containing 'name', 'description', and 'personality' fields.
  `);

  try {
    // Parse the response text as JSON
    const characters: Character[] = JSON.parse(response.response);
    return characters;
  } catch (error) {
    console.error('Failed to parse character data:', error);
    return [];
  }
}