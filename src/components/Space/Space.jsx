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

    const {course, sizeStore} = useContext(Context)

    const {mobileMove, mobileMode, mobileSpace, desktopSpace} = useSpace({course, reCourse})

    const isMobile = useMediaQuery({query: '(max-width: 1000px)'})


    return (
        <Container className='space'>
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

        </Container>
    );
});


export default Space;