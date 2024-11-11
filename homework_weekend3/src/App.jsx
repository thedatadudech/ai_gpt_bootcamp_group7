import { useState } from "react";
import Section1 from "./Components/Section1";
import Section2 from "./Components/Section2";
import Section3 from "./Components/Section3";
import HorizontalLine from "./Components/HorizontalLine";
function App() {
  const [story, setStory] = useState("");
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "Alice",
      description: "A curious adventurer with a knack for solving puzzles.",
      personality: "Inquisitive and brave",
      imageUrl: "https://example.com/alice.jpg",
    },
    {
      id: 2,
      name: "Bob",
      description: "A wise old wizard with a long white beard.",
      personality: "Wise and patient",
      imageUrl: "https://example.com/bob.jpg",
    },
    {
      id: 3,
      name: "Charlie",
      description: "A mischievous elf who loves to play tricks.",
      personality: "Playful and cunning",
      imageUrl: "https://example.com/charlie.jpg",
    },
  ]);

  return (
    <>
      <Section1 characters={characters} setCharacters={setCharacters} />
      <HorizontalLine />
      <Section2 characters={characters} setStory={setStory} story={story} />
      <HorizontalLine />
      <Section3 story={story} />
    </>
  );
}

export default App;
