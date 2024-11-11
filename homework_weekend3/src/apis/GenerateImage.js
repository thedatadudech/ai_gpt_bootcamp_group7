// this function calls the API to generate an image
// We'll use text-to-image generation APIs
// Ex: DALL-E from OpenAI, Stable Diffusion by Stability AI

const huggingFaceApiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;

async function GenerateImage(usersInput) {
    // console.log(usersInput);    
    if (!usersInput) {
        console.error('No input provided');
        throw new Error('Input is required to GenerateImage()');
    }
    let generatedImage = 'generated avatar';

    const model = 'stabilityai/stable-diffusion-2';
    const modelUrl = `https://api-inference.huggingface.co/models/${model}`;                     
    
    
    try {
        const response = await fetch(modelUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${huggingFaceApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: usersInput,
            options: {
              wait_for_model: true
            }
          })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers));
    
        if (!response.ok) {
            const errorText = await response.text(); // Get error details
            console.error('API Error details:', errorText);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    
        const blob = await response.blob();        
        const imageUrl = URL.createObjectURL(blob);        
        return imageUrl;

    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}

export {
    GenerateImage    
}
