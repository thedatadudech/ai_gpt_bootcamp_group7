import { atom } from "recoil";

export const uploadedImage = atom<File | null>({
    key: 'uploadedImage',
    default: null
});
