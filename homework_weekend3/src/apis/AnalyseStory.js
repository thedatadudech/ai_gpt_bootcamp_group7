async function analyseStory(generatedStory) {
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const prompt = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an analytical AI assistant that extracts characters and their roles from a given story.",
      },
      {
        role: "user",
        content: `Analyze the following story and extract the characters along with their roles in JSON format with keys "character" and "role in story". 
        For example: {
        [
        {"character": "Alice",
         "role in story": "protagonist"}, 
         {"character": "White Rabbit", 
         "role in story": "guide"}
         ]. Story: "${generatedStory}".`,
      },
    ],
    temperature: 0.5,
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
    const analysisResult = data.choices[0].message.content;

    // Parse the JSON response
    try {
      const jsonMatch = analysisResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }

    // Fallback if parsing fails
    return "An error occurred while analyzing the story.";
  } catch (error) {
    console.error("API Error:", error);
    return "An error occurred while analyzing the story.";
  }
}

export { analyseStory };
