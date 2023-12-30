import React, { useEffect, useRef, useState } from 'react';
import './Dropbox.css';


function Dropbox() {
    const fileInputRef = useRef(null);
    const dropboxRef = useRef(null);
    const [fileObject, setFileObject] = useState(null);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        if (fileObject) {
            // set image as dropbox and name for button
            setFileName(fileObject.name);
            console.log(fileObject.name);

            // extract image data from fileObject
            const reader = new FileReader();
            reader.readAsDataURL(fileObject);
            reader.onload = () => {
                setImage(reader.result);
                dropboxRef.current.style.backgroundColor = 'lightgray';
                dropboxRef.current.style.boxShadow = 'none';
            };
        }
    }, [fileObject]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileObject(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        dropboxRef.current.style.backgroundColor = 'white';
        dropboxRef.current.style.boxShadow = 'inset 0px 0px 10px 5px rgba(0, 0, 0, 0.2)';
      };
      
      const handleDragLeave = (e) => {
        e.preventDefault();
        dropboxRef.current.style.backgroundColor = 'lightgray';
        dropboxRef.current.style.boxShadow = 'none';

      };
      
      const handleDrop = (e) => {
        e.preventDefault();
        let files = Array.from(e.dataTransfer.files);
        const first = files[0];
        setFileObject(first);
      };
      

      
    
    return (
        <>
            <div id='dropbox'>
                <div
                className='bin'
                ref={dropboxRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                >
                {!image ? `Drop files here` : <img className="dropbox-image" src={image} alt="upload-preview" />}
                </div> 
            </div>

            <label htmlFor='file-input-button' className='file-upload'>
                <span>Upload file:</span>
                <input
                id='file-input-button'
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                />
                {fileName || 'No file selected'}
            </label>

        </>


    );
}

export default Dropbox;