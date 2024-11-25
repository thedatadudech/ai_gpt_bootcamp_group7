import React from 'react';
import type { Character } from '../types/Character';

interface CharacterTableProps {
  characters: Character[];
}

export function CharacterTable({ characters }: CharacterTableProps) {
  if (characters.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personality</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {characters.map((character, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{character.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{character.description}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{character.personality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}