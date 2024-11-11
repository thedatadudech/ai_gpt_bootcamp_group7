async function createStory(userPrompt, characters) {
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const characterDescriptions = characters
    .map((character) => {
      return `${character.name} is ${character.description} and is known for being ${character.personality}.`;
    })
    .join(" ");

  const prompt = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a creative AI assistant that generates stories based on character descriptions and a user prompt.",
      },
      {
        role: "user",
        content: `Create a story based on the following prompt: "${userPrompt}". The story should include the following characters: ${characterDescriptions}.`,
      },
    ],
    temperature: 0.7,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return generatedText;
  } catch (error) {
    console.error("API Error:", error);
    return "An error occurred while generating the story.";
  }
}

export { createStory };
