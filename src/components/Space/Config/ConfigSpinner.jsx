import React from 'react';
import {Spinner} from "react-bootstrap";
import styles from "./Config.module.css";

const ConfigSpinner = () => {
    return (
                <div className='text-center'>
                    <Spinner
                        animation="border"
                        role="status"
                        variant='light'
                        className={styles.config_spinner}
                    >
                        <span className="visually-hidden" style={{color: 'white'}}>Loading...</span>
                    </Spinner>
                </div>
    );
};

export default ConfigSpinner;