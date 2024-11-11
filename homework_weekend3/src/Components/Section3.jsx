import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import { analyseStory } from "../apis/AnalyseStory";
import { useEffect, useState } from "react";

function Section3({ story }) {
  const [analysisResult, setAnalysisResult] = useState([]);

  useEffect(() => {
    if (story) {
      console.log(story);
      analyseStory(story).then((result) => {
        // Assuming result is an array of objects with 'name' and 'role'
        if (Array.isArray(result.characters)) {
          setAnalysisResult(result.characters);
        }
      });
    }
  }, [story]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-3">
        <h3 className=" text-pink-500 text-xl">Section-3: Story Analysis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column - 4 columns wide */}
        <div className="md:col-span-4 text-center md:text-right">
          <br />
          <br />
          <br />
          <label className="block mb-2 text-gray-700  text-xl">
            Characters and their roles
            <ChevronDoubleDownIcon className="inline md:hidden w-5 h-5 ml-1" />
          </label>
        </div>

        {/* Middle Column - 1 column wide */}
        <div className="hidden md:flex md:col-span-1"></div>

        {/* Right Column - 7 columns wide */}
        <div className="md:col-span-7">
          <div className="w-full md:w-full bg-gray-200 rounded-md overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white border-2 border-gray-800 rounded-lg">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b-2 border-gray-800">
                      <th className="text-left p-3 border-r border-gray-800 min-w-[150px]">
                        Character Name
                      </th>
                      <th className="text-left p-3 border-r border-gray-800 min-w-[200px]">
                        Role in the story
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResult.map((character, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="p-3 border-r border-gray-800">
                          {character["character"]}
                        </td>
                        <td className="p-3 border-r border-gray-800">
                          {character["role in story"]}
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

export default Section3;
