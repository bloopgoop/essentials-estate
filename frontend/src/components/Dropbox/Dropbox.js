import React, { useEffect, useRef, useState } from 'react';
import './Dropbox.css';


function Dropbox(id) {

    const MAX_FILES = 20;

    const [index, setIndex] = useState(0);
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [descriptions, setDescriptions] = useState(Array(MAX_FILES).fill(''));
    const dropboxRef = useRef();
    const fileInputRef = useRef();
    const descriptionInputRef = useRef();
    

    useEffect(() => {
        console.log(files);
        console.log(index);

        // set the image state to the url of file to display preview
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result);
                    setImageName(files[index].name);
                }
            };
            reader.readAsDataURL(files[index]);
        }

     }, [files, index]);

    const handleFileChange = (e) => {
        e.preventDefault();
        console.log(e.target.files);
        // combine existing files and new files
        setFiles([...files, ...e.target.files]); // asynchronous
    };

    const handleDrop = (e) => {
        e.preventDefault();
        console.log(e.dataTransfer.files);
        setFiles([...files, ...e.dataTransfer.files]); // asynchronous
     };

    const handleDescriptionChange = (e) => {
        e.preventDefault();
        // shallow copy of descriptions
        let newDescriptions = [...descriptions];
        // shallow copy of item at index
        let item = newDescriptions[index];
        // update item's value
        item = e.target.value;
        // put item back into newDescriptions
        newDescriptions[index] = item;
        // update state
        setDescriptions(newDescriptions);
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

    return (
        <>
            {files.length > 0 ? ( <h1>{imageName}</h1> ) : null}

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
                <div>{files.length} images selected</div>
            </label>



            { files.length > 0 ? (
                <label htmlFor='description-input' className='description'>
                    <span>Description:</span>
                    <input

                        id='description-input'
                        type="textarea"
                        ref={descriptionInputRef}
                        value={descriptions[index]}
                        onChange={handleDescriptionChange}
                    />
                </label>
            ) : null}



            {index > 0 ? (
                <button type="button" onClick={() => setIndex(index - 1)}>
                    Previous
                </button>

            ) : null}
            {index < files.length - 1 ? (
                <button type="button" onClick={() => setIndex(index + 1)}>
                    Next
                </button>
            ): null}

        </>
    );
}

export default Dropbox;