import React from 'react';
import { Link } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
    
    return (
        <section className="not-found">
            <div className="not-found-title">
                404
            </div>
            <h1 className="not-found-text">
                Page Not Found
            </h1>
            <Link to="/" className="not-found-link">
            Go to Home
            </Link>
        </section>
    );
};

export default NotFound;