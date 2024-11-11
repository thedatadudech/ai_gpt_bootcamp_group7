import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createStory } from "../apis/CreateStory"; // Import the createStory function

function Section2({ characters, story, setStory }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateStory = async () => {
    if (!prompt.trim()) {
      setStory("Please enter a prompt to generate a story.");
      return;
    }

    setLoading(true);
    try {
      const generatedStory = await createStory(prompt, characters);
      setStory(generatedStory);
    } catch (error) {
      setStory("An error occurred while generating the story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-3">
        <h3 className=" text-pink-500 text-xl">Section-2: Generate Story</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column - 4 columns wide */}
        <div className="md:col-span-4 text-center md:text-right">
          <label className="block mb-2 text-gray-700 text-xl">
            Prompt
            <ChevronDoubleDownIcon className="inline md:hidden w-5 h-5 ml-1" />
          </label>
        </div>

        {/* Middle Column - 1 column wide */}
        <div className="hidden md:flex md:col-span-1"></div>

        {/* Right Column - 7 columns wide */}
        <div className="md:col-span-7">
          <textarea
            className="w-full md:w-3/4 p-2 rounded-md bg-gray-100 min-h-[50px]"
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>

      {/* 2nd row for Button */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        {/* Left Column - 4 columns wide */}
        <div className="hidden md:flex md:col-span-4"></div>

        {/* Middle Column - 1 column wide */}
        <div className="hidden md:flex md:col-span-1"></div>

        {/* Right Column - 7 columns wide */}
        <div className="md:col-span-7">
          <button
            className="w-full md:w-3/4 p-2 rounded-md mb-4 text-xl bg-green-500 text-white"
            onClick={handleGenerateStory}
          >
            Generate Story
          </button>
        </div>
      </div>

      {/* 3rd row for Story */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        {/* Left Column - 4 columns wide */}
        <div className="md:col-span-4 text-center md:text-right">
          <label className="block mb-2 text-gray-700 text-xl">
            Story
            <ChevronDoubleDownIcon className="inline md:hidden w-5 h-5 ml-1" />
          </label>
        </div>

        {/* Middle Column - 1 column wide */}
        <div className="hidden md:flex md:col-span-1"></div>

        {/* Right Column - 7 columns wide */}
        <div className="md:col-span-7">
          <textarea
            className="w-full md:w-3/4 p-2 rounded-md bg-gray-100 min-h-[50px]"
            placeholder="Generated story will appear here"
            value={story}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default Section2;
