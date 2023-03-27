import React, {memo, useCallback, useContext} from 'react';
import CourseItem from "./CourseItem";
import styles from './CourseList.module.css'
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";

const CourseList = ({courses, activeCourse, isActiveConfig, funcActivateCourse, clickOnConfig}) => {


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
                                                                 isActive={!isActiveConfig && index === activeCourse}
                                                                 course={i}
                                                                 click={funcActivateCourse}
                                                                 index={index}/>)
                        :
                        "пусто"
                }
            </div>
            <hr className={styles.hr}/>
            <div className={styles.course_settings} onClick={clickOnConfig}>
                {isActiveConfig ? 'Настройка курсов' : 'Настроить курсы'}
            </div>
        </Container>
    );
};

export default CourseList;