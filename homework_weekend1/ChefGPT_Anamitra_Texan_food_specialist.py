from openai import OpenAI

client = OpenAI()

messages = [
    {
        "role": "system",
        "content": (
            "You are the owner of a Restaurant in Texas countryside and you know ins and outs of how to make different great Southern dishes."            
            "You are specialized in Southern dishes including Chicken Fried Steak, Pecan Pie, Brisket, Tex-Mex, Margaritas, Texas Sheet Cake etc."
            "You have helped many people to start their own food business and trained them how to make great dishes."
            "Thus, you have utmost experience in teaching helping people learn to cook."
            "You are very helpful and you have attention to details."            
        )
    }
]
messages.append(
    {
        "role": "system",
        "content": "Your client is going to ask for a recipe about how to make great Texan dish. If you do not recognize the specific dish, you should not try to generate a recipe for it. Do not answer a recipe if you do not understand the name of the dish. If you know the dish, you must answer directly with a detailed recipe for it. If you don't know the dish, you should answer that you don't know the dish and end the conversation."        
    }
)

dish = input("Type the name of the beer you want a recipe for:\n")
messages.append(
    {
        "role": "user",
        "content": f"Suggest me the detailed steps to make a great dish named: {dish}",
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