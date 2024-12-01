// this component loads the image from recoil
// and calls the vision model to 
// identify and classify animal in the image
// output from this step are:
    // 1. display the image
    // 2. a simple sentence describing the image
        // the description will mention the name of the animal present in the image
// AI APIs used is: HuggingFace's imageToText() API
// computer vision model used is: vit-gpt2-image-captioning

import { useRecoilValue, useSetRecoilState } from "recoil";
import { uploadedImage } from "../store/atoms/Image";
import { animalDescription } from "../store/atoms/AnimalDescription";
import { HfInference } from "@huggingface/inference";
import { useState } from "react";


export function ClassifyImage() {
    const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);
    const [preview, setPreview] = useState<string | null>(null);
    const [animal_description, setAnimalDescription] = useState<string>("");
    
    // get the value of uploadedImage from recoil
    const usersUploadedImage: File | null =  useRecoilValue(uploadedImage);

    // get the reference of set function to set the value of animalDescription in recoil
    const setAnimalDescriptionInRecoil = useSetRecoilState(animalDescription);

    async function classify() {
        try {   
            if(usersUploadedImage) {
                // create the image blob to pass it to HF's API
                setPreview(URL.createObjectURL(usersUploadedImage));
                const response = await hf.imageToText({
                    model: "nlpconnect/vit-gpt2-image-captioning", 
                    data: usersUploadedImage
                });
                setAnimalDescriptionInRecoil(response.generated_text); // set recoil's animalDescription atom
                setAnimalDescription(response.generated_text); // set animal_description locally, to show data on UI
                
            }
            else {
                console.log('usersUploadedImage is null');
            }
            
        } catch (error) {
            console.error("Error classifying image:", error);
        } finally {
            console.log("Image classification completed.");
        }
    }
    

    return (
        <>
          {preview && (
            <img src={preview} alt="Uploaded"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          )}          
          <button onClick={classify}>Classify Image</button>
          {animal_description && <div>{animal_description}</div>}
          
        </>
    );
}