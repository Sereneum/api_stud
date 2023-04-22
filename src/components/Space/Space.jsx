import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import './Space.css'
import '../../index.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useMediaQuery} from "react-responsive";
import {useSpace} from "../../hooks/useSpace";
import MobileNavigation from "../MobileNavigation/MobileNavigation";

const Space = observer(({reCourse}) => {

    const {course, binder} = useContext(Context)

    const {mobileMove, mobileMode, mobileSpace, desktopSpace} = useSpace({course, reCourse, binder})

    const isMobile = useMediaQuery({query: '(max-width: 1300px)'})


    return (
        <div className='space'>
            {
                isMobile
                &&
                <MobileNavigation mobileMove={mobileMove} mobileMode={mobileMode}/>
            }

            {
                isMobile
                    ?
                    <>
                        {mobileSpace()}
                    </>
                    :
                    <>
                        {desktopSpace()}
                    </>
            }

        </div>
    );
});


export default Space;