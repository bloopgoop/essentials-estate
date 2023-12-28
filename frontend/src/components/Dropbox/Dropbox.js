import React, { useState, useEffect } from "react";
import propertyService from "services/property/testAPI";
import axios from "axios";


const Dropbox = () => {
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

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
        axios.get('http://localhost:8000/property/photo/')
          .then(res => {
            console.log(res.data);
            setImageURLs(res.data);
          });
      }, []);

    return (
        <>
            <h1>Dropbox</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" multiple onChange={onChange} />
                <button type="submit">Submit</button>
            </form>
            {
                imageURLs.map((url, idx) => (
                    <img src={url} alt={`img${idx}`} />
                ))
            }
        </>
    );
}

export default Dropbox;