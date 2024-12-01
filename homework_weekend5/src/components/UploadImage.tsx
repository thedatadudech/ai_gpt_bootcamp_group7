import { uploadedImage } from "../store/atoms/Image";
import { useSetRecoilState } from "recoil";


// this components lets users upload an image
// and stores the image in the "uploadedImage" atom of recoil

export function UploadImage(){
    // get the reference of the atom's setter function 
    const setUploadedImage = useSetRecoilState(uploadedImage);

    function uploadUsersImage(event: React.ChangeEvent<HTMLInputElement>) {        
        // take reference to the uploadedImage atom's set function
        let file: File | null = null;
        if (event.target.files && event.target.files.length > 0) {
            file = event.target.files[0]; 
        }
        if(file) {            
            // set the image file in recoil's "uploadedImage" atom
            setUploadedImage(file); 
        }        
    }

    return <div>        
        Upload an Image:
        <input type="file" onChange={uploadUsersImage} />
    </div>
}