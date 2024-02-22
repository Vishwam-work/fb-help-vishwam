import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Linkscreen() {
    const [isLoading, setIsLoading] = useState(false);
    const to = '/home'
    const handleClick = () => {
        setIsLoading(true);

        setTimeout(() => {

            window.location.href = to;
        }, 2000);

    };



    return (
        <div className='d-flex justify-content-center align-items-center bg-primary  vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Connect to FACE-BOOK</h2>


                <button type="submit" className="mb-3 mt-3 btn btn-danger w-100 rounded-0">Remove Account</button>

                {isLoading ? (
                    <div><strong>Loading...</strong></div>
                ) : (
                    <button onClick={handleClick} className="mb-3 btn btn-success w-100 rounded-0">
                        Connect Account
                    </button>


                )}


            </div>
        </div>
    )
}
