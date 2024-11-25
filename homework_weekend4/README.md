An elegant web application that extracts characters from text files and generates new stories using OpenAI's GPT-3.5 model.

## Features

- 📝 Upload and process `.txt` files
- 🎭 Extract characters with descriptions and personalities
- ✨ Generate unique stories using extracted characters
- 📊 Beautiful tabular display of character information
- 🔄 Chunk-based processing for large files

## Quick Start

```bash
# Install dependencies
npm install

# Add your OpenAI API key to .env
VITE_OPENAI_API_KEY=your-api-key-here

# Start development server
npm run dev
```

## How It Works

1. Upload a text file (e.g., a book or story)
2. The app chunks the text and processes it through OpenAI
3. Characters are automatically extracted with their traits
4. Use the story generator to create new adventures with your characters

## Tech Stack

- React + TypeScript
- Tailwind CSS
- OpenAI API
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
