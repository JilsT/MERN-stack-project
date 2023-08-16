import React, { useRef, useState, useEffect } from "react";

import './ImageUpload.css';
import Button from "./Button";

const ImageUpload = (props) => {
    const [isValid, setIsValid] = useState(false);
    const [previewUrl, setPreviewUrl] = useState();
    const [file, setFile] = useState();

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setPreviewUrl(fileReader.result);
          }, false);
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;

        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        };
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input id={props.id} ref={filePickerRef} style={{ display: 'none' }} type="file" accept=".jpg, .jpeg, .png" onChange={pickedHandler} name="image"/>
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img alt="preview" src={previewUrl} />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}> PICK IMAGE </Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;