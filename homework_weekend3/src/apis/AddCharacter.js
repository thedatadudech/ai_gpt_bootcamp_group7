async function addCharacter(userInput) {
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const prompt = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful AI assistant that extracts character information from descriptions and returns output in JSON format."
            },
            {
                role: "user",
                content: `Extract character information from this prompt: ${userInput}. You need to generate a set of 3 information: a "name", a "description", and a "personality". 
                The "name" of the character generally appears at the beginning of the description, though it may not be always true or present all the time. If name is not present, just put "Anonymous".
                For the "description" field, try to analyze the description and extract the most important details, summarize those and put them in the description field. In case you aren't unable to extract any details, just put the description provided by the user.
                For the "personality" field, try to be as creative as possible. Try to derive any special characteristics or behavior from the input prompt.

                Remember, return the response in JSON format with three fields: name, description, and personality. 
                For the input prompt as: "George, a 10-year old boy, likes to bike in the mountains", a sample JSON respone can be:
                {
                    "name": "George",
                    "description": "George likes outdoor activities such as biking",
                    "personality": "Youthful, brave"
                }`
            }
        ],
        temperature: 0.7,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prompt)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const generatedText = data.choices[0].message.content;
        
        // Parse the JSON response
        try {
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }

        // Fallback if parsing fails
        return {
            name: "Unknown Name",
            description: userInput,
            personality: "Mysterious"
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            name: "Unknown Name",
            description: userInput,
            personality: "Mysterious"
        };
    }
}

export { addCharacter };