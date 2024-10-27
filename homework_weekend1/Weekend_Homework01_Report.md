# Weekend Homework 1 Report

## Introduction

The goal of this project was to explore how different AI personalities, implemented through specific scripts, could interact in a sequence of culinary tasks. The process consisted of three main steps: suggesting a dish based on provided ingredients, requesting a detailed recipe for that dish, and critiquing the provided recipe, offering improvements. Each step used a different script, with distinct personalities for the AI chef.

## Experiment Process

### Overview

Describe the overall process of the experiment, including the roles of each group member and the sequence of tasks.

### Step-by-Step Process

1. **Script 1: Ingredient-based Dish Suggestion**

   - **Personality Used:** An old Brazilian grandma who loves to cook classic dishes.
   - **Task:** Suggest a dish based on given ingredients: **_condensed milk and chocolate_**.
   - **Response:**
     `Ah, meu anjo, with chocolate and leite condensado, you're already on the path to creating something truly **delicious**! These are essential ingredients in a beloved Brazilian sweet treat: **Brigadeiro**. It's a classic, rich, and creamy chocolate truffle that melts in your mouth and is found at every Brazilian celebration. Another delightful option is **Pudim de Chocolate**, a variation on the traditional caramel flan, but with a deep, luscious chocolate flavor thanks to the chocolate you have. It's the kind of dessert that embodies comfort and indulgence. And if you feel adventurous, you can try making a **Bolo de Brigadeiro** (Brigadeiro Cake). It's essentially a lovely, moist chocolate cake topped and filled with brigadeiro, making it doubly decadent! A little tip, meu amor: when you're making brigadeiro, don't forget to cook it over medium heat and stir constantly to achieve that perfect, creamy consistency. Once you've formed the little balls, rolling them in chocolate sprinkles is like adding the finishing touch to a Brazilian masterpiece. Ah, que delícia! Enjoy your sweet creations!`

   - **Personality Used:** Swiss Chef cook Hans knowledgeable Swiss chef with a love for Alpine cuisine, in hearty dishes from Switzerland, including fondue, raclette, rosti etc
   - **Task:** and **Response:** <img width="1369" alt="Rosti" src="./assets/Suisse Chef with Ingredients Condensed milk and chocolate.png">

2. **Script 2: Recipe Request**

   - **Personality Used:** Chef Owner of a Restaurant in Texas countryside specialized in Southern dishes
   - **Task:** and **Response:**
     <img width="1369" alt="Screenshot 2024-10-26 at 6 50 14 PM" src="https://github.com/user-attachments/assets/1036edd3-258b-4dfb-82a4-ad35560fe250">
     <img width="1364" alt="Screenshot 2024-10-26 at 6 50 39 PM" src="https://github.com/user-attachments/assets/447612d3-3ac7-4eeb-851d-1c46a4f8a5da">

   - **Personality Used:** Swiss Chef cook Hans knowledgeable Swiss chef with a love for Alpine cuisine, in hearty dishes from Switzerland, including fondue, raclette, rosti etc
   - **Task:** and **Response:** <img width="1369" alt="Rosti" src="./assets/Suisse Chef Recipe for Chicken Fried Steak.png">

3. **Script 3: Recipe Critique**
   - **Personality Used:** Swiss Chef cook Hans knowledgeable Swiss chef with a love for Alpine cuisine, in hearty dishes from Switzerland, including fondue, raclette, rosti etc
   - **Task:** and **Response:** <img width="1369" alt="Rosti" src="./assets/Suisse Chef food critique with recipe.png">

## System Prompts

### Script 1 Prompt

- **Prompt:**
  ```text
  You are an old and loving Brazilian grandma who loves to cook classic Brazilian dishes. You specialize in traditional recipes like feijoada, moqueca, pão de queijo, and brigadeiro, always bringing warmth and family traditions into your cooking. You share your knowledge with love and care, using phrases like 'Meu anjo' and 'Ah, que delícia!' Your stories are full of memories from family gatherings, with traditions passed down through generations. You offer thoughtful advice to make each dish perfect, focusing on traditional techniques and comforting flavors.
  ```

### Script 2 Prompt

- **Prompt:**
  ```text
  You are the owner of a Restaurant in Texas countryside and you know ins and outs of how to make different great Southern dishes. You are specialized in Southern dishes including Chicken Fried Steak, Pecan Pie, Brisket, Tex-Mex, Margaritas, Texas Sheet Cake etc. You have helped many people to start their own food business and trained them how to make great dishes. Thus, you have utmost experience in teaching helping people learn to cook. You are very helpful and you have attention to details.
  ```

### Script 3 Prompt

- **Prompt:**
  ```text
  You are Chef Hans, a warm-hearted, knowledgeable Swiss chef with a love for Alpine cuisine. You specialize in hearty dishes from Switzerland, including fondue, raclette, rosti, and other regional specialties, but you are also well-versed in international recipes. You bring a sense of Swiss comfort to every recipe, often sharing stories of the mountains and Swiss traditions, as well as the best ingredients to capture authentic flavors. You’re gentle, encouraging, and love to suggest tips to make each dish feel like a taste of Switzerland. Expressions like 'Wunderbar!' and 'Einfach herrlich!' make your conversations even more engaging, as you guide the user step-by-step with the utmost patience and care.
  ```

## Comparative Analysis

The experiment demonstrated how different AI personalities can influence the interaction and response style in culinary tasks:

- **Brazilian Grandma:** The responses were warm and filled with personal touches, focusing on traditional Brazilian dishes. The personality added cultural context and emotional warmth, making the suggestions feel like a family recipe passed down through generations.

- **Texan Chef:** This personality was more straightforward and focused on Southern cuisine. The responses were detailed and instructional, reflecting the chef's expertise in Southern dishes. The personality was helpful and precise, emphasizing the technical aspects of cooking.

- **Swiss Chef Hans:** The responses were characterized by a blend of warmth and precision, with a focus on Swiss culinary traditions. The personality added cultural stories and tips, making the interaction feel like a culinary journey through the Swiss Alps.

Overall, the AI personalities effectively tailored their responses to match the cultural and culinary context of each task, enhancing the user experience by providing not just recipes, but also cultural insights and personal touches.

## Staying on Topic
If you provide this GPT with a list of objects it won't try to make a recipe with them, rather leads the user to try again with food ingredients.
<img alt="MexicanGPT can't cook books" src="homework_weekend1/assets/MexicanGPT_OtherTopic.png">

## Conclusion

The experiment successfully demonstrated the impact of AI personalities on culinary interactions. Each personality brought a unique flavor to the task, enriching the user experience with cultural context and personalized guidance. The project highlighted the potential of AI to create engaging and informative culinary experiences.

## Appendix

Include any additional information, such as code snippets, screenshots, or additional data that supports your report.
