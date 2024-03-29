import React, {memo, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import Space from "./Space/Space";
import {Context} from "../index";
import MySpinner from "./MySpinner";
import Preloader from './Preloader';
import Sky from './Sky/Sky';
import {epoch_preloadingAllData, epoch_courseData} from "../epoch/epochServer";
import {preEpoch_reconstructionCourses} from "../epoch/preEpoch";
import {settings} from "../utils/settings";
import {CSSTransition} from "react-transition-group";
import '../cssAnimation/preloader_animation.css'

const Main = observer(() => {

    const [loadingCourse, setLoadingCourse] = useState(true)
    const {user, course, settings} = useContext(Context)
    let id = user.user.anotherID


    const reCourse = (before, after) => {
        return new Promise((resolve, reject) => {
            preEpoch_reconstructionCourses(before, after, course.courses)
                .then(r => {
                    course.setCourses(r)
                    console.log(r)
                    resolve(true)
                })
        })
    }

    useEffect(() => {
        epoch_preloadingAllData(id).then(r => {
            console.log('Main: ', r)
            course.setCourses(r.courses)
            settings.setSettings(r.settings)
            if (loadingCourse) setLoadingCourse(false)
        })
    }, [])


    if (loadingCourse) return <Preloader/>

    // useEffect(() => {
        // console.log('loadingCourse: ', loadingCourse)
        // },
        // [loadingCourse])

    return (
        <div>
        {/*//     <CSSTransition in={loadingCourse} timeout={1000} classNames={'preloader_animation'} mountOnEnter unmountOnExit>*/}
        {/*//         <Preloader />*/}
        {/*//     </CSSTransition>*/}
        //     {/*{loadingCourse && }*/}
        {/*//     {!loadingCourse*/}
        {/*//         &&*/}

                    <Sky/>
                    <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw'}}>
                        <Space reCourse={reCourse}/>
                    </Container>

            {/*// }*/}


        </div>
    );
});

export default Main;