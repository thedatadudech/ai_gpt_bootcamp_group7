import { RecoilRoot } from "recoil";
import { UseRagOnImage } from "./components/UseRAGOnImage"
import { UploadImage } from "./components/UploadImage";
import { ClassifyImage } from "./components/ClassifyImage";
import React from "react";




const App = React.memo(() => {
  // const [imageFile, setImageFile] = useState<File | null>(null);
  
  return (
    <RecoilRoot>      
      <UploadImage />
      <ClassifyImage />            
      <UseRagOnImage />
    </RecoilRoot>
  )
});

export default App
