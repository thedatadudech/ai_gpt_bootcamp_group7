import { useEffect, useState } from "react";
import { GenerateImage } from "../apis/GenerateImage";
import { addCharacter } from "../apis/AddCharacter";

function Section1({ characters, setCharacters }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    // Cleanup function to revoke the URL when component unmounts
    // or when avatarUrl changes
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const handleGenerateAvatar = async () => {
    setAvatarUrl(null);
    const imageURL = await GenerateImage(userInput);
    setAvatarUrl(imageURL); // this'll set 'avatar' to the generated image
    console.log(`avatarUrl = ${avatarUrl}`);
  };

  const addCharacterToTable = async () => {
    const newChar = await addCharacter(userInput);
    newChar.id = Date.now();
    newChar.imageUrl = avatarUrl;

    setCharacters((prev) => [...prev, newChar]);
    setUserInput("");
    setAvatarUrl(null);
  };

  const handleDeleteCharacter = (id) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-center text-purple-600 text-2xl font-bold">
          GENERATE STORIES WITH IMAGES
        </h2>
      </div>
      <div className="mb-3">
        <h3 className=" text-pink-500 text-xl">
          Section-1: Add/Remove Characters
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <div className="mb-4">
            <textarea
              className="w-full p-2 rounded-md bg-gray-100"
              placeholder="Describe the character you want to generate"
              rows="4"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <button
            className="w-full p-2 bg-green-500 rounded-md mb-4 text-xl text-white"
            onClick={handleGenerateAvatar}
          >
            Generate Avatar
          </button>
          <svg
            className="w-6 h-6 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>
          <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Generated avatar"
                className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="text-gray-400 text-sm">
                Generated image will appear here ...
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <button
            className="flex items-center justify-center bg-blue-500 border-2 border-solid border-blue-600 p-2 rounded-md
                     hover:bg-blue-600 transition-colors"
            onClick={addCharacterToTable}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="md:col-span-7">
          <div className="w-full md:w-full bg-gray-200 rounded-md overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white border-2 border-gray-800 rounded-lg">
                  <thead>
                    <tr className="border-b-2 border-gray-800">
                      <th className="text-left p-3 border-r border-gray-800">
                        Name
                      </th>
                      <th className="text-left p-3 border-r border-gray-800">
                        Description
                      </th>
                      <th className="text-left p-3 border-r border-gray-800">
                        Personality
                      </th>
                      <th className="text-left p-3 border-r border-gray-800">
                        Pics
                      </th>
                      <th className="text-left p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characters.map((character) => (
                      <tr
                        key={character.id}
                        className="border-b border-gray-800"
                      >
                        <td className="p-3 border-r border-gray-800">
                          {character.name}
                        </td>
                        <td className="p-3 border-r border-gray-800">
                          {character.description}
                        </td>
                        <td className="p-3 border-r border-gray-800">
                          {character.personality}
                        </td>
                        <td className="p-3 border-r border-gray-800">
                          {character.imageUrl && (
                            <img
                              src={character.imageUrl}
                              alt={character.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            {/* <button className="text-blue-600">Edit</button> */}
                            <button
                              className="text-red-600"
                              onClick={() =>
                                handleDeleteCharacter(character.id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Section1;
