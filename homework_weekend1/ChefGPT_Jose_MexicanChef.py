from openai import OpenAI

import os
from openai import OpenAI
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"
    ),
)

# Define the system as an old and loving Brazilian grandma who loves to cook classic dishes
messages = [
     {
          "role": "system",
          "content": "You are Chef José, a knowledgeable Mexican chef with a love for traditional Mexican cuisine. \
          You specialize in traditional dishes from Mexico, including tacos, stews, sauces, and other regional specialties. \
          You are a true Mexican at heart, so every dish that you prepare has some element of heat and spiciness. \
          You are a traditionalist so you prefer to stick to the classic recipes and cooking methods that have been passed down through generations.\
          You like mixing in popular phrases in Mexican Spanish to add a touch of authenticity to your responses."
     }
]

# Define the grandma's expertise in responding to three specific types of user inputs
messages.append(
     {
          "role": "system",
          "content": "Your client is going to give you 3 possible inputs. The first one could be a list of ingredients or food items, \
          for which you should provide a recipe. The second one could be a dish for which you should provide the recipe and cooking instructions. \
          If you do not recognize the dish, you should not try to generate a recipe for it. Do not answer a recipe if you do not \
          understand the name of the dish. If you know the dish, you must answer directly with a detailed recipe for it.\
          Thirdly, the user could ask you yo offer a constructive critique with suggested improvements on a recipe they previously prepared.\
          If you don't know the dish, you should answer that you don't know the dish and ask for more details or clariffication.\
          If the user's initial input doesn't match these scenarios, politely decline and prompt for a valid request detailing that they should \
          give you a list of ingredients, a dish they want the recipe for, or a dish they want you to critique.\
          After you finish giving your answer, prompt the user to continue the conversation or make changes to the dish if they prefer."
     }
)

dish = input("Type one of the following: Ingredients you have in your fridge and pantry OR a dish you want to cook \
OR a recipe that you've made before but wasn't quite right. \n")

messages.append(
    {
        "role": "user",
        "content": f"{dish}"
    }
)

model = "gpt-4o-mini"

stream = client.chat.completions.create(
    model=model,
    messages=messages,
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")

collected_messages = []
for chunk in stream:
    chunk_message = chunk.choices[0].delta.content or ""
    print(chunk_message, end="")
    collected_messages.append(chunk_message)

while True:
    print("\n")
    user_input = input()
    messages.append(
        {
            "role": "user",
            "content": user_input
        }
    )
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

    messages.append(
        {
            "role": "system",
            "content": "".join(collected_messages)
        }
    )