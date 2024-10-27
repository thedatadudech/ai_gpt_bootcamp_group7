from openai import OpenAI
client = OpenAI()

# Define the system as an old and loving Brazilian grandma who loves to cook classic dishes
messages = [
    {
        "role": "system",
        "content": (
            "You are an old and loving Brazilian grandma who loves to cook classic Brazilian dishes. "
            "You specialize in traditional recipes like feijoada, moqueca, pão de queijo, and brigadeiro, always bringing warmth and family traditions into your cooking. "
            "You share your knowledge with love and care, using phrases like 'Meu anjo' and 'Ah, que delícia!' "
            "Your stories are full of memories from family gatherings, with traditions passed down through generations. "
            "You offer thoughtful advice to make each dish perfect, focusing on traditional techniques and comforting flavors."
        ),
    }
]

# Define the grandma's expertise in responding to three specific types of user inputs
messages.append(
    {
        "role": "system",
        "content": (
            "Respond to three specific types of user inputs with particular expertise:\n\n"
            "1. **Ingredient-based dish suggestions**: If a user provides a set of ingredients, suggest the names of a few classic dishes they could make, especially using Brazilian ingredients like black beans, cassava, or tropical fruits. "
            "Your goal is to offer comforting and traditional options, without providing full recipes. Include flavor tips if relevant.\n\n"
            "2. **Recipe requests for specific dishes**: If the user asks for a recipe for a specific classic dish, provide a detailed, step-by-step recipe. "
            "Focus on Brazilian cooking techniques and traditional methods to make the recipe feel warm and inviting. "
            "For Brazilian classics, include background stories or family traditions to enrich the experience.\n\n"
            "3. **Recipe critiques and improvement suggestions**: If the user provides a recipe they’ve tried, offer gentle and constructive critique. "
            "Suggest tips for improvement, such as adjusting seasonings, cooking times, or ingredient pairings, while staying true to Brazilian cuisine.\n\n"
            "In all responses, interact warmly, like a grandmother guiding you in the kitchen, helping each user feel the joy of traditional Brazilian cooking. "
            "If the user's input doesn't match these scenarios, kindly decline and ask for a valid request."
        ),
    }
)

dish = input("Enter ingredients, a dish name, or a recipe for critique:\n")


ingredient_keywords = [",", " and ", " with "]
recipe_keywords = ["recipe", "method", "steps", "instructions"]
critique_keywords = ["improve", "fix", "feedback", "critique", "enhance"]

# Case 1: Ingredient-based suggestion
if any(keyword in dish.lower() for keyword in ingredient_keywords):
    messages.append({
        "role": "user",
        "content": f"I have {dish}. What classic dishes could I make with these ingredients?"
    })
    
# Case 2: Recipe critique
elif any(keyword in dish.lower() for keyword in critique_keywords):
    messages.append({
        "role": "user",
        "content": f"I tried this recipe for {dish}. Could you give me some tips to improve it?"
    })
    
# Case 3: Specific dish recipe request
elif any(keyword in dish.lower() for keyword in recipe_keywords):
    messages.append({
        "role": "user",
        "content": f"Suggest me a detailed recipe and preparation steps for making {dish}."
    })


# Call the OpenAI API to generate the initial response
model = "gpt-4o"

stream = client.chat.completions.create(
    model=model,
    messages=messages,
    stream=True,
)

collected_messages = []
for chunk in stream:
    chunk_message = chunk.choices[0].delta.content or ""
    print(chunk_message, end="")
    collected_messages.append(chunk_message)

# Store the response in the message history
messages.append({"role": "system", "content": "".join(collected_messages)})

# Loop to continue interacting with the user
while True:
    print("\n")
    user_input = input("Ask grandma another question (ingredients, recipe, critique):\n")
    messages.append({"role": "user", "content": user_input})
    
    # Call the API to generate a response based on the new input
    stream = client.chat.completions.create(
        model=model,
        messages=messages,
        stream=True,
    )
    
    collected_messages = []
    for chunk in stream:
        chunk_message = chunk.choices[0].delta.content or ""
        print(chunk_message, end="")
        collected_messages.append(chunk_message)

    messages.append({"role": "system", "content": "".join(collected_messages)})
