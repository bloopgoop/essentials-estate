import React, { useState, useEffect } from "react";
import propertyService from "services/property/testAPI";
import axios from "axios";


const Dropbox = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const onChange = (e) => {
        console.log(e.target.files);
        setImages(e.target.files);
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(images);
        const formData = new FormData();
        // add jwt into formData
        for (let i = 0; i < images.length; i++) {
            formData.append(`file${i}`, images[i]);
        }
        propertyService
            .addPhoto(formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                alert(`Error adding photo: ${error}`);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:8000/property/photo')
          .then(res => {
            // Create a blob from the array buffer
            console.log(res.data[0]);
            const base64Url = 'data:image/jpeg;base64' + res.data[0];
            // Set the image URL state
            setSelectedImage(base64Url);
          });
      }, []);

    return (
        <>
            <h1>Dropbox</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" multiple onChange={onChange} />
                <button type="submit">Submit</button>
            </form>
            <img src={selectedImage} alt="img"/>
        </>
    );
}

export default Dropbox;