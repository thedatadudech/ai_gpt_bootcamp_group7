// Requirements:
    // Create an AI Agent that can find a page in Wikipedia with the 
    // name of the animal, retrieve the description, 
    // and determine if the animal is dangerous

// Solution:
    // we'll use zero-shot classification model: facebook/bart-large-mnli 
    // using huggingface's transformers: Xenova/facebook-bart-large-mnli
        // this model will be automaticlly downloaded to local machine, while running the program
        // hence, the cost of using this transformer with this model is 0
    // We'll create proper AI Agent class and use it for processing
    // from inside the component function



import { useRecoilValue } from "recoil";
import { uploadedImage } from "../store/atoms/Image";
import { pipeline } from '@xenova/transformers';
import { useEffect, useState } from "react";
import { animalDescription } from "../store/atoms/AnimalDescription";
import axios from 'axios';
import { HfInference } from "@huggingface/inference";


/**
 * AI Agent for classifying whether animals are dangerous
 */
class AnimalDangerAgent {
    private classifier: any;
    private summarizer: any;
    private labels = ['Dangerous', 'Not Dangerous']; // Private member for classification labels

    constructor() {
        this.initializePipelines();
    }

    /**
     * Initialize the pipelines for summarization and classification
     */
    private async initializePipelines() {
        try {
            this.classifier = await pipeline('zero-shot-classification', 'Xenova/facebook-bart-large-mnli');
            this.summarizer = await pipeline('summarization', 'Xenova/facebook-bart-large-cnn'); 
        } catch (error) {
            console.error("Error initializing pipelines:", error);
        } finally {
            console.log('In finally. Pipeline initialized successfully');            
        }
    }

    /**
     * Fetch animal description from Wikipedia
     * @param animal - Name of the animal
     */    
    private async fetchAnimalDescription(animal: string): Promise<string | null | undefined> {
        try {
            console.log(` --- inside fetchAnimalDescription() --- `);
            const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${encodeURIComponent(
                animal
            )}&format=json&origin=*&explaintext=1`; //explaintext=1 will convert response from html to raw text
                        
            const response = await axios.get(apiUrl, {
                headers: {
                    Accept: 'application/json',
                },
                responseType: 'json', // Ensures axios expects JSON response
            });
            if (response.data?.query?.pages) {
                const pages = response.data.query.pages;
                const pageKey = Object.keys(pages)[0]; // Get the first page's key
                const description = pages[pageKey].extract; // Extract the description
                return description;
            } else {
                console.error('Unexpected response from Wikipedia api:', response.data);
            }
            
        } catch(error){
            console.error(`Error fetching Wikipedia page for ${animal}:`, error);
            return null;
        }
    }

    /**
     * Summarize text to make it concise
     * @param text - Text to summarize
     */
    private async summarizeText(text: string): Promise<string> {
        if (typeof this.summarizer !== 'function') {
            console.log("Summarizer is not a function. Its type is: ");
            console.log(typeof this.summarizer);

        }
        
        const summary = await this.summarizer(text, { max_length: 50, min_length: 25 });
        return summary[0].summary_text;
    }

    /**
     * Classify whether an animal is dangerous based on description
     * @param animal - Name of the animal
     */
    public async classifyAnimal(animal: string) {
        const description = await this.fetchAnimalDescription(animal);

        if (!description) {
            console.log(`Could not fetch description for "${animal}".`);
            return { animal, description: null, label: "Unknown", confidence: 0 };
        }
        
        // Summarize the description
        const summarizedDescription = await this.summarizeText(description);
        
        // Classify as "Dangerous" or "Not Dangerous"
        // @ts-ignore
        const result = await this.classifier(summarizedDescription, this.labels);        
        return {
            animal,
            description: summarizedDescription,
            label: result.labels[0], // Most likely label
            confidence: parseFloat(result.scores[0].toFixed(2)), // Confidence score
        };
    }
}

/**
 * Extract animal names from a sentence
 * @param sentence - Sentence to analyze
 */
function extractAnimalNames(sentence: string): string[] {
    // Hardcoded list of common animal names
    const knownAnimals = ['horse', 'rabbit', 'cobra', 'dog', 'cat', 'elephant', 'tiger', 'lion', 'monkey', 'bird'];
    const sentenceWords = sentence.toLowerCase().split(/\W+/); // Split sentence into words
    // create unique set of animals from the sentence
    const animalNamesPresentInTheSentence = Array.from(
        new Set(sentenceWords.filter(word => knownAnimals.includes(word)))
      );
    return animalNamesPresentInTheSentence;
}

/**
 * Process a sentence, extract animal names, and classify their danger levels
 * This function is the direct user of the AI Agent class
 * @param sentence - Sentence containing animal references
 */
async function processSentence(sentence: string) {
    const agent = new AnimalDangerAgent(); // Create an AI Agent instance
    
    // Extract animal names from the sentence
    const animals = extractAnimalNames(sentence);
    
    // Classify each animal sequentially
    const results = [];
    for (const animal of animals) {
        const result = await agent.classifyAnimal(animal);
        results.push(result);
    }

    return results;
}


export function UseRagOnImage() {
    const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);
    const usersUploadedImage: File | null =  useRecoilValue(uploadedImage);
    const descriptionOfAnimals: string = useRecoilValue(animalDescription);   
    const sentence: string = descriptionOfAnimals;
    const [finalResults, setFinalResults] = useState<any>();

    if(usersUploadedImage) {
        console.log(`usersUploadedImage is not null`);
    }

    async function useRagOnUserUploadedImage() {
        try {   
            if(usersUploadedImage && sentence) {
                const results = await processSentence(sentence);
                setFinalResults(results);                
            }
            else {
                console.log('usersUploadedImage is null');
            }
            
        } catch (error) {
            console.error("Error classifying image:", error);
        } finally {
            console.log("Image classification completed.");
        }
    }
    

    return (
        <> {usersUploadedImage && 
            <div><button onClick={useRagOnUserUploadedImage}>Find details using RAG</button></div>
            }
            {finalResults && <div>Final Results: {finalResults}</div>}
        </>
    );
}