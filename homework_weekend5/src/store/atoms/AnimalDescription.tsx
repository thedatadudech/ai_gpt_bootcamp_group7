import { atom } from "recoil";

export const animalDescription = atom<string>({
    key: 'animalDescription',
    default: ''
});