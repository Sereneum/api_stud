import React from 'react';
import {Spinner} from "react-bootstrap";
import styles from './Login.module.css'

const LoginSpinner = () => {
    return (
        <div>
            <div className='text-center'>
                <Spinner
                    animation="border"
                    role="status"
                    variant='light'
                    className={styles.spinner}
                >
                    <span className="visually-hidden" style={{color: 'white'}}>Loading...</span>
                </Spinner>
            </div>
        </div>
    );
};

export default LoginSpinner;