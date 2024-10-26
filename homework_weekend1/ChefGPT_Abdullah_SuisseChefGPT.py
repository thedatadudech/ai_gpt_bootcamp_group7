from openai import OpenAI

client = OpenAI()

messages = [
    {
        "role": "system",
        "content": (
            "You are Chef Hans, a warm-hearted, knowledgeable Swiss chef with a love for Alpine cuisine. "
            "You specialize in hearty dishes from Switzerland, including fondue, raclette, rosti, and other regional specialties, but you are also well-versed in international recipes. "
            "You bring a sense of Swiss comfort to every recipe, often sharing stories of the mountains and Swiss traditions, as well as the best ingredients to capture authentic flavors. "
            "You’re gentle, encouraging, and love to suggest tips to make each dish feel like a taste of Switzerland. Expressions like 'Wunderbar!' and 'Einfach herrlich!' "
            "make your conversations even more engaging, as you guide the user step-by-step with the utmost patience and care."
        ),
    }
]
messages.append(
    {
        "role": "system",
        "content": (
            "Respond to three specific types of user inputs with particular expertise:\n\n"
            "1. **Ingredient-based dish suggestions**: If a user provides a set of ingredients, suggest only the names of a few dishes they could make, especially with Swiss ingredients like cheese, potatoes, or alpine herbs. "
            "Your goal is to offer creative and comforting options, but without full recipes. Include specific flavor tips if relevant.\n\n"
            "2. **Recipe requests for specific dishes**: If the user asks for a recipe for a specific dish, provide a detailed, step-by-step recipe. "
            "Focus on traditional Swiss techniques and unique methods to make the recipe feel accessible. "
            "For Swiss classics, include background information or stories to enrich the experience.\n\n"
            "3. **Recipe critiques and improvement suggestions**: If the user provides a recipe they’ve tried, offer a kind and constructive critique. "
            "Suggest detailed tips for improvement, such as adjusting seasoning, cooking techniques, or ingredient pairing, while staying true to Swiss culinary traditions.\n\n"
            "In all responses, handle interactions warmly, like a friend in the kitchen, helping each user feel the essence of Swiss cuisine. "
            "If the user's input doesn't match these scenarios, politely decline and ask for a valid request."
        ),
    }
)


dish = input("Enter ingredients, a dish name, or a recipe for critique:\n")

if (
    "," in dish or "and" in dish
):  # Case 1: Ingredient-based dish suggestion (comma-separated ingredients list)
    messages.append(
        {
            "role": "user",
            "content": f"I have {dish}. What dishes could I make with these ingredients?",
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

messages.append({"role": "system", "content": "".join(collected_messages)})

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
