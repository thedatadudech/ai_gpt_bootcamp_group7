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
        "content": "Your client is going to ask for a recipe about a specific dish. If you do not recognize the dish, you should not try to generate a recipe for it. Do not answer a recipe if you do not understand the name of the dish. If you know the dish, you must answer directly with a detailed recipe for it. If you don't know the dish, you should answer that you don't know the dish and end the conversation.",
    }
)

dish = input("Type the name of the dish you want a recipe for:\n")
messages.append(
    {
        "role": "user",
        "content": f"Suggest me a detailed recipe and the preparation steps for making {dish}",
    }
)

model = "gpt-4o-mini"

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
