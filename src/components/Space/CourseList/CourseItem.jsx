import React, {memo} from 'react';
import styles from './CourseList.module.css'

const CourseItem = ({isActive, course, click, index}) => {


    return (
        <div className={`${styles.course_item} ${isActive ? styles.isActiveCourse : ''}`} onClick={() => click(index)}>
            <div>{course.course_name}</div>
        </div>
    );
};


export default memo(CourseItem);