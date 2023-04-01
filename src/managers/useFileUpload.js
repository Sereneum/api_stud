import {useState} from "react";

export const useFileUpload = () => {
    const [fileContent, setFileContent] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files;
        const reader = new FileReader();
        reader.onloadend = () => {
            setFileContent(reader.result);
            console.log(reader)
        };
        // reader.readAsText(file);
    }

    return {handleFileChange}
}