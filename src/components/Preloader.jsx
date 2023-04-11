import React from 'react';
// import '../index.css'
import '../index.css'
import logo from '../resources/space_logo.svg'
import ReactCSSTransitionGroup from 'react-transition-group';

const Preloader = () => {
    return (
        <div className="preloader">
                 <img
                    alt=""
                    src={logo}
                    className='preloader_logo'/>
                <img
                    alt=""
                    src={logo}
                    className='preloader_logo_back'/>
        </div>
    );
};

export default Preloader;