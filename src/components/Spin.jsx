import React from 'react';
import {Spinner} from "react-bootstrap";

const Spin = ({cl}) => {
    return (
                <Spinner
                    animation="border"
                    role="status"
                    variant='light'
                    className={cl}
                >
                    <span className="visually-hidden" style={{color: 'white'}}>Loading...</span>
                </Spinner>
    );
};

export default Spin;