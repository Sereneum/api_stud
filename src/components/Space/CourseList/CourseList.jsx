import React, {memo, useCallback, useContext} from 'react';
import CourseItem from "./CourseItem";
import styles from './CourseList.module.css'
import {Container} from "react-bootstrap";
import {Context} from "../../../index";
import {useMediaQuery} from "react-responsive";


const CourseList = ({isActiveConfig, desktopMove, mobileMove}) => {

    const {course} = useContext(Context)
    const isMobile = useMediaQuery({query: '(max-width: 1000px)'})

    const activeCourseIndex = course.activeCourse
    const valueActiveCourse = course.courses[course.activeCourse]
    const courses = course.courses

    const openCourse = (index) => {
        isMobile
            ?
            mobileMove.openCourse(index)
            :
            desktopMove.openCourse(index)
    }

    const openConfig = () => {
        isMobile
            ?
            mobileMove.openConfig()
            :
            desktopMove.openConfig()
    }

    return (
        <Container className={styles.course_block}>
            <div className={styles.course_title}>
                Ваши курсы
            </div>
            <div className={styles.course_list}>
                {

                    courses
                        ?
                        courses.map((i, index) => <CourseItem key={i.course_id}
                                                              isActive={!isActiveConfig && !isMobile && index === activeCourseIndex}
                                                              course={i}
                                                              click={openCourse}
                                                              index={index}/>)
                        :
                        "пусто"
                }
            </div>
            <hr className={styles.hr}/>
            <div
                className={`${styles.course_settings} ${isActiveConfig ? styles.course_settings_active : ''}`}
                onClick={openConfig}
            >
                {isActiveConfig ? 'Настройка курсов' : 'Настройка курсов'}
            </div>
        </Container>
    );
};

export default CourseList;