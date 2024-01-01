import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import Dropbox from 'components/Dropbox/Dropbox';
import Footer from 'components/Footer/Footer';
import './AddPhotos.css';


function AddPhotos({ props }) {
    console.log("in addphotos:", props)
    return (
        <>
            <Navbar />
            <div id="add-photos">
                <h1>Add Photos</h1>
                <Dropbox id={props.id}/>
            </div>
            <Footer />
        </>
    );
}

export default AddPhotos;
