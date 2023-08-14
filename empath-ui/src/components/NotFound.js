import * as React from 'react';
import '../stylesheets/NotFound.css';
export default function NotFound() {
    return (
        <>
            <h1>404 Page not found </h1>
            <p className="zoom-area"> The link that you are trying to access is <b>INVALID</b>  </p>
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <a target="_blank" href="http://localhost:3000/"
                   className="more-link">Go to main page</a>
            </div>
        </>
    );
}