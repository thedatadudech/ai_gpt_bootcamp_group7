
# How to Set Up a Free Plan for OpenAI and Create an API Key

## Step 1: Sign Up for OpenAI

1. Go to the [OpenAI Sign-Up Page](https://platform.openai.com/signup).
2. Choose to sign up with your Google account, Microsoft account, or create an account using an email address and password.
3. Follow the instructions to complete the sign-up process.

## Step 2: Set Up a Free API Access Plan

1. After signing up, you’ll be directed to the OpenAI Dashboard. If you’re not automatically directed, go to the [OpenAI Platform](https://platform.openai.com/).
2. OpenAI offers free trial usage for new users, providing free credits which can be used for API calls. These credits usually expire after a period (e.g., three months) and will cover basic experimentation with OpenAI APIs.
3. For detailed information on free tier usage limits and any credit provided, visit OpenAI’s [pricing page](https://openai.com/pricing).

## Step 3: Create an API Key

1. On the OpenAI Platform, go to your [API Keys page](https://platform.openai.com/account/api-keys).
2. Click on **+ Create new secret key**. A pop-up window will appear displaying your new API key.
3. **Copy the API key** and store it securely. This key will be shown only once, so it’s essential to save it immediately.
4. **Do not share** your API key publicly, as it can be used to access your OpenAI account.

### Testing the API Key

To test if your API key is set up correctly, you can use it in a Python script or command-line tool like `curl`. Here’s a quick example in Python:

```python
import openai

openai.api_key = "YOUR_API_KEY"

response = openai.Completion.create(
    model="text-davinci-003",
    prompt="Say hello world!",
    max_tokens=5
)

print(response.choices[0].text.strip())
```

Replace `"YOUR_API_KEY"` with your actual API key.

---

Now you're all set up to start using OpenAI's API! If you need further help, visit the [OpenAI documentation](https://platform.openai.com/docs/introduction).
