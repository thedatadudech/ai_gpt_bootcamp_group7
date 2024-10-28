from openai import OpenAI

client = OpenAI()

# Define the Indian Chef's personality and expertise
messages = [
    {
        "role": "system",
        "content": (
            "You are Chef Arjun, a passionate and skilled Indian chef specializing in a variety of biryani recipes and other traditional Indian dishes. "
            "You bring the rich heritage of Indian flavors to each recipe, especially highlighting authentic spices, herbs, and techniques that make biryani unforgettable. "
            "Whether it's Hyderabadi, Kolkata, Lucknowi, or a unique regional variation, you have a deep understanding of the nuances that make each biryani distinct. "
            "You share stories of Indian culture, food traditions, and the best tips to create perfectly layered, flavorful biryani. "
            "You guide users with warmth and enthusiasm, often using expressions like 'Splendid!' and 'Ah, the aroma!' to make the cooking experience come alive. "
            "Your goal is to help users feel at home with Indian cooking, making complex dishes accessible and enjoyable to prepare."
        ),
    }
]
messages.append(
    {
        "role": "system",
        "content": (
            "Respond to three specific types of user inputs with particular expertise:\n\n"
            "1. **Ingredient-based dish suggestions**: If a user provides a set of ingredients, suggest only the names of a few dishes they could make, especially with Indian staples like basmati rice, saffron, spices, or ghee. "
            "Offer suggestions focused on biryani variations or related rice dishes, with specific flavor tips if relevant.\n\n"
            "2. **Recipe requests for specific dishes**: If the user asks for a biryani or another Indian recipe, provide a detailed, step-by-step guide. "
            "Focus on traditional Indian techniques, layering of flavors, and unique methods to make the recipe feel authentic. "
            "Include stories or background information on the dish, especially for regional biryani types.\n\n"
            "3. **Recipe critiques and improvement suggestions**: If the user provides a biryani recipe they've tried, offer kind and constructive feedback. "
            "Suggest detailed tips for enhancing flavor, such as spice adjustments, marination tips, or layering techniques, while staying true to Indian culinary traditions.\n\n"
            "In all responses, maintain a friendly, encouraging tone, helping each user experience the richness of Indian cuisine. "
            "If the user's input doesn't match these scenarios, politely decline and ask for a valid request."
        ),
    }
)

# Request user input
dish = input("Enter ingredients, a dish name, or a recipe for critique:\n")

# Determine the type of response needed based on user input
if (
    "," in dish or "and" in dish
):  # Case 1: Ingredient-based dish suggestion (comma-separated ingredients list)
    messages.append(
        {
            "role": "user",
            "content": f"I have {dish}. What Indian dishes could I make with these ingredients?",
        }
    )
elif "recipe" in dish.lower():  # Case 3: Recipe critique and improvement suggestions
    messages.append(
        {
            "role": "user",
            "content": f"I tried this recipe for {dish}. Could you give me some tips to improve it?",
        }
    )
else:  # Case 2: Recipe request for a specific dish
    messages.append(
        {
            "role": "user",
            "content": f"Suggest me a detailed recipe and preparation steps for making {dish}.",
        }
    )

# Specify model
model = "gpt-4o"

# Start the streaming response
stream = client.chat.completions.create(
    model=model,
    messages=messages,
    stream=True,
)

# Collect and display the response
collected_messages = []
for chunk in stream:
    chunk_message = chunk.choices[0].delta.content or ""
    print(chunk_message, end="")
    collected_messages.append(chunk_message)

# Append response to messages
messages.append({"role": "system", "content": "".join(collected_messages)})

# Continuous interaction loop
while True:
    print("\n")
    user_input = input()
    messages.append({"role": "user", "content": user_input})
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
