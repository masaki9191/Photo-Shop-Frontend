import React from "react";
import { useParams } from 'react-router-dom';
function Verify() {
    const { params } = useParams();
    return (
        <>
            <div className="verify">
                <h1>Hello World</h1>
                <p>{params}</p>
            </div>
        </>
    )
}

export default Verify;