import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import './Space.css'
import '../../index.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useMediaQuery} from "react-responsive";
import {useSpace} from "../../hooks/useSpace";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import {epoch_courseData} from "../../epoch/epochServer";

const Space = observer(({reCourse}) => {

    const {course, binder} = useContext(Context)

    const {mobileMove, mobileMode, mobileSpace, desktopSpace} = useSpace({course, reCourse, binder})

    const isMobile = useMediaQuery({query: '(max-width: 1300px)'})

    // const reboot = (course_id) => new Promise((rs, rj) => {
    //     epoch_courseData(course_id)
    //         .then(new_course => console.log(new_course))
    // })



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