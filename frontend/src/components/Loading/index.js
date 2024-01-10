import React from 'react';
import "./styles.css"
import loading from "assets/loading.gif";

const Loading = () => {
    return (
        <div className="loading">
            <img src={loading} alt="Loading..." />
        </div>
    );
};

export default Loading;
