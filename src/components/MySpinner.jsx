import React from 'react';
import {Button, Spinner} from "react-bootstrap";
import '../index.css'

const MySpinner = () => {
    return (
        <div className='mySpinner'>
                <Spinner
                    animation="border"
                    role="status"
                    variant='light'
                >
                    <span className="visually-hidden" style={{color: 'white'}}>Loading...</span>
                </Spinner>
        </div>
    );
};

export default MySpinner;